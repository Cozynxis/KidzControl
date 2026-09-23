window.KidzAnalytics={
 summary(){const a=state.activity||[],total=a.reduce((x,y)=>x+y,0),average=Math.round(total/Math.max(a.length,1));return{total,average,highest:Math.max(...a,0),lowest:Math.min(...a,0)}},
 percentUsed(){return Math.min(100,Math.round(state.screen.used/Math.max(1,totalLimit())*100))},
 remainingPercent(){return Math.max(0,100-this.percentUsed())},
 insight(){const s=this.summary();if(state.screen.used>s.average*1.3)return"Vandaag ligt het gebruik duidelijk boven het weekgemiddelde.";if(state.screen.used<s.average*.7)return"Vandaag ligt het gebruik onder het weekgemiddelde.";return"Vandaag ligt ongeveer rond het normale weekniveau."},
 renderInsight(){const s=this.summary();return '<article class="panel insight-card"><span class="eyebrow">INZICHT</span><h3>'+this.insight()+'</h3><p class="muted">Weekgemiddelde: '+s.average+' minuten · Vandaag: '+state.screen.used+' minuten.</p></article>'}
};