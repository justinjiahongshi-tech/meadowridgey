// Platform coordinates are the top surfaces. Later sections narrow and move.
export const COURSE=[
 {x:0,y:0,z:0,w:6,checkpoint:true},{x:0,y:0,z:-5,w:2.4},{x:2.7,y:.3,z:-8.1,w:2.2},{x:-.2,y:.6,z:-11.1,w:2.2},{x:-3.1,y:.6,z:-14.2,w:2.2,range:.5},{x:-.5,y:.9,z:-17.3,w:2.4},{x:2,y:1,z:-20.2,w:3,checkpoint:true},
 {x:4.7,y:1.4,z:-23.4,w:2},{x:1.8,y:1.2,z:-26.7,w:2.1,range:.5},{x:-1.2,y:1.6,z:-29.9,w:1.9},{x:-4,y:1.8,z:-33,w:2.1},{x:-1,y:1.9,z:-36.2,w:2},{x:1.5,y:2,z:-39.4,w:3,checkpoint:true},
 {x:4.3,y:2.3,z:-42.5,w:1.9,range:.45},{x:1.3,y:2.4,z:-45.8,w:2},{x:-1.6,y:2.6,z:-49,w:1.9},{x:-4.4,y:2.8,z:-52.2,w:2},{x:-1.5,y:2.8,z:-55.5,w:1.9,range:.45},{x:1.4,y:3,z:-58.8,w:3,checkpoint:true},
 {x:4.2,y:3.2,z:-62,w:1.8},{x:1.3,y:3.4,z:-65.3,w:1.8},{x:-1.5,y:3.4,z:-68.5,w:1.8,range:.4},{x:-4.2,y:3.5,z:-71.7,w:1.8},{x:-1.4,y:3.7,z:-75,w:1.8},{x:1.3,y:3.8,z:-78.2,w:3.6,finish:true}
];
const SPEED=5.4,GRAVITY=19,JUMP=7.8,FOOT_RADIUS=.18;
export function createGame(){return{platforms:COURSE.map((p,i)=>({...p,id:i,baseX:p.x})),player:{x:0,y:0,z:0,vy:0,grounded:true,support:0},checkpoint:0,deaths:0,time:0,won:false}}
export function jump(game){if(game.won||!game.player.grounded)return false;game.player.grounded=false;game.player.support=null;game.player.vy=JUMP;return true}
export function respawn(game){const p=game.player,platform=game.platforms[game.checkpoint];Object.assign(p,{x:platform.x,y:platform.y,z:platform.z,vy:0,grounded:true,support:platform.id})}
export function reset(game){const fresh=createGame();Object.assign(game,fresh)}
const inside=(x,z,p)=>Math.abs(x-p.x)<=p.w/2+FOOT_RADIUS&&Math.abs(z-p.z)<=(p.d??p.w)/2+FOOT_RADIUS;
export function step(game,dx,dz,dt,sneaking=false){if(game.won)return;dt=Math.max(0,Math.min(.04,dt));game.time+=dt;const p=game.player;for(const platform of game.platforms){const old=platform.x;platform.x=platform.baseX+(platform.range||0)*Math.sin(game.time*1.2+platform.id);if(p.grounded&&p.support===platform.id)p.x+=platform.x-old}const len=Math.hypot(dx,dz);if(len>1){dx/=len;dz/=len}const speed=sneaking?SPEED*.36:SPEED;let nextX=p.x+dx*speed*dt,nextZ=p.z+dz*speed*dt;
 // Sneaking on a block keeps the player's feet over its edges.
 if(sneaking&&p.grounded&&p.support!==null){const block=game.platforms[p.support],half=block.w/2-.08,depth=(block.d??block.w)/2-.08;nextX=Math.max(block.x-half,Math.min(block.x+half,nextX));nextZ=Math.max(block.z-depth,Math.min(block.z+depth,nextZ))}p.x=nextX;p.z=nextZ;
 if(p.grounded){const platform=game.platforms[p.support];if(platform&&inside(p.x,p.z,platform))p.y=platform.y;else{p.grounded=false;p.support=null;p.vy=0}}
 if(!p.grounded){const oldY=p.y;p.y+=p.vy*dt-GRAVITY*dt*dt/2;p.vy-=GRAVITY*dt;if(p.vy<=0){let landing=null;for(const platform of game.platforms)if(oldY>=platform.y&&p.y<=platform.y&&inside(p.x,p.z,platform)&&(!landing||platform.y>landing.y))landing=platform;if(landing){p.y=landing.y;p.vy=0;p.grounded=true;p.support=landing.id;if(landing.checkpoint&&landing.id>game.checkpoint)game.checkpoint=landing.id;if(landing.finish)game.won=true}}}
 if(p.y<-8){game.deaths++;respawn(game)}
}
