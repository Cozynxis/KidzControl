window.KidzFeatures={
 categories:["Social media","Video & streaming","Games","Chat & communities","Webshops","Nieuws","Onderwijs","AI-tools","Gokken","18+ content","Malware & phishing"],
 presets:{school:{label:"Schooldag",dailyLimit:150,bedtime:"21:30",school:true},weekend:{label:"Weekend",dailyLimit:240,bedtime:"22:30",school:false},focus:{label:"Focus",dailyLimit:90,bedtime:"21:00",school:true}},
 getPreset(name){return this.presets[name]||this.presets.school},
 riskLabel(type){return({blocked:"Geblokkeerd",allowed:"Toegestaan",warning:"Waarschuwing"})[type]||"Onbekend"},
 timeSlots(start,end,step=30){const out=[];let [h,m]=start.split(":").map(Number),[eh,em]=end.split(":").map(Number);let cur=h*60+m,last=eh*60+em;while(cur<=last){out.push(String(Math.floor(cur/60)).padStart(2,"0")+":"+String(cur%60).padStart(2,"0"));cur+=step}return out},
 validateDomain(v){return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(v)},
 todayKey(){return new Date().toISOString().slice(0,10)},
 weekLabels(){return["Ma","Di","Wo","Do","Vr","Za","Zo"]},
 buildNotification(title,body){if(Notification.permission==="granted")new Notification(title,{body})},
 async requestNotifications(){if("Notification"in window)return Notification.requestPermission()},
 exportState(state){const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="kidzcontrol-export-"+this.todayKey()+".json";a.click();URL.revokeObjectURL(a.href)}
};