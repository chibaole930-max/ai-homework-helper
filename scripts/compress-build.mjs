// Precompress toàn bộ static assets (dist/assets) bằng brotli (q11) + gzip (level 9)
// để Render phục vụ trực tiếp file .br/.gz — không tốn CPU nén mỗi request,
// giảm bandwidth tối đa cho free plan 5GB/tháng.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import zlib from "node:zlib";

const dir = join(process.cwd(), "dist", "assets");
const COMPRESSIBLE = /\.(js|css|svg|json|wasm|ttf|woff|txt)$/i;
const MIN_SIZE = 1400; // lớn hơn ngưỡng này mới nén (nén file nhỏ thường phản tác dụng)
const BROTLI_QUALITY = 11;
const GZIP_LEVEL = 9;

if (statSync(dir, { throwIfNoEntry: false })) {
  let count = 0;
  for (const name of readdirSync(dir)) {
    if (!COMPRESSIBLE.test(name) || name.endsWith(".br") || name.endsWith(".gz")) continue;
    const file = join(dir, name);
    const buf = readFileSync(file);
    if (buf.length < MIN_SIZE) continue;

    const br = zlib.brotliCompressSync(buf, {
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: BROTLI_QUALITY },
    });
    if (br.length < buf.length) {
      writeFileSync(file + ".br", br);
      count++;
    }

    const gz = zlib.gzipSync(buf, { level: GZIP_LEVEL });
    if (gz.length < buf.length) {
      writeFileSync(file + ".gz", gz);
    }
  }
  console.log(`Precompressed ${count} assets into .br/.gz in dist/assets`);
} else {
  console.log("dist/assets không tồn tại, bỏ qua precompress.");
}