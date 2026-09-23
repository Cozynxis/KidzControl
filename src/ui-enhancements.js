window.KidzUI={
 init(){this.clock();setInterval(()=>this.clock(),30000);addEventListener("online",()=>this.network(true));addEventListener("offline",()=>this.network(false));this.network(navigator.onLine)},
 clock(){const x=document.getElementById("liveClock");if(x)x.textContent=new Date().toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"})},
 network(ok){document.body.classList.toggle("offline",!ok);const x=document.getElementById("syncPill");if(x){x.classList.toggle("offline-pill",!ok);if(!ok)x.innerHTML='<span class="dot"></span>Offline'}},
 confirm(title,text,yes="Doorgaan"){return new Promise(resolve=>{const host=document.getElementById("modalHost");host.innerHTML='<div class="modal-back"><div class="modal"><h3>'+esc(title)+'</h3><p class="muted">'+esc(text)+'</p><div class="modal-actions"><button class="ghost" id="modalNo">Annuleren</button><button class="primary" id="modalYes">'+esc(yes)+'</button></div></div></div>';modalNo.onclick=()=>{host.innerHTML="";resolve(false)};modalYes.onclick=()=>{host.innerHTML="";resolve(true)}})},
 skeleton(){return '<div class="skeleton-grid">'+Array.from({length:4},()=>'<div class="skeleton-card"></div>').join("")+'</div>'}
};
addEventListener("DOMContentLoaded",()=>KidzUI.init());