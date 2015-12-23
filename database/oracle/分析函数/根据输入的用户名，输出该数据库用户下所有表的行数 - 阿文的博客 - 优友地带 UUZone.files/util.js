//image resize
function printf()
{

  var i, msg = "", argNum = 0, startPos;
  var args = printf.arguments;
  var numArgs = args.length;
  if(numArgs)
  {
    theStr = args[argNum++];
    startPos = 0;  endPos = theStr.indexOf("%s",startPos);
    if(endPos == -1) endPos = theStr.length;
    while(startPos < theStr.length)
    {
      msg += theStr.substring(startPos,endPos);
      if (argNum < numArgs) msg += args[argNum++];
      startPos = endPos+2;  endPos = theStr.indexOf("%s",startPos);
      if (endPos == -1) endPos = theStr.length;
    }
    if (!msg) msg = args[0];
  }
  return msg;

}

function writePageLink(total,perPage,urlFormat)
{
	var t = total;
	var totalPage = 1;
	totalPage = parseInt(total / perPage);
	if (total % perPage > 0)
	{
		totalPage = totalPage + 1;
	}

	var maxShow = 9;
	
	if (totalPage > 1) document.write("<font color=\"#598527\">[&nbsp;分页 ");

	var i= 0;
	while (t > perPage)
	{
		i++;
		if(i > 1) document.write("&nbsp;");
		if(i > maxShow) 
		{	
			document.write("......");
			break;
		}
		document.write(printf("<a href=\"%s\" class=\"club_a4\">%s</a>",printf(urlFormat,i),i));
		t -= perPage;
	}

	if (totalPage > 1)
	{
		document.write("&nbsp;");
		document.write(printf("<a href=\"%s\" class=\"club_a4\">%s</a>",printf(urlFormat,totalPage),totalPage));
		document.write("&nbsp;]</font>");
	}
	
}
function imgResize(o,width){
	if(typeof(width)=="undefined"){
		width=500;
	}
    if(o.width>width){
    	var w=o.width;
    	o.height=(width/w)*o.height;
    	o.width=width;    	
    }    
}
function StringLen(str) {
	rev = str.length;
	for(i = 0; i < str.length; i ++) {
		if(str.charCodeAt(i) > 255) {
			rev ++;
		}
	}
	return rev;
}
function AjaxShowFlash(id,text,options){
	options=options||{};
	var time=options.time||3000;
	var success=options.success? true:false;
	$(id).innerHTML=text;
	$(id).className=success? "flash_green":"flash_red";
	$(id).style.display="block";
	if(success) setTimeout(function(){try{$(id).style.display="none";}catch(e){}},time||5000);
}
FloatTip = function(position,text){
	bod = document.getElementsByTagName('body')[0];
	if ($('FloatTip')!=null)
	{
		Element.remove('FloatTip');
	}
	div_obj = document.createElement('DIV');
	div_obj.id = "FloatTip";
	bod.appendChild(div_obj);
	div_obj.style.border = "4px solid #eee";
	div_obj.style.position = "absolute";
	div_obj.style.width ="99%";
	div_obj.style.height ="40px";
	div_obj.style.left = "0px";
	div_obj.style.backgroundColor = "#E1F7CB";
	Element.hide(div_obj);        
	div_obj.innerHTML = '<h2 style="text-align:center;color:#000">'+text+'</<h2>';	
	if (position == "top") {
		div_obj.style.top =document.documentElement.scrollTop+"px";
		Effect.BlindDown(div_obj);
		setTimeout("Effect.BlindUp(div_obj)",3000);
	}else{
		//div_obj.style.top =document.documentElement.scrollTop+"px";
		div_obj.style.bottom = "0px";
		Effect.BlindUp(div_obj);
		setTimeout("Effect.BlindDown(div_obj)",3000);
	}
     
}


