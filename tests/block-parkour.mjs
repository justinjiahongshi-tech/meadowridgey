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
