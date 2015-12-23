/**
 * @author stan | chaoliang@staff.sina.com.cn
 */
//- debug -
var __dev_mode = false;		//should be false
var __debug_mode = false;	//should be false
var __decode_mode = false;	//should be false
var __author = "xinyu";


//- env -
var $BASE = "http://blogjs.sinajs.cn/v5/";
var $BASECSS = "http://blogimg.sinajs.cn/v5/";
var imgPath="http://bj.static.photo.sina.com.cn/orignal/";
/** 存储出错提示信息内容对象 */
var $SYSMSG = {};
var scope = {};


//- pre process -
checkAuthor();
if(typeof $uid == "undefined") {
	$uid = $UID || "0000000000";
}
uid = $uid;
var $uidhex = window.parseInt($uid).toString(16);
$uidhex = new Array(9-$uidhex.length).join("0") + $uidhex;  // 将不足十六进制 UID 进行补全
/**
 * 提供$setDomain变量,用来标明是否需要设置domain
 * 如果不想设置domain,请在跟$pageid变量一起设置$setDomain = false;
 */
if (typeof($setDomain) == "undefined" || $setDomain == true) {
	document.domain = "blog.sina.com.cn";
}


//- base function -
function dw(s) {
  window.document.write(s);
}
/**
 * Fucking confusing name of this function..
 */
function dwSwf(_sName, _sSrc, _sWidth, _sHeight, _sMode, _aValue) {
  var sValue = '';
  var aFlashVars = [];
  if (_aValue) {
    for (var key in _aValue) {
      aFlashVars[aFlashVars.length] = key + "=" + _aValue[key];
    }
    sValue = aFlashVars.join('&');
  }
  _sMode = _sMode ? 'wmode="transparent"' : '';
  if(_sName == "calendar" || _sName =="musicFlash2" ){

	return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="' + _sWidth + '" height="' + _sHeight + '" id="' + _sName + '" align="middle" ><param name="movie" value="' + _sSrc + '?' + sValue + '" /><param name=allowScriptAccess value=always><param name=wmode value=transparent><embed name="' + _sName + '" src="' + _sSrc + '" ' + _sMode + ' quality="high" align="top" salign="lt" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + _sWidth + '" height="' + _sHeight + '" flashVars="' + sValue + '" \/><\/object>';
  }else{
	return '<embed id="' + _sName + '" name="' + _sName + '" src="' + _sSrc + '" ' + _sMode + ' quality="high" align="top" salign="lt" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + _sWidth + '" height="' + _sHeight + '" flashVars="' + sValue + '" \/>';
  }
}
/**
 * @author xp
 * write script tag to document. Can be used only in page-loading phase.
 * only script text or script url can be accepted. u cant specify none or two of them or an error will be raised
 *
 * 以document.write的方式向页面中写入js
 * @param o {
 *    id : id of the created tag, 
 *    url : String,
 *    script  : String
 *  }
 */
function dwScript(o){
  o.id = o.id || "";
  o.charset = o.charset || "utf-8";
  var def = "";
  if(o.defer != null){
  		def = "defer='true'"; 
  } 
  if (o.script && o.script != "") {
  	document.write("<script id='" + o.id + "' " + def + ">" + o.script + "<\/script>");
  }
  else 
  	if (o.url && o.url != "") {
  		document.write("<script id='" + o.id + "' src='" + o.url + "' charset='" + o.charset + "' " + def + "><\/script>");
  	}
  	else {
  		throw new Error("no script content or url specified");
  	}
}

/**
 * @author xp
 * write link tag or style tag to document. Can be used only in page-loading phase.
 * only script text or script url can be accepted. u cant specify none or two of them or an error will be raised
 *
 * 以document.write的方式向页面中写入css
 * @param o {
 *    id : id of the created tag, 
 *    url : String,
 *    styles  : styles text
 *  }
 */
