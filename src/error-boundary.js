window.KidzErrors={
 items:[],
 capture(error,context="app"){const item={message:error?.message||String(error),context,at:new Date().toISOString()};this.items.unshift(item);this.items=this.items.slice(0,50);console.error("[KidzControl]",context,error);this.badge()},
 badge(){const x=document.getElementById("errorBadge");if(x){x.textContent=this.items.length;x.classList.toggle("hidden",!this.items.length)}},
 render(){return this.items.length?this.items.map(e=>'<div class="list-row"><div><b>'+esc(e.context)+'</b><small class="muted">'+esc(e.message)+'</small></div><small>'+new Date(e.at).toLocaleTimeString("nl-NL")+'</small></div>').join(""):'<div class="empty">Geen runtime-fouten geregistreerd.</div>'}
};
addEventListener("error",e=>KidzErrors.capture(e.error||e.message,"window"));
addEventListener("unhandledrejection",e=>KidzErrors.capture(e.reason,"promise"));