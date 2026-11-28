// A mouse click captures the pointer; movement then turns the view without dragging.
export function installMouseLook(canvas, canLook, onMove, doc=document){
 function down(event){
  if(event.pointerType!=='mouse'||event.button!==0||!canLook()||doc.pointerLockElement===canvas||!canvas.requestPointerLock)return;
  try{const request=canvas.requestPointerLock();if(request?.catch)request.catch(()=>{});}catch{}
 }
 function move(event){if(doc.pointerLockElement===canvas&&canLook())onMove(event.movementX||0,event.movementY||0)}
 canvas.addEventListener('pointerdown',down);
 doc.addEventListener('mousemove',move);
 return ()=>{if(doc.pointerLockElement===canvas&&doc.exitPointerLock)doc.exitPointerLock()};
}