var UU={
	click:function(a,event,userID,nickName){
		var d=$("_UU_");
		if(typeof(nickName)=="undefined"||nickName==null){
			nickName=userID;
		}
		var str=""; ///app/guestbookAddLoad
		if(Login.isLogin&&Login.userID==userID){
			str='<a href="/blog/'+userID+'/" target="_blank">我的Blog</a>'+
			'<a href="/album/'+userID+'/" target="_blank">我的照片</a>'+
			'<a href="/uu/'+userID+'/" target="_blank" >我的个人门户</a>'+
			'<a href="/uu/'+userID+'/club" target="_blank">我的圈子</a>';
		}else{
			str='<a href="/blog/'+userID+'/" target="_blank">Blog</a>'+	
			'<a href="/album/'+userID+'/" target="_blank">照片</a>'+
			'<a href="/uu/'+userID+'/" target="_blank" >个人门户</a>'+
			'<a href="/uu/'+userID+'/club" target="_blank">圈子</a>';
			if(Login.isLogin){
				str+='<a href="/webpart/message/index.html?userID='+userID+'&nickName='+encodeURIComponent(nickName)+'" onclick="UU.sendMsg(this);return false;">发站内消息</a>'+
				'<a href="/app/guestbookAddLoad.do?userID='+userID+'" onclick="UU.leaveWork(this);return false;">写留言</a>'+
				'<a href="/app/addFriend.do?userID='+userID+'&type=1" onclick="UU.addFriend(this);return false;">加&nbsp;<b>'+nickName+'</b>&nbsp;为UU</a>';				
			}
			str+='<div id="online_'+userID+'" style="display:inline;">&nbsp;</div>';
		}
		d.innerHTML=str;		
		dropdownmenu(a,event,"_UU_");
		if(Login.userID!=userID)
			Online.checkUserID({userids:userID,onCheck:UU.onCheckUserID});
		str=null;
	},	
	onCheckUserID:function(pin,userID,result){
		$("online_"+userID).innerHTML=(result == "true" ? 
                    "<img src='/css/images/profile/status_online.gif' alt='在线' title='在线' border='0' style='float:left;' /><a href='/app/addFriend.do?userID="+userID+"&type=1' onclick='iIceAge.startchat({target:"+pin+",content:\"abc\",newsession:true});return false;'>实时交谈</a>" 
                    : "<img src='/css/images/profile/status_offline.gif' alt='离线' title='离线' border='0' style='float:left;'/>不在线哦");
	},
	sendMsg:function(a){
		a.setAttribute("lightboxUrl",a.href);
		new render(a,{check:true});
	},
	leaveWork:function(a){
		a.setAttribute("lightboxUrl",a.href);
		new render(a,{check:true});
	},
	addFriend:function(a){
		a.setAttribute("lightboxUrl",a.href);
		new render(a,{check:true});
	},
	DropDownButtonsInst:null,
	onmouseover:function( ele , event , userid , username )
	{
		try{
			if( !this.DropDownButtonsInst )
			{
				this.DropDownButtonsInst = new BropDownButton({ButtonStyle:"LinkButton_default",DropArrowWidth:20});
				Event.observe( document.body , "click" , this.DropDownButtonsInst.Hide.bindAsEventListener( this.DropDownButtonsInst ) );
			}
			this.DropDownButtonsInst.Show( 
				ele , 
				function(ele,event){
					UU.click( ele , event , userid , username );
				}
			);
		}catch(e){}
	},
	ImageHoverBarInst:null,
	onImageHover:function( ele , event , userid , username )
	{
		if( !this.ImageHoverBarInst )
		{	
			this.ImageHoverBarInst = new ImageHoverBar(
				{ButtonStyle:"ImageHoverBar_default"}
			);
			if( this.ImageHoverBarInst == null )
				return;
			Event.observe( document.body , 
			"click" , 
			this.ImageHoverBarInst.Hide.bindAsEventListener(this.ImageHoverBarInst) );
		}
		this.ImageHoverBarInst.Show(
			ele,
			{
				OnMenuButonClick:function( elebtn , evt)
				{
					UU.click( elebtn , evt , userid , username );
				}
			}
		);
	}
};
var Util={
	setTabMenu:function(userID,nickName,photo){
 
		if(typeof(nickName)=="undefined"||nickName==null){
			nickName=userID;
		}
		if(typeof(photo)=="undefined"||photo==null){
			photo="/css/images/profile/photo_24x24_default.gif";
		} 
		nickName = 
 (nickName.length > 6) ? nickName.substring(0,6)+"..." : nickName 
		var str='<div class="uuzoneLogo"> '+
		'<a id="uuzone_logo" href="/" title="" target="_top"><img src="/css/images/tabmenu/uuzonelogo.gif" /></a>'+
		'</div> '+
		'<div class="uuLogin"> '+
		'<ul id="uubarLoginStatus"> '+
		'<li><a href="/app/resignin.do" onclick="Login.login(this);return false;">登录</a>&nbsp;|&nbsp;</li>'+
		'<li>还不是会员？<a href="#" onclick="Login.login(this,true);return false;">注册</a></li> '+
		'</ul> '+
		'</div> '+
		'<div class="uuTabMenu">'+
		'<ul> '+
		'	<li style="width:8em;">'+nickName+'的&nbsp;&nbsp;&raquo;</li>'+
		'	<li><a id="uu_profile" href="/profile/view/'+userID+'" class="current">档案</a></li>'+
		'	<li><a id="uu_home" href="/uu/'+userID+'/" class="normal"  title="">门户</a></li> '+
		'	<li><a id="uu_chat" href="/uu/'+userID+'/friends" class="normal"  title="">朋友</a></li>'+
		'	<li><a id="uu_blog" href="/blog/'+userID+'/" class="normal"  title="">Blog</a></li> '+
		'	<li><a id="uu_photo" href="/photo/'+userID+'/" class="normal"  title="">照片</a></li> '+
		'	<li><a id="uu_club" href="/uu/'+userID+'/club/" class="normal"  title="">圈子</a></li>'+
		'	<!-- li><a id="uu_file" href="#" class="normal"  title="">文件共享</a></li -->'+
		'</ul> '+
		'</div>';
				
		$("uuBar").innerHTML=str;
		
		if(Login.isLogin)
			this.uubarLoginStatus();
		else
			Login.add(this.uubarLoginStatus);
			
		str=null;
	},

	uubarLoginStatus:function(){
 
		var screenName = (Login.nickName.length > 8) ? Login.nickName.substring(0,6)+"..." : Login.nickName 
		$("uubarLoginStatus").innerHTML='<li>您好！<b><a href="/uu/'+Login.userID+'">'+screenName+'</a></b>&nbsp;|&nbsp;</li>'+
		'<li>[<a href="/app/logoff.do" onclick="Login.logoff(this);return false;">退出</a>&nbsp;|&nbsp;</li>'+
		'<li><a href="/profile/view/'+Login.userID+'" class="ownBlog"><font color="#000000">自己档案</font></a>]</li>';
	},
	
	topad:function(params){
		var id=params.id? params.id:"bloghome_topad";
		var url=params.url?params.url: "/market/topadvimage/";
		var max=params.max?params.max: 5;
		var module=params.module?params.module: "";
		module=module.length>0? module+"/":"";
		var i=parseInt(Math.random()*max)+1;
		$(id).innerHTML='<img src="'+url+module+i+'.jpg" />';
		id=url=max=module=i=null;
	},
	setTitle:function(title){
		document.title=title;
	},
	sDateClearance:function(time){
		var str = "";
		var now = new Date();
		var diff = (now.getTime() - time+Login.timeExcursion) / 1000;		//加服务器端和客户端的时间差
		if (diff <=0) {
			str = "1秒前";
		} else if (0 < diff && diff < 60) {
			str = parseInt(diff) + "秒前";
		} else if (60 <= diff && diff < 3600) {
			str = parseInt(diff / 60) + "分钟前";
		} else if (3600 <= diff && diff < 86400) {
			str = parseInt(diff / 3600) + "小时前";
		} else if (86400 <= diff && diff < 2592000) {
			str = parseInt(diff / 86400) + "天前";
		} else if (2592000 <= diff && diff < 946080000) {
			str = parseInt(diff / 2592000) + "个月前";
		} else {
			str = parseInt(diff / 946080000) + "年前";
		}
		return str;
	},
	frameView:function(a,listSrc,checkLogin){ 
		if (checkLogin && !Login.isLogin)  {
			Login.add(function(){Util.frameView(a,listSrc);});
  		Login.login(a);
  		return;
 		}
			
		var s=a.href.substring(a.href.indexOf("/",8));
		window.open("/html/frame/"+encodeURIComponent(encodeURIComponent(s))+"/"+encodeURIComponent(encodeURIComponent(listSrc))+"/");
	},
	disposeAry:[],
	addToDispose:function(obj){		
		Util.disposeAry.push(obj);
	},
	dispose:function(){
		Util.disposeAry.each(function(item){
			item=null;
		});
		Util.disposeAry=null;
	},
	getCookie:function(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr !=null) return unescape(arr[2]); return null;		
	}, 
	setCookie:function(name,value){
	var Days = 365;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
	},
	deleteCookie:function(name){
		var cookie_date = new Date ( );  // current date & time
	  	cookie_date.setTime ( cookie_date.getTime() - 1 );
	  	document.cookie = name += "=; expires=" + cookie_date.toGMTString();
	},
	iconOnError:function(img,options){
		img.src="/css/images/profile/photo_75x75_default.gif";
	},
	insertTags:function(a,o){
		var t=this;
		this.setOptions=function(options){
				t.options = {
		      	id:  0,
		      	type:"photo",
		      	content:"",
		      	clubid:0
		    }
		    Object.extend(t.options, options || {});
		};		
		this.setOptions(o);
		var pa=this.options;
		a.setAttribute("lightboxUrl","/webpart/message/tag.html?id="+pa.id+"&type="+pa.type+"&clubid="+pa.clubid+"&content="+encodeURIComponent(pa.content));
		if(Login.isLogin){
			new render(a,{check:true});
		}else{
			Login.add(function(){new render(a,{check:true});});
			Login.login(a);
		}
	},
	resizeWindow:function(o){
		var e=$(o.id||"uuzone_wrapper");
		var d=Element.getDimensions(document.documentElement||document.body);
		if(d.width<(o.width||997)){
			Element.setStyle(e,{width:"997px"});
		}
	},
	onresize:function(o){
		var e=$(o.id||"uuzone_wrapper");
		var d=Element.getDimensions(document.documentElement||document.body);
		if(d.width<(o.width||997)){
			Element.setStyle(e,{width:"997px"});
		}else{
			e.removeAttribute("style");
		}
	},
	getFrequencyTime:function(){
		return (Util.getCookie("UUZoneDebug")? 6:300);
	}
};
var Gmap={
	parse:function(){
		$$("img.gmap").each(function(item,index){
			try{
				var lat=item.getAttribute("lat");				
				var lng=item.getAttribute("lng");
				var zoom=item.getAttribute("zoom");
				if(!zoom) zoom=13;
				var photo=item.getAttribute("photo");
				if(!photo) photo="/css/images/profile/photo_75x75_default.gif";
				var linkto=item.getAttribute("linkto");
				if(!linkto) linkto="http://www.uuzone.com";
				new Ajax.Request('/thirdparty/gmap?lat='+lat+'&lng='+lng+'&zoom='+zoom+'&width=500&height=400&typecontrol=yes&photo='+photo+'&linkto'+linkto,{evalScripts:true,method:"get",onComplete:function(r,j){
					var div=document.createElement("div");
					div.innerHTML=r.responseText+'<div><a target="_blank" href="/thirdparty/gmap?lat='+lat+'&lng='+lng+'&zoom='+zoom+'&fullwindow=yes&typecontrol=yes&photo='+photo+'&linkto='+linkto+'">打开更大的地图查看</a>&nbsp;&nbsp;<a href="/thirdparty/gmap/show/uu?lat='+lat+'&lng='+lng+'&zoom='+zoom+'" target="_blank" >查看附近的优友</a>&nbsp;&nbsp;<a href="/thirdparty/gmap/show/photo?lat='+lat+'&lng='+lng+'&zoom='+zoom+'" target="_blank" >查看附近的照片</a></div>';
					item.parentNode.insertBefore(div,item);				
					Element.remove(item);
				}});
			}catch(e){}
		});
	}
}
try{
Event.observe(window, 'unload', function(){
	Util.dispose();
	Tips=null;
	Chat=null;
	Notisfy=null;
	Login=null;
	Util=null;
}, false);
}catch(e){}
var TAG={
	click:function(a,event,tag){
		var d=$("_UU_");
		var str="";
		str='<a href="/profile/index?m=ext&s=3&tags='+ encodeURIComponent(tag) +'&tag_type=tags">搜索与 '+ tag +' 相关的优友</a>' ;
		
		if(Login.isLogin){
			str+='<a href="/edit/elements/edit_tags?uutags='+ encodeURIComponent(tag) +'" target="_blank" onclick="TAG.addTag(this);return false;">为我添加标签：'+tag+'</a>';
		}

		d.innerHTML=str;
		dropdownmenu(a,event,"_UU_");
		str=null;
	},	
	addTag:function(a){
		new Ajax.Request(
			a.href,
			{	method:'get',
				onComplete:function(){
					FloatTip("top","恭喜！添加成功。");
			}
		});
	}
};

