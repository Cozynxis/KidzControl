window.KidzSchedule={
 days:["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"],
 isWeekday(date=new Date()){const d=date.getDay();return d>=1&&d<=5},
 minutes(t){const [h,m]=String(t).slice(0,5).split(":").map(Number);return h*60+m},
 inRange(now,start,end){const n=this.minutes(now),s=this.minutes(start),e=this.minutes(end);return s<=e?n>=s&&n<e:n>=s||n<e},
 currentTime(){const d=new Date();return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")},
 status(){const t=this.currentTime(),bed=state.bedtime.enabled&&this.inRange(t,state.bedtime.start,state.bedtime.end),school=state.school.enabled&&this.isWeekday()&&this.inRange(t,state.school.start,state.school.end);return{bed,school,paused:state.screen.paused,timeUp:remaining()<=0}},
 label(){const s=this.status();if(s.paused)return"Door ouder gepauzeerd";if(s.timeUp)return"Schermtijd op";if(s.bed)return"Bedtijd actief";if(s.school)return"Schoolmodus actief";return"Vrije tijd"},
 timeline(){return[{label:"School",start:state.school.start,end:state.school.end,active:state.school.enabled},{label:"Vrij",start:state.school.end,end:state.bedtime.start,active:true},{label:"Bedtijd",start:state.bedtime.start,end:state.bedtime.end,active:state.bedtime.enabled}]},
 renderWeek(){return '<div class="week-grid">'+this.days.map((d,i)=>'<div class="day-card '+(i<5&&state.school.enabled?"active":"")+'"><b>'+d.slice(0,2)+'</b><small>'+(i<5&&state.school.enabled?state.school.start+"–"+state.school.end:"Vrij")+'</small></div>').join("")+'</div>'}
};