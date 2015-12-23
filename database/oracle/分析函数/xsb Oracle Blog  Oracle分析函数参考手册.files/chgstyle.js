
function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function setActiveLayout(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && a.getAttribute("title")>="a" && a.getAttribute("title") <= "z") {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function setActiveColorSchema(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && a.getAttribute("title")>="1" && a.getAttribute("title") <= "9") {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}
function getActiveLayout() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && a.getAttribute("title")>="a" && a.getAttribute("title") <= "z" && !a.disabled) return a.getAttribute("title");
  }
  return null;
}
function getActiveColorSchema() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && a.getAttribute("title")>="1" && a.getAttribute("title") <= "9"  && !a.disabled) return a.getAttribute("title");
  }
  return null;
}




function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function getPreferredLayout() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title") 
	   && a.getAttribute("title")>="a" && a.getAttribute("title") <= "z"
       ) return a.getAttribute("title");
  }
  return null;
}
function getPreferredColorSchema() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
	   && a.getAttribute("title")>="1" && a.getAttribute("title") <= "9"
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


function setCookie (name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
    document.cookie = curCookie;
}

function getCookie (name) {
    var prefix = name + '=';
    var c = document.cookie;
    var nullstring = '';
    var cookieStartIndex = c.indexOf(prefix);
    if (cookieStartIndex == -1)
        return nullstring;
    var cookieEndIndex = c.indexOf(";", cookieStartIndex + prefix.length);
    if (cookieEndIndex == -1)
        cookieEndIndex = c.length;
    return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

function deleteCookie (name, path, domain) {
    if (getCookie(name))
        document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function fixDate (date) {
    var base = new Date(0);
    var skew = base.getTime();
    if (skew > 0)
        date.setTime(date.getTime() - skew);
}

function rememberMe (f) {
    var now = new Date();
    fixDate(now);
    now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    setCookie('mtcmtauth', f.userName.value, now, '');
    setCookie('mtcmtmail', f.userEmail.value, now, '');
    setCookie('mtcmthome', f.userUrl.value, now, '');
}

function forgetMe (f) {
    deleteCookie('mtcmtmail', '');
    deleteCookie('mtcmthome', '');
    deleteCookie('mtcmtauth', '');
    f.email.value = '';
    f.author.value = '';
    f.url.value = '';
}
function getDisplays(text) {
  var display1 = readCookie(text);
  if (display1 && document.getElementById(text) )  document.getElementById(text).style.display = display1;
	
}
function setDisplays(text) {
	if (document.getElementById(text)) createCookie(text, document.getElementById(text).style.display, 365);
	
}
window.onload = function(e) {
  var cookielayout = readCookie("layout");
  var cookiecolor = readCookie("color");
  var layouttitle = cookielayout ? cookielayout : getPreferredLayout();
  var colortitle = cookiecolor ? cookiecolor : getPreferredColorSchema();
  setActiveLayout(layouttitle);
  setActiveColorSchema(colortitle);

  	getDisplays('archives');
	getDisplays('recentposts');
	getDisplays('recentcomments');
	getDisplays('topreadposts');
	getDisplays('topcommentposts');
	getDisplays('blog_statistics');
	getDisplays('mylinks');
	getDisplays('recentsiteposts');

  
}

window.onunload = function(e) {
  var layouttitle = getActiveLayout();
  var colortitle = getActiveColorSchema();
  createCookie("layout", layouttitle, 365);
  createCookie("color", colortitle, 365);
  
  	setDisplays('archives');
	setDisplays('recentposts');
	setDisplays('recentcomments');
	setDisplays('topreadposts');
	setDisplays('topcommentposts');
	setDisplays('blog_statistics');
	setDisplays('mylinks');
	setDisplays('recentsiteposts');

}



  var cookielayout = readCookie("layout");
  var cookiecolor = readCookie("color");
  var layouttitle = cookielayout ? cookielayout : getPreferredLayout();
  var colortitle = cookiecolor ? cookiecolor : getPreferredColorSchema();
  setActiveLayout(layouttitle);
  setActiveColorSchema(colortitle);
   	getDisplays('archives');
	getDisplays('recentposts');
	getDisplays('recentcomments');
	getDisplays('topreadposts');
	getDisplays('topcommentposts');
	getDisplays('blog_statistics');
	getDisplays('mylinks');
	getDisplays('recentsiteposts');