var Locations={
	click:function(a,event,locations){
		var d=$("_UU_");
		var str="";
		str='<a href="/profile/index?m=ext&s=3&location='+ encodeURIComponent(locations) +'&tag_type=location">搜索在 '+ locations +' 的优友</a>' ;
		
		if(Login.isLogin){
			str+='<a href="/edit/elements/edit_locations?locations='+ encodeURIComponent(locations) +'" target="_blank" onclick="Locations.add(this);return false;">为我添加地理位置：'+ locations +'</a>';
		}

		d.innerHTML=str;
		dropdownmenu(a,event,"_UU_");
		str=null;
	},	
	add:function(a){
		new Ajax.Request(
			a.href,
			{	method:'get',
				onComplete:function(){
					FloatTip("top","恭喜！添加成功。");
			}
		});
	}
};

var Intents={
	click:function(a,event,intents){
		var d=$("_UU_");
		var str="";
		str='<a href="/profile/index?m=ext&s=3&intent='+ encodeURIComponent(intents) +'&tag_type=intent" target="_blank">搜索想  '+ intents +' 的优友</a>' ;
		
		if(Login.isLogin){
			str+='<a href="/edit/elements/edit_intents?intents='+ encodeURIComponent(intents) +'" target="_blank" onclick="Intents.add(this);return false;">我也想 '+ intents +'</a>';
		}

		d.innerHTML=str;
		dropdownmenu(a,event,"_UU_");
		str=null;
	},	
	add:function(a){
		new Ajax.Request(
			a.href,
			{	method:'get',
				onComplete:function(){
					FloatTip("top","恭喜！添加成功。");
			}
		});
	}
};

