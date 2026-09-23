window.KidzNotifications={
 async permission(){if(!("Notification"in window))return"unsupported";return Notification.permission},
 async enable(){if(!("Notification"in window))return false;return(await Notification.requestPermission())==="granted"},
 show(title,body){if("Notification"in window&&Notification.permission==="granted")new Notification(title,{body,tag:"kidzcontrol"})},
 async list(){if(!kidzCloudState.family)return[];const {data,error}=await kidzCloud.client.from("notifications").select("*").eq("family_id",kidzCloudState.family.family_id).order("created_at",{ascending:false}).limit(50);if(error)throw error;return data||[]},
 async push(title,body){if(!kidzCloudState.family)return;const s=await kidzCloud.session();const {error}=await kidzCloud.client.from("notifications").insert({family_id:kidzCloudState.family.family_id,recipient_id:s?.user?.id,title,body});if(error)throw error;this.show(title,body)}
};