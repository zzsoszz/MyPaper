/* declare namespace */
(function(){
	var namespaces = [ "System","BdElement", "BdBrowser", "BdEvent", "BdUtil", "BdAjax","BdString"];
	for(var i = 0, j = namespaces.length; i < j; i ++){
		if(window[namespaces[i]] != 'object')
			window[namespaces[i]] = {};
	}
})();

/* attach methods */
(function(){
	/* BdBrowser scope */
	var ua = navigator.userAgent.toLowerCase();

	var isStrict = document.compatMode == "CSS1Compat",
		isOpera = ua.indexOf("opera") > -1,
		isSafari = (/webkit|khtml/).test(ua),
		isSafari3 = isSafari && ua.indexOf('webkit/5') != -1,
		isIE = !isOpera && ua.indexOf("msie") > -1,
		isIE7 = !isOpera && ua.indexOf("msie 7") > -1,
		isGecko = !isSafari && ua.indexOf("gecko") > -1,
		isBorderBox = isIE && !isStrict,
		isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
		isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
		isAir = (ua.indexOf("adobeair") != -1),
		isLinux = (ua.indexOf("linux") != -1),
		isSecure = window.location.href.toLowerCase().indexOf("https") === 0;

    // remove css image flicker
    if(isIE && !isIE7){
        try{
            document.execCommand("BackgroundImageCache", false, true);
        }catch(e){}
    }
    
    var browsers = {
        isOpera : isOpera,
        isSafari : isSafari,
        isSafari3 : isSafari3,
        isSafari2 : isSafari && !isSafari3,
        isIE : isIE,
        isIE6 : isIE && !isIE7,
        isIE7 : isIE7,
        isGecko : isGecko,
        isBorderBox : isBorderBox,
        isLinux : isLinux,
        isWindows : isWindows,
        isMac : isMac,
        isAir : isAir
    };

    for(var p in browsers){
        BdBrowser[p] = browsers[p];
    }

    /* BdElement scope */
    window.Bd$ = BdElement.check = function(id){
        return typeof id == 'string' ? document.getElementById(id) : id;
    }

    BdElement.removeNode = isIE ? function(){
        var d;
        return function(node){
            if(node && node.tagName != 'BODY'){
                d = d || document.createElement('DIV');
                d.appendChild(node);
                d.innerHTML = '';
            }
        }
    }() : function(node){
        if(node && node.parentNode && node.tagName != 'BODY'){
            node.parentNode.removeChild(node);
        }
    }

    /* BdEvent scope */
    BdEvent.addEvent = function(el, fn, handler){
        if(isIE){
            el.attachEvent("on" + fn, handler);
        }else{
            el.addEventListener(fn, handler, false); 
        }
    }

    BdEvent.removeEvent = function(el, fn, handler){
        if(isIE){
            el.detachEvent("on" + fn, handler);
        }else{
            el.removeEventListener(fn, handler, false); 
        }
    }

	BdEvent.addDOMLoadEvent = (function(){
        // create event function stack
        var load_events = [],
            load_timer,
            script,
            done,
            exec,
            old_onload,
            init = function () {
                done = true;
                // kill the timer
                clearInterval(load_timer);

                // execute each function in the stack in the order they were added
                while (exec = load_events.shift())
                    setTimeout(exec, 10);
                if (script) script.onreadystatechange = '';
            };

            return function (func) {
                // if the init function was already ran, just run this function now and stop
                if (done) return func();


                if (!load_events[0]) {
                    // for Mozilla/Opera9
                    if (document.addEventListener)
                        document.addEventListener("DOMContentLoaded", init, false);

                    // for Internet Explorer

                    /*@cc_on @*/
                    /*@if (@_win32)
                        document.write("<script id=__ie_onload defer src=//0><\/scr"+"ipt>");
                        script = document.getElementById("__ie_onload");
                        script.onreadystatechange = function() {
                            if (this.readyState == "complete")
                                init(); // call the onload handler
                        };
                    /*@end @*/


                    // for Safari
                    if (/WebKit/i.test(navigator.userAgent)) { // sniff
                        load_timer = setInterval(function() {
                            if (/loaded|complete/.test(document.readyState))
                                init(); // call the onload handler
                        }, 10);
                    }

                    // for other browsers set the window.onload, but also execute the old window.onload
                    old_onload = window.onload;

                    window.onload = function() {
                        init();
                        if (old_onload) old_onload();
                    };
                }

            load_events.push(func);
        }
	})();

	/* BdUtil scope */
	BdUtil.insertWBR = (function(){
		var textAreaCache = null;

		function getContainer(){
			var textarea = document.getElementById('insertWBR_container');
			if(!textarea){
				textarea = document.createElement('TEXTAREA');
				textarea.id = 'insertWBR_container';
				textarea.style.display = 'none';
				document.body.insertBefore(textarea, document.body.firstChild);
			}
			return (textAreaCache = textarea)
		}

		return function(text, step){
			var textarea = textAreaCache || getContainer();
			if(!textarea) return text;
			
			textarea.innerHTML = text.replace(/&/g,'&amp;').replace(/</g,"&lt;").replace(/>/g,"&gt;");
			var string = textarea.value;
			

			var step = (step || 5), reg = new RegExp("(\\S{" + step + "})", "gi");
			var result = string.replace(/(<[^>]+>)/gi,"$1<wbr/>").replace(/(>|^)([^<]+)(<|$)/gi, function(a,b,c,d){
				if(c.length < step) return a;
				return b + c.replace(reg, "$1<wbr/>") + d;
			}).replace(/&([^;]*)(<wbr\/?>)([^;]*);/g,'&$1$3;');
			return result;
		}
	})();

	BdUtil.hi_tracker = (function(){
		function E(s){ return encodeURIComponent(s) }

		function tracker(mn, a){
			return function(){
				var t = new Date().getTime(),
					href = a.href;
				if(isIE){
					var regex = /href\s*=\s*("|')?([^\s]*)\1/gi;
					if(regex.test(a.outerHTML))
						href = RegExp.$2;
				}
				new Image().src = "http://hi.baidu.com/sys/statlog/1.gif?m=" + E(mn) + "&v=" + E(href) + "&t="+t;
			}
		}

		return function(mod_id_or_el, mod_name){
			var bl = (typeof mod_id_or_el == 'string'),
				el = bl ? document.getElementById(mod_id_or_el) : mod_id_or_el,
				mn = mod_name || (bl ? mod_id_or_el : el.tagName),
				as = el.nodeName.toUpperCase() == 'A' ? [el] : el.getElementsByTagName('A');
			if(!as || as.length <= 0) return false;
			for(var i = 0, j = as.length; i < j; i ++){
				var a = as[i];
				isIE ? a.attachEvent("onclick", tracker(mn, a)) : a.addEventListener("click", tracker(mn, a), false);
			}
		}
	})();

    /* BdAjax scope */
    BdAjax.getXHR = function(){
        var xhr = null;
        try{
            return (xhr = new XMLHttpRequest());
        }catch(e){}

        for(var i = 0, a = ['MSXML3','MSXML2','Microsoft']; i < a.length; i ++){
            try{
                xhr = new ActiveXObject(a[i]+'.XMLHTTP');
                break;
            }catch(e){}
        }

        return xhr;
    }

    BdAjax.request = function(url, json){
        var xhr = this.getXHR();
        if(!xhr){
            throw new Error("cant't initialize xhr instance.");
        }
		var options={};
        options.method    = (json.method || 'get').toLowerCase();
        options.asyn      = true;
        options.onSuccess = json.onSuccess || function(){};
        options.onFailure = json.onFailure || function(){ new Image().src = "/sys/statlog/1.gif?m=ajax-request&v=" + encodeURIComponent(url) + "&t=" + new Date().getTime();};
       
        
        options.postData = json.postData || null;

        xhr.open(options.method, url, options.asyn);

		if("post" == options.method.toLowerCase()){
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } 

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 0 || xhr.status == 200){
                    options.onSuccess(xhr);
                }else{
                    options.onFailure(xhr);
                }
            }
        }
        xhr.send(options.postData);
    }

	BdAjax.loadJS=(function()
	{
		var head ;
		return function(jsUrl){
			head = head || document.getElementsByTagName("head")[0];
			var s=document.createElement("script");
			s.type="text/javascript";
			s.src=jsUrl;
			head.appendChild(s);
		}

	})();
	
	BdString.trim=function(str)
	{
		return str.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
	}
	BdString.byteLength = function(str){
		return str.replace(/[^\x00-\xFF]/g, "ly").length;
	}
	BdString.subByte = function(s, n){
		if(this.byteLength(s)<=n) 
			return s;
		for(var i=Math.floor((n=n-2)/2),l=s.length; i<l; i++)
			if(this.byteLength(s.substr(0,i))>=n)
				return s.substr(0,i) +"\u2026";
		return s;
	}
})();
