
var Chat={
	public_chat:function(url,param){	
		if(typeof(param.minHeight)=="undefined")	{
			param.minHeight=11;
		}
		if(typeof(param.minWidth)=="undefined"){
			param.minWidth=400;
		}
		if(typeof(param.top)=="undefined"){
			param.top=60;
		}
		if(typeof(param.left)=="undefined"){
			param.left=10;
		}
		if(typeof(param.width)=="undefined"){
			param.width=document.body.clientWidth-10;
		}
		if(typeof(param.height)=="undefined"){
			param.height=500;
		}
		//edit by ww
		iIceAge.initialize(  );
	},
	params: {},
	onload:function(){
		if ( Browser.browser == BrowserType.IE && document.readyState != "complete" ) 
		{
			 //setTimeout( Chat.onload.bind(Chat) , 50 );
			 return;
		}
		iceage_oninitialize=null;
		Chat.isOnload=true;
		//iIceAge.initialize(Chat.params);	
	},
	add:function(o){
		Chat.params.controller_host=o.controller_host;
		Chat.params.theame=o.theame;
		if(o.mask_function)Chat.params.mask_function|=o.mask_function;
		if(o.WhoInThisPageParameters) Chat.params.WhoInThisPageParameters=o.WhoInThisPageParameters;
		if(o.ShowNotifyParameters) Chat.params.ShowNotifyParameters=o.ShowNotifyParameters;
		if(o.CurrentPageParameter){
			var c=o.CurrentPageParameter;
			var t=Chat.params.CurrentPageParameter;
			if(t==null) t={};
			t.CurrentPageRoomID=c.CurrentPageRoomID;
			t.top=c.top|0;
			t.left=c.left|0;
			t.width=c.width|0;
			t.height=c.height|0;			
			t.minHeight=c.minHeight|0;
			t.minWidth=c.minWidth|0;
			t.draggable=c.draggable? c.draggable:false;
			t.resizable=c.resizable? c.resizable:false;
			t.minimizable=c.minimizable? c.minimizable:false;
			t.maximizable=c.maximizable? c.maximizable:false;
			t.closable=c.closable? c.closable:false;
			Chat.params.CurrentPageParameter=t;
		}
	}	
};

var Notisfy={
	func:[],
	add:function(f){
		if(notify_mgr){
			f();
		}else{
			Notisfy.func.push( f );
		}
	}		
};
var notify_mgr=null;
Chat.add({theame:"dialog",mask_function:MF_PUBLIC});
function OnInitialize(notify){
	notify_mgr = notify;
	$A(Notisfy.func).each(function(f){
		f();
	});
	Online.checkUserID();
}
var Online={
	willcheckeduser:[],
	add:function(userids){
		if( controler_manager && controler_manager.checkuserid){
			Online.checkUserID({userids:userids});
		}else{
			var users=userids.split(",");
			users.each(function(item){
				if(item!=null&&!Online.willcheckeduser.member(item)){
					Online.willcheckeduser[Online.willcheckeduser.length]=item;				
				}
			});
			if(controler_manager && controler_manager.checkuserid){Online.checkUserID()};
		}
	},
	checkPin:function(pin,result){
		alert( pin + ":" + result );
	},
	checkUserID:function(options){
		var userids="";		
		controler_manager.event.event_sink={};
		if( controler_manager && controler_manager.checkuserid){
			if(options){
				controler_manager.event.event_sink.oncheckuserid=options.onCheck?options.onCheck:Online.onCheckUserID;
				userids=options.userids;
			}else{
				controler_manager.event.event_sink.oncheckuserid=Online.onCheckUserID;
             	userids = Online.willcheckeduser.join(","); 
			} 
            if(userids&&userids.length > 0 ){
                controler_manager.checkuserid( userids );
            }
        }else if(options){
            Online.add(options.userids);
        }
	},
	onCheckPin:function(pin,result){
		alert( pin + ":" + result );
	},
	onCheckUserID:function( pin , userid , result ){
		$$("span.online_"+userid).each(function(item){	
			item.innerHTML=(result == "true" ? 
                    "<img src='/css/images/profile/status_online.gif' alt='在线' title='在线' align='absmiddle' border='0'>" 
                    : "<img src='/css/images/profile/status_offline.gif' alt='离线' title='离线' align='absmiddle' border='0'>");
		});
	}
};

        
