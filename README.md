# meadowridgey

A small home for classmates' game ideas. The site is a static page in `dist/index.html`; add games when their ideas are ready.

To publish with Cloudflare Workers, connect this repository to a Worker named `meadowridgey` and deploy with `npx wrangler deploy`. The configured asset directory is `dist`.

Classroom Chase supports solo play or up to eight players sharing a room code. Its `/api/classroom/` WebSocket endpoint uses the `CLASSROOMS` Durable Object declared in `wrangler.toml`; this binding is required for multiplayer. Players use arrow keys or WASD to move, drag the game view (or use Q/E to turn and R/F to look up and down), and press Space to jump. Touch controls provide the same actions.

Bean Rails is a 2D co-op train-survival game for up to eight players. `/api/bean/` uses the `BEAN_ARENAS` Durable Object; each room shares a moving train, fuel, zombies, the final boss, players, and projectiles; each player earns their own weapon upgrades. Move with WASD or arrows, hold Space to auto-aim, or aim and fire with the mouse; touch controls support movement and shooting.

Hide & Seek World is a first-person 3D game for 2–30 players. Create a room and share its code, or join with the same code; each round randomly selects one seeker, gives hiders a 30-second head start, and runs a five-minute chase where touching a hider swaps roles. `/api/hide/` uses the `HIDE_ROOMS` Durable Object. Room codes stay visible while connected and can be hidden or shown with the button in each multiplayer game.

Space Crew is a 2D social-deduction game for 3–10 players. Each room uses `SPACE_ROOMS`; the server privately assigns one impostor, tracks tasks and nearby actions, and runs meetings and votes. Players discuss outside the game.

Evolution Island is a shared 2D evolution game for up to eight players. Create a room in Friendly mode (no eating other players) or Normal mode (larger players eat smaller players on contact), then share the room code. Six computer-controlled creatures roam, gather food and evolve in each room; in Normal mode they also avoid larger creatures and pursue smaller ones. Eat food to progress through 50 creature stages to T. rex. The `/api/evolution/` WebSocket uses the `EVOLUTION_ROOMS` Durable Object. Move with WASD, arrow keys or touch controls. Players at the same evolution stage cannot eat each other; eaten players return after a short delay with brief protection.

In Normal mode, human players can use Ice Ice Ice (button or Space) to eliminate nearby creatures of any size. The cooldown is three minutes; protected and respawning players are safe. The skill is unavailable in Friendly mode.

Hide & Seek World houses have open doorways and interiors. Players can use the Climb button or C near a tree to climb and descend, and use Hide or H in the central pond or bushes to hide or come out. Hidden players are visible and taggable to seekers who enter the same hiding place; height is also checked for tree tags.

Hide & Seek World players can jump with the Jump button or Space. Jump height is synchronized by the room server so other players see it and tags account for vertical distance.

Each Hide & Seek World player receives a held totem at the start of each round. A hider’s first tag breaks it and grants a brief escape; later tags swap roles. The totem resets next round.

Team Battle is a first-person multiplayer arena for 2–10 players. Rooms randomly assign even red and blue teams, with one spectator when the number is odd; late joiners spectate until the next round. The first team to score 20 wins. Players respawn after three seconds, and buildings block movement and shots. Use WASD and drag to look, hold Space or Shoot, or use touch controls. `/api/battle/` uses the BATTLE_ROOMS Durable Object.

Team Battle also offers solo practice against a computer-controlled opponent. Choose Play solo, or use Play solo in a one-player lobby. Solo rounds use the same scoring, cover, respawn and victory rules as multiplayer.

Team Battle uses visible projectiles that travel through the arena; buildings stop them and scoring happens when they reach an opposing player.

The winter update adds snow and cold-weather scenery across all six games. Team Battle sends short-lived impact effects so bullets visibly reach walls or targets before disappearing.

Classroom Chase touch controls include a drag joystick for movement and dragging the scene to look around; jump and tricks remain separate buttons. Keyboard movement and view controls remain available.

All six games use a touch joystick on iPads and phones. Players can choose “Use buttons” for the original directional controls; the first-person games also allow dragging the view. Jumping and movement use independent touches in Classroom Chase and Hide & Seek World.

Hide & Seek World has a Play solo option with three computer players. You begin as a hider; the same totem and role-switch rules apply. If friends join during a solo round they spectate until the next round.
