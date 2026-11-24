export function installFullscreen(root,button,doc=document){
 let fallback=false;
 const fullscreenElement=()=>doc.fullscreenElement||doc.webkitFullscreenElement;
 function update(){const active=fallback||fullscreenElement()===root;root.classList.toggle('is-fullscreen',active);button.textContent=active?'Exit fullscreen':'Fullscreen';button.setAttribute('aria-label',active?'Exit fullscreen':'Enter fullscreen');button.setAttribute('aria-pressed',String(active))}
 async function toggle(){
  if(fallback){fallback=false;update();return}
  if(fullscreenElement()===root){try{const exit=doc.exitFullscreen||doc.webkitExitFullscreen;if(exit)await exit.call(doc)}catch{}update();return}
  const request=root.requestFullscreen||root.webkitRequestFullscreen;
  if(request){try{await request.call(root);update();return}catch{}}
  fallback=true;update();
 }
 button.addEventListener('click',toggle);
 for(const event of ['fullscreenchange','webkitfullscreenchange'])doc.addEventListener(event,()=>{if(!fullscreenElement())fallback=false;update()});
 doc.addEventListener('keydown',event=>{if(event.key==='Escape'&&fallback){fallback=false;update()}});
 update();
}