var Lookfors={
	click:function(a,event,lookfors){
		var d=$("_UU_");
		var str="";
		str='<a href="/profile/index?m=ext&s=3&lookfor='+ encodeURIComponent(lookfors) +'&tag_type=lookfor" target="_blank">搜索想认识  '+ lookfors +' 的优友</a>' ;
		
		if(Login.isLogin){
			str+='<a href="/edit/elements/edit_lookfors?lookfors='+ encodeURIComponent(lookfors) +'" target="_blank" onclick="Lookfors.add(this);return false;">我也想认识 '+ lookfors +'</a>';
		}

		d.innerHTML=str;
		dropdownmenu(a,event,"_UU_");
		str=null;
	},	
	add:function(a){
		new Ajax.Request(
			a.href,
			{	method:'get',
				onComplete:function(){
					FloatTip("top","恭喜！添加成功。");
			}
		});
	}
};

 
 /*
  * attach one or more functions that will be executed as soon as the DOM is ready to work with.
  * This will not wait for images or other assets to load like window.onload does.
  *
  * example:
  * Event.onDOMReady(function() {
	  // Stuff here!
	});
  * 
  */
Object.extend(Event, {
  _domReady : function() {
    if (arguments.callee.done) return;
    arguments.callee.done = true;

    if (this._timer)  clearInterval(this._timer);
    
    this._readyCallbacks.each(function(f) { f() });
    this._readyCallbacks = null;
	},
  onDOMReady : function(f) {
    if (!this._readyCallbacks) {
      var domReady = this._domReady.bind(this);
      
      if (document.addEventListener)
        document.addEventListener("DOMContentLoaded", domReady, false);
        
        /*@cc_on @*/
        /*@if (@_win32)
            document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
            document.getElementById("__ie_onload").onreadystatechange = function() {
                if (this.readyState == "complete") domReady(); 
            };
        /*@end @*/
        
        if (/WebKit/i.test(navigator.userAgent)) { 
          this._timer = setInterval(function() {
            if (/loaded|complete/.test(document.readyState)) domReady(); 
          }, 10);
        }
        
        Event.observe(window, 'load', domReady);
        Event._readyCallbacks =  [];
    }
    Event._readyCallbacks.push(f);
  }
});   

