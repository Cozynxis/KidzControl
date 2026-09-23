window.KidzRouter={
 page:"dashboard",mode:null,
 setMode(mode){this.mode=mode;sessionStorage.setItem("kc_mode",mode)},
 go(page){this.page=page;location.hash=page==="dashboard"?"":"#"+page},
 read(){return(location.hash||"#dashboard").slice(1)||"dashboard"},
 init(cb){this.page=this.read();addEventListener("hashchange",()=>{this.page=this.read();cb(this.page)})}
};