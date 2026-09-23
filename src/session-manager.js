window.KidzSession={
 async info(){const s=await kidzCloud.session();return s?{email:s.user.email,id:s.user.id,created:s.user.created_at,lastSignIn:s.user.last_sign_in_at}:null},
 async passwordReset(email){const {error}=await kidzCloud.client.auth.resetPasswordForEmail(email,{redirectTo:location.href});if(error)throw error},
 async changePassword(password){const {error}=await kidzCloud.client.auth.updateUser({password});if(error)throw error},
 async changeEmail(email){const {error}=await kidzCloud.client.auth.updateUser({email});if(error)throw error},
 async deleteLocalSession(){await kidzCloud.signOut();localStorage.removeItem(STORAGE_KEY);sessionStorage.clear();location.reload()}
};