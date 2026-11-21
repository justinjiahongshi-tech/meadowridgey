# meadowridgey

A small home for classmates' game ideas. The site is a static page in `dist/index.html`; add games when their ideas are ready.

To publish with Cloudflare Workers, connect this repository to a Worker named `meadowridgey` and deploy with `npx wrangler deploy`. The configured asset directory is `dist`.

Classroom Chase supports solo play or up to eight players sharing a room code. Its `/api/classroom/` WebSocket endpoint uses the `CLASSROOMS` Durable Object declared in `wrangler.toml`; this binding is required for multiplayer. Players use arrow keys or WASD to move, drag the game view (or use Q/E to turn and R/F to look up and down), and press Space to jump. Touch controls provide the same actions.

Bean Rails is a 2D co-op train-survival game for up to eight players. `/api/bean/` uses the `BEAN_ARENAS` Durable Object; each room shares a moving train, fuel, zombies, the final boss, players, and projectiles; each player earns their own weapon upgrades. Move with WASD or arrows, hold Space to auto-aim, or aim and fire with the mouse; touch controls support movement and shooting.

Hide & Seek World is a first-person 3D game for 2–30 players. Create a room and share its code, or join with the same code; each round randomly selects one seeker, gives hiders a 30-second head start, and runs a five-minute chase where touching a hider swaps roles. `/api/hide/` uses the `HIDE_ROOMS` Durable Object. Room codes stay visible while connected and can be hidden or shown with the button in each multiplayer game.
