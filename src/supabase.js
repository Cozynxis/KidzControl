class KidzCloud{
 constructor(){this.client=null;this.channel=null;this.ready=false}
 async init(){if(!window.supabase||!KC_CONFIG.SUPABASE_URL)return false;this.client=window.supabase.createClient(KC_CONFIG.SUPABASE_URL,KC_CONFIG.SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});this.ready=true;return true}
 async session(){if(!this.client)return null;return (await this.client.auth.getSession()).data.session}
 async signUp(email,password,name,role="parent"){const {data,error}=await this.client.auth.signUp({email,password,options:{data:{display_name:name,role}}});if(error)throw error;return data}
 async signIn(email,password){const {data,error}=await this.client.auth.signInWithPassword({email,password});if(error)throw error;return data}
 async signOut(){if(this.client)await this.client.auth.signOut()}
 async family(){const s=await this.session();if(!s)return null;const {data,error}=await this.client.from("family_members").select("family_id,role,families(*)").eq("user_id",s.user.id).maybeSingle();if(error)throw error;return data}
 async children(familyId){const {data,error}=await this.client.from("child_profiles").select("*").eq("family_id",familyId).order("created_at");if(error)throw error;return data||[]}
 async rules(childId){const {data,error}=await this.client.from("rules").select("*").eq("child_id",childId).maybeSingle();if(error)throw error;return data}
 async requests(childId){const {data,error}=await this.client.from("requests").select("*").eq("child_id",childId).order("created_at",{ascending:false});if(error)throw error;return data||[]}
 async upsertRules(childId,payload){const {data,error}=await this.client.from("rules").upsert({child_id:childId,...payload,updated_at:new Date().toISOString()},{onConflict:"child_id"}).select().single();if(error)throw error;return data}
 async createRequest(childId,type,title,details){const {data,error}=await this.client.from("requests").insert({child_id:childId,type,title,details,status:"open"}).select().single();if(error)throw error;return data}
 async resolveRequest(id,status){const {data,error}=await this.client.from("requests").update({status,resolved_at:new Date().toISOString()}).eq("id",id).select().single();if(error)throw error;return data}
 async addEvent(childId,type,meta={}){const {error}=await this.client.from("activity_events").insert({child_id:childId,event_type:type,metadata:meta});if(error)console.warn(error)}
 subscribe(childId,cb){if(!this.client)return;this.channel=this.client.channel("kid-"+childId).on("postgres_changes",{event:"*",schema:"public",table:"rules",filter:"child_id=eq."+childId},cb).on("postgres_changes",{event:"*",schema:"public",table:"requests",filter:"child_id=eq."+childId},cb).subscribe()}
 unsubscribe(){if(this.client&&this.channel)this.client.removeChannel(this.channel)}
}
window.kidzCloud=new KidzCloud();