function dwCSS(o){
  o.id = o.id || "";
  if (o.url){
    document.write('<link id="' + o.id + '" rel="stylesheet" type="text/css" href="' + o.url + '" />');
  } else if (o.styles){
    document.write('<style id="' + o.id + '" >'+o.styles+'<\/style>');
  } 
}
/**
 * @author stan | chaoliang@staff.sina.com.cn
 *         fangchao | fangchao@staff.sina.com.cn
 * @param {Object} url
 * @desc load the souce files
 * 
 * @modify 相同文件载入一份
 */
function $import(url){
	if(window.scriptHash == null) {
		window.scriptHash = {};
	}
	if (window.scriptHash[url] != true) {
		window.scriptHash[String(url)] = true;
		var pk = __decode_mode && __dev_mode ? ".packed" : "";
		url = 'http://blogjs.sinajs.cn/v5dev/js/' + __author + '/' + url + pk;
		var o = {};
		o.url = url + "?" + new Date().valueOf();
		dwScript(o);
	}
}
/**
 * @author xp | yanbo@staff.sina.com.cn
 * @desc determine which page it is in
 */
function $getPageId(win){
  return $pageid;
}
/** 
  * @author stan | chaoliang@staff.sina.com.cn
  * @desc get cookie by name 
  */
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  if (arr != null) {
  	return unescape(arr[2]);
  }
   return null;
}
/**
  * check user status by cookie
  * @author stan
  * return Boolean true if the author is visiting its own blog
  */
function checkAuthor(){
	var AuthorInfo = getCookie("nick");
	scope.AuthorUID = AuthorInfo ? AuthorInfo.match(/\(\d{5,10}\)/g)[0].replace(/\(|\)/g, "") : null;
	$UID = scope.AuthorUID || null;
	$isLogin = !!($UID);
	if(typeof $uid == "undefined") {
		$isAdmin = false;
	}
	else {
		$isAdmin = $uid == $UID;
	}
}
var cssReapetConf = {
	"none" : "no-repeat",
	"default":"repeat",
	"h":"repeat-x",
	"v":"repeat-y"
};
var cssPositionXConf = {
	"default" : "center",
	"left":"left",
	"center":"center",
	"right":"right"
};
var cssPositionYConf = {
	"default" : "top",
	"top":"top",
	"center":"center",
	"bottom":"bottom"
};
/**
 * 加载前端页面全部css
 */
function loadCss(){
	fixConfig();
	var cfg = config;
	var cssVer = cfg.v.c+".css";
	var templateNum,tempArray=cfg.s.t.split("_");
	if(cfg.s.r==1 && tempArray[0]!=9){
		templateNum=randomTheme(tempArray[0]);
	}else{
		templateNum=tempArray;
	}
	var dev = __dev_mode ? ".dev" : "";
	dwCSS({url : $BASECSS + 'css/' + 'v5' + dev + '.css?'+cssVer});
	dwCSS({url : $BASECSS + 'css/' + templateNum[0] + "_" + templateNum[1] + '/t.css?'+cssVer,id:"themeLink"});
	writeDiyCss();
}
function writeDiyCss(){
		//writer diy css
	//var path=$isAdmin?imgPath:"http://static.photo.sina.com.cn/orignal/";原有头图方式
		
	if(config.s.head && config.s.head.usepic == "1"){
		//修改访问头图方式
		var num=parseInt(config.s.head.currpic.substring(config.s.head.currpic.length-2,config.s.head.currpic.length),16)%16+1;
		var path=$isAdmin?imgPath:"http://static"+num+".photo.sina.com.cn/orignal/";
		var diycss = {id:"diy_banner"};
		diycss.styles = '.bannerLayout{background:url('+path+config.s.head.currpic+') '+
		cssReapetConf[config.s.head.tiled]+' '+cssPositionXConf[config.s.head.align_h]+' '+cssPositionYConf[config.s.head.align_v]+';height:'+config.s.head.height+'px}';
		dwCSS(diycss);
	}
	if(config.s.bg && config.s.bg.usepic == "1"){
		//修改头图访问方式
		var num=parseInt(config.s.bg.currpic.substring(config.s.bg.currpic.length-2,config.s.bg.currpic.length),16)%16+1;
		var path=$isAdmin?imgPath:"http://static"+num+".photo.sina.com.cn/orignal/";
		var diycss = {id:"diy_bg"};
		diycss.styles = 'body{background-image:url('+path+config.s.bg.currpic+');background-repeat: '+
		cssReapetConf[config.s.bg.tiled]+'; background-position:'+cssPositionXConf[config.s.bg.align_h]+' '+cssPositionYConf[config.s.bg.align_v]+'} .sinaBottom {background:transparent url()}';
		dwCSS(diycss);
	}
}
/**
 * 加载后端页面css
 * 1.不加载模板css
 * 2.只配置较少的css
 * 3.不加载自定义css
 */
