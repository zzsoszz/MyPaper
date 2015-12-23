//set domain name
UUZONE_HOST="http://www.uuzone.com";

clearCookie = function (name,value){
	var Days = 30; 
	var exp = new Date();
	exp.setTime(exp.getTime() );
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
}

var Login={
	isLogin:false,
	userID:null,
	nickName:null,
	pin:0,
	email:null,
	timeExcursion:0, //ms 服务器端和客户端的时间差
	loginArray:[],
	logoffArray:[],
	add:function(func,isLogoff){
		if(isLogoff){
			if(!this.logoffArray.member(func))
				this.logoffArray[this.logoffArray.length]=func;
		}else{
			if(this.isLogin){
				func.bind(this);
			}else if(!this.loginArray.member(func)){
				this.loginArray[this.loginArray.length]=func;
			}
		}
	},
	run:function(isLogoff){
		if(this.isLogin){
			if(isLogoff){
				this.logoffArray.each(
					function(f){
						try{f.apply(this,arguments);}catch(e){}
					}
				);
			}else{
				this.loginArray.each(
					function(f){
						try{f.apply(this,arguments);}catch(e){}
					}
				);
			}
		}
	},
	login:function(e,flag){		
		if(!this.isLogin){
			Login.showRegister=flag;
			e.setAttribute("lightboxUrl","http://"+location.hostname+"/webpart/cliplogin/login.html");
			new render(e,{check:true});	
		}
	},
	logoff:function(a){
		this.run(true);
		try{
			clearCookie("write_status",null);
		}catch(e){}
		new Ajax.Request("/friends/search/invalidate/",{});
		window.parent.location.href=a.href+"?nextURL=/html/friend";
	},
	postAfterLogin:function(){
		this.isLogin=true;
		try{frames['userbox'].location.href=$("userbox").src;}catch(e){}
		this.postForm.apply(this,[this.submit,this.handle]);
	},
	postForm:function(e,handle){
		this.submit=e;
		this.handle=handle;
		if(this.isLogin){
			var f = e.form;
			if(typeof(f.content.id)!="undefined" && (editor_getHTML(f.content.id).length == 0||f.content.value=="<br>")){
				alert("内容不能为空，请您先填写内容！");		
				return false;
			}
			if(typeof(handle) == "function"){
				this.handlePost=handle;		
			}
			new Ajax.Request(f.action,{parameters:Form.serialize(f),onComplete:this.handlePost});
		}else{			
			e.setAttribute("lightboxUrl","http://"+location.hostname+"/webpart/cliplogin/login.html");
			new render(e,{check:true});			
		}
		
	},
	postForm1:function(e,handle){
		this.submit=e;
		this.handle=handle;

		var f = e.form;
		if(typeof(f.content.id)!="undefined" && (editor_getHTML(f.content.id).length == 0||f.content.value=="<br>")){
			alert("内容不能为空，请您先填写内容！");		
			return false;
		}
		if(typeof(handle) == "function"){
			this.handlePost=handle;		
		}
		
		new Ajax.Request(f.action,{parameters:Form.serialize(f),onComplete:this.handlePost});
	},
	handlePost:function(r,j){
		var doc=r.responseXML;
		var retcode = getTagValue(doc,"retcode");
		var prompt1 = getTagValue(doc,"prompt");	
		if(retcode!=null){
			switch(retcode){
				case "0":
					this.postFormFinish();
					break;
				case "-200":
					break;
				default:
					alert(prompt1);
			}
		}
	},
	postFormFinish:function(){
	},
	getAuthKey:function (div) {
	    new Ajax.Updater(div,"http://"+location.hostname+"/app/randImage.do",{});
	},
	clipLogin:function (f,sid){
		if(f.email.value==""){
			AjaxShowFlash(sid||"msg","E-mail/用户名不能为空");
			f.email.focus();
			return;
		}
		if(f.password.value==""){
			AjaxShowFlash(sid||"msg","密码不能为空");
			f.password.focus();
			return;
		}
		AjaxShowFlash(sid||"msg","正在登录……");
		var p=this;
		new Ajax.Request(
		f.action,
		{
			method:"post",
			parameters:Form.serialize(f),
			onComplete:function(r,j){	
				if(r.responseText){			
					AjaxShowFlash(sid||"msg",r.responseText);
				}else{
					AjaxShowFlash(sid||"msg","登录成功",{success:true});
					p.postFormFinish.apply(this,arguments);
				}
			}
		});
	},
	clipRegister:function (f,sid){
		if(f.email.value==""){
			AjaxShowFlash(sid||"msg","E-mail不能为空！");
			f.email.focus();
			return;
		}
		if(f.password.value==""||f.password1.value==""){
			AjaxShowFlash(sid||"msg","密码不能为空！");
			f.password.focus();
			return;
		}
		if(f.password.value!=f.password1.value){
			AjaxShowFlash(sid||"msg","两次输入的密码不相同！");
			f.password1.focus();
			return;
		}
		if(f.password.value.length<6){
			AjaxShowFlash(sid||"msg","密码长度小于6！");
			f.password.focus();
			return;
		}
		if(f.randKey.value.length==0){
			AjaxShowFlash(sid||"msg","请输入验证码！");
			f.randKey.focus();
			return;
		}
		AjaxShowFlash(sid||"msg","正在注册新用户……");
		var p=this;
		new Ajax.Request(
		f.action,
		{
			method:"post",
			parameters:Form.serialize(f),
			onComplete:function(r,j){
				if(r.responseText){			
					AjaxShowFlash(sid||"msg",r.responseText);
				}else{
					AjaxShowFlash(sid||"msg","注册成功",{success:true});
					p.postFormFinish.apply(this,arguments);
				}	
			}
		});
	}
};



var UUZoneUser = {

	setPortrait: function(e) {
		e.setAttribute("lightboxUrl","/app/common/lightbox_wrapper.jsp?url=/api/xml/photo/list/myphoto.do");
		new render(e,{check:true});	
	}

}