/**
 * tooltips util
 * eg: Tips.showToolTip(e,"showElement",this);
 */
var Tips={
	oldHandler:null,
	showToolTip:function(e,tips, obj){
	   if (!e) e = window.event;
       var toolTipDiv = document.getElementById("tooltip");
       var tips = document.getElementById(tips);
       var tipText = tips.innerHTML;
       if(toolTipDiv.style.display == "none"){
			var x = Tips._find_x(obj);
			var y = Tips._find_y(obj);
			var sW = Tips._find_screen_width() - 40;
			if (x + Tips._pi(obj.style.width) > sW)
				x = sW - Tips._pi(obj.style.width);
			toolTipDiv.style.left = x + "px";
	        toolTipDiv.style.top = (y + 20) + "px";
	        toolTipDiv.innerHTML = tipText;
	        toolTipDiv.style.display = "block";
			Tips.oldHandler = document.onclick;
	        document.onclick = Tips.HideTips;
	       
	   		//if we receive this click event, stop it to other handlers
			if (e.stopPropagation) e.stopPropagation();		//dom 2
			else e.cancelBubble = true;
       }else{
            Tips.HideTips();
       }
 	},
	_pi:function(str){return parseInt(str,10);},
	_find_x:function(el,bAbsolute){
		if(bAbsolute){
			if(el.style.left){
				return Tips._pi(el.style.left);
			}
			return el.offsetLeft;
		}
		var x=0;
		if(el.offsetParent){
			while(el.offsetParent){
				x+=el.offsetLeft;
				el=el.offsetParent;
			}
		}
		else{
			if(el.x){
				x+=el.x;
			}
		}
		return x;
	},
	_find_y:function(el,bAbsolute){
		if(bAbsolute){
			if(el.style.top){
				return Tips._pi(el.style.top);
			}
			return el.offsetTop;
		}
		var y=0;
		if(el.offsetParent){
			while(el.offsetParent){
				y+=el.offsetTop;
				el=el.offsetParent;
			}
		}
		else{
			if(el.y){
				y+=el.y;
			}
		}
		return y;
	},
	_find_screen_width:function(){
		if(window.innerWidth){
			return window.innerWidth;
		}
		else{
			if(document.documentElement.clientWidth){
				return document.documentElement.clientWidth;
			}
			else{
				if(document.body.clientWidth){
					return document.body.clientWidth;
				}
			}
		}
	},
	HideTips:function(){
		var tipEle = document.getElementById("tooltip");
     	if (tipEle)
     		tipEle.style.display = "none";
     	document.onclick = Tips.oldHandler;
     	//Event.observe(document,"click",Tips.oldHandler,false); 
	},
	TipMouseDown:function(e){
		if (!e)  e = window.event;
 		//if we receive this click event, stop it to other handlers
		if (e.stopPropagation) e.stopPropagation();		//dom 2
		else e.cancelBubble = true;
	}
};    

