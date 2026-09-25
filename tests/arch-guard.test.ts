/**
 * tests/arch-guard.test.ts — Chốt RANH GIỚI KIẾN TRÚC bằng test.
 *
 * Mục tiêu: src/lib/ai-core.ts và src/lib/text-utils.ts phải là module "sạch"
 * (không kéo theo dependency node-only) để:
 *   - text-utils.ts import được từ code CLIENT (bundle trình duyệt)
 *   - ai-core.ts test được bằng node:test mà không mock fs/pg
 *
 * CÁCH TEST: đọc NỘI DUNG FILE nguồn bằng fs.readFileSync, bóc các module
 * specifier trong câu lệnh import/export/require/import(), rồi assert không có
 * module node-only nào trong deny-list. Ưu điểm: bắt được cả `require` và
 * `import()` động, không phụ thuộc việc bundle có resolve được hay không.
 *
 * LƯU Ý: comment trong source có nhắc tới "fs / path / pg" (mô tả ràng buộc)
 * nên phải BỎ COMMENT trước khi quét, nếu không sẽ báo động giả.
 *
 * Được phép: 'node:crypto' (ai-core dùng cho sha1 của noteCacheKey).
 * Lưu ý: text-utils.ts được yêu cầu pure — nếu sau này cần crypto thì tách
 * sang ai-core.ts chứ không thêm vào text-utils (xem docblock của 2 file đó).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readSrc = (rel: string) => readFileSync(path.join(ROOT, rel), 'utf8');

/** Bỏ block comment và line comment, giữ nguyên string literal. */
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    // `//` không đứng sau `:` để không cắt nhầm URL (https://...)
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

/** Bóc mọi module specifier mà file đang phụ thuộc. */
function collectModuleSpecifiers(src: string): string[] {
  const code = stripComments(src);
  const specs: string[] = [];
  const push = (m: RegExpExecArray | null) => {
    if (m && m[1]) specs.push(m[1]);
  };
  const patterns = [
    // import x from 'y' | import { a } from "y" | export * from 'y' | export {} from 'y'
    /(?:^|\n)\s*(?:import|export)\s[\s\S]{0,400}?\bfrom\s*['"]([^'"]+)['"]/g,
    // import 'y' (side-effect, không from)
    /(?:^|\n)\s*import\s*['"]([^'"]+)['"]/g,
    // require('y')
    /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    // await import('y') / import('y')
    /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(code)) !== null) push(m);
  }
  return [...new Set(specs)];
}

/**
 * Deny-list node-only. Dùng ^$ neo chặt để 'pg' không khớp nhầm package khác,
 * nhưng vẫn bắt được biến thể: fs, node:fs, node:fs/promises, node:path/posix...
 */
const FORBIDDEN: RegExp[] = [
  /^(?:node:)?fs(?:\/.*)?$/,
  /^(?:node:)?path(?:\/.*)?$/,
  /^(?:node:)?os(?:\/.*)?$/,
  /^(?:node:)?net(?:\/.*)?$/,
  /^(?:node:)?http2?$/,
  /^(?:node:)?https?$/,
  /^(?:node:)?url$/,
  /^(?:node:)?child_process$/,
  /^(?:node:)?zlib$/,
  /^(?:node:)?stream(?:\/.*)?$/,
  /^(?:node:)?worker_threads$/,
  /^(?:node:)?fs\/promises$/,
  /pg(?:\/.*)?$/,
  /^(?:node:)?fetch$/,
  /undici(?:.*)?$/,
];

/** Các module ĐƯỢC PHÉP import trong 2 file này. */
const ALLOWED = new Set(['node:crypto']);

function assertNoNodeOnlyImports(rel: string) {
  const specs = collectModuleSpecifiers(readSrc(rel));
  const banned = specs.filter((s) => FORBIDDEN.some((re) => re.test(s)));
  assert.deepEqual(
    banned,
    [],
    `${rel} KHÔNG được import module node-only (${banned.join(', ')}). ` +
      `Dùng tới: ${specs.length ? specs.join(', ') : '(không có import nào)'}`
  );
  // node:crypto là ngoại lệ HỢP LỆ theo docblock
  for (const s of specs) {
    if (ALLOWED.has(s)) continue;
    assert.ok(
      !FORBIDDEN.some((re) => re.test(s)),
      `${rel}: module không xác định "${s}" cần được review thủ công`
    );
  }
  return specs;
}