function loadMiniCss(){
	fixConfig();
	var cfg = config;
	var cssVer = cfg.v.c+".css";
	var dev = __dev_mode ? ".dev" : "";
	dwCSS({url : $BASECSS + 'css/' + 'v5' + dev + '.css?'+cssVer});
}
/**
 *	模板各个分类的length
 */
var themeLength=[30,30,30,20,20,20,22,30];
/**
 * 随即模板（首页每次刷新都随即，其页面根据cookie随机）
 * @param {Object} themeNum
 */
function randomTheme(themeNum){
	var num,length=themeLength[themeNum-1],cookieTheme=getCookie("sina_blog_random_theme");
	if(/index/.test($pageid)||cookieTheme==null){
		num=getRandomNum(1,length-1);
		setCookie("sina_blog_random_theme",num,2,"/","blog.sina.com.cn",false);
	}else{
		num=cookieTheme;
	}
	//避免因为cookie存储了超过范围的num而引起的乱码问题
	if (num > themeLength[themeNum - 1]) {
		num = themeLength[themeNum - 1] -1;
	}
	return [themeNum,num];
}
/**
 * 取得随即数，>=min,<=max
 * @param {Object} min
 * @param {Object} max
 */
getRandomNum=function(min,max){
	 return min+Math.floor(Math.random()*(max-min+1));  
};
/**
 * 保存cookie
 */
function setCookie(sName,sValue,objHours,sPath,sDomain,bSecure){
	var sCookie = sName + "=" + encodeURIComponent(sValue);
    if (objHours) {
		var date = new Date();
		var ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		sCookie += ";expires=" + date.toGMTString();

	}
    if (sPath) {
		sCookie += ";path=" + sPath;
	}
    if (sDomain) {
		sCookie += ";domain=" + sDomain;
	}
    if (bSecure) {
		sCookie += ";secure";
	}
	document.cookie=sCookie;
}

/**
 * @author stan | chaoliang@staff.sina.com.cn
 * @desc load the js file base the usr login status & page
 */
function loadResource(){
	fixConfig();
	if (__debug_mode) {
		$import('Sina/Sina.js');
		$import('Sina/debug.js');
	}
	if(__dev_mode) {
		$import('Sina/Sina.js');
		$import('Sina/io/io.js')
		$import('Sina/system.base.js');
		$import('Sina/Class.js');
		$import('Sina/events.js');
		$import('Jobs.js');
	}
	var page = $getPageId();
	var cfg = config;
	var jsVer = cfg.v.j+".js";
	var url = __dev_mode 
		?  $BASE + "js/"+ __author + "/conf/" + page + ".dev.js"
		:  $BASE + "js/" + page + ".js";
	dwScript({url : url + "?" + jsVer});
}
function fixConfig (){
	if (scope.fixed) {
		return;
	}
	scope.fixed = true;
	function fix(o, name, value){
		if (o[name] == null || o[name] == -1) {
			o[name] = value;
		}
	}
	if(typeof config == 'undefined'){
		config = {
			info : "cnf5 error!"
		};
		config.s = typeof $conf == 'undefined' ? {} : $conf;
	}
	fix(config.s, "t", "1_1");
	fix(config.s, "r", "0");
	fix(config, "ad", "0");
	fix(config, "v", {});
	fix(config.v, "c", -1);
	fix(config.v, "j", -1);
	fix(config, "src", {x:{a:0,b:0,c:0,d:0},y:{a:0,b:0,c:0,d:0}});
}
function loadSource(){
	loadCss();
	loadResource();
}
function $E(id) {
	return typeof(id) == 'string' ? document.getElementById(id) : id;
}
/**
 * 
 * @param {Object} elm
 * @param {Object} func
 * @param {Object} evType
 * @param {Object} useCapture
 */
