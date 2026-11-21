# meadowridgey

A small home for classmates' game ideas. The site is a static page in `dist/index.html`; add games when their ideas are ready.

To publish with Cloudflare Workers, connect this repository to a Worker named `meadowridgey` and deploy with `npx wrangler deploy`. The configured asset directory is `dist`.

Classroom Chase supports solo play or up to eight players sharing a room code. Its `/api/classroom/` WebSocket endpoint uses the `CLASSROOMS` Durable Object declared in `wrangler.toml`; this binding is required for multiplayer. Players use arrow keys or WASD to move, drag the game view (or use Q/E to turn and R/F to look up and down), and press Space to jump. Touch controls provide the same actions.