// ---------------------------------------------------------------------------
// src/lib/ai-core.ts — chỉ server dùng (noteCacheKey cần node:crypto)
// ---------------------------------------------------------------------------

test('arch-guard: ai-core.ts không import module node-only (fs/path/pg/fetch/undici)', () => {
  assertNoNodeOnlyImports('src/lib/ai-core.ts');
});

test('arch-guard: ai-core.ts import node:crypto hợp lệ (không bị chặn nhầm)', () => {
  const specs = collectModuleSpecifiers(readSrc('src/lib/ai-core.ts'));
  assert.ok(specs.includes('node:crypto'), `phải thấy node:crypto, thấy: ${specs.join(', ') || 'rỗng'}`);
  assert.ok(
    !FORBIDDEN.some((re) => re.test('node:crypto')),
    'node:crypto KHÔNG được nằm trong deny-list'
  );
});

test('arch-guard: hàm bóc specifier không bỏ sót require/import động', () => {
  const specs = collectModuleSpecifiers(
    [
      "import fs from 'node:fs';",
      'const p = require("pg");',
      'const { q } = await import("undici");',
      "import 'node:path';",
      "export { x } from './local';",
      "// import giả trong comment: 'node:crypto'",
      "/* import giả trong block comment: 'pg' */",
      "const url = 'https://loigiaihay.com'; // giữ nguyên dòng này",
    ].join('\n')
  );
  assert.ok(specs.includes('node:fs'), 'phải bắt import tĩnh');
  assert.ok(specs.includes('pg'), 'phải bắt require()');
  assert.ok(specs.includes('undici'), 'phải bắt import() động');
  assert.ok(specs.includes('node:path'), 'phải bắt import side-effect');
  assert.ok(specs.includes('./local'), 'phải bắt re-export');
  assert.ok(!specs.includes('node:crypto'), 'comment phải bị bỏ, không được đọc thành import');
  // dòng chứa URL trong string KHÔNG được bị cắt cụt bởi bước bỏ line comment
  assert.ok(stripComments("const u = 'https://loigiaihay.com'; // tail").includes("'https://loigiaihay.com'"));
  assert.equal(stripComments("const u = 'https://x/y'; // tail").trim().endsWith('// tail'), false);
});

test('arch-guard: comment trong source không được báo động giả', () => {
  // Docblock của ai-core.ts/text-utils.ts nhắc "fs / path / pg" -> sau khi bỏ
  // comment thì phải sạch, nếu không guard sẽ fail vô lý.
  const specs = collectModuleSpecifiers(readSrc('src/lib/ai-core.ts'));
  assert.ok(!specs.includes('pg'), 'docblock nhắc pg nhưng KHÔNG phải import');
});

// ---------------------------------------------------------------------------
// src/lib/text-utils.ts — PURE, dùng được cho client
// ---------------------------------------------------------------------------

test('arch-guard: text-utils.ts không import module node-only (fs/path/pg/fetch/undici)', () => {
  assertNoNodeOnlyImports('src/lib/text-utils.ts');
});

test('arch-guard: text-utils.ts PURE — không có import node nào, kể cả node:crypto', () => {
  const specs = collectModuleSpecifiers(readSrc('src/lib/text-utils.ts'));
  assert.deepEqual(
    specs.filter((s) => s.startsWith('node:')),
    [],
    `text-utils.ts phải pure, không được import node:*, thấy: ${specs.join(', ')}`
  );
});

test('arch-guard: cả 2 file đều tồn tại và đọc được', () => {
  for (const rel of ['src/lib/ai-core.ts', 'src/lib/text-utils.ts']) {
    const src = readSrc(rel);
    assert.ok(src.length > 0, `${rel} rỗng?`);
    assert.ok(src.includes('export '), `${rel} phải có export`);
  }
});
