/*
 Author : lvxuhui@intra.nsfocus.com
 Datetime : 2008-12-8
 Last Eidt: 2009-6-15
 other :zhangjianguang@intra.nsfocus.com
 Datetime : 2009-11-23
 Last Edit: 2010-6-9 selectMu
 Using:
	UI.animate();  <=> UI.animate(UI.G('news_bar'),'opacity',0);
	UI.tip();	//Create Title Tip
	UI.tipBox();	//Create TipBox With 'tipBox' Class Name
	UI.resize();	//Create Resize With 'Resize' Class Name
	UI.select();	//Set Style For Select:<span class="cmn_select"><select/></span>
	UI.gotop(); <=> UI.gotop('id');	//Create Gotop Tool
	UI.ShowBar(); <=> oNews = new UI.ShowBar({name:'oNews',id:'news_bar',action:'marginTop',page:'mouseover',autoplay:false,pause:true,connect:true,speed:2000});
	UI.Select(); <=> oType = new UI.Select({name:'oType',id:'select_type'});
	UI.Dialog(); <=> var dialog = new UI.Dialog({name:'dialog',title:'',url:'',width:200,height:200,call:function(){},close:true,move:true,resize:true});
	UI.pageTable();<=>var page=new UI.pageTable(50,'more_table');
	new UI.Warning;》var tipWarn = new UI.Warning({html:"来无收到了来看<br/><a href='#' onclick='tipWarn.hide()'>更新信息</a>",width:"500",height:"300",fun:function(){alert("弹出已关闭")}});
*/

