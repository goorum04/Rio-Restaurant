// Server-only access to this app's Cloudflare bindings. Each is present ONLY if
// opted into via app.manifest.json (D1 `DB`, R2 `STORAGE`, KV `KV`, and the
// container `CONTAINER`) — so the accessors are optional; guard before use.
//
// `cloudflare:workers` is the Workers-runtime module that exposes the Worker
// env (bindings). It only exists on the workerd runtime, and this app also
// deploys to Node hosts (Vercel), so it is loaded lazily: on Cloudflare the
// dynamic import resolves and returns the bindings; anywhere else it throws
// and we fall back to an empty env (callers already guard each binding).
// Import the binding types directly — NOT via the global tsconfig `types` list,
// which would clobber the DOM globals the client/SSR React code relies on.
import type {
  D1Database,
  DurableObjectNamespace,
  KVNamespace,
  R2Bucket,
} from "@cloudflare/workers-types";

type AppEnv = {
  DB?: D1Database;
  STORAGE?: R2Bucket;
  KV?: KVNamespace;
  // The container's Durable Object — present only when "container" is set in
  // the manifest. Reach an instance with env.CONTAINER.getByName(id), then
  // .fetch(). See skills/containers.md.
  CONTAINER?: DurableObjectNamespace;
  HF_ENV?: string;
  APP_SLUG?: string;
};

let cached: AppEnv | undefined;

export async function bindings(): Promise<AppEnv> {
  if (cached) return cached;
  try {
    const mod = await import(/* @vite-ignore */ "cloudflare:workers");
    cached = mod.env as unknown as AppEnv;
  } catch {
    cached = {};
  }
  return cached;
}
