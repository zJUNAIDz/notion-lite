/*
Self-hosted Yjs (CRDT) collaboration server, running on a Cloudflare Worker
backed by a Durable Object.

Each document is a single Durable Object instance: it is the one authoritative,
in-memory copy of the live Yjs document. Editors connect over a websocket and
Yjs merges concurrent edits as CRDTs, so no change is ever lost and everyone
converges to the same content. The Durable Object persists the document to its
own storage, so it survives restarts and hibernation — replacing the old
LevelDB-on-disk persistence.

The heavy lifting (websocket handling, awareness, Yjs sync protocol, storage)
lives in the `y-durableobjects` library, which speaks the same protocol as the
`y-websocket` client the editor already uses. The websocket endpoint is mounted
at the root, so clients connect to wss://<host>/<documentId> — the same URL
scheme as the previous Node server, just a different host.
*/
import { Hono } from "hono";
import { YDurableObjects, yRoute } from "y-durableobjects";

type Bindings = {
  Y_DURABLE_OBJECTS: DurableObjectNamespace;
};

type Env = {
  Bindings: Bindings;
};

const app = new Hono<Env>();

// yRoute registers the websocket upgrade at "/:id"; mounting it at "/" makes the
// document id the first path segment, e.g. wss://<host>/<documentId>.
app.route(
  "/",
  yRoute<Env>((env) => env.Y_DURABLE_OBJECTS),
);

export default app;

// Cloudflare needs the Durable Object class exported from the entry module to
// bind it (see wrangler.jsonc).
export { YDurableObjects };
