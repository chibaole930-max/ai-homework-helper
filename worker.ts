import { httpServerHandler } from "cloudflare:node";
import { buildApp } from "./server";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  HYPERDRIVE?: { connectionString: string };
  [key: string]: unknown;
}

let handlerPromise: Promise<any> | null = null;

async function getExpressHandler(env: Env): Promise<any> {
  if (!handlerPromise) {
    handlerPromise = (async () => {
      const app = await buildApp({
        serveStatic: false,
        databaseUrl: env.HYPERDRIVE?.connectionString,
      });
      return httpServerHandler(app.listen(8080));
    })();
  }
  return handlerPromise;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // API → chạy Express ngay trên cùng origin (không gọi backend ngoài)
    if (url.pathname.startsWith("/api/")) {
      const handler = await getExpressHandler(env);
      const fn = typeof handler === "function" ? handler : handler.fetch;
      if (!fn) throw new Error("httpServerHandler returned invalid handler");
      return await fn.call(handler, request, env, ctx);
    }

    // SPA: tĩnh từ assets; fallback về index.html cho client-side routing
    const res = await env.ASSETS.fetch(request);
    if (res.status === 404) {
      const htmlReq = new Request(new URL("/index.html", request.url), request);
      return env.ASSETS.fetch(htmlReq);
    }
    return res;
  },
};