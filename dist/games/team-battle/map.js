export const LIMIT_X=54,LIMIT_Z=38;
export const buildings=[{x:-26,z:-21,w:9,d:10,h:8},{x:-26,z:20,w:9,d:10,h:8},{x:26,z:-21,w:9,d:10,h:8},{x:26,z:20,w:9,d:10,h:8},{x:-12,z:-12,w:8,d:7,h:6},{x:12,z:12,w:8,d:7,h:6},{x:0,z:-27,w:10,d:6,h:7},{x:0,z:27,w:10,d:6,h:7},{x:0,z:0,w:7,d:9,h:7},{x:-20,z:4,w:5,d:6,h:4},{x:20,z:-4,w:5,d:6,h:4}];
export function free(x,z,pad=.7){return Math.abs(x)<LIMIT_X-1&&Math.abs(z)<LIMIT_Z-1&&!buildings.some(o=>Math.abs(x-o.x)<o.w/2+pad&&Math.abs(z-o.z)<o.d/2+pad)}
export function clearShot(x,z,dx,dz,distance){for(let t=.25;t<distance;t+=.3)if(!free(x+dx*t,z+dz*t,0))return false;return true}