String.prototype.hasString = function(o) { //If Has String
	if (typeof o == 'object') {
		for (var i=0,n = o.length;i < n;i++) {
			if (!this.hasString(o[i])) return false;
		}
		return true;
	}
	else if (this.indexOf(o) != -1) return true;
}
String.prototype.breakWord = function(n,s) {
	if (!s) s = '<wbr/>';
	return this.replace(RegExp('(\\w{' + (n ? n : 0) + '})(\\w)','g'),function(all,str,char){
		return str + s + char;
	});
}
var UI = {
	tip : function() {
		this.Tip.build();
	},
	tipBox : function(o,n) {
		if (UI.isString(o)) {
			n = o;
			o = document.documentElement;
		}
		if(!o) o = document.documentElement;

		var n = '.' + (n ? n : 'tipBox');
		var name = '__tipBox';
		var tag = 'tipbox';
		var delay;

		UI.each(UI.GC(o,n),function(o){
			o.style.cursor="pointer"
			UI.A(o,tag,o.title);
			o.title = '';
			if(UI.parent(o).className=="tools"||UI.parent(UI.parent(o)).className=="tools"){UI["tools"] = new UI.TipBox({name:'UI.tools'});}
			var open = function(e){
				var t = UI.E(e).target,html = UI.A(t,tag);
				if (!html) {
					var parents = UI.parents(t,n.slice(1));
					if (parents.length > 0) {
						t = parents[0];
						html = UI.A(t,tag);
					}
					else return false;
				}
				delay = setTimeout(function(){
					var p = {html:html,target:t};//.breakWord(5)
					if (html.length > 700){p.large = true;}
					else {p.large=false;}
					if(UI.parent(o).className=="tools"||UI.parent(UI.parent(o)).className=="tools"){p.resize=true;UI["tools"].show(p);}
					else UI[name].show(p);
				},200);
				//alert(delay + 'add');//连续被触发？
				//if(UI.parent(o).className=="tools"){UI[name] = new UI.TipBox({name:'UI.' + name});}
			}
			UI.EA(o,'mouseover',open);
			UI.EA(o,'focus',open);
			UI.EA(o,'mouseout',function(e){
				clearTimeout(delay);
				//alert(delay);
			});
		});
		UI.ready(function(){
			UI[name] = new UI.TipBox({name:'UI.' + name});
		});
	},
	select : function(n) {
		this.Select.build(n);
	},
	selectMulti : function(o,n) {
		if (UI.isString(o)) {
			n = o;
			o = document.documentElement;
		}
		if(!o) o = document.documentElement;

		var n = '.' + (n ? n : 'selectMulti');
		
		UI.each(UI.GC(o,n),function(o,i){
			var name = 'selectMulti_' + new Date().getTime() + i;
			o.name = name;
			window[name] = new UI.SelectMulti(o);
		});
	},
	resize : function(n,config) {
		var arr = UI.isObject(n) ? [n] : UI.GC(n);
		UI.each(arr,function(o){
			if('TEXTAREA,SELECT,INPUT,BUTTON,IMG'.hasString(o.nodeName)) {
				var tipBox = '',title = ''; //Hack tipBox
				if (UI.hasClass(o,'tipBox')) {
					UI.removeClass(o,'tipBox');
					tipBox = ' tipBox';
					title = ' title="' + o.title + '"';
					o.title = '';
					UI.EA(o,'click',function(e){
						UI.E(e).stop();
					})
				}
				UI.wrap('<span class="resize_box' + tipBox + '"' + title + '><b class="ico"></b><span></span></span>',o);
			}
			else {
				var B = UI.html('<b class="ico"></b>')[0];
				o.appendChild(B);
			}
			new UI.Resize(o,config);
		});
	},
	gotop : function(n) {
		this.Gotop.build(n);
	},
	ajax : function(o) { // UI.ajax({type:'',url:'json.html',data:'',success:''})
	},
	get : function(url,o,f) { // UI.get('json.html',{name:''},function(data){ alert(data); })
		if (window.ActiveXObject){
			var xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}else if (window.XMLHttpRequest){
			var xmlHttp = new XMLHttpRequest();
		}
		xmlHttp.onreadystatechange = function(){
			if (xmlHttp.readyState == 4){// && xmlHttp.status == 200
				f(xmlHttp.responseText);
			}else{
				return false;
			}
		}
		if (o != undefined) {
			url += '?' + o;
		}
		xmlHttp.open('GET',url,true)
		xmlHttp.send(null);
	},
	getScript : function(s,call){ //Cache?
		var el = UI.DC('script');
		if (call) {
			el.onload =el.onreadystatechange=call;//
		}
		UI.A(el,'type','text/javascript');
		UI.A(el,'src',s);
		UI.GT(document,'head')[0].appendChild(el);
	},
	getCss : function(s,call){
		var el = UI.DC('link');
		if (call) {
			el.onload = call;
		}
		UI.A(el,'rel','stylesheet');
		UI.A(el,'type','text/css');
		UI.A(el,'href',s);
		UI.GT(document,'head')[0].appendChild(el);
	},
	evalScript : function(s){
		var r = this.regExp.script;
		var s = s.match(new RegExp(r,'img'));
		UI.each(s,function(e){
			eval(e.match(new RegExp(r,'im'))[1]);
		})
	},
	regExp : {
		script : '<script[^>]*>([\\S\\s]*?)<\/script>'
	},
	url : {
		encode : function (s) {
			return escape(this._utf8_encode(s));
		},
		decode : function (s) {
			return this._utf8_decode(unescape(s));
		},
		_utf8_encode : function (s) {
			s = s.replace(/\r\n/g,'\n');
			var utftext = '';
			for (var n = 0; n < s.length; n++) {
				var c = s.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
			return utftext;
		},
		_utf8_decode : function (utftext) {
			var string = '';
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	},
	parseUrl : function() {
		var url = document.location.href,v = {};
		if (!url.hasString('?')) return v;
		var str = url.split('?')[1].split('&');
		for (var i=0;i<str.length;i++) {
			var value = str[i].split('=');
			v[value[0]] = UI.Browser.ie ? value[1] : UI.url.decode(value[1]);
		}
		return v;
	},
	cookie : function(n,v,d) { //Cookie
		if (v == undefined) {
			var N = n + '=',C = document.cookie.split(';');
			for(var i=0;i<C.length;i++) {
				var c = C[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(N) == 0) return decodeURIComponent(c.substring(N.length,c.length));
			}
			return null;
		}
		else {
			var k = '';
			if (d) {
				var D = new Date();
				D.setTime(D.getTime() + d * 24 * 60 * 60 * 1000);
				k = '; expires=' + D.toGMTString();
			}
			document.cookie = n + '=' + v + k + '; path=/';
		}
	},
	drag : function(o,f,captrue) {
		var D = document,captrue = captrue != undefined ? captrue : true;
		UI.EA(o,'mousedown',function(e){
			if (f.start) f.start(e);//start

			if (captrue) {
				if(o.setCapture) o.setCapture();
				else if(window.captureEvents) window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			}

			if (f.drag) D.onmousemove = f.drag; //drag
			D.onmouseup = function(){
				if (captrue) {
					if(o.releaseCapture) o.releaseCapture();
					else if(window.captureEvents) window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
				}

				if (f.stop) f.stop(e); //stop
				D.onmousemove = null;
				D.onmouseup = null;
				if (f.call) f.call(e); //call
			}
		})
	},
	animate : function(o,name,num,call) { // UI.animate(UI.G('news_bar'),'width',100)
		var delay = setInterval(function(){
			var cur = UI.C(o,name);
			if (name == 'opacity') {
				cur = cur*100;
				num *= 100;
			}
			else cur = ( cur=='auto' ? 0 : Number(cur.slice(0,-2)) );
			if (Math.abs(num - cur) < 3) {
				cur = num;
				clearInterval(delay);
				eval(call);
			}
			UI.C(o,name,(name != 'opacity' ? (cur + (num-cur)*0.4 ) + 'px' : (cur + (num-cur)*0.4 )/100 + ''));
		},40);
		return delay;
	},
	getX : function(o) {
		return o.offsetParent ? o.offsetLeft + UI.getX(o.offsetParent) : o.offsetLeft;
	},
	getY : function(o) {
		return o.offsetParent ? o.offsetTop + UI.getY(o.offsetParent) : o.offsetTop;
	},
	frameX : function(o) {
		return o.frameElement ? UI.getX(o.frameElement) + UI.frameX(o.parent) : 0;
	},
	frameY : function(o) {
		return o.frameElement ? UI.getY(o.frameElement) + UI.frameY(o.parent) : 0;
	},
	width : function(o) {
		return parseInt(o.offsetWidth);
	},
	height : function(o) {
		return parseInt(o.offsetHeight);
	},
	pageWidth : function() {
		return document.body.scrollWidth || document.documentElement.scrollWidth;
	},
	pageHeight : function() {
		return document.body.scrollHeight || document.documentElement.scrollHeight;
	},
	windowWidth : function() {
		var E = document.documentElement;
		return self.innerWidth || (E && E.clientWidth) || document.body.clientWidth;
	},
	windowHeight : function() {
		var E = document.documentElement;
		return self.innerHeight || (E && E.clientHeight) || document.body.clientHeight;
	},
	scrollX : function(o) {
		var E = document.documentElement;
		if (o) {
			var P = o.parentNode,X = o.scrollLeft || 0;
			if (o == E) X = UI.scrollX();
			return P ? X + UI.scrollX(P) : X;
		}
		return self.pageXOffset || (E && E.scrollLeft) || document.body.scrollLeft;
	},
	scrollY : function(o) {
		var E = document.documentElement;
		if (o) {
			var P = o.parentNode,Y = o.scrollTop || 0;
			if (o == E) Y = UI.scrollY();
			return P ? Y + UI.scrollY(P) : Y;
		}
		return self.pageYOffset || (E && E.scrollTop) || document.body.scrollTop;
	},
	scrollTo : function(o,x,y) {
		if (o == document.documentElement || o == document.body) {
			return window.scrollTo(x,y);
		}

	},
	hide : function(o) {
		if (UI.isString(o)) o = this.G(o);
		var curDisplay = this.C(o,'display');
		if (curDisplay != 'none') {
			o.__curDisplay = curDisplay;
		}
		o.style.display = 'none';
	},
	show : function(o) {
		if (UI.isString(o)) o = this.G(o);
		o.style.display = o.__curDisplay || '';
	},
	toggle : function(o) {
		if (UI.isString(o)) o = this.G(o);
		if (this.C(o,'display') == 'none') {
			this.show(o);
		}
		else this.hide(o);
	},
	hasClass : function(o,n){
		return o.className != o.className.replace(new RegExp('\\b' + n + '\\b'),'');
	},
	addClass : function(o,n){
		if (!o.className) {
			o.className = n;
		}
		else if (this.hasClass(o,n)) {
			return false;
		}
		else o.className += ' ' + n;
	},
	removeClass : function(o,n){
		o.className = o.className.replace(new RegExp('\\b' + n + '\\b'),'');
	},
	toggleClass : function(o,n){
		if (this.hasClass(o,n)) this.removeClass(o,n);
		else this.addClass(o,n);
	},
	node : {
		ELEMENT : 1,
		ATTRIBUTE : 2,
		TEXT : 3,
		CDATA_SECTION : 4,
		ENTITY : 6,
		COMMENT : 8,
		DOCUMENT : 9,
		DOCUMENT_TYPE : 10
	},
	next : function(o) {
		var n = o.nextSibling;
		if (n == null) return false;
		return UI.isElement(n) ? n : this.next(n);
	},
	prev : function(o) {
		var n = o.previousSibling;
		if (n == null) return false;
		return UI.isElement(n) ? n : this.prev(n);
	},
	append : function(o,t) {
		t.appendChild(o);
	},
	prepend : function(o,t) {
		var first = t.firstChild;
		if (first) UI.before(o,first);
		else UI.append(o,t);
	},
	after : function(o,t) {
		var P = t.parentNode;
		if(P.lastChild == o) P.appendChild(o);
		else P.insertBefore(o,t.nextSibling);
	},
	before : function(o,t) {
		t.parentNode.insertBefore(o,t);
	},
	replace : function(o,t) {
		var P = t.parentNode;
		/*UI.before(o,t);
		P.removeChild(t);*/
		P.replaceChild(o,t);
	},
	swap : function(o,t) {
		
	},
	wrap : function(o,t) {
		if (UI.isString(o)) {
			var reg = o.match(/(<[^\/][^<]*>)/g),name = 'wrapObject___';
			var last = RegExp.lastMatch;
			o = o.replace(last,last + '<pre class="' + name + '"></pre>');
			var tmp = UI.html(o)[0];
			UI.before(tmp,t);
			UI.replace(t,UI.GC(tmp,'pre.' + name)[0]);
		}
		else {
			UI.before(o,t);
			t.appendChild(t);
		}
	},
	html : function(s) {
		var wrap = UI.DC('div'),tmp = [];
		wrap.innerHTML = s;
		UI.each(wrap.childNodes,function(o){
			tmp.push(o);
		});
		return tmp;
	},
	text : function text(el) {//待完善
		var str = [],e = el.childNodes;
		for (var i = 0,num = e.length;i < num;i++) {
			str.push(e[i].nodeType != 1 ? e[i].nodeValue : text(e[i]));
		}
		return str.join('');
	},
	parent : function(o,n) {
		if (UI.isArray(o)) {
			var tmp = [];
			UI.each(o,function(o){
				if ((n && UI.hasClass(o.parentNode,n)) || !n) tmp.push(o.parentNode);
			});
			return tmp;
		}
		return o.parentNode;
	},
	parents : function(o,n) {
		if (n) {
			var tmp = [],arr = UI.parents(o);
			UI.each(arr,function(o){
				if (UI.hasClass(o,n)) {
					tmp.push(o);
				}
			});
			return tmp;
		}
		var P = o.parentNode;
		return P.nodeName == 'HTML' ? [P] : [P].concat(UI.parents(P));
	},
	children : function(o,n) {
		var tmp = [];
		UI.each(o.childNodes,function(o){
			if (UI.isElement(o) && (!n || UI.hasClass(o,n))) tmp.push(o);
		});
		return tmp;
	},
	A : function(o,n,v) {
		if (v==undefined) {
			return o.getAttribute(n);
		}
		else o.setAttribute(n,v);
	},
	C : function(o,n,v) { //CSS
		if (v==undefined) { //Get Style
			if (o.currentStyle) {
				if (n=='opacity') {
					return o.style.filter.indexOf('opacity=') >= 0 ? (parseFloat( o.style.filter.match(/opacity=([^)]*)/)[1] )/100):'1';
				}
				return o.currentStyle[n];
			}
			else if (window.getComputedStyle) {
				n = n.replace (/([A-Z])/g, '-$1');
				n = n.toLowerCase ();
				return window.getComputedStyle (o, null).getPropertyValue(n);
			}
		}
		else {
			if (n=='opacity' && UI.Browser.ie) {
				o.style.filter = (o.filter || '').replace( /alpha\([^)]*\)/, '') + 'alpha(opacity=' + v * 100 + ')';
			}
			else o.style[n] = v;
		}
	},
	DC : function(n) { //Dom Create Element
		return document.createElement(n);
	},
	E : function(e) {
		if (e && e.clone) return e;
		e = window.event || e;
		return {
			clone : true,
			stop : function() {
				if (e && e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true;
			},
			prevent : function(){
				if (e && e.preventDefault) e.preventDefault();
				else e.returnValue = false;
			},
			target : e.target || e.srcElement,
			x : e.clientX || e.pageX,
			y : e.clientY || e.pageY,
			button : e.button,
			key : e.keyCode,
			shift : e.shiftKey,
			alt : e.altKey,
			ctrl : e.ctrlKey,
			type : e.type
		};
	},
	EA : function (o,n,f,capture) {
		if (UI.isString(o)) {
			var tmp = f;
			f = function(e) {
				eval(tmp);
			}
		}
		if(o.addEventListener) {
			o.addEventListener(n,f,capture);
			return true;
		}
		else if(o.attachEvent) {
			var r = o.attachEvent('on'+n,f);
			//UI.EventCache.add(o,evType,fn);
			return r;
		}
		else return false;
	},
	ER : function (o,n,f) {
		if(o.removeEventListener) {
			o.removeEventListener(n,f,false);
			return true;
		}
		else if(o.detachEvent) {
			var r=o.detachEvent('on'+n,f);
			return r;
		}
		else return false;
	},
	ET : function(e) { //Event Target
		return e.target||e.srcElement;
	},
	G : function(n) {
		return document.getElementById(n);
	},
	GT : function(o,n) {
		return o.getElementsByTagName(n);
	},
	GC : function (o,n) { //getElementByClassName -> UI.GC('a.hide.red')
		var arr,t,l,el = [];
		if (arguments.length == 1) {
			arr = o.split('.');
			o = document;
		}
		else arr = n.split('.');
		t = arr[0] == '' ? '*' : arr[0];
		arr.shift();
		l = this.GT(o,t);
		for (var i=0 in arr) {
			arr[i] = '&' + arr[i] + '&';
		}
		for(var i = 0,n = l.length;i < n;i++) {
			var c = '&' + l[i].className.replace(/ /g,'& &') + '&';
			if(c.hasString(arr)) el.push(l[i]);
		}
		/* //Another Method (Spend More Time)
		for(var i = 0,n = l.length;i < n;i++) {
			var m = l[i].className.match(new RegExp('\\b' + arr.join('\\b|\\b') + '\\b','g'));
			if(m && m.length == arr.length) el.push(l[i]);
		}
		*/
		return el.length > 0 ? el : false;
	},
	isDate : function(o) {
		if (!o) return o;
		if (o.getTime && o.getFullYear && o.getTimezoneOffset && o != 'NaN' && o != 'Invalid Date') return true;
	},
	cloneDate : function(v) {
		if (!v) return v;
		d = new Date();
		d.setTime(v.getTime());
		return d;
	},
	formatDate : function(v,f) {
		var F = f.replace(/\W/g,',').split(','),format = ['yyyy','MM','dd','hh','mm','ss','ww'];
		var date = {
			y : v.getFullYear(),
			M : v.getMonth() + 1,
			d : v.getDate(),
			h : v.getHours(),
			m : v.getMinutes(),
			s : v.getSeconds(),
			w : v.getDay()
		};
		for (var i = 0,num = F.length;i < num;i++) {
			var o = F[i];
			for (var j = 0;j < 7;j++) {
				var S = format[j].slice(-1);
				if (o.hasString(S)) {
					if (S == 'w' && date[S] == 0) date[S] = 7; //Sunday
					if (o.hasString(format[j])) {
						f = f.replace(RegExp(format[j],'g'),this.addZero(date[S]));
					}
					else f = f.replace(RegExp(format[j].slice(format[j].length/2),'g'),date[S]);
				}
			}
		}
		return f;
	},
	parseDate : function(v,f) {
		if (!f) f = 'yyyy-MM-dd';
		f = f.replace(/\W/g,',').split(',');
		v = v.replace(/\D/g,',').split(',');
		var y = 2000,M = 0,d = 1,h = 0,m = 0,s = 0,D = true;
		UI.each(f,function(o,i){
			if (v[i] == '' || isNaN(v[i])) D = false;
			if (o.hasString('y')) y = Number(v[i]);
			if (o.hasString('M')) M = Number(v[i]) - 1;
			if (o.hasString('d')) d = Number(v[i]);
			if (o.hasString('h')) h = Number(v[i]);
			if (o.hasString('m')) m = Number(v[i]);
			if (o.hasString('s')) s = Number(v[i]);
			if (o.hasString('w')) s = Number(v[i]);
		});
		if (!D) return false;
		return new Date(y,M,d,h,m,s);
	},
	isArray : function(o) {
		return o !== null && UI.isObject(o) && 'splice' in o && 'join' in o;
	},
	isElement : function(o) {
		return o && o.nodeType == 1;
	},
	isFunction : function(o) {
		return typeof o == 'function';
	},
	isNumber : function(o) {
		return typeof o == 'number';
	},
	isObject : function(o) {
		return typeof o == 'object';
	},
	isString : function(o) {
		return typeof o == 'string';
	},
	isUndefined : function(o) {
		return typeof o == 'undefined';
	},
	addZero : function(o,n) {
		var tmp = [],l = String(o).length;
		if (!n) n = 2;
		if (l < n) {
			for (var i = 0;i < n - l;i++) {
				tmp.push(0);
			}
		}
		tmp.push(o);
		return tmp.join('');
	},
	trim : function(o) {
		return o.replace(/^\s+|\s+$/g,'');
	},
	random : function(a,b) {
		if (a == undefined) a = 0;
		if (b == undefined) b = 9;
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	has : function(o,v) {
		for (var i = 0,n = o.length;i < n;i++) {
			if (o[i] == v) return true;
		}
		return false;
	},
	each : function(o,f) {
		if(UI.isUndefined(o[0])){
			for (var key in o){
				if(!UI.isFunction(o[key])) f(key,o[key]);
			}
		}
		else{
			for(var i = 0,n = o.length;i < n;i++){
				if(!UI.isFunction(o[i])) f(o[i],i);
			}
		}
	},
	map : function(o,f) {
		if (UI.isString(f)) f = eval('(function(a,i) { return ' + f + '})');
		var tmp = [];
		UI.each(o,function(o,i){
			var v = f(o,i);
			if (UI.isArray(v)) {
				tmp = tmp.concat(v);
			}
			else tmp.push(v);
		});
		return tmp;
	},
	grep : function(o,f) {
		if (UI.isString(f)) f = eval('(function(a,i) { return ' + f + '})');
		var tmp = [];
		UI.each(o,function(o,i){
			if (f(o,i)) tmp.push(o);
		});
		return tmp;
	},
	merge : function(A,B) {
		var tmp = [];
		if (B) { //Merge A + B
			UI.each(B,function(o,i){
				if (!UI.has(A,o)) tmp.push(o);
			});
			return A.concat(tmp);
		}
		else { //Merge Same Value For A
			UI.each(A,function(o,i){
				if (!UI.has(tmp,o)) tmp.push(o);
			});
			return tmp;
		}
	},
	apart : function(A,B) {
		var tmp = [];
		UI.each(A,function(o,i){
			if (!UI.has(B,o)) tmp.push(o);
		});
		return tmp;
	},
	sort : {
		number : function(a,b) {
			return a - b;
		},
		numberDesc : function(a,b) {
			return b - a;
		},
		string : function(a,b) {
			return a.localeCompare(b);
		},
		stringDesc : function(a,b) {
			return b.localeCompare(a);
		}
	},
	ready : function(f) {
		if (UI.ready.done) return f();
		if (UI.ready.timer) {
			UI.ready.ready.push(f);
		}
		else {
			//UI.EA(window,'load',UI.isReady);
			UI.ready.ready = [f];
			UI.ready.timer = setInterval(UI.isReady,13);
		}
	},
	isReady : function() {
		if (UI.ready.done) return false;
		if (document && document.getElementsByTagName && document.getElementById && document.body) {
			clearInterval(UI.ready.timer);
			UI.ready.timer = null;
			for (var i = 0;i < UI.ready.ready.length;i++)
				UI.ready.ready[i]();
			UI.ready.ready = null;
			UI.ready.done = true;
		}
	},
	Browser : (function(){
		var b = {},i = navigator.userAgent;
		b.ie6 = i.hasString('MSIE 6') && !i.hasString('MSIE 7') && !i.hasString('MSIE 8');
		b.ie = i.hasString('MSIE');
		b.tt = i.hasString('TencentTraveler');
		b.opera = i.hasString('Opera');
		b.safari = i.hasString('WebKit');
		b.maxthon = !!(window['external'] && window['external']['max_version']);
		return b;
	})()
};
UI.Flash = function(o,src,width,height) {
	o.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+width+'" height="'+height+'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0"><param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="'+src+'" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><embed src="'+src+'" width="'+width+'" height="'+height+'" quality="high" wmode="transparent" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"/></object>';
}
UI.DropMenu = function(o) { //UI.DropMenu({id:'menu',menu:'menu_list',multi:true,max:15,type:['click','mouseover']});
	o.open = false; //Menu Open Status To Reduce Memory
	if (UI.isString(o.id)) o.id = UI.G(o.id);
	if (o.max == undefined) o.max = 10; //Max Height
	if (o.type == undefined) o.type = ['click','click']; //o.type = [open,close]
	else if (o.type.length == 1) o.type = [o.type,o.type];
	if (o.menu != undefined) {
		if (UI.isString(o.menu)) o.menu = UI.G(o.menu);
		if (!o.id || !o.menu) return false;
		if (o.multi) { //Multi Select
			o.parent = o.id.parentNode;
			var li = UI.GT(o.menu,'li');
			if (li.length > o.max) {
				var height = UI.C(li[0],'height');
				height = height == 'auto' ? 20 : height.slice(0,-2);
				o.menu.style.height = o.max * height + 'px';
				o.menu.style.overflow = 'auto';
			}
		}
		UI.EA(document,o.type[1],function(e){ //Document
			if (o.open) {
				if (UI.E(e).target != o.id) {
					UI.hide(o.menu);
					if (o.multi) UI.removeClass(o.parent,'on');
					o.open = false;
				}
			}
		});
		UI.EA(o.id,o.type[0],function(e){ //Menu
			if (o.type == 'mouseover') {
				UI.E(e).stop();
				UI.show(o.menu);
			}
			else UI.toggle(o.menu);
			if (o.multi) UI.toggleClass(o.parent,'on');
			o.open = o.menu.style.display == 'block' ? true : false;
		});
		if (o.hover) {
			UI.EA(o.id,'mouseover',function(e){
				UI.addClass(this,o.hover);
			});
			UI.EA(o.id,'mouseout',function(e){
				UI.removeClass(this,o.hover);
			});
		}
		UI.EA(o.menu,o.type[1],function(e){ //Menu list
			UI.E(e).stop();
		});
	}
	else {
		
	}
}
UI.ShowBar = function(o) {
	//Element
	this._body = UI.G(o.id);
	if (!this._body) return false;
	this._cont = UI.GC(this._body,'.cont')[0];
	this._li = UI.GT(this._cont,'li');
	this._first = this._li[0];
	this._next = UI.GC(this._body,'.next')[0];
	this._prev = UI.GC(this._body,'.prev')[0];
	
	//Option
	o.speed = o.speed||1500;
	this.cur = 1;
	this.num = this._li.length;
	this.animate = o.animate != undefined ? o.animate : true;
	this.autoplay = o.autoplay != undefined ? o.autoplay : true;
	this.pause = o.pause; //Stop Play When Mouseover Cont
	this.connect = o.connect; //No Disconnected
	this.step = Number(UI.C(this._first,o.action == 'marginTop' ? 'height' : 'width').slice(0,-2));
	this.delay = setInterval('if (' + o.name + '.autoplay) ' + o.name + '.next()',o.speed);
	this.delay2 = null; //Animate
	this.page = o.page;
	this.tmp_cur = 0;
	
	//Connect
	if (this.connect) this._li[0].parentNode.appendChild(this._li[0].cloneNode(true));
	//Page
	if (this.page) {
		if (UI.GC(this._body,'.page').length>0) {
			this._page = UI.GC(this._body,'.page')[0];
			this._li2 = UI.GT(this._page,'li');
			for (var i=0;i<this.num;i++) {
				UI.EA(this._li2[i],this.page,o.name + '.play(' + (i + 1) + ')');
			}
		}
		else {
			this._page = UI.DC('ul'),html=[];
			this._page.className = 'page';
			for (var i=0;i<this.num;i++) {
				html[i] = '<li '+ (!i ? 'class="on" ': '') +'on' + this.page + '="' + o.name + '.play(' + (i + 1) + ')">' + (i + 1) + '</li>';
			}
			this._page.innerHTML = html.join('');
			this._body.appendChild(this._page);
			this._li2 = UI.GT(this._page,'li');
		}
	}
	//Opacity
	if (o.action == 'opacity') {
		for (var i=0;i<this.num;i++) {
			UI.C(this._li[i],'opacity',0);
		}
		UI.C(this._li[0],'opacity',1);
	}
	
	//Event
	this._next.onclick = function(){ eval(o.name + '.next()'); }
	this._prev.onclick = function(){ eval(o.name + '.prev()'); }
	this._first.parentNode.onmouseover = function(){ eval('if(' + o.name + '.pause) clearInterval(' + o.name + '.delay)'); }
	this._first.parentNode.onmouseout = function(){ eval('if(' + o.name + '.pause) ' + o.name + '.delay = setInterval(\'' + o.name + '.next()\',' + o.speed + ')'); }
	this._next.onmouseover = this._prev.onmouseover = this._first.parentNode.onmouseover;
	this._next.onmouseout = this._prev.onmouseout = this._first.parentNode.onmouseout;

	//Function
	this.show = function(){
		if (this.page) {
			if (this.tmp_cur != null) {
				this._li2[this.tmp_cur].className = '';
			}
			var cur_page = this.cur>this.num ? 0 : this.cur-1;
			this._li2[cur_page].className = 'on';
			this.tmp_cur = cur_page;
		}
		if (this.animate) {
			clearInterval(this.delay2);
			if (o.action == 'opacity') {
				this.delay2 = UI.animate(this._li[this.cur-1],o.action,1,'clearInterval(' + o.name + '.delay2);');
				//UI.animate(this._li[this.tmp_cur],o.action,0);
				this.tmp_cur = this.cur>this.num ? 0 : this.cur-1;
			}
			else this.delay2 = UI.animate(this._first,o.action,-this.step * (this.cur-1),'clearInterval(' + o.name + '.delay2);');
		}
		else {
			if (o.action == 'opacity') {
				//this._li[this.cur-1].style.display = 'none';
			}
			else this._first.style[o.action] = -this.step * (this.cur-1) + 'px';
		}
	}
	this.next = function(){
		this.cur++;
		if (this.connect) {
			if (this.cur > this.num+1) {
				this._first.style.marginTop = '';
				this.cur = 2;
			}
		}
		else if (this.cur > this.num) this.cur = 1;
		this.show();
	}
	this.prev = function(){
		this.cur--;
		if (this.cur < 1) this.cur = this.num;
		this.show();
	}
	this.play = function(n){
		this.cur = n;
		this.show();
	}
}
UI.Tip = { //Title Tip
	wrap : UI.DC('div'),
	build : function() {
		this.wrap.className = 'cmn_tip';
		this.wrap.innerHTML = '<iframe src="javascript:false;" style="display:none;position:absolute;z-index:-1;"></iframe><div class="cont"></div>';
		this.cover = UI.GT(this.wrap,'iframe')[0];
		this.cont = UI.GT(this.wrap,'div')[0];
		this.wrap.appendChild(this.cont);
		document.body.appendChild(this.wrap);
		UI.EA(document,'mouseover',function(e) {
			e = window.event || e;
			var o = UI.ET(e);
			if (o.title) {
				var css = UI.Tip.wrap.style,html=document.documentElement,body=document.body,W,H,T,L;
				W = html.clientWidth;
				H = html.clientHeight;
				T = html.scrollTop||body.scrollTop;
				L = html.scrollLeft||body.scrollLeft;
				UI.Tip.cont.innerHTML = o.title;
				o.title = '';
				css.cssText = '';
				e.clientY < H/2 ? css.top = e.clientY + T + 'px':css.bottom = H - e.clientY - (UI.Browser.ie6 ? 0:T) + 'px';
				e.clientX < W/2 ? css.left = e.clientX + L + 12 + 'px':css.right = W - e.clientX - L + 12 + 'px';
				UI.Tip.show();
				if (UI.Browser.ie6) {
					var cover = UI.Tip.cover.style,cont = UI.Tip.cont;
					cover.display = 'block';
					cover.width = cont.offsetWidth+'px';
					cover.height = cont.offsetHeight+'px';
				}
			}
		});
		UI.EA(document,'mouseout',function(e) {
			if (UI.Tip.cont.innerHTML) {
				e = window.event || e;
				var o = UI.ET(e);
				o.title = UI.Tip.cont.innerHTML;
				UI.Tip.cont.innerHTML = '';
				UI.Tip.hide();
			}
		});
	},
	show : function(e) {
		this.wrap.style.display = 'block';
	},
	hide : function() {
		this.wrap.style.display = 'none';
	}
}
UI.Select = function(o) {
	this._body = UI.G(o.id);
	this._input = UI.GT(this._body,'input')[0];
	this._select = UI.GT(this._body,'select')[0];
	this._ul = UI.DC('ul');
	
	this._input.value = this._select.options[this._select.selectedIndex].innerHTML;
	this.cur = this._select.selectedIndex;

	var li = [];
	for (var i=0;i<this._select.options.length;i++) {
		var text = this._select.options[i].innerHTML;
		li[i] = '<li' + ( text==this._input.value ? ' class="on"' : '' ) + ' onmouseover="UI.addClass(this,\'hover\')" onmouseout="UI.removeClass(this,\'hover\')" onclick="' + o.name + '.select(this.innerHTML,' + i + ');UI.addClass(this,\'on\')" title="' + text + '">' + text + '</li>'
	}
	this._ul.innerHTML = li.join('');
	this._body.appendChild(this._ul);
	this._li = UI.GT(this._ul,'li');

	if (UI.Browser.ie6) {
		this._cover = UI.DC('div');
		this._cover.style.cssText = 'position:absolute;';
		this._cover.innerHTML = '<iframe src="javascript:false;" style="position:absolute;z-index:-1;"></iframe>';
		this._body.appendChild(this._cover);
		var iframe = UI.GT(this._cover,'iframe')[0];
	}

	UI.EA(this._body,'click','UI.toggleClass(' + o.name + '._body,"on");' + o.name + '.iframe();');
	UI.EA(document,'click','e=window.event||e;if(UI.ET(e)!=' + o.name + '._input) UI.removeClass(' + o.name + '._body,"on");');

	this.select = function(n,i) {
		this._input.value = n;
		UI.A(this._select.options[this.cur],'selected','');
		UI.removeClass(this._li[this.cur],'on');
		UI.A(this._select.options[i],'selected','selected');
		this._select.value = this._select.options[i].value;
		this.cur = i;
	}
	this.iframe = function() {
		if (UI.Browser.ie6) {
			iframe.style.width = this._ul.offsetWidth+'px';
			iframe.style.height = this._ul.offsetHeight+'px';
			this._cover.style.top = UI.C(this._ul,'top');
			this._cover.style.left = UI.C(this._ul,'left');
		}
	}
}
UI.SelectMulti = function(o) {
	this.name = o.name;
	this.body = o;
	this.cont = UI.GC(o,'.cont')[0];
	this.input = o.firstChild;
	this.input=o.firstChild;
	//消除文本节点的Firefox bug
	while(this.input.nodeType==3){
	this.input = this.input.nextSibling
	}
	this.checkbox = UI.GT(UI.GT(this.cont,'ul')[0],'input');
	this.tools = UI.GC(o,'div.tools')[0];
	this.value = this.input.value;
	this.readyonly = UI.A(this.input,'readonly');
	this.display = false;
	this.click = false; //If Click The Menu

	var cont = this.cont,input = this.input,name = this.name,checkbox = this.checkbox;

	new UI.resize(this.cont,{min:{x:100,y:30}});
	UI.EA(UI.GC(this.body,'b.ico')[0],'click',function(e){
		UI.E(e).stop();
	})

	if (UI.Browser.ie6) {
		var iframe = UI.html('<iframe src="javascript:false;" style="display:none;"></iframe>')[0];
		UI.before(iframe,this.cont);
		setInterval(function(){
			iframe.style.cssText = 'position:absolute;filter:alpha(opacity=0);z-index:-1;top:' + cont.offsetTop + ';left:' + cont.offsetLeft + ';width:' + cont.offsetWidth + 'px;height:' + cont.offsetHeight + 'px;';
		},200);
	}
	if (this.checkbox.length > 7) {
		this.cont.style.height = '161px';
	}
	if (!this.tools) {
		this.cont.style.padding = '0';
	}
	else {
		var button = UI.GT(this.tools,'input');
		UI.each(button,function(o){
			UI.EA(o,'click',function(e){
				var T = UI.E(e).target;
				if (UI.hasClass(T,'SelectAll')) {
					UI.each(checkbox,function(o){
						o.checked = true;
					});
				}
				if (UI.hasClass(T,'SelectReverse')) {
					UI.each(checkbox,function(o){
						o.checked = o.checked ? false : true;
					});
				}
			});
		});
	}
	if(checkbox.length==0){input.disabled="disabled";input.style.cssText="border:1px solid #ccc"}
	UI.EA(document,'click',function(e){
		var E = UI.E(e);
		if (E.target != input) {
			window[name].hide();
		}
	});
	UI.EA(this.input,'click',function(){
		if (window[name].display) window[name].hide();
		else window[name].show();
	});
	UI.EA(this.cont,'click',function(e){
		UI.E(e).stop();
		var num = 0,cur = 0;
		UI.each(checkbox,function(o,i){
			if (o.checked) {
				cur = i
				num++;
			}
		});
		var P = checkbox[cur].parentNode;
		if (window[name].readyonly) {
			if (num == 0) {
				input.value = '';
			}
			else if (num == 1) {
				input.value = P.innerText || P.textContent;
			}
			else {
				input.value = UI.A(input,'rel') + ' x ' + num;
			}
		}
		else {
			window[name].fillValue();
		}
		window[name].click = true;
	});

	//Hide
	var delay;
	UI.EA(this.cont,'mouseout',function(e){
		delay = setTimeout(function(){
			if (window[name].click) window[name].hide();
		},50);
	});
	UI.EA(this.cont,'mouseover',function(e){
		clearTimeout(delay);
	});

	this.fillValue = function(){
		var arr_1 = this.input.value ? this.input.value.split(',') : [],arr_2 = [],arr_3 = [];
		for (var i = 0,n = checkbox.length;i < n;i++) {
			var text = checkbox[i].parentNode.innerText || checkbox[i].parentNode.textContent;
			if (checkbox[i].checked) arr_2.push(text);
			else arr_3.push(text);
		}
		this.input.value = UI.apart(UI.merge(UI.merge(arr_1),arr_2),arr_3).join(',');
	}
	this.hide = function(){
		UI.removeClass(this.body,'on');
		this.cont.style.display = 'none';
		this.cont.style.visibility= 'hidden';
		UI.removeClass(this.body,'top');
		this.display = false;
		this.click = false;
	}
	this.show = function(){
		UI.addClass(this.body,'on');
		this.cont.style.display = 'block';
		this.cont.style.visibility = 'visible';
		var h_cont = UI.height(this.cont),h_input = UI.height(this.input),h_window = UI.windowHeight(),h_page = UI.pageHeight(),y_input = UI.getY(this.input),y_scroll = UI.scrollY();
		var h_hack = (this.tools && !UI.Browser.ie && document.compatMode == 'BackCompat') ? UI.height(this.tools) : 0; //CSS Hack
		if (h_cont + h_input + y_input - y_scroll > h_window) {
			UI.addClass(this.body,'top');
			if (UI.height(this.cont) >= y_input - y_scroll) {
				UI.C(this.cont,'height',y_input - y_scroll - 20 - h_hack + 'px');
			}
			if (UI.height(this.cont) > y_input) {
				UI.C(this.cont,'height',y_input - h_hack + 'px');
			}
		}
		else if (h_cont + h_input + y_input > h_window) {
			UI.C(this.cont,'height',h_window - h_input - y_input + 'px');
		}
		this.display = true;
	}
}
UI.Menu = function(o) {
	this.name = o.name;
	this.id = o.id;
	this.sub_id = o.sub_id;
	this.location_id = o.location_id;
	this.main = UI.G(o.id);
	this.body = UI.G(o.sub_id);
	this.wrap = UI.GC(this.body,'.sub_menu_wrap')[0];
	this.bar = UI.GC(this.body,'a.bar')[0];
	this.target = o.target; //Target Iframe
	this.cache = (o.cache == undefined ? true : o.cache); //Cache Menu Status
	this.large = o.large; //Large Icon For Menu Title
	this.extend = []; //Extend Menu
	this.data = o.data;
	//Show Location Information
	this.location = {
		data : [],
		rel : null,
		build : function() {
			for (var n=0;n<this.data.length;n++) {
				var h = UI.G(this.id);
				if (!n) h.innerHTML = '';
				if (n!=this.data.length-1) h.innerHTML += (n ? '<b class="dot"></b>' : '') + '<a href="' + this.data[n].url + '" target="' + this.target + '" ' + (!n && this.cache ? 'class="unlink" onclick="this.blur();return false;' : 'onclick="') + this.name + (this.data[n].fake ? '.location.show(' + n +');' : '.show(\'' + this.rel.slice(0,n+1) + '\');') + '" title="' + this.data[n].name + '">' + this.data[n].name + '</a>';
				else h.innerHTML += (n ? '<b class="dot"></b>' : '') + this.data[n].name;
			}
		},
		rebuild : function(o) {
			var o = eval('[' + o + ']');
			this.rel = o;
			this.data = [];
			for (var i=0;i<o.length;i++) {
				if (!i) this.data.push({name:this.tmp[o[i]].name,url:this.tmp[o[i]].url});
				try{
					if (i==1) this.data.push({name:this.tmp[o[i-1]].data[o[i]].name,url:(this.tmp[o[i-1]].data[o[i]].url ? this.tmp[o[i-1]].data[o[i]].url : this.tmp[o[i-1]].data[o[i]].data[0][1])});
					if (i==2) this.data.push({name:this.tmp[o[i-2]].data[o[i-1]].data[o[i]][0],url:this.tmp[o[i-2]].data[o[i-1]].data[o[i]][1]});
				}catch(e){}
			}
			this.build();
		},
		edit : function(n,u) {
			this.data.pop();
			this.data.push({name:n,url:u,fake:true});
			this.build();
		},
		add : function(n,u) {
			if (n != this.data[this.data.length - 1].name) {
				this.data.push({name:n,url:u,fake:true});
				this.build();
			}
		},
		remove : function() {
			this.data.pop();
			this.build();
		},
		show : function(n) {
			this.data.splice(n +1,50);
			this.build();
		}
	}
	this.location.name = this.name;
	this.location.id = this.location_id;
	this.location.target = this.target;
	this.location.cache = this.cache;
	this.location.tmp = o.data;

	this.show = function(o,load) { //Show Menu
		var url;
		if (UI.isArray(o)) o = this.index(o); //Search By Menu Name

		else var o = o.split(',');
		if (o.length <= 2) {
			o.push(0);
			if (o.length == 2 && this.location.tmp[o[0]].data.length) o.push(0);
		}
		if (load) {
			url = this.data[o[0]].data[o[1]].url || this.data[o[0]].url;
			try {
				url = this.data[o[0]].data[o[1]].data[o[2]][1];
			}catch(e){};
		}

		//List & Main Menu
		this.menu_list[this.cur_list].className = 'wrap hide';
		this.menu_list[o[0]].className = 'wrap show';
		UI.removeClass(this.main_menu[this.cur_list],'on');
		UI.addClass(this.main_menu[o[0]],'on');
		if (this.cache) this.main_menu[o[0]].setAttribute('rel',o)
		this.cur_list = o[0];

		try{
			UI.removeClass(UI.GC(this.menu_list[o[0]],'.on')[0],'on');
		}catch(e){};
		for (var i=1;i<o.length;i++) {
			if (i==1 && !this.location.tmp[o[0]].data[o[1]].data.length) {
				UI.addClass(UI.GC(UI.GC(this.body,'.wrap.show')[0],'.title')[o[1]],'on');
				this.main_menu[o[0]].href = this.location.tmp[o[0]].data[o[1]].url;
			}
			if (i==2 && !this.location.tmp[o[0]].data[o[1]].extend) {
				var menu_title = this.menu_title[o[0]][o[1]],menu_content = menu_title.nextSibling;
				UI.removeClass(menu_title,'off');
				UI.removeClass(menu_content,'hide');
				if (this.location.tmp[o[0]].data[o[1]].data.length) {
					UI.addClass(menu_content.getElementsByTagName('a')[o[2]],'on');
					if (this.cache) this.main_menu[o[0]].href = this.location.tmp[o[0]].data[o[1]].data[o[2]][1];
				}
				else if (this.cache) this.main_menu[o[0]].href = this.location.tmp[o[0]].data[o[1]].url;
			}
		}
		this.location.rebuild(o);
		if (url) window[this.target].location.href = url;
	}
	this.go = function(o) {
		this.show(o,true);
	}
	this.index = function(o) { //Get Menu Index Number With Menu Name
		var tmp = [];
		for (var i=0;i<o.length;i++) {
			if (i == 0) {
				for (var j=0;j<this.data.length;j++) {
					if (o[i] == this.data[j].name) {
						tmp.push(j);
						break;
					}
				}
			}
			if (i == 1) {
				for (var j=0;j<this.data[tmp[0]].data.length;j++) {
					if (o[i] == this.data[tmp[0]].data[j].name) {
						tmp.push(j);
						break;
					}
				}
			}
			if (i == 2) {
				for (var j=0;j<this.data[tmp[0]].data[tmp[1]].data.length;j++) {
					if (o[i] == this.data[tmp[0]].data[tmp[1]].data[j][0]) {
						tmp.push(j);
						break;
					}
				}
			}
		}
		return tmp;
	}

	this.refresh = function(o) {
		if (UI.isArray(o)) { //Search By Menu Name
			o = this.index(o);
			if (o.length == 1) tmp.push(0); //Auto To Find Second Menu
		}
		else if (o.split(',').length == 1) { //Auto To Find Second Menu
			o += ',0';
		}

		for (var i=0;i<this.extend.length;i++) {
			if (this.extend[i].rel == o) {
				var o = eval('[' + o + ']');
				var _extend = this.menu_title[o[0]][o[1]].nextSibling,_call = this.extend[i].call;
				_extend.innerHTML = '<div class="extend"><span class="content">loading...</span></div>';
				UI.get(this.extend[i].url,{},function(data){
					setTimeout(function(){
						_extend.innerHTML = '<div class="extend">' + data + '</div>';//.replace( /(?:\r\n|\n|\r)/g, '' )
						eval(_call);
					},200);
				})
			}
		}
	}
	var name = this.name;
	this.tree = function(n,m) {
		var o = UI.isString(n) ? UI.G(n) : n;
		var a = UI.GT(o,'a');
		var b = UI.GC(o,'b.arrow');
		for (var i=0;i<a.length;i++) {
			UI.A(a[i],'target',window[name].target);
			a[i].onfocus = function(){
				this.blur();
			}
			a[i].onclick = function() {
				try{
					UI.removeClass(UI.GC(window[name].menu_list[m],'.on')[0],'on');
				}catch(e){};
				UI.addClass(this,'on');
				var href = UI.A(this,'href');
				if (UI.next(this) && (href.hasString('void(0)') || href == '#')) {
					UI.toggleClass(this,'unfold');
					UI.toggleClass(UI.next(this),'hide');
					if (UI.hasClass(this,'extend')) {
						var o = this,next = UI.next(o);
						next.innerHTML = '<div class="extend"><span class="content">loading...</span></div>';
						UI.get(this.getAttribute('rel'),'',function(data){
							setTimeout(function(){
								next.innerHTML = data;
								window[name].tree(next,m);
							},100);
							UI.removeClass(o,'extend');
						});
					}
				}
			}
		}
		UI.each(b,function(o,i){
			b[i].onclick = function(e) {
				var parent = this.parentNode.parentNode;
				var next = UI.next(parent);
				UI.toggleClass(parent,'unfold');
				UI.toggleClass(next,'hide');
				if (UI.hasClass(parent,'extend')) {
					next.innerHTML = '<div class="extend"><span class="content">loading...</span></div>';
					UI.get(parent.getAttribute('rel'),'',function(data){
						setTimeout(function(){
							next.innerHTML = data;
							window[name].tree(next,m);
						},100);
						UI.removeClass(parent,'extend');
					});
				}
				UI.E(e).stop();
				return false;
			}
		});
	}

	/* Sub Menu & Main Menu */
	var html = [],html_main = [],rel = [];
	for(var i=0;i < o.data.length;i++) {
		//Location
		if (!i) rel = 0;

		html.push('<div class="wrap' + (!i ? ' show' : ' hide') + '">');
		for(var j=0;j < o.data[i].data.length;j++) {
			var off = title_large = arrow_empty = title_on = hide = cont_hide = '',title_url = '#';
			if (o.data[i].data[j].close) {
				off = ' off';
				hide = ' hide';
			}
			if (!o.data[i].data[j].data.length && !o.data[i].data[j].extend) {
				cont_hide = ' style="display:none"';
				arrow_empty = ' empty';
				if (this.large) title_large = ' large';
				if (!j) title_on = ' on';
			}
			if (!o.data[i].data[j].extend) {
				title_url = o.data[i].data[j].url ? o.data[i].data[j].url : o.data[i].data[j].data[0][1];
			}
			html.push('<div class="title' + title_large  + off + title_on + ' " onmouseover="UI.addClass(this,\'hover\')" onmouseout="UI.removeClass(this,\'hover\')"><a href="javascript:void(0)" onfocus="this.blur()" class="arrow' + arrow_empty + '" onclick="UI.toggleClass(this.parentNode,\'off\');UI.toggleClass(this.parentNode.nextSibling,\'hide\')"></a><a href="' + title_url + '" target="' + this.target + '" onfocus="this.blur()" onclick="' + (o.data[i].data[j].extend ? this.name + '.refresh(this.getAttribute(\'rel\'));UI.removeClass(this.parentNode,\'off\');UI.removeClass(this.parentNode.nextSibling,\'hide\');return false;': '') + this.name + '.show(this.getAttribute(\'rel\'));UI.removeClass(this.parentNode,\'hover\');" rel="' + i + ',' + j + (o.data[i].data[j].data.length ? ',0' : '') +'" title="' + o.data[i].data[j].name + '"><span>' + (o.data[i].data[j].ico ? '<b class="ico ' + o.data[i].data[j].ico + '"></b>' : '') + '<em>' + o.data[i].data[j].name + '</em></span></a></div><div class="content' + hide + '"' + cont_hide + '><span>');
			if (o.data[i].data[j].extend) this.extend.push({rel:i + ',' + j,url:o.data[i].data[j].extend.url,call:o.data[i].data[j].extend.call});
			else {
				for (var m=0;m<o.data[i].data[j].data.length;m++) {
					html.push('<a href="' + o.data[i].data[j].data[m][1] + '" target="' + this.target + '" onfocus="this.blur()" onclick="' + this.name + '.show(this.getAttribute(\'rel\'));"' + ((!title_on && !j && !m) ? ' class="on"' : '') + ' rel="' + i + ',' + j + ',' + m + '" title="' + o.data[i].data[j].data[m][0] + '"><span><b class="icon dot"></b>' + o.data[i].data[j].data[m][0] + '</span></a>');
				}
			}
			html.push('</span></div>');

			//Location
			if (!i && !j) {
				rel = '0,0' + (o.data[0].data[0].data.length ? ',0' : '');
			}
		}
		html.push('</div>');

		html_main.push('<a href="' + o.data[i].url + '" target="' + this.target + '" class="' + (i == 0 ? 'first on' :'') + (i == o.data.length - 1 ? 'last' : '') + '" title="' + o.data[i].name + '" onfocus="this.blur()" onclick="' + this.name + '.show(this.getAttribute(\'rel\'));' + (o.data[i].call ? o.data[i].call : '') + '" rel="' + i + ',0' + (o.data[i].data[0].data.length ? ',0' : '') + '" title="' + o.data[i].name + '"><span>' + o.data[i].name + '</span></a>');
	}
	this.wrap.innerHTML = html.join('');
	this.main.innerHTML = html_main.join('');
	if (o.data.length == 1) { //Hide Main Menu
		UI.addClass(this.main,'hide');
	}
	else UI.addClass(document.body,'HasMainMenu');

	//Menu list
	this.main_menu = UI.GT(this.main,'a');
	this.menu_list = UI.GC(this.body,'.wrap');
	this.menu_title = [];
	for (var i=0;i<this.menu_list.length;i++) {
		this.menu_title.push(UI.GC(this.menu_list[i],'.title'));
	}
	this.cur_list = 0;
	if (this.extend.length) { //Load Extend Menu
		for (var i=0;i<this.extend.length;i++) {
			this.refresh(this.extend[i].rel);
		}
	}

	//Hide Bar
	this.bar.onclick = function() {
		UI.toggleClass(this.parentNode,'close');
		UI.removeClass(this.parentNode,'open');
	}
	this.bar.onfocus = function() {
		this.blur();
	}
	var _name = this.name,_delay;
	this.body.onmouseover = function() {
		clearTimeout(_delay);
		_delay = setTimeout(function() {
			if (UI.hasClass(window[_name].body,'close')) {
				UI.addClass(window[_name].body,'open');
			}
		},250);
	}
	this.body.onmouseout = function() {
		clearTimeout(_delay);
		_delay = setTimeout(function() {
			if (UI.hasClass(window[_name].body,'close')) {
				UI.removeClass(window[_name].body,'open');
			}
		},250);
	}
	if (UI.Browser.ie6) { //IE6 Hack
		this.bg_iframe = UI.html('<iframe src="javascript:false;" class="bg"></iframe>')[0];
		this.bg_div = UI.html('<div class="bg"></div>')[0];
		this.wrap.appendChild(this.bg_iframe);
		this.wrap.appendChild(this.bg_div);
	}

	//List Auto Height
	document.documentElement.style.overflow = 'hidden';
	var _menu_height = UI.GC('td.header')[0].scrollHeight + UI.GC('a.bar')[0].scrollHeight;
	var _footer = UI.GC('td.footer');
	if (_footer) _menu_height += _footer[0].scrollHeight;
	this.autoHeight = function() {
		this.wrap.style.height = (UI.Browser.ie ? document.documentElement.scrollHeight - _menu_height - 4 : window.innerHeight - _menu_height) + 'px';
	};
	this.autoHeight();
	(function(n){
		UI.EA(window,'resize',function(){
			window[n].autoHeight();
		});
	})(this.name);

	//Default Show
	this.show(rel);
	window[this.target].document.location.href = o.data[0].url;
}
UI.Dialog = function(o) {
	//Default Size
	size.call(this,o);

	//Dom
	this._body = UI.DC('div');
	this._body.className = 'dialog2';
	this._body.innerHTML = (UI.Browser.ie6 ? '<iframe src="javascript:false;" class="cover_select"></iframe>' : '') + '<div class="bg"></div><div style="margin:-' + o.height/2 + 'px 0 0 -' + o.width/2 + 'px;width:' + o.width + 'px;height:' + o.height + 'px;" class="wrap"><div class="title">' + o.title + '</div><a class="close ' + (o.close!=false ? '' : 'hide') + '" href="javascript:void ' + o.name + '.hide();" onfocus="this.blur();" title="Close" tabindex="-1"></a><div class="cont"><div class="loading"><span>loading...</span></div><iframe allowtransparency="true" src="' + o.url + '" style="height:' + o.height + 'px;display:none;" scrolling="auto" frameborder="no" onload="if (UI.A(this,\'src\') != \'undefined\') { this.style.display=\'block\';this.previousSibling.style.display=\'none\';UI.EA(' + o.name + '._iframe.contentWindow.document,\'keyup\',top.' + o.name + '.key); }" class="iframe"></iframe><div class="data"></div></div><b class="cor_1"></b><b class="cor_2"></b><b class="cor_3"></b><b class="cor_4"></b><div class="resize"></div></div><div class="border"></div>';
	this._bg = UI.GC(this._body,'div.bg')[0];
	this._wrap = UI.GC(this._body,'div.wrap')[0];
	this._title = UI.GC(this._body,'div.title')[0];
	this._close = UI.GC(this._body,'a.close')[0];
	this._cont = UI.GC(this._body,'div.cont')[0];
	this._iframe = UI.GC(this._body,'iframe.iframe')[0];
	this._data = UI.GC(this._body,'div.data')[0];
	this._resize = UI.GC(this._body,'div.resize')[0];
	this._border = UI.GC(this._body,'div.border')[0];
	this._loading = UI.GC(this._body,'div.loading')[0];
	
	//Status
	this.checkStaus = function(o) {
		if (!this._titleHeight) {
			this._titleHeight = this._title.offsetHeight;
			if (UI.Browser.ie && document.compatMode == 'CSS1Compat') { //For Standards Mode
				var padding = parseInt(UI.C(this._title,'paddingTop')) + parseInt(UI.C(this._title,'paddingBottom'))
				this._titleHeight -= padding;
				this._title.style.height = this._titleHeight - padding + 'px';
			}
		}
		try{
			this._cont.style.height = this._iframe.style.height = o.height - this._titleHeight + 'px';
		}catch(e){};
		if (o.move == false) {
			this.__move = false;
			this._title.style.cursor = 'default';
		}
		else if (this.__move == undefined || o.move) {
			this.__move = true;
			this._title.style.cursor = '';
		}
		if (o.resize == false) {
			this.__resize = false;
			this._resize.style.display = 'none';
		}
		else if (this.__resize == undefined || o.resize) {
			this.__resize = true;
			this._resize.style.display = '';
		}
		if (o.html) {
			UI.hide(this._loading);
		}
	}
	this.__name = o.name;
	this._cache = []; //Dialog Cache
	this._append = false;
	this.autoHeightMax = 420;
	this.__close = o.close == undefined ? true : o.close;

	var Self = this;

	if (o.url) {
		UI.EA(window,'load',function(){
			document.body.appendChild(Self._body);
			Self._append = true;
			Self.__display = true;
			Self.checkStaus.call(Self,o);
			Self._cache.push(o);
		});
	}

	//Event
	var wrap = this._wrap,border = this._border,name = o.name;
	this.key = function(e) {
		switch(UI.E(e).key) {
			case 27:
				if (window[name].__display) window[name].hide();
				break;
		}
	};
	this.resizeBg = function(){
		if (Self.__display) {
			if (UI.Browser.ie) Self._bg.style.cssText += ';width:100%;';
			Self._body.style.height = UI.windowHeight();
			Self.delay = setTimeout(function(){
				Self._bg.style.cssText += ';width:' + UI.pageWidth() + 'px;height:' + UI.pageHeight() + 'px;';
			},0);
		}
	};
	UI.EA(document,'keyup',this.key);
	UI.EA(window,'resize',this.resizeBg);
	this._title.onmousedown = function(e) { //Move
		if (window[name].__move) {
			var event = window.event || e;
			var _x = event.clientX - parseInt(wrap.style.marginLeft);
			var _y = event.clientY - parseInt(wrap.style.marginTop);
			var w = UI.windowWidth(),h = UI.windowHeight(); //Kill Bug
			if(event.preventDefault){
				event.preventDefault();
			}
			UI.addClass(wrap,'move');
			document.onmousemove = function(e) {
				var event = window.event || e;
				var E = UI.E(e);
				if (!UI.Browser.ie && (E.x < 0 || E.y < 0 || E.x > w || E.y > h)) return false;
				wrap.style.marginTop = event.clientY - _y + 'px';
				wrap.style.marginLeft = event.clientX - _x + 'px';
				return false;
			}
			document.onmouseup = function() {
				this.onmousemove = null;
				document.onmouseup = null;
				UI.removeClass(wrap,'move');
			}
			return false;
		}
	};
	this._title.ondblclick = function(e) { //Restore
		var o = window[name]._cache[window[name]._cache.length - 1];
		window[name].reset(o);
	}
	this._resize.onmousedown = function(e) { //Resize
		if (window[name].__resize) {
			var width = parseInt(UI.C(wrap,'width')),height = parseInt(UI.C(wrap,'height')),top = parseInt(UI.getY(wrap)),left = parseInt(UI.getX(wrap));
			if (!UI.Browser.ie || document.compatMode == 'CSS1Compat') {
				width -= 2;
				height -= 2;
			}
			border.style.cssText = 'top:' + top + 'px;left:' + left + 'px;width:' + width + 'px;height:' + height + 'px;display:block;';
			window[name]._body.style.cursor = 'se-resize';
			var event = window.event || e;
			var _x = event.clientX;
			var _y = event.clientY;
			if(event.preventDefault){
				event.preventDefault();
			}
			UI.addClass(wrap,'move');
			document.onmousemove = function(e) {
				var event = window.event || e,_Y = event.clientY - _y,_X = event.clientX - _x;
				var min_X = (150 - width)/2,min_Y = (100 - height)/2;
				if (_Y < min_Y) _Y = min_Y;
				if (_X < min_X) _X = min_X;
				var css = 'height:' + (_Y*2 + height) + 'px;width:' + (_X*2 + width) + 'px;top:' + (top - _Y) + 'px;left:' + (left - _X) + 'px;display:block;';
				if (UI.Browser.ie6 && document.compatMode == 'BackCompat') { //Delay To Kill IE6 Bug
					setTimeout(function(){
						border.style.cssText = css;
					},10);
				}
				else border.style.cssText = css;
				return false;
			}
			document.onmouseup = function() {
				window[name]._wrap.style.cssText = 'margin:0;left:' + border.style.left + ';top:' + border.style.top + ';width:' + border.offsetWidth + 'px;height:' + border.offsetHeight + 'px;';
				window[name].checkStaus({height:border.offsetHeight});
				setTimeout(function(){ //Delay To Kill IE6 Bug
					border.style.display = 'none';
				},15);
				window[name]._body.style.cursor = '';
				this.onmousemove = null;
				document.onmouseup = null;
				UI.removeClass(wrap,'move');
			}
			return false;
		}
	};
	this._cont.onclick = function(e){ //Auto Height Mode
		if (Self.autoHeight) {
			clearTimeout(Self.delay);
			Self.delay = setTimeout(function(){
				if (!Self.__display) return false;
				Self.height();
			},100);
		}
	};

	//Method
	this.hide = function() {
		var cache = UI.Dialog.cache;
		if (!this.__close || (cache[cache.length - 1] != this.__name && cache.length > 0)) return false;
		var length = this._cache.length;
		if (length > 1) {
			this.reset(this._cache[length - 2]);
			if (this._cache[length - 1].call) eval(this._cache[length - 1].call);
		}
		else if (length == 0) {
			UI.hide(this._body);
			this.__display = false;
			return false;
		}
		else {
			UI.hide(this._body);
			var html = this._cache[0].html;
			if (html && !UI.isString(html)) {
				document.body.appendChild(html);
				UI.hide(html);
			}
			if (this._cache[0].call) eval(this._cache[0].call);
			this.__display = false;
		}
		this.__title = this._cache[0].title; //Save Last Title
		this._cache.pop();

		//Dialogs Cache
		if (this._cache.length < 1 && cache[cache.length - 1] == this.__name) {
			cache.pop();
			if (cache.length > 0) {
				UI.show(window[cache[cache.length - 1]]._bg);
			}
		}

		this.title();
	}
	this.show = function(o) {
		if (!this._append) {
			document.body.appendChild(this._body);
			this._append = true;
		}
		if (!this.__display) {
			UI.show(this._body);
			this.__display = true;
		}
		if (o) {
			//Auto Height Mode
			this.autoHeight = o.autoHeight || false;
			if (o.autoHeightMax) this.autoHeightMax = o.autoHeightMax;

			if (o.html == null) { //Cross Iframe Dom
				
			}
			if (o.url || o.html) {
				this._cache.push(o);

				//Dialogs Cache
				var cache = UI.Dialog.cache;
				if (cache[cache.length - 1] != this.__name) {
					cache.push(this.__name);
					for (var i = 0,n = cache.length - 1;i < n;i++) {
						UI.hide(window[cache[i]]._bg);
					}
				}

				if (o.url) this._cont.style.overflow = 'hidden';
				else {
					this._cont.style.overflow = 'auto';
				}
			}
			else {
				if (o.title) this._cache[this._cache.length - 1].title = o.title;
			}
			this.reset(o);
		}
		else {
			this.reset({});
		}
	}
	this.reset = function(o) {
		if (o.title) this.title();
		if (o.size) {
			size.call(this,o);
		}
		var autoHeight = !!(o.html && !UI.isString(o.html) && !o.height);

		//Check Postion
		this._wrap.style.top = '50%';
		this._wrap.style.left = '50%';
		this._wrap.style.margin = -parseInt(UI.C(this._wrap,'height'))/2 + UI.scrollY() + 'px 0 0 ' + (-parseInt(UI.C(this._wrap,'width'))/2 + UI.scrollX()) + 'px';
		this._bg.style.cssText = 'width:' + UI.pageWidth() + 'px;height:' + UI.pageHeight() + 'px;';
		this._body.style.height = UI.windowHeight();

		if (o.width) {
			if (o.width%2) o.width += 1; //Kill IE Bug
			this._wrap.style.width = o.width + 'px';
			this._wrap.style.marginLeft = -o.width/2 + UI.scrollX() + 'px';
		}
		if (o.height) {
			if (o.height%2) o.height += 1; //Kill IE Bug
			this._wrap.style.height = o.height + 'px';
			this._wrap.style.marginTop = -o.height/2 + UI.scrollY() + 'px';
		}
		if (o.close) this._close.className = 'close' + (o.close != false ? '' : 'hide');
		if (o.url) {
			UI.hide(this._iframe);
			UI.show(this._loading);
			this._iframe.setAttribute('src',o.url);
		}
		else if (o.html) {
			UI.hide(this._iframe);
			if (UI.isString(o.html)) {
				UI.hide(this._loading);
				this._data.innerHTML = o.html;
			}
			else {
				this._data.appendChild(o.html);
				UI.show(o.html);
			}
		}
		this.checkStaus.call(this,o);

		if (autoHeight) { //Auto Heihgt For Dom
			this.height();
		}
	}
	this.title = function() {
		var title=[];
		for (var i=0;i<this._cache.length;i++) {
			if (this._cache[i].title) {
				title.push(this._cache[i].title);
			}
		}
		if (title.length == 0) title.push(this.__title);
		this._title.innerHTML = '<span>' + title.join('<b class="dot"></b>') + '</span>';
	}
	this.height = function() {
		var H = UI.height(this._data) + this._titleHeight;
		this.show({autoHeight:this.autoHeight,height:H > this.autoHeightMax ? this.autoHeightMax : H});
	}
	function size(o){
		switch(o.size) {
			case 'small':
				if(!o.width) o.width = 380;
				if(!o.height) o.height = 220;
				break;
			case 'medium':
				if(!o.width) o.width = 530;
				if(!o.height) o.height = 420;
				break;
			case 'big':
				if(!o.width) o.width = 760;
				if(!o.height) o.height = 540;
				break;
		}
	}
}
UI.Dialog.cache = [];
UI.Dialog.location = null; //Window Location Cache To Refresh Page
UI.TipBox = function(o) {
	//Dom
	this._body = UI.DC('div');
	this._body.className = 'tip_box';
	this._body.innerHTML = '<a class="fix" href="javascript:void(0)" title="Hold" onclick="' + o.name + '.__fix = !' + o.name + '.__fix;UI.toggleClass(this,\'on\');return false;" onfocus="this.blur()" tabindex="-1"></a><a class="close" href="javascript:void(0)" title="Close" onclick="' + o.name + '.hide();" tabindex="-1"></a><b class="arrow"></b><b class="shadow"></b><div class="wrap"><div class="title"></div><div class="cont"></div></div>' + (UI.Browser.ie6 ? '<iframe src="javascript:false;" class="cover"></iframe>' : '');
	this._close = UI.GC(this._body,'a.close')[0];
	this._fix = UI.GC(this._body,'a.fix')[0];
	this._arrow = UI.GC(this._body,'b.arrow')[0];
	this._shadow = UI.GC(this._body,'b.shadow')[0];
	this._wrap = UI.GC(this._body,'div.wrap')[0];
	this._title = UI.GC(this._body,'div.title')[0];
	this._cont = UI.GC(this._body,'div.cont')[0];
	this._cover = UI.GC(this._body,'iframe.cover')[0];

	//Status
	this.__display = false;
	this.__large = o.__large;
	this.__fix = false;
	this._body.style.display = 'none';
	//top.document.body.appendChild(this._body);
	if (o.html) {
		this.show(o);
	}

	//Event
	var name = o.name,body = this._body,wrap = this._wrap,title = this._title,shadow = this._shadow,close = this._close,cover = this._cover,Self = this;
	this.key = function(e) {
		switch(UI.E(e).key) {
			case 27:
				if (Self.__display) Self.hide();
				break;
		}
	}
	UI.EA(document,'keyup',this.key);
	UI.EA(document,'click',function(e){
		if (!Self.__fix && UI.E(e).target != Self._target) {
			Self.hide();
		}
	});
	UI.EA(body,'click',function(e){
		UI.E(e).stop();
	});
	if (UI.Browser.ie6) { //Kill IE6 Select Scroll Bug
		setInterval(function(){
			cover.style.zoom = cover.style.zoom == '1' ? '0' : '1';
		},200);
	};
	(function(){
		var x,y,_x,_y,h_wrap,top,left,move;
		UI.drag(title,{
			start : function(e){
				var P = wrap.parentNode;
				var E = UI.E(e);
				E.prevent();
				x = E.x;
				y = E.y;

				UI.hide(Self._arrow);
				left = parseInt(UI.C(body,'marginLeft'));
				top = parseInt(UI.C(body,'marginTop'));
			},
			drag : function(e){
				var E = UI.E(e);
				E.prevent();
				body.style.marginLeft = left + E.x - x + 'px';
				body.style.marginTop = top + E.y - y + 'px';
			}
		},false);
	})();
	this._body.onmouseover = this._cont.onmousedown = function(e) {
		UI.E(e).stop();
	};

	//Method
	this.show = function(o) {
		if (this.__display && this._target != o.target) {
			this.hide();
		}
		if (this.__display) return false;

		UI.show(this._arrow);
		this.__large = o.large;
		if (o.large) {
			wrap.style.cursor = 'move';
			body.style.width = '400px';
			wrap.style.height = '200px';
		}
		else {wrap.style.cursor = '';body.style.width = '';wrap.style.height = '';}

		this._target = o.target;
		this.__html = this._cont.innerHTML = o.html;

		var pt = 0,pr = 0,pb = 0,pl = 0; //Padding Value
		switch ('TH,TD,DT,DD,LI'.hasString(this._target.nodeName)) {
			case true:
				UI.prepend(this._body,this._target);
				pl = parseInt(UI.C(this._target,'paddingLeft'));
				if (pl == NaN) pl = 0;
				break;
			default:
				UI.before(this._body,this._target);
				break;
		}
		this._body.style.display = '';
		
		//Value
		var h_window = UI.windowHeight(),h_wrap = UI.height(this._wrap),h_target = UI.height(this._target),w_window = UI.windowWidth(),w_wrap = UI.width(this._wrap),w_target = UI.width(this._target),x_target = UI.getX(this._target),y_target = UI.getY(this._target);
		var w_arrow = 7,h_arrow = 17;
		var space = UI.scrollY(this._target) + h_window - y_target - h_wrap;

		this._body.style.margin = '0 0 0 ' + (w_target + w_arrow - pl) + 'px';

		if (((w_window < w_wrap + w_target + x_target) && (1)) || w_window < w_wrap) { //Right Arrow
			UI.addClass(this._body,'right');
			this._body.style.marginLeft = - (w_wrap + w_arrow + pl) + 'px';
			this.__right = true;
		}
		else {
			UI.removeClass(this._body,'right');
			this.__right = false;
		}

		if (((!this.__right && (w_target >= w_window - w_wrap)) || w_target > w_wrap || (w_window - x_target - w_target < w_wrap)) && (w_window > w_wrap) && (w_window > x_target + w_wrap)) { //Top && Bottom Arrow (w_target > w_wrap) && 
			w_arrow = 16;
			h_arrow = 9;
			pt = parseInt(UI.C(this._target,'paddingTop'));
			pb = parseInt(UI.C(this._target,'paddingBottom'));
			if (pt == NaN) pt = 0;
			if (pb == NaN) pb = 0;

			this._wrap.style.marginTop = this._fix.style.marginTop = this._close.style.marginTop = this._shadow.style.marginTop = '0';

			if (space - h_arrow < 0) {
				this._body.className = 'tip_box top';
				this._body.style.marginLeft = '';
				this._body.style.marginTop = - h_wrap - h_arrow - pt - pb + 2 + 'px';
			}
			else {
				this._body.className = 'tip_box bottom';
				this._body.style.marginLeft = '';
				this._body.style.marginTop = h_target + h_arrow - pt - pb + 2 + 'px';
			}
		}
		else {
			UI.removeClass(this._body,'top');
			UI.removeClass(this._body,'bottom');
			if (space < 0) {
				if (space > -23)  space = -23;
				if (h_window < h_wrap) {
					space = h_window - h_wrap;
				}
				if (h_wrap - 22 < - space) {
					space = 22 - h_wrap;
				}
				this._wrap.style.marginTop = this._fix.style.marginTop = this._close.style.marginTop = this._shadow.style.marginTop = space - 4 + 'px';
				this._arrow.style.top = '0';
			}
			else {
				this._wrap.style.marginTop = this._fix.style.marginTop = this._close.style.marginTop = this._shadow.style.marginTop = - 2 + 'px';
				this._arrow.style.top = '';
			}
		}

		if (this._cover) { //Select Cover For IE6
			if (!(UI.hasClass(this._body,'top') || UI.hasClass(this._body,'bottom'))) {
				this._cover.style.cssText = 'width:' + (w_wrap + 9) + 'px;height:' + (h_wrap + 3) + 'px;margin-top:' + this._wrap.style.marginTop;
			}
			else this._cover.style.cssText = 'width:' + (w_wrap + 4) + 'px;height:' + (h_wrap + 11) + 'px;';
		}

		this._shadow.style.height = UI.height(this._wrap) + 'px';
		this.__display = true;
		if(o.resize&&o.large){
			var B = UI.html('<b class="ico"></b>')[0];
			this._body.appendChild(B);
			var ex,ey,w_b,h_b,padding_y = 0,padding_x = 0;
			var ow=this._body,oc=this._wrap,os=this._shadow;
			UI.drag(B,{
				start : function(e){
				var E = UI.E(e);
				ex = E.x;
				ey = E.y;
				w_b=UI.width(ow);
				h_b=UI.height(ow);
				if (!UI.Browser.ie && document.compatMode == 'BackCompat') {
				padding_x = parseInt(UI.C(oc,'paddingLeft')) + parseInt(UI.C(oc,'paddingRight'))+1;
				padding_y = parseInt(UI.C(oc,'paddingBottom')) + parseInt(UI.C(oc,'paddingTop'))+1;
				}
				UI.hide(Self._arrow);
				},
				drag : function(e){
				var E = UI.E(e),W,H;
				W=w_b+E.x-ex<120?120:w_b+E.x-ex;
				H=h_b+E.y-ey<100?100:h_b+E.y-ey;
				os.style.width=ow.style.width=W+"px";
				oc.style.width=W-padding_x+"px";
				ow.style.height=H+"px";
				oc.style.height=H-padding_y+1+"px";
				os.style.height=UI.height(oc) + 'px';
				}
			},true)
		}
	}
	this.hide = function() {
		//UI.hide(this._body);
		if(UI.parent(this._body)){UI.parent(this._body).removeChild(this._body);}
		if(this.__large)
		{
			body.style.width = '400px';
			body.style.height = 'auto';
			wrap.style.width = 'auto';
			wrap.style.height = '200px';
			shadow.style.width = '100%';
		}
		this.__display = false;
	}
}
UI.Resize = function(o,option) {
	var P = o.parentNode.parentNode;
	var ico = UI.GC(P,'.ico')[0];
	var w,h,x,y,action,padding_y = 0,padding_x = 0;

	if (!option) option = {
		min : {
			x : 20,
			y : 15
		},
		max : {
			x : Infinity,
			y : Infinity
		}
	}
	else {
		if (!option.min) option.min = {
			x : 20,
			y : 15
		}
		if (!option.max) option.max = {
			x : Infinity,
			y : Infinity
		}
	}

	UI.drag(ico,{
		start : function(e) {
			var E = UI.E(e);
			x = E.x;
			y = E.y;
			w = UI.width(o);
			h = UI.height(o);
			action = UI.C(ico,'cursor');
			if (!UI.Browser.ie && document.compatMode == 'BackCompat') {
				var Self = ico.parentNode;
				padding_x = parseInt(UI.C(Self,'paddingLeft')) + parseInt(UI.C(Self,'paddingRight'));
				padding_y = parseInt(UI.C(Self,'paddingBottom')) + parseInt(UI.C(Self,'paddingTop'));
			}
		},
		drag : function(e) {
			var E = UI.E(e),W,H;
			switch (action) {
				case 'ne-resize':
					W = w + E.x - x - padding_x;
					H = h - E.y + y - padding_y;
					break;
				case 'se-resize':
					W = w + E.x - x - padding_x;
					H = h + E.y - y - padding_y;
					break;
				case 'nw-resize':
					W = w - E.x + x - padding_x;
					H = h - E.y + y - padding_y;
					break;
				case 'sw-resize':
					W = w - E.x + x - padding_x;
					H = h + E.y - y - padding_y;
					break;
				case 'e-resize':
					W = w - E.x + x - padding_x;
					break;
				case 's-resize':
					H = h + E.y - y - padding_y;
					break;
			}
			if (W < option.min.x) W = option.min.x;
			if (W > option.max.x) W = option.max.x;
			if (H < option.min.y) H = option.min.y;
			if (H > option.max.y) H = option.max.y;
			try{
				UI.C(o,'width',W + 'px');
				UI.C(o,'height',H + 'px');
			}catch(e){};
		}
	},UI.isUndefined(option.capture) ? true : option.capture);
}
UI.Topology = function(o){
	var Self = this;
	if (!o.line) o.line = {};
	this.lineStyle = {
		color : o.line.color || 'black',
		width : o.line.width || 1,
		alpha : o.line.alpha || 1
	};

	//Canvas Object
	this.canvas = UI.G(o.id);
	this.canvas.width = o.width;
	this.canvas.height = o.height;
	this.ctx = this.canvas.getContext('2d');
	this.ctx.strokeStyle = this.lineStyle.color;
	this.ctx.lineWidth = this.lineStyle.width;
	this.ctx.globalAlpha = this.lineStyle.alpha;
	this.ctx.save();

	//Dom
	this.body = UI.html('<div class="' + this.canvas.className + '"><div class="tmpBox"></div><div class="contBox"></div></div>')[0];
	this.body.style.cssText = 'top:' + UI.getY(this.canvas) + 'px;left:' + UI.getX(this.canvas) + 'px;width:' + UI.width(this.canvas) + 'px;height:' + UI.height(this.canvas) + 'px;';
	this.tmpBox = UI.GC(this.body,'.tmpBox')[0];
	this.contBox = UI.GC(this.body,'.contBox')[0];
	this.tmp = null; //Tmp Dom
	this.current = null; //Current Icon
	this.currentId = null; //Current Icon's Index ID
	this.data = o.data;
	this.dataTmp = this.cloneData(o.data);
	this.draw();
	UI.before(this.body,this.canvas);
	this.x = UI.getX(this.body);
	this.y = UI.getY(this.body);

	//PopupMenu
	this.popupMenuData = o.popupMenu || {};
	if (o.popupMenu) {
		this.popupMenu = new UI.PopupMenu(this.body);
		this.popupMenu.setActions(this.popupMenuData.main);
		UI.EA(this.body,'mousedown',function(e){
			var E = UI.E(e);
			if (E.button == 2 || (UI.Browser.ie && E.button == 0)) {
				Self.popupMenu.popup(Self.popupMenuData.main);
			}
		});
	}

	//Kill Select Font And Picture
	this.body.onselectstart = function(e){
		return false;
	};
}
UI.Topology.prototype = {
	draw : function(){
		this.currentId = null;
		this.parseData(this.data);
		this.drawLine(this.data);
	},
	drawIco : function(ico,wrap){
		var Self = this;
		if (ico.complete) {
			wrap.style.cssText += ';display:block;margin:0 0 0 -99999px;'; //Kill Icon's Sparkle
			setTimeout(function(){
				wrap.style.cssText += ';margin:-' + ico.width/2 + 'px 0 0 -' + ico.height/2 + 'px;';
			},0);
		}
		else setTimeout(function(){ //Kill Load Bug
			Self.drawIco(ico,wrap);
		},100);
	},
	drawLine : function(o,parent){
		if (!parent) {
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		}
		for (var i = 0,num = o.length;i < num;i++) {
			if (parent) {
				if (o[i].line) {
					this.ctx.strokeStyle = o[i].line.color || this.lineStyle.color;
					this.ctx.lineWidth = o[i].line.width || this.lineStyle.width;
					this.ctx.globalAlpha = o[i].line.alpha || this.lineStyle.alpha;
				}
				this.line(parent.x,parent.y,o[i].x,o[i].y);
				this.ctx.restore();
				this.ctx.save();
			}
			if (o[i].son) {
				this.drawLine(o[i].son,{x:o[i].x,y:o[i].y});
			}
		}
	},
	line : function(x1,y1,x2,y2){
		this.ctx.beginPath();
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	},
	reset : function(){
		this.clear();
		this.data = this.cloneData(this.dataTmp);
		this.draw();
	},
	clear : function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.contBox.innerHTML = '';
	},
	save : function(){
		this.dataTmp = this.cloneData(this.data);
	},
	add : function(o){
		if (this.currentId) {
			var target = this.findData(this.currentId,this.data),num = parseInt(Math.random() * 120);
			target.son = target.son || [];
			o.x = target.x + 40 + parseInt(Math.random() * 60);
			o.y = target.y + parseInt(Math.random() * 60);
			target.son.push(o);
		}
		else this.data.push(o);
		this.clear();
		this.draw();
	},
	edit : function(o){
		if (this.currentId) {
			var target = this.findData(this.currentId,this.data);
			target.name = o.name;
			target.ico = o.ico;
			this.clear();
			this.draw();
		}
	},
	remove : function(){
		if (this.currentId) {
			try{
				this.findData(this.currentId.slice(0,-1),this.data).son.splice(this.currentId.slice(-1),1);
			}catch(e){
				this.data.splice(this.currentId.slice(-1),1)
			};
		}
		this.clear();
		this.draw();
	},
	findData : function(arr,data){
		var obj = data[arr[0]];
		if (arr.length == 1) return obj;
		else {
			arr.splice(0,1);
			return this.findData(arr,obj.son);
		}
	},
	cloneData : function(o){
		var oTmp = []
		for (var i = 0,num = o.length;i < num;i++) {
			var obj = {};
			for (var j in o[i]) {
				obj[j] = o[i][j];
			}
			if (o[i].son) obj.son = this.cloneData(o[i].son);
			oTmp.push(obj);
		}
		return oTmp;
	},
	parseData : function(o,parent){
		var Self = this;
		for (var i = 0,num = o.length;i < num;i++) {
			var ico = UI.DC('img'),wrap = UI.DC('span');
			ico.ondragstart = wrap.onmousedown = this.prevent;
			wrap.onmouseover = function(){
				var ok = false;
				if (Self.tmpBox.innerHTML) {
					//Check Move (Father can't move to son)
					var targetRel = UI.A(this,'rel').toString().split(','),wrapRel = UI.A(Self.tmp,'rel').toString().split(',');
					if (targetRel.length <= wrapRel.length) ok = true;
					else {
						for (var i = 0,n = wrapRel.length;i < n;i++) {
							if (wrapRel[i] != targetRel[i]) {
								ok = true;
								break;
							}
						}
					}
				}
				//document.title = ok + ',' + !UI.hasClass(this,'onSelf');
				if (!UI.hasClass(this,'onSelf') && ok) UI.addClass(this,'on');
			};
			wrap.onmouseout = function(){
				UI.removeClass(this,'on');
			};
			UI.A(wrap,'rel',parent ? parent.rel + ',' + i : i); //Data Index
			wrap.className = 'icon';
			wrap.style.cssText = 'top:' + o[i].y + 'px;left:' + o[i].x + 'px;';

			//Drag Event
			UI.drag(wrap,{start:(function(wrap){
				return function(e){
					var E = UI.E(e);
					if (E.button == 2 || (UI.Browser.ie && E.button == 0)) {
						Self.currentId = UI.A(wrap,'rel').toString().split(',');
						Self.current = Self.findData(Self.currentId.concat([]),Self.data);
						Self.popupMenu.popup(Self.popupMenuData.son);
						Self.rightClick = true;
						E.stop();
						return false;
					}
					else Self.rightClick = false;
					UI.addClass(Self.body,'onMove');
					UI.addClass(wrap,'onSelf');
					UI.removeClass(wrap,'on');
					Self.tmp = wrap.cloneNode(wrap,true);
					Self.tmp.style.cssText = 'top:' + (E.y - Self.y) + 'px;left:' + (E.x - Self.x) + 'px;';
					Self.tmpBox.appendChild(Self.tmp);
				}
			})(wrap),drag:function(e){
				var E = UI.E(e);
				if (Self.rightClick) return false;
				Self.tmp.style.cssText = 'top:' + (E.y - Self.y) + 'px;left:' + (E.x - Self.x) + 'px;';
			},stop:(function(wrap,o){
				return function(e){
					if (Self.rightClick) return false;
					var on = UI.GC(Self.contBox,'.on');
					if (on) {
						var targetRel = UI.A(on[0],'rel').toString().split(','),wrapRel = UI.A(wrap,'rel').toString().split(',');
						var target = Self.findData(targetRel,Self.data);
						//Add
						if (!target.son) target.son = [o];
						else target.son.push(o);
						//Delete
						try{
							Self.findData(wrapRel.slice(0,-1),Self.data).son.splice(wrapRel.slice(-1),1);
						}catch(e){
							Self.data.splice(wrapRel.slice(-1),1)
						};
						Self.clear();
						Self.draw();
					}
					else {
						var x = parseInt(UI.C(Self.tmp,'left')),y = parseInt(UI.C(Self.tmp,'top'));
						if (x < 0) x = 0;
						else if (x > Self.canvas.width) x = Self.canvas.width;
						if (y < 0) y = 0;
						else if (y > Self.canvas.height) y = Self.canvas.height;
						o.x = x;
						o.y = y;
						wrap.style.cssText += ';left:' + o.x + 'px;top:' + o.y + 'px;';
						Self.drawLine(Self.data);
					}
					UI.removeClass(Self.body,'onMove');
					UI.removeClass(wrap,'onSelf');
					Self.tmpBox.innerHTML = '';
				}
			})(wrap,o[i])},false);

			UI.A(ico,'src',o[i].ico);
			if (ico.complete) {
				this.drawIco(ico,wrap);
			}
			else {
				ico.onload = (function(ico,wrap){
					return function(){
						Self.drawIco(ico,wrap);
					}
				})(ico,wrap);
			}
			wrap.innerHTML = '<b>' + o[i].name + '</b>';
			wrap.appendChild(ico);
			this.contBox.appendChild(wrap);
			if (o[i].son) {
				this.parseData(o[i].son,{x:o[i].x,y:o[i].y,rel:UI.A(wrap,'rel')});
			}
		}
	},
	prevent : function(e){
		UI.E(e).prevent();
	}
};
UI.Gotop = {
	title : '返回顶部',
	className : 'gotop',
	text : 'Top',
	body : UI.DC('a'),
	_delay : null,
	build : function(id) {
		this.body.className = this.className;
		this.body.title = this.title;
		this.body.innerHTML = this.text;
		this.body.href = '#' + (id||'');
		document.body.appendChild(this.body);
		this.body.onfocus = function(){
			this.blur();
		}
		UI.EA(window,'scroll',function(){
			clearTimeout(UI.Gotop._delay);
			UI.Gotop._delay = setTimeout(function(){
				( window.scrollY || document.documentElement.scrollTop ) < 52 ? UI.Gotop.body.style.display = 'none':UI.Gotop.body.style.display = 'block';
			},50);
		});
	}
}
if (UI.Browser.ie) {
	try{
		document.execCommand('BackgroundImageCache',false,true);
	}catch(e){}
}
if (!window['console']) {
	window['console'] = {
		log : function(){
			UI.each(arguments,function(o){
				alert(o);
			});
		},
		dir : function(){
			
		}
	};
}
UI.pageTable=function(iAbsolute,sTableId){
this.absolute = iAbsolute;
this.tableId = sTableId;
this.rowCount = 0;
this.newCount = this.absolute;
this.__oTable__ = null;
this.__oTBody__ = null;
this.__dataRows__ = 0;
this.__init__(); 
};
UI.pageTable.prototype.__init__ = function(){
this.__oTable__ = document.getElementById(this.tableId);
this.__oTBody__ = this.__oTable__.tBodies[0];
this.__dataRows__ = this.__oTBody__.rows;
this.rowCount = this.__dataRows__.length;
this.__updateTableRows__();
};
UI.pageTable.prototype.__updateTableRows__ = function(){
var tempRows = this.__cloneRows__();
this.newCount=this.newCount=="全部"?this.rowCount:this.newCount;
var removedTBody = this.__oTable__.removeChild(this.__oTBody__);
var newTBody = document.createElement("TBODY");
for(var i=0; i <this.newCount; i++){
newTBody.appendChild(tempRows[i]);
}
this.__oTable__.appendChild(newTBody);
this.__dataRows__ = tempRows;
this.__oTBody__ = newTBody;
};
UI.pageTable.prototype.__cloneRows__ = function(){
var tempRows = [];
for(var i=0; i<this.__dataRows__.length; i++){
tempRows[i] = this.__dataRows__[i].cloneNode(1);
}
return tempRows;
};
//UI.getsc=(function(){
//document.write('<script type="text/javascript" src="js/jquery/jquery-1.4.2.min.js"></script>');
//})();
UI.Warning=function(o){
	this.name=o.name;
	this.icon=o.icon||"warnning";
	this.html=o.html||"";
	this.H=o.height||"auto";
	this.W=o.width||300;
	this.body=null;
	this.close=null;
	this.fun=o.fun||null;
	this.init();
};
UI.Warning.prototype.init=function(){
var h=parseInt(this.H)-30;
this.body=UI.DC('div');
this.body.id="body_warnning";
this.body.className="body_warnning"
this.body.style.cssText="display:none;right:-"+this.W+"px;width:"+this.W+"px;height:"+this.H+"px";
this.body.innerHTML="<div class='warn_head'><a href='#' class='warn_close'></a></div><div class='warn_warpper'><div class='warn_content' style='height:"+h+"px'>"+this.html+"</div></div>";
this.close = UI.GC(this.body,'a.warn_close')[0];
var that=this;
this.close.onclick=function(){that.hide()}
this.show();
};
UI.Warning.prototype.show=function(){
	var t=f=0;
	var s=-parseInt(this.W);
	var body=this.body;
	document.body.appendChild(body);
	body.style.display="block";
	var f=function(){
    s=s+parseInt((16-s))*0.4;
	body.style.right=s+"px";
	if(Math.abs(16-s)<3){body.style.right="16px";clearInterval(t)}
	}
	t=setInterval(f,50);
}
UI.Warning.prototype.hide=function(){
if(UI.parent(this.body)){UI.parent(this.body).removeChild(this.body);}
if(this.fun){this.fun();window[this.name]=null;}
else {window[this.name]=null;return false;}
}
