// UUZONE_DOMAIN="uuzone.com"; //uuzone.com

// for test env , pls using lode.net
UUZONE_DOMAIN="uuzone.com"; //uuzone.com

var cookieEnabled=(navigator.cookieEnabled)? true : false
//if not IE4+ nor NS6+
if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
document.cookie="testcookie";

cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;
document.cookie="";
}
if(!cookieEnabled){
location.href="/html/help/cookie.html";
}
function setDomain(){
	document.domain=UUZONE_DOMAIN;
}
function initDomain(){
	var a=document.getElementsByTagName("script");
	for(var i=0;i<a.length;i++){
		if(a[i].src&&a[i].src.match(/domain\.js(\?.*)?$/)){
			if(a[i].src.indexOf("notInit")!=-1){
			}else{
				setDomain();
			}
		}
	}	
}
initDomain();

