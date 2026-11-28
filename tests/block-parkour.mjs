import assert from 'node:assert/strict';
import {createGame,step,jump,respawn} from '../dist/games/block-parkour/engine.js';
const game=createGame();assert(jump(game));assert.equal(jump(game),false,'no double jump');
// Walk each jump toward the next platform; this verifies the whole route is physically reachable.
for(let target=1;target<game.platforms.length;target++){
 if(target>1)assert(jump(game),`jump ${target}`);
 for(let frame=0;frame<110&&!game.player.grounded;frame++){
  const p=game.player,t=game.platforms[target],dx=t.x-p.x,dz=t.z-p.z,d=Math.hypot(dx,dz),scale=d?Math.min(1,d/(5.4*.016))/d:0;
  step(game,dx*scale,dz*scale,.016);
 }
 assert.equal(game.player.support,target,`can land on platform ${target}`);
}
assert(game.won,'finishing the course wins');
const sneaking=createGame();for(let i=0;i<500;i++)step(sneaking,1,0,.016,true);assert(sneaking.player.grounded,'sneaking stops at edge');assert(sneaking.player.x<3,'feet remain on block');
for(let i=0;i<400;i++)step(sneaking,1,0,.016,false);assert(sneaking.deaths>0,'walking off causes fall and respawn');
sneaking.checkpoint=6;respawn(sneaking);assert.equal(sneaking.player.support,6,'respawns at checkpoint');
console.log('Block parkour: complete route, jumping, sneaking, falls, and checkpoints pass');
// A slightly late press after leaving an edge still jumps; an early press lands and jumps.
const late=createGame();while(late.player.grounded)step(late,1,0,.016);assert(jump(late),'late edge jump is accepted');assert(late.player.vy>0);
const early=createGame();jump(early);while(early.player.vy>0||early.player.y>.65)step(early,0,0,.016);assert.equal(jump(early),false,'in-air jump is queued');for(let i=0;i<20&&early.player.vy<=0;i++)step(early,0,0,.016);assert(early.player.vy>0&&!early.player.grounded,'early press triggers on landing');
const stale=createGame();jump(stale);step(stale,0,0,.016);jump(stale);for(let i=0;i<100&&!stale.player.grounded;i++)step(stale,0,0,.016);assert(stale.player.grounded,'old jump presses expire rather than triggering unexpectedly');
const cleared=createGame();jump(cleared);jump(cleared);respawn(cleared);step(cleared,0,0,.016);assert(cleared.player.grounded,'respawning clears pending jumps');
console.log('Edge forgiveness and jump buffering verified');
// A fast diagonal frame must test the instant of crossing, not only the frame's endpoint.
const edge=createGame();edge.platforms=[{id:0,x:-.15,baseX:-.15,y:0,z:0,w:.1}];Object.assign(edge.player,{x:0,y:.02,z:0,vy:-2,grounded:false,support:null});step(edge,1,0,.04);assert(edge.player.grounded,'lands on a narrow edge crossed within a frame');assert.equal(edge.player.support,0);
const miss=createGame();miss.platforms=[{id:0,x:-.6,baseX:-.6,y:0,z:0,w:.1}];Object.assign(miss.player,{x:0,y:.02,z:0,vy:-2,grounded:false,support:null});step(miss,1,0,.04);assert(!miss.player.grounded,'a real miss does not land');
console.log('Swept edge landing and true misses verified');