function $addEvent2(elm, func, evType, useCapture) {
	elm = $E(elm);
	if(typeof useCapture == 'undefined') useCapture = false;
	if(typeof evType == 'undefined')  evType = 'click';
	if (elm.addEventListener) {
		elm.addEventListener(evType, func, useCapture);
		return true;
	}
	else if (elm.attachEvent) {
		var r = elm.attachEvent('on' + evType, func);
		return true;
	}
	else {
		elm['on' + evType] = func;
	}
};
function $removeEvent2 (oElement, fHandler, sName) {
	var elm = $E(oElement);
	if ("function" != typeof fHandler) return;
	if (oElement.addEventListener) {
		oElement.removeEventListener(sName, fHandler, false);
	}
	else if (oElement.attachEvent) {
		oElement.detachEvent("on" + sName, fHandler);
	}
	fHandler[sName] = null;
}
/**
 * @desc add DOM onload Event
 */
function addDOMLoadEvent(func) {
   if (!window.__load_events) {
      var init = function () {
          // quit if this function has already been called
          if (arguments.callee.done) {
		  	return;
		  }

          // flag this function so we don't do the same thing twice
          arguments.callee.done = true;

          // kill the timer
          if (window.__load_timer) {
              clearInterval(window.__load_timer);
              window.__load_timer = null;
          }

          // execute each function in the stack in the order they were added
          for (var i=0;i < window.__load_events.length;i++) {
              window.__load_events[i]();
          }
          window.__load_events = null;
      };

      // for Mozilla/Opera9
      if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", init, false);
      }

      // for Internet Explorer
      /*@cc_on @*/
      /*@if (@_win32)
          document.write("<scr"+"ipt id=__ie_onload defer src=javascript:void(0)><\/scr"+"ipt>");
          var script = document.getElementById("__ie_onload");
          script.onreadystatechange = function() {
              if (this.readyState == "complete") {
                  init(); // call the onload handler
              }
          };
      /*@end @*/

      // for Safari
      if (/WebKit/i.test(navigator.userAgent)) { // sniff
          window.__load_timer = setInterval(function() {
              if (/loaded|complete/.test(document.readyState)) {
                  init(); // call the onload handler
              }
          }, 10);
      }

      // for other browsers
      window.onload = init;

      // create event function stack
      window.__load_events = [];
   }

   // add function to event stack
   window.__load_events.push(func);
}
/**
 * 
 */
function $debug(){
	if (__debug_mode) {
		Sina.debug.Trace.init(true, false);
		trace("author : " + __author);
		trace("dev_mode : " + __dev_mode);
		trace("----------------------------")
	}else{
		window.traceMSGList = new Array();
		window.trace = function (sMSG, sColor, sBGColor) {
			traceMSGList[traceMSGList.length] = {
				msg: sMSG,
				color: sColor,
				bcolor: sBGColor
			};
		}
		traceError = function (){};
	}
}
/**
 * 
 */
