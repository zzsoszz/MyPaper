//klcecart script, klcecart_id=2
//$Id: tc2.js,v 1.1.1.1 2007/07/11 22:19:50 zhaoyi Exp $

var klcecart_id = 2;
var klcecart_host = "http://klcecart.cn.yahoo.com/";
var pname = 0, space_id = 0, sds_fid, sds_lr, sds_tu; 

function body_load() {
	if(sds_fid) {
		fid_Counter();
	}
}

function clk(obj, path, event) {
	e = event.srcElement ? event.srcElement : event.target;
	if(e.tagName == "A") {
		if(obj && path && event && document.images) {
			var spaceid = arguments[3] ? arguments[3] : space_id;
			var height = window.screen.height;
			var width = window.screen.width;
			var lr = window.parent.document.referrer || top.document.referrer || document.referrer;
			lr = sds_lr ? escape(lr) : "";
			var x = event || window.event;
			x = x.clientX + document.body.scrollLeft;
			var y = event || window.event;
			y = y.clientY + document.body.scrollTop;
			path = path.replace(/^\/*/, "");
			path = path.replace(/\/*$/, "");
			var tu = sds_tu ? escape(obj.href) : "";	
			//klcecart_host/ks/klcecart_id/c/1024x768/20_50/94781106/hp/left_frame/2/1/?lr=&tu=&t=
			var url = klcecart_host + pname + "/" + klcecart_id + "/c/" + width + "x" + height + "/" + x + "_" + y + "/" + spaceid + "/" + path + "/?" + "lr=" + lr + "&tu=" + tu + "&t=" + Math.random();
			(new Image()).src = url;	
		}
	}
	return true;             
}

function fid_Counter() {
	var url = location.search;
	var Request = new Object();
	var Requestlist = new Array("fid.sds.cn.yahoo.com"); 
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	if(Request["f"] != null) {
		var fid = Request["f"];
		var t = Math.floor(Math.random() * 9000000000 + 999999999);   
		if (document.images) {
			for(var i = 0; i < Requestlist.length; i++) {
				(new Image()).src = "http://" + Requestlist[i] + "/fid_img.html?fid=" + fid + "&t=" + t;
			}
		}
	}
}
