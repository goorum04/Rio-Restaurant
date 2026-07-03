/**
 * Packages the vite build (dist/client + dist/server) as a Vercel Build
 * Output API v3 directory at the REPO ROOT (.vercel/output):
 *
 *   static/           <- dist/client (hashed assets + public files)
 *   functions/__ssr.func/  <- dist/server + a Node (req,res) adapter
 *   config.json       <- serve static first, everything else hits SSR
 *
 * Run after `vite build`. Vercel picks .vercel/output up automatically when
 * the build command produces it.
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(appDir, "..", "..");
const out = resolve(repoRoot, ".vercel", "output");
const fn = resolve(out, "functions", "__ssr.func");

rmSync(out, { recursive: true, force: true });
mkdirSync(fn, { recursive: true });

// Static assets, served straight from the CDN.
cpSync(resolve(appDir, "dist", "client"), resolve(out, "static"), {
  recursive: true,
});

// SSR function: the whole self-contained server bundle plus the adapter.
cpSync(resolve(appDir, "dist", "server"), fn, { recursive: true });

// server.js and its assets/*.js chunks are ESM. Without this marker the
// lambda runtime loads .js as CommonJS and the import crashes at cold start
// (locally Node 22's module-syntax detection hides the problem).
writeFileSync(resolve(fn, "package.json"), JSON.stringify({ type: "module" }));

writeFileSync(
  resolve(fn, "index.mjs"),
  `import { Readable } from "node:stream";
import server from "./server.js";

function toRequest(req) {
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const url = new URL(req.url, \`\${proto}://\${host}\`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    for (const v of Array.isArray(value) ? value : [value]) headers.append(key, v);
  }
  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : Readable.toWeb(req);
  return new Request(url, {
    method: req.method,
    headers,
    body,
    duplex: body ? "half" : undefined,
    redirect: "manual",
  });
}

export default async function handler(req, res) {
  try {
    const response = await server.fetch(toRequest(req), process.env, {
      waitUntil() {},
      passThroughOnException() {},
    });
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "content-encoding") return;
      res.setHeader(key, value);
    });
    if (response.body) {
      Readable.fromWeb(response.body).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
`,
);

writeFileSync(
  resolve(fn, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
    },
    null,
    2,
  ),
);

writeFileSync(
  resolve(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "/(assets|photos)/(.*)",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/__ssr" },
      ],
    },
    null,
    2,
  ),
);

console.log(`Vercel build output written to ${out}`);