var loadingImg = "<img src='/css/images/profile/loading.gif' title='正在载入...' border='0' />";

function profileTip(){
	if(Util.getCookie('profile_user') != Login.userID || Util.getCookie('write_status')=="" || Util.getCookie('write_status')==null){
			new Ajax.Request("/friends/search/render_write_status",
			{	method: 'get',
				evalScripts:true,
				onComplete:function(request){
					calc_ws(request.responseText);
				}
			});
		}
		else{
			 calc_ws(Util.getCookie('write_status'));
		}
}
	
calc_ws = function(write_status){
		var ws = parseInt(write_status);
		var need_to_write =new Array();
		var unwritten = 0;
		var now=new Date();
		var number = 1;
			
		for(var i=0;i<15;i++){
			if ((( ws >>> i) & 1)==0 ){
				need_to_write[i] =i+1;
				unwritten++;
			}
		}
		
		number = now.getSeconds()%(unwritten+1);
		if (unwritten>0){
			switch(number) {
				case 1 : 
					if (need_to_write[1] == 2 || need_to_write[2] == 3 || need_to_write[0] ==1){
						$('profile_tip_title').innerHTML +='<h3><a href="#" lightboxUrl="/edit/elements/renderform?elements=1,2,3" onclick="new render(this,{check:true});return false;" target="_blank">填写基本资料</a></h3>';
						$('profile_tip_link').innerHTML +='您还没有填写姓名、生日、性别等最基本信息。';
						break;
					}
				case 2 :
					if (need_to_write[4] == 5){
						$('profile_tip_title').innerHTML +='<h3><a href="/app/albumEditPhoto.do" target="_blank">上传头像</a></h3>';
						$('profile_tip_link').innerHTML +='个人头像所产生的效果就像生活中别人对你的第一印象，所以有没有个人头像对您很重要。';	
						break;
					}
				case 3 : 
					if (need_to_write[7] == 8){
						$('profile_tip_title').innerHTML +='<h3><a href="#" lightboxUrl="/edit/elements/renderform?elements=8;" onclick="new render(this,{check:true});return false;" target="_blank">填写交友信息</a></h3>';
						$('profile_tip_link').innerHTML +='您的交友信息包括您的职业、自我介绍以及兴趣爱好等等。同时您一定也希望看到您的朋友的这些信息。这样朋友之间可以有更多的了解。';
						break;
					}
				case 4 :
					if (need_to_write[8] == 9){
						$('profile_tip_title').innerHTML +='<h3><a href="#" lightboxUrl="/edit/elements/renderform?elements=9;" onclick="new render(this,{check:true});return false;" target="_blank">填写联系信息</a></h3>';
						$('profile_tip_link').innerHTML +='为了方便您和朋友之间的联系，你可以让你的朋友看到你的联系信息，当然您也可以设置自己可见或所以人可见。';
						break;
					}
				case 5 :
					if (need_to_write[10] == 11 || need_to_write[11]== 12 || need_to_write[12] ==13 || need_to_write[13] == 14){
						$('profile_tip_title').innerHTML +='<h3><a href="/profile/update#3" onclick="" target="_blank">添加经历</a></h3>';
						$('profile_tip_link').innerHTML +='过去的经历可能是耐人寻味的，您当然可以去<a href="/profile/index" target="_blank">寻找相同经历的朋友</a>，为什么不让相同经历的他们来找你呢？</li>';
					break;
					}
				default :
					if (need_to_write[6] ==7 || need_to_write[9] == 10 || need_to_write[14] == 15){
						$('profile_tip_title').innerHTML +='<h3><a href="#" lightboxUrl="/profile/addtags" onclick="new render(this,{check:true});return false;" target="_blank">添加标签</a></h3>';
						$('profile_tip_link').innerHTML +='UU地带的提出了Tag人的概念，物以类聚，人以群分就是这个意思吧。';		
						break;	
					}
			}
		}else{
			$('profileTip').style.display = "none";
		}
}
