window.KidzExperience={
 greeting(){const h=new Date().getHours();return h<12?"Goedemorgen":h<18?"Goedemiddag":"Goedenavond"},
 statusCard(){const s=KidzSchedule.status(),locked=s.paused||s.timeUp||s.bed;return '<div class="kid-status '+(locked?"locked":"ready")+'"><div class="kid-status-icon">'+(locked?"◷":"✓")+'</div><div><span class="eyebrow">NU</span><h3>'+KidzSchedule.label()+'</h3><p>'+(locked?"Bekijk je afspraken of stuur een verzoek.":"Je kunt KidzControl normaal gebruiken.")+'</p></div></div>'},
 allowed(){return '<div class="chips">'+state.filters.allowedSites.map(x=>'<span class="chip">✓ '+esc(x)+'</span>').join("")+'</div>'},
 requests(){const rs=state.requests||[];return rs.length?rs.slice(0,10).map(r=>'<div class="request-item"><div><b>'+esc(r.title)+'</b><p>'+new Date(r.created).toLocaleString("nl-NL")+'</p></div><span class="request-status '+r.status+'">'+r.status+'</span></div>').join(""):'<div class="empty">Je hebt nog geen verzoeken gestuurd.</div>'}
};