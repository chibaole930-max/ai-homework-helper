// Build Cloudflare Pages Advanced Mode worker: dist/_worker.js
import { build } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

await build({
  entryPoints: [path.join(root, "worker.ts")],
  outfile: path.join(root, "dist", "_worker.js"),
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "es2022",
  sourcemap: true,
  external: ["cloudflare:node"],
  logLevel: "info",
});

console.log("Built dist/_worker.js (Pages Advanced Mode)");

// package.json gốc có "type":"module" nên Pages tưởng _worker.js là ESM.
// Đặt type=commonjs trong dist để Pages nạp _worker.js (CJS) đúng cách.
import { writeFileSync } from "node:fs";
writeFileSync(
  path.join(root, "dist", "package.json"),
  JSON.stringify({ type: "commonjs", private: true }, null, 2)
);
console.log("Wrote dist/package.json {type: commonjs}");