# Collaboration server

A tiny [Yjs](https://yjs.dev) collaboration backend running on a **Cloudflare
Worker + Durable Object**. It powers real-time collaboration in the editor:
edits are merged as CRDTs (no edit is ever lost) and persisted in the Durable
Object's own storage, so documents survive restarts.

Each document is its own Durable Object instance — a single authoritative copy
of the live document that every editor connects to over a websocket. The Yjs
plumbing comes from [`y-durableobjects`](https://github.com/napolab/y-durableobjects),
which speaks the same protocol as the `y-websocket` client the editor uses.

## Develop locally

```bash
cd collaboration-server
npm install        # or: bun install
npm run dev        # wrangler dev
```

`wrangler dev` serves the worker at `http://localhost:8787`, with the websocket
endpoint at `ws://localhost:8787/<documentId>`.

## Deploy

```bash
npx wrangler login   # one-time, links your Cloudflare account
npm run deploy       # wrangler deploy
```

Wrangler prints the deployed URL (e.g. `https://notion-lite-collab.<subdomain>.workers.dev`).
SQLite-backed Durable Objects are available on the **free** Workers plan.

## Point the web app at it

The editor connects to `<NEXT_PUBLIC_COLLAB_WS_URL>/<documentId>`. Set the base
URL (no trailing slash, no document id) in the app's environment:

```bash
# local
NEXT_PUBLIC_COLLAB_WS_URL="ws://localhost:8787"
# deployed
NEXT_PUBLIC_COLLAB_WS_URL="wss://notion-lite-collab.<subdomain>.workers.dev"
```

## Configuration

Edit [`wrangler.jsonc`](wrangler.jsonc) — `name` sets the worker/subdomain name,
and the `durable_objects` binding / `migrations` define the document store.
