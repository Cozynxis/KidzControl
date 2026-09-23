window.KidzOnboarding={
 async status(){const s=await kidzCloud.session();if(!s)return{signedIn:false,ready:false};try{const f=await kidzCloud.family();return{signedIn:true,ready:!!f,family:f}}catch{return{signedIn:true,ready:false}}},
 async ensure(){const status=await this.status();if(!status.signedIn)return false;if(!status.ready){const {error}=await kidzCloud.client.rpc("bootstrap_family",{display_name:"Mijn gezin"});if(error)throw error}return kidzCloudState.bootstrap()},
 card(){return '<article class="panel onboarding"><span class="eyebrow">CLOUD</span><h3>KidzControl Cloud</h3><p class="muted">Je account, regels en verzoeken kunnen via Supabase tussen browsers synchroniseren.</p><div id="cloudStatus" class="cloud-status">Cloudstatus controleren…</div></article>'}
};