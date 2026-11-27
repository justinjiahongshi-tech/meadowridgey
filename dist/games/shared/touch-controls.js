import {bindJoystick} from '../classroom-chase/joystick.js?v=1';
export function setupTouchControls(onMove,onSwitch=()=>{},doc=document,win=window){
 const area=doc.querySelector('#touch-joystick'),knob=doc.querySelector('#touch-joystick-knob'),toggle=doc.querySelector('#touch-control-mode');
 const stop=bindJoystick(area,knob,onMove,win,doc);
 toggle.addEventListener('click',()=>{stop();onSwitch();const buttons=toggle.parentElement.classList.toggle('button-mode');toggle.textContent=buttons?'Use joystick':'Use buttons';toggle.setAttribute('aria-pressed',String(buttons))});
 return stop;
}
// Trigger jump on the second finger's press, not on a delayed synthetic click.
export function bindInstantAction(button,action,win=window){
 function run(e){if(button.disabled)return;if(e.cancelable)e.preventDefault();action()}
 if('PointerEvent' in win)button.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;run(e)});
 else{button.addEventListener('touchstart',run,{passive:false});button.addEventListener('mousedown',e=>{if(e.button===0)run(e)})}
 button.addEventListener('click',e=>{if(e.detail===0&&!button.disabled)action()});
}
