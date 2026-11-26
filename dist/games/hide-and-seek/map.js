export const MAP_LIMIT=75;
export const obstacles=[];
for(const x of [-54,-27,0,27,54])for(const z of [-54,-27,0,27,54]){
 if(x===0&&z===0)continue;
 obstacles.push({x,z,w:9,d:9,kind:'house',color:['#f3b1a9','#d3b7ef','#a4d9cf','#f7cf88'][((x+54)/27+(z+54)/27)%4]});
 const tx=x+11,tz=z+11;if(Math.abs(tx)<70&&Math.abs(tz)<70)obstacles.push({x:tx,z:tz,w:3,d:3,kind:'tree'});
}
// The pond and shrubs share their positions with the server, so hiding is fair in multiplayer.
export const hidingSpots=[{id:'pond',kind:'pond',x:9,z:0,r:3.5},{id:'bush',kind:'bush',x:-9,z:0,r:2.5}];
export const nearestHidingSpot=(x,z)=>hidingSpots.find(s=>Math.hypot(x-s.x,z-s.z)<s.r)||null;
export function clearPosition(x,z,padding=.7){
 if(Math.abs(x)>MAP_LIMIT-.8||Math.abs(z)>MAP_LIMIT-.8)return false;
 const hit=(cx,cz,w,d)=>Math.abs(x-cx)<w/2+padding&&Math.abs(z-cz)<d/2+padding;
 for(const o of obstacles){if(o.kind==='tree'){if(hit(o.x,o.z,o.w,o.d))return false;continue}
  // Four thin walls with a wide opening in the front wall.
  if(hit(o.x-4.5,o.z,.35,9)||hit(o.x+4.5,o.z,.35,9)||hit(o.x,o.z-4.5,9,.35)||hit(o.x-3.15,o.z+4.5,2.7,.35)||hit(o.x+3.15,o.z+4.5,2.7,.35))return false;
 }
 return true;
}
