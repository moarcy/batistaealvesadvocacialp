# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Single full-stack app (not a monorepo): "Batista & Alves Advocacia", a Portuguese law-firm
marketing site plus a password-protected first-party analytics dashboard. Frontend is
React + Vite (`client/`), backend is Express + Drizzle (`server/`, `shared/`). Standard
commands live in `package.json` `scripts` and `README.md`; prefer those over duplicating here.

### Running (dev)
- Full stack (client + API on one port): `npm run dev` → Express serves Vite in middleware
  mode on port `5000` (http://localhost:5000). This is what you want for testing the
  dashboard/analytics API.
- Frontend only: `npm run dev:client` (Vite on port 5000; API calls fail gracefully). This is
  the flow the README/Replit use.
- Both serve on port `5000` — do not run them at the same time.

### Storage / DATABASE_URL (important, non-obvious)
- The app runs with **zero config**: when `DATABASE_URL` is unset it falls back to in-memory
  storage (`MemStorage`) and in-memory sessions (`memorystore`). Login, event tracking, and the
  metrics dashboard all work fully in this mode — data is just not persisted across restarts.
- The `ERRO CRITICO: DATABASE_URL não encontrada` line logged at startup is **harmless** in this
  mode (it is a `console.error` in `server/db.ts`, not a crash).
- Do NOT point `DATABASE_URL` at a plain local Postgres: the runtime uses
  `@neondatabase/serverless`, which talks over WebSocket and only works against a real Neon
  endpoint (or a Neon `wsproxy`), not vanilla Postgres over TCP. Setting it to local Postgres
  breaks all DB queries at runtime. `drizzle-kit push` (`npm run db:push`) does work against any
  Postgres because it uses the `pg` driver, but that alone does not make the app runtime usable.
- Extra DB gotcha: `connect-pg-simple` is configured with `createTableIfMissing: false` and a
  `sessions` table that is **not** in `shared/schema.ts`, so DB-backed mode also needs that table
  created manually. In-memory mode avoids this entirely.

### Dashboard login
- URL `/dashboard`. Credentials are hardcoded in `server/routes.ts`:
  username `batistaealvesadvocacia`, password `Admin123!`.

### Typecheck / build caveats
- `npm run check` (tsc) currently fails with 2 pre-existing type errors in `server/storage.ts`
  (`MemStorage` assigns numeric ids where the schema type is `string`). This does not affect the
  `tsx`/Vite runtime; `npm run dev` and `npm run build` succeed regardless.
- `npm run build` (Vite client → `dist/public` + esbuild server → `dist/index.cjs`) works;
  `npm start` runs the production bundle. `dist/` is gitignored.
