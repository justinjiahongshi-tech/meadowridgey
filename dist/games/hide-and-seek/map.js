export const MAP_LIMIT=75;
export const obstacles=[];
for(const x of [-54,-27,0,27,54])for(const z of [-54,-27,0,27,54]){
 if(x===0&&z===0)continue;
 obstacles.push({x,z,w:9,d:9,kind:'house',color:['#f3b1a9','#d3b7ef','#a4d9cf','#f7cf88'][((x+54)/27+(z+54)/27)%4]});
 const tx=x+11,tz=z+11;if(Math.abs(tx)<70&&Math.abs(tz)<70)obstacles.push({x:tx,z:tz,w:3,d:3,kind:'tree'});
}
export function clearPosition(x,z,padding=.7){return Math.abs(x)<=MAP_LIMIT-.8&&Math.abs(z)<=MAP_LIMIT-.8&&!obstacles.some(o=>Math.abs(x-o.x)<o.w/2+padding&&Math.abs(z-o.z)<o.d/2+padding)}