function loadCnf() {
	dwScript({
		url		: "http://blogcnfv5.sinajs.cn/cnf5?uid="+$uid+"&varname=config&.js",
		charset : "utf-8"
	});
	// 如果是小页面，就不加载 Conf 数据了
	if($uid != "0000000000"){
		dwScript({
			url		: "http://uic.sinajs.cn/uic?type=nick&uids=" + $uid + "&varname=nick",
			charset : "UTF-8"
		});
	}
	// 如果页面没定义 loadPromote 或者 loadPromote 设置为 true，载入推广位 JS；
	// 如果页面特别定义 loadPromote 为 false，则不载入，主要是针对小页面
	if(typeof loadPromote == "undefined" || loadPromote == true){
		dwScript({
			url		: "http://blogjs.sinajs.cn/v5js/blogPromote.conf.js?" + Math.random(),
			charset : "UTF-8"
		});
	}
}
function renderBlog() {
	addDOMLoadEvent(function(){
		$debug();
		var mainInit = false;
		var runMain = function () {
			if(mainInit == false) {
				mainInit = true;
				$removeEvent2(window, runMain, "focus");
				$removeEvent2(document, runMain, "mousemove");
				$removeEvent2(document, runMain, "mouseover");
				main();
			}
		}
		if($pageid == "index" || $pageid == "indexM" || $pageid == "article" || $pageid == "articleM") {
			if (document.addEventListener || /msie/.test(navigator.userAgent.toLowerCase())) {
				$addEvent2(window, runMain, "focus");
				$addEvent2(document, runMain, "mousemove");
				$addEvent2(document, runMain, "mouseover");
			}
			else {
				runMain();
			}
		}
		else {
			runMain();
		}
		
	});
}
/**
 * 返回相应的提示文案内容
 * @method showError
 * @param {String} msgline 文案所在索引
 * @param {String} ico 图标索引, 具体见windwoDialog
 * @param {Array} btn 按钮集合
 *		[
 *      		//按钮1设置
 *      		{
 *      		label:	"xxxx",		按钮1文本，默认值“确定”
 *      		func:	"xxxxx",	按钮1函数，默认为空
 *      		focus:	true,		按钮1为默认聚焦，默认第一个按钮聚焦
 *      		css:	""			按钮1样式，默认样式为
 *      		}
 *      		//如果有多个按钮，就用逗号分隔多个按钮对象的定义
 *      ]
 * @param {String} target 调用哪个窗口的showError 可选值
 * @exception
 *      showError("提示信息", "01");
 *      showError("提示信息", null, [{label: "确定按钮"}], "parent");
 */

function showError(msgline, ico, btn, target) {
		if(msgline == "00007" || msgline == "00008" || msgline == "00009" || msgline == "00010"){
			var go2Url = {
				"00007": "http://blog.sina.com.cn/main_v5/ria/auto_signup.html?uid=" + $UID,
				"00008": "http://blog.sina.com.cn/main_v5/ria/auto_signup.html?uid=" + $UID,
				"00009": "http://control.blog.sina.com.cn/admin/reg/signup.php?pro=blog",
				"00010": "http://blog.sina.com.cn/main_v5/ria/notopen.html"
				}
			window.location.href = go2Url[msgline];
			return false;
		}
	// 新的调用方法
	if (typeof ico == "object" && ico != null) {
		ico.target = ico.target || window;
		ico.type = ico.type || 0;
		ico.ico = ico.ico || "03";
		// 新增关闭按钮的显示与否
		//ico.close = ico.close == null? true: ico.close;
		var str = "";
		if(ico.type == 1) {
			str = msgline;
		}
		else {
			str = $SYSMSG[msgline || "00001"];
		}
		ico.target.windowDialog.msgbox(str, {
			width: 300,
			user_btn: ico.btn,
			icon: ico.ico || "03",
			close: ico.close
		});
	}
	// 兼容老调用方法
	else {
		var msgStr = "";
		if (target != "window") {
			msgStr = $SYSMSG[msgline];
			msgStr = msgStr ? msgStr : $SYSMSG["00001"];
		}
		if (target == "parent") {
			parent.showError(msgStr, ico, btn, "window");
		}
		if (target == "window") {
			windowDialog.msgbox(msgline, {
				icon: ico || "03",
				width: 300,
				user_btn: btn
			});
		}
		if (target == null) {
			showError(msgStr, ico, btn, "window")
		}
	}
}
/**
 * 用于整合作序systemMsg;
 */
function $ExtendSystemMsg(info, override){
	for(var i in info)
		$SYSMSG[i] = !!override == false ? info[i] : $SYSMSG[i];
}
//- start -
loadCnf();

function trace(){}

try {
	document.execCommand("BackgroundImageCache", false, true);
} catch (e) {}
