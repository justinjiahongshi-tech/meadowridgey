// One finger changes the view independently of the movement joystick.
export function bindViewDrag(canvas,canDrag,onDelta,win=window,doc=document){
 let point=null;
 function start(id,x,y){if(!canDrag()||point)return false;point={id,x,y};return true}
 function move(x,y){const dx=x-point.x,dy=y-point.y;point.x=x;point.y=y;onDelta(dx,dy)}
 function stop(){point=null}
 if('PointerEvent' in win){canvas.addEventListener('pointerdown',e=>{if(!start(e.pointerId,e.clientX,e.clientY))return;if(e.cancelable)e.preventDefault();try{canvas.setPointerCapture(e.pointerId)}catch{}});win.addEventListener('pointermove',e=>{if(point?.id===e.pointerId)move(e.clientX,e.clientY)},true);for(const type of ['pointerup','pointercancel'])win.addEventListener(type,e=>{if(point?.id===e.pointerId)stop()},true);canvas.addEventListener('lostpointercapture',e=>{if(point?.id===e.pointerId)stop()})}
 else{canvas.addEventListener('touchstart',e=>{const t=e.changedTouches[0];if(!t||!start(t.identifier,t.clientX,t.clientY))return;e.preventDefault()},{passive:false});win.addEventListener('touchmove',e=>{if(!point)return;const t=[...e.changedTouches].find(t=>t.identifier===point.id);if(!t)return;if(e.cancelable)e.preventDefault();move(t.clientX,t.clientY)},{passive:false,capture:true});for(const type of ['touchend','touchcancel'])win.addEventListener(type,e=>{if(point&&[...e.changedTouches].some(t=>t.identifier===point.id))stop()},true)}
 win.addEventListener('blur',stop);win.addEventListener('pagehide',stop);doc.addEventListener('visibilitychange',()=>{if(doc.hidden)stop()});return stop;
}
