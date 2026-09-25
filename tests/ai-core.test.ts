/**
 * Test cho src/lib/ai-core.ts — logic thuần của pipeline AI.
 * Chạy: npm test  (tsx --test "tests/*.test.ts")
 *
 * Nguyên tắc: đây là CHARACTERIZATION TEST. Mọi quirk/bug đang tồn tại ở
 * server.ts cũng được khoá lại y hệt (ví dụ normTitle nuốt chữ "Đ").
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  normTitle,
  extractLessonLinks,
  cleanArticleText,
  extractSectionGround,
  parseLLMJson,
  noteCacheKey,
  ratingSummary,
  type PresetRatingRow,
} from '../src/lib/ai-core';

const row = (presetId: string, ownerKey: string, rating: number): PresetRatingRow => ({
  presetId,
  ownerKey,
  rating,
  createdAt: '2026-01-01T00:00:00.000Z',
});

// ---------------------------------------------------------------------------
// normTitle
// ---------------------------------------------------------------------------

test('normTitle: bỏ dấu, lowercase, gộp ký tự lạ thành dấu cách', () => {
  assert.equal(normTitle('Bài 1: Hệ thức lượng'), 'bai 1 he thuc luong');
  assert.equal(normTitle('  PHƯƠNG TRÌNH BẬC HAI  '), 'phuong trinh bac hai');
  assert.equal(normTitle('Tỉ lệ > 80%'), 'ti le 80');
});

test('normTitle: QUIRK ký tự Đ/đ bị nuốt hoàn toàn (không phải "d")', () => {
  // NFD không tách U+0110 (Đ) nên bị replace bằng khoảng trắng -> mất cả chữ
  assert.equal(normTitle('Đại số'), 'ai so');
  assert.equal(normTitle('đường thẳng'), 'uong thang');
  // hành vi này được dùng để so khớp tên bài giữa web và loigiaihay.com
  // -> nếu muốn sửa thì phải sửa CẢ HAI VẾ và xoá cache grounding.
  assert.notEqual(normTitle('Đại số'), 'dai so');
});

// ---------------------------------------------------------------------------
// extractLessonLinks
// ---------------------------------------------------------------------------

test('extractLessonLinks: giữ link bài, bỏ pdf/tập và title quá ngắn', () => {
  const html = [
    '<a href="/toan-a123.html">Bài 1: Hệ thức lượng</a>',
    '<a href="/toan-a124.html">abc</a>', // title dài 3 < 4 -> bỏ
    '<a href="/toan-sgk-van-1-tap-a126.html">Bài trong sách tập một</a>', // pdf/tap -> bỏ
    '<a href="/toan-a125.pdf">Tải tài liệu</a>', // không phải .html -> bỏ
  ].join('\n');
  assert.deepEqual(extractLessonLinks(html), [
    { title: 'Bài 1: Hệ thức lượng', url: 'https://loigiaihay.com/toan-a123.html' },
  ]);
});

test('extractLessonLinks: khử trùng theo url và GIỮ BẢN ĐẦU TIÊN', () => {
  const html = [
    '<a href="/toan-a123.html">Bài 1: Hệ thức lượng</a>',
    '<a href="/toan-a123.html">Bản trùng lặp</a>',
  ].join('\n');
  const out = extractLessonLinks(html);
  assert.equal(out.length, 1);
  assert.equal(out[0].title, 'Bài 1: Hệ thức lượng');
});

test('extractLessonLinks: href tuyệt đối giữ nguyên, href tương đối được nối domain', () => {
  const html = [
    '<a href="https://loigiaihay.com/toan-a130.html">Bài đường thẳng</a>',
    '<a href="toan-a127.html">Bài cơ bản</a>',
  ].join('\n');
  assert.deepEqual(extractLessonLinks(html), [
    { title: 'Bài đường thẳng', url: 'https://loigiaihay.com/toan-a130.html' },
    { title: 'Bài cơ bản', url: 'https://loigiaihay.com/toan-a127.html' },
  ]);
});

test('extractLessonLinks: bộ lọc pdf CHỈ soi href, không soi title', () => {
  const html = '<a href="/toan-a128.html">Tải pdf đề thi</a>';
  assert.equal(extractLessonLinks(html).length, 1);
});

test('extractLessonLinks: HTML rỗng trả về mảng rỗng', () => {
  assert.deepEqual(extractLessonLinks(''), []);
});

// ---------------------------------------------------------------------------
// cleanArticleText
// ---------------------------------------------------------------------------

test('cleanArticleText: chọn khối <article>/<main> DÀI NHẤT, bỏ nav/script/footer', () => {
  const body = 'NOI DUNG CHINH '.repeat(30);
  const html =
    `<div><nav>MENU_DIEU_HUONG</nav><article>${body}BAI</article>` +
    '<article>bai ngan</article><script>alert(1)</script><footer>CHAN_TRANG</footer></div>';
  const out = cleanArticleText(html);
  assert.ok(out.includes('NOI DUNG CHINH'), 'phải giữ nội dung chính');
  assert.ok(out.includes('BAI'), 'phải lấy khối dài nhất');
  assert.ok(!out.includes('bai ngan'), 'phải bỏ khối article ngắn hơn');
  assert.ok(!out.includes('MENU_DIEU_HUONG'), 'phải bỏ <nav>');
  assert.ok(!out.includes('CHAN_TRANG'), 'phải bỏ <footer>');
  assert.ok(!out.includes('alert(1)'), 'phải bỏ <script>');
  assert.ok(!out.includes('<'), 'phải bỏ thẻ HTML trong kết quả');
});

test('cleanArticleText: <main> dài hơn <article> thì thắng', () => {
  const html = `<article>${'short '.repeat(10)}</article><main>${'dai '.repeat(200)}</main>`;
  const out = cleanArticleText(html);
  assert.ok(out.includes('dai dai dai'));
  assert.ok(!out.includes('short short'));
});

test('cleanArticleText: QUIRK fallback khi rút ra <= 200 ký tự -> trả " " + HTML thô + " "', () => {
  const html =
    '<html><head><script>var a=1;</script></head><body><nav>NAV</nav>' +
    '<article>Short</article><footer>FOOT</footer></body></html>';
  const out = cleanArticleText(html);
  assert.ok(out.startsWith(' '), 'phải có dấu cách đầu');
  assert.ok(out.endsWith(' '), 'phải có dấu cách cuối');
  assert.ok(out.includes('<article>Short</article>'), 'phải giữ HTML thô');
  assert.ok(!out.includes('var a=1'), 'vẫn phải bỏ <script>');
  assert.ok(!out.includes('NAV'), 'vẫn phải bỏ <nav>');
  assert.ok(!out.includes('FOOT'), 'vẫn phải bỏ <footer>');
});

test('cleanArticleText: HTML rỗng -> vẫn rơi vào nhánh quirk, trả đúng 2 dấu cách', () => {
  assert.equal(cleanArticleText(''), '  ');
});

// ---------------------------------------------------------------------------
// extractSectionGround
// ---------------------------------------------------------------------------

test('extractSectionGround: không tìm thấy từ khoá -> fallback 2400 ký tự đầu', () => {
  const text = 'x'.repeat(5000);
  const out = extractSectionGround(text, ['khongcothat']);
  assert.equal(out.length, 2400);
  assert.equal(out, text.slice(0, 2400));
});

test('extractSectionGround: bỎ từ khoá ngắn hơn 3 ký tự', () => {
  // 'ab' xuất hiện trước 'abc' nhưng bị bỏ vì len < 3 -> phải dùng 'abc'
  const text = 'ab' + 'x'.repeat(497) + 'abc' + 'y'.repeat(5000);
  const withShort = extractSectionGround(text, ['ab', 'abc']);
  assert.equal(withShort.length, 2800);
  assert.equal(withShort, extractSectionGround(text, ['abc']));
  // nếu 'ab' được dùng, cửa sổ sẽ bắt đầu từ đầu chuỗi
  assert.equal(extractSectionGround(text, ['ab']).slice(0, 2), 'ab');
  assert.equal(withShort.slice(0, 3), 'xxx');
});

test('extractSectionGround: cửa sổ = 220 ký tự trước + 2800 ký tự sau', () => {
  const text = 'x'.repeat(500) + 'abc' + 'y'.repeat(5000);
  const out = extractSectionGround(text, ['abc']);
  assert.equal(out.length, 2800);
  assert.equal(out, text.slice(280, 280 + 2800));
  assert.ok(out.startsWith('x'.repeat(220) + 'abc'));
});

test('extractSectionGround: khoá ở đầu chuỗi không bị âm (Math.max(0, ...))', () => {
  const text = 'abc' + 'y'.repeat(5000);
  const out = extractSectionGround(text, ['abc']);
  assert.equal(out.length, 2800);
  assert.equal(out, text.slice(0, 2800));
});

test('extractSectionGround: so khớp không phân biệt hoa thường / dấu', () => {
  const text = 'abc' + 'y'.repeat(500) + 'Định lý Pitag' + 'z'.repeat(5000);
  const out = extractSectionGround(text, ['định lý pitag']);
  assert.ok(out.includes('Định lý Pitag'));
});

test('extractSectionGround: danh sách từ khoá rỗng -> fallback', () => {
  const text = 'x'.repeat(5000);
  assert.equal(extractSectionGround(text, []).length, 2400);
});

// --- ROUND 2: bất biến (invariant), KHÔNG khoá offset ---
// LÝ DO không khoá offset: bestPos được tìm trên chuỗi ĐÃ normTitle (bỏ dấu, gộp
// ký tự) nhưng lại dùng để slice chuỗi GỐC -> vị trí lệch (drift) khi văn bản
// tiếng Việt nhiều dấu. Đó là bug đã biết, sửa ở commit riêng. Test dưới đây chỉ
// khoá những gì phải đúng dù drift có hay không: không throw + ≤ 2800 ký tự +
// kết quả luôn là một lát cắt liên tiếp của text gốc.

const MAX_SECTION = 2800;

test('extractSectionGround: LUÔN ≤ 2800 ký tự ở mọi tổ hợp text/từ khoá', () => {
  const texts: [string, string][] = [
    ['chuỗi rỗng', ''],
    ['rất ngắn', 'abc'],
    ['ngắn hơn cửa sổ', 'a'.repeat(2799)],
    ['đúng bằng cửa sổ', 'a'.repeat(2800)],
    ['ascii dài', 'x'.repeat(50_000)],
    ['tiếng Việt dài có dấu', 'Định lý Pitag trong tam giác vuông cân tại A. '.repeat(400)],
    ['tiếng Việt dài không dấu', 'dinh ly pitag trong tam giac vuong can tai A. '.repeat(400)],
    ['toàn ký tự đặc biệt', '!@#$%^&*()_+-= []{}<>?/\\|~`'.repeat(2000)],
  ];
  const keywordSets = [[], ['abc'], ['định lý pitag'], ['dinh ly pitag'], ['a'], ['', '   '], ['ab', 'a', 'b']];
  for (const [name, text] of texts) {
    for (const kws of keywordSets) {
      const out = extractSectionGround(text, kws);
      assert.ok(
        out.length <= MAX_SECTION,
        `[${name}] kws=${JSON.stringify(kws)} -> ${out.length} ký tự (> ${MAX_SECTION})`
      );
      assert.equal(typeof out, 'string');
    }
  }
});

test('extractSectionGround: text tiếng Việt dài -> không throw, kết quả là lát cắt của text gốc', () => {
  // keyword nằm SÂU trong bài, text có nhiều dấu tiếng Việt (kích hoạt drift)
  const text =
    'Mở đầu: bài học nêu bối cảnh lịch sử và một số định nghĩa cơ bản. '.repeat(200) +
    'ĐỊNH LÝ PITAG' +
    'Nội dung tiếng Việt rất dài. '.repeat(400);
  assert.ok(text.length > 10_000, 'fixture phải đủ dài');

  for (const kws of [['Định lý Pitag'], ['định lý pitag'], ['ĐỊNH LÝ PITAG'], ['không-có-trong-bài']]) {
    const out = extractSectionGround(text, kws);
    assert.ok(out.length <= MAX_SECTION, `kws=${JSON.stringify(kws)} -> ${out.length} ký tự`);
    assert.ok(text.includes(out), 'kết quả phải là lát cắt liên tiếp của text GỐC');
    assert.ok(out.length > 0, 'không được rỗng khi text dài');
  }
});

test('extractSectionGround: cửa sổ không bao giờ cắt vượt biên text (không sinh ký tự rỗng lạ)', () => {
  // bestPos tính trên chuỗi normalized có thể vượt độ dài text gốc -> slice trả ''
  // Test khoá đúng hành vi an toàn: hoặc '' hoặc lát cắt thật, không bao giờ lỗi.
  for (const text of ['', 'abc', 'Đ'.repeat(50), 'x'.repeat(3000)]) {
    for (const kws of [['định lý pitag'], ['x'], ['abc'], ['']]) {
      const out = extractSectionGround(text, kws);
      assert.ok(out === '' || text.includes(out), `text=${text.length} kws=${JSON.stringify(kws)}`);
      assert.ok(out.length <= MAX_SECTION);
    }
  }
});

// ---------------------------------------------------------------------------
// parseLLMJson
// ---------------------------------------------------------------------------

test('parseLLMJson: gỡ code fence CÓ nhãn json', () => {
  assert.deepEqual(parseLLMJson('```json\n{"a":1}\n```'), { a: 1 });
  assert.deepEqual(parseLLMJson('```JSON\n{"a":1,"b":[1,2]}\n```'), { a: 1, b: [1, 2] });
});

test('parseLLMJson: gỡ code fence KHÔNG nhãn', () => {
  assert.deepEqual(parseLLMJson('```\n{"a":2}\n```'), { a: 2 });
});

test('parseLLMJson: text thừa quanh object vẫn parse được', () => {
  assert.deepEqual(parseLLMJson('Đây là kết quả: {"a":3} hẹn gặp lại'), { a: 3 });
  assert.deepEqual(parseLLMJson('  {"a":4}  '), { a: 4 });
});

test('parseLLMJson: JSON hỏng -> null (không throw)', () => {
  assert.equal(parseLLMJson('không phải json'), null);
  assert.equal(parseLLMJson('```json\n{oops}\n```'), null);
  assert.equal(parseLLMJson(''), null);
  assert.equal(parseLLMJson('```json\n{"a":\n```'), null);
});

test('parseLLMJson: JSON MẢNG đầu vào -> trả về mảng (KHÔNG phải null)', () => {
  // QUIRK ĐÃ TỒN TẠI: hàm gọi JSON.parse trực tiếp trên toàn bộ chuỗi đã clean,
  // nên '[1,2]' parse thành công và được trả về như một MẢNG — dù hàm được viết
  // cho object. ĐÂY LÀ HÀNH VI THẬT đang chạy trên production, KHÔNG phải điều
  // mong muốn. Sửa (ép object) là việc của commit riêng, không làm ở round test này.
  assert.deepEqual(parseLLMJson('[1,2]'), [1, 2]);
  assert.ok(Array.isArray(parseLLMJson('[1,2]')), 'phải trả về Array');
  assert.deepEqual(parseLLMJson('```json\n[1,2]\n```'), [1, 2]);
  assert.deepEqual(parseLLMJson('  [{"a":1},{"b":2}]  '), [{ a: 1 }, { b: 2 }]);
  // các JSON không phải object khác cũng đi qua cùng con đường
  assert.equal(parseLLMJson('42'), 42);
  assert.equal(parseLLMJson('null'), null);
});

test('parseLLMJson: 2 object dính liền -> null (regex tham lam nuốt hết)', () => {
  // QUIRK: fallback dùng /\{[\s\S]*\}/ (thAM lam) nên với '{"a":1}{"b":2}' nó match
  // trọn khối '{"a":1}{"b":2}' -> JSON.parse hỏng -> null. Object đơn vẫn parse được.
  assert.equal(parseLLMJson('{"a":1}{"b":2}'), null);
  assert.equal(parseLLMJson('{"a":1} {"b":2}'), null);
  assert.equal(parseLLMJson('{"a":{"c":1}}{"b":2}'), null);
  // control: object đơn (kể cả lồng nhau) vẫn OK
  assert.deepEqual(parseLLMJson('{"a":1}'), { a: 1 });
  assert.deepEqual(parseLLMJson('prefix {"a":{"b":1}} suffix'), { a: { b: 1 } });
  assert.deepEqual(parseLLMJson('x {"b":2} y'), { b: 2 });
});

// ---------------------------------------------------------------------------
// noteCacheKey
// ---------------------------------------------------------------------------

const base = {
  subject: 'Toán',
  textbook: 'SGK',
  lessonTitle: 'Bài 1',
  noteStyle: 'tóm tắt',
  loigiaihaySection: 'Mục 1',
  detailLevel: 'vừa',
};

test('noteCacheKey: xác định (deterministic) với cùng đầu vào', () => {
  assert.equal(noteCacheKey(base), noteCacheKey({ ...base }));
});

test('noteCacheKey: luôn là 40 ký tự hex (sha1)', () => {
  assert.match(noteCacheKey(base), /^[0-9a-f]{40}$/);
});

test('noteCacheKey: đổi groundUrl thì đổi khoá cache', () => {
  assert.notEqual(noteCacheKey({ ...base, groundUrl: 'https://a.test/1' }), noteCacheKey({ ...base, groundUrl: 'https://b.test/2' }));
  assert.notEqual(noteCacheKey({ ...base, groundUrl: 'x' }), noteCacheKey(base));
});

test('noteCacheKey: groundUrl undefined tương đương chuỗi rỗng', () => {
  assert.equal(noteCacheKey({ ...base, groundUrl: undefined }), noteCacheKey({ ...base, groundUrl: '' }));
  assert.equal(noteCacheKey(base), noteCacheKey({ ...base, groundUrl: '' }));
});

test('noteCacheKey: khớp sha1 tính tay (xác nhận crypto hoạt động)', () => {
  const o = { ...base, groundUrl: 'https://loigiaihay.com/toan-a123.html' };
  const expected = crypto
    .createHash('sha1')
    .update(
      [
        o.subject,
        o.textbook,
        o.lessonTitle,
        o.noteStyle,
        o.loigiaihaySection,
        o.detailLevel,
        o.groundUrl || '',
      ].join('|')
    )
    .digest('hex');
  assert.equal(noteCacheKey(o), expected);
});

test('noteCacheKey: subject chứa ký tự "|" vẫn deterministic + 40 hex', () => {
  const odd: string[] = [
    'Toán|SGK',
    '|',
    '|||',
    'Toán||',
    '|Toán',
    'Toán|\nSGK',
    'Toán|SGK|Bài 1|tóm tắt',
  ];
  for (const subject of odd) {
    const o = { ...base, subject };
    const k1 = noteCacheKey(o);
    const k2 = noteCacheKey({ ...o });
    assert.match(k1, /^[0-9a-f]{40}$/, `subject=${JSON.stringify(subject)} -> ${k1}`);
    assert.equal(k1, k2, `subject=${JSON.stringify(subject)} phải deterministic`);
    assert.equal(noteCacheKey({ ...o, groundUrl: 'https://loigiaihay.com/toan-a123.html' }).length, 40);
  }
});

test('noteCacheKey: QUIRK dấu "|" trong dữ liệu làm TRÙNG khoá cache', () => {
  // Không escape dấu phân cách khi join -> 2 bộ (subject, textbook) khác nhau cho
  // cùng một chuỗi join => cùng hash. Đây là hành vi THẬT trên production.
  const a = noteCacheKey({ ...base, subject: 'Toán|SGK', textbook: 'Bài 1' });
  const b = noteCacheKey({ ...base, subject: 'Toán', textbook: 'SGK|Bài 1' });
  assert.equal(a, b, 'QUIRK: cùng khoá cache cho 2 môn khác nhau');
  // nhưng nếu chỉ subject đổi (giữ các field khác) thì vẫn phải ra khoá khác
  assert.notEqual(
    noteCacheKey({ ...base, subject: 'Toán|SGK' }),
    noteCacheKey({ ...base, subject: 'Toán' })
  );
});

// ---------------------------------------------------------------------------
// ratingSummary
// ---------------------------------------------------------------------------

test('ratingSummary: rỗng -> avg 0, count 0, mine null', () => {
  assert.deepEqual(ratingSummary([], 'p1'), { avg: 0, count: 0, mine: null });
  assert.deepEqual(ratingSummary([], 'p1', 'me'), { avg: 0, count: 0, mine: null });
});

test('ratingSummary: chỉ tính đúng presetId được hỏi', () => {
  const rows = [row('p1', 'u1', 0), row('p1', 'u2', 4), row('p2', 'u1', 5)];
  assert.deepEqual(ratingSummary(rows, 'p1'), { avg: 2, count: 2, mine: null });
  assert.deepEqual(ratingSummary(rows, 'p2'), { avg: 5, count: 1, mine: null });
  assert.deepEqual(ratingSummary(rows, 'p-khong-co'), { avg: 0, count: 0, mine: null });
});

test('ratingSummary: row rating 0 VẪN được tính vào count/avg', () => {
  const rows = [row('p1', 'u1', 0), row('p1', 'u2', 4), row('p1', 'u3', 3)];
  const s = ratingSummary(rows, 'p1');
  assert.equal(s.count, 3);
  assert.equal(s.avg, 2.3); // làm tròn 1 chữ số
});

test('ratingSummary: mineKey rỗng / không khớp -> mine null', () => {
  const rows = [row('p1', 'u1', 4)];
  assert.equal(ratingSummary(rows, 'p1', '').mine, null);
  assert.equal(ratingSummary(rows, 'p1', 'khong-ton-tai').mine, null);
  assert.equal(ratingSummary(rows, 'p1').mine, null);
});

test('ratingSummary: mine = rating đúng ownerKey, rating 0 trả về 0 (không phải null)', () => {
  const rows = [row('p1', 'u1', 0), row('p1', 'u1', 3)];
  assert.equal(ratingSummary(rows, 'p1', 'u1').mine, 0, 'QUIRK: 0 là hợp lệ, không được hoá null');
});

test('ratingSummary: mine lấy row ĐẦU TIÊN khớp ownerKey (find, không phải filter)', () => {
  const rows = [row('p1', 'u1', 2), row('p1', 'u1', 5)];
  assert.equal(ratingSummary(rows, 'p1', 'u1').mine, 2);
});

test('ratingSummary: ownerKey của preset khác không lẫn sang', () => {
  const rows = [row('p2', 'u1', 5), row('p1', 'u2', 1)];
  assert.equal(ratingSummary(rows, 'p1', 'u1').mine, null);
});
