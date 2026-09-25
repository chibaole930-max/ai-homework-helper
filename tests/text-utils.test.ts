/**
 * Test cho src/lib/text-utils.ts — preprocessMathContent
 * Chạy: npm test  (tsx --test "tests/*.test.ts")
 *
 * Lưu ý: hàm này là hàm CHẤT LẤN (imperative replace) nên test phải KHOÁ ĐÚNG
 * hành vi thật, kể cả các quirk/bug đã tồn tại. Không được "sửa cho đẹp" khi
 * cập nhật test — hàm chỉ được đổi khi chủ đích đổi chức năng.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { preprocessMathContent } from '../src/lib/text-utils';

test('toạ độ: $23^\\circ 23\'B$ -> 23°23\'B (bỏ dấu $ và ^\\circ)', () => {
  assert.equal(
    preprocessMathContent("Toạ độ $23^\\circ 23'B$ của Hà Nội"),
    "Toạ độ 23°23'B của Hà Nội"
  );
  assert.equal(
    preprocessMathContent("$102^\\circ 09'D$ và $8^\\circ 34'B$"),
    "102°09'D và 8°34'B"
  );
});

test('nhiệt độ: 25^\\circ C -> 25°C, kể cả khi bọc trong $...$', () => {
  assert.equal(preprocessMathContent('Nhiệt độ 25^\\circ C.'), 'Nhiệt độ 25°C.');
  assert.equal(preprocessMathContent('100^\\circ C'), '100°C');
  assert.equal(preprocessMathContent('$25^\\circ C$'), '25°C');
});

test("\\[ ... \\] -> $$...$$ và \\( ... \\) -> $...$", () => {
  assert.equal(preprocessMathContent('\\(\\frac{1}{2}\\)'), '$\\frac{1}{2}$');
  // QUIRK ĐÃ TỒN TẠI (xem README của test): khối hiển thị \[ ... \] bị MẤT NỘI DUNG
  // và bị thay bằng chuỗi `$$1$$`. Đây là hành vi đang chạy trên production —
  // test khoá lại để không vỡ lặng, KHÔNG phải hành vi mong muốn.
  assert.equal(preprocessMathContent('\\[x^2+1\\]'), '$$1$$');
  assert.equal(preprocessMathContent('trước \\[A\\] sau'), 'trước $$1$$ sau');
});

test('text tiếng Việt trong \\text{...} được bỏ vỏ, không sinh $', () => {
  assert.equal(preprocessMathContent('\\text{đường thẳng} vuông góc'), 'đường thẳng vuông góc');
  // văn xuôi có dấu bọc trong $...$ cũng bị gỡ dấu $
  assert.equal(preprocessMathContent('$Phương trình bậc hai$'), 'Phương trình bậc hai');
  // dấu phụ bị tách rời do TeX: "n a ˘ m" -> "năm", "a ˘" -> "ă"
  assert.equal(preprocessMathContent('n a ˘ m'), 'năm');
  assert.equal(preprocessMathContent('a ˘ qua'), 'ă qua');
});

test('đơn vị mm/năm và % bị gỡ dấu $', () => {
  assert.equal(preprocessMathContent('Lượng mưa $1500 - 2000 mm/năm$'), 'Lượng mưa 1500 - 2000 mm/năm');
  assert.equal(preprocessMathContent('Tỉ lệ $> 80%$ dân số'), 'Tỉ lệ > 80% dân số');
  assert.equal(preprocessMathContent('$1500 mm$/năm'), '1500 mm/năm');
});

test('công thức toán hợp lệ được giữ nguyên (KHÔNG bị đụng)', () => {
  for (const f of [
    '$x^2 + y^2 = z^2$',
    '$$\\frac{a}{b}$$',
    '$$\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$',
    'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}',
    '$$P \\ne 0 \\Rightarrow x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$',
  ]) {
    assert.equal(preprocessMathContent(f), f, `phải giữ nguyên: ${f}`);
  }
});

test('góc độ rời trong $...$: rule 6 chạy trước nên dấu $ còn lại (quirk)', () => {
  assert.equal(preprocessMathContent('$90^\\circ$'), '$90°$');
  // ngoài $...$ thì sạch hoàn toàn
  assert.equal(preprocessMathContent('góc 60^\\circ'), 'góc 60°');
});

test('chuỗi rỗng trả về chuỗi rỗng', () => {
  assert.equal(preprocessMathContent(''), '');
});

test('idempotent: chạy 2 lần cho kết quả giống nhau', () => {
  const src = "Toạ độ $23^\\circ 23'B$, nhiệt độ 25^\\circ C, mưa $1500 mm/năm$";
  const once = preprocessMathContent(src);
  assert.equal(preprocessMathContent(once), once);
});
