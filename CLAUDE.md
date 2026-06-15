@AGENTS.md

## Codebase map
Read `.claude/CODEBASE_MAP.md` first — it covers stack, routes, commands, and
gotchas so you don't have to re-explore.

## Hard rules
- **Next.js 16 / React 19 are not what you may know.** Per AGENTS.md, read the
  relevant guide in `node_modules/next/dist/docs/` before writing Next.js code;
  heed deprecation notices.
- **Lint/format with Biome** (`bun run lint`, `bun run format`) — not ESLint.
- **Do not edit `src/components/garbage/`** — it's dead code (see map). Don't add to it.
- **Navigation is duplicated** — check the map's gotchas to edit the correct
  Header/navbar for the page you're touching.
