/*
Created By: Chris Campbell
Website: http://particletree.com
Date: 2/1/2006

Inspired by the lightbox implementation found at http://www.huddletogether.com/projects/lightbox/
*/

/*-------------------------------GLOBAL VARIABLES------------------------------------*/

var detect = navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;

/*-----------------------------------------------------------------------------------------------*/

//Browser detect script origionally created by Peter Paul Koch at http://www.quirksmode.org/

function getBrowserInfo() {
	if (checkIt('konqueror')) {
		browser = "Konqueror";
		OS = "Linux";
	}
	else if (checkIt('safari')) browser 	= "Safari"
	else if (checkIt('omniweb')) browser 	= "OmniWeb"
	else if (checkIt('opera')) browser 		= "Opera"
	else if (checkIt('webtv')) browser 		= "WebTV";
	else if (checkIt('icab')) browser 		= "iCab"
	else if (checkIt('msie')) browser 		= "Internet Explorer"
	else if (!checkIt('compatible')) {
		browser = "Netscape Navigator"
		version = detect.charAt(8);
	}
	else browser = "An unknown browser";

	if (!version) version = detect.charAt(place + thestring.length);

	if (!OS) {
		if (checkIt('linux')) OS 		= "Linux";
		else if (checkIt('x11')) OS 	= "Unix";
		else if (checkIt('mac')) OS 	= "Mac"
		else if (checkIt('win')) OS 	= "Windows"
		else OS 								= "an unknown operating system";
	}
}

function checkIt(string) {
	place = detect.indexOf(string) + 1;
	thestring = string;
	return place;
}

/*-----------------------------------------------------------------------------------------------*/
LightBoxIsInit=false;
Event.observe(window, 'load', initialize, false);
//Event.observe(window, 'load', getBrowserInfo, false);
getBrowserInfo();
Event.observe(window, 'unload', Event.unloadCache, false);

var lightbox = Class.create();

lightbox.prototype = {

	yPos : 0,
	xPos : 0,

	initialize: function(ctrl,options) {		
		this.content = ctrl.href;
		
		this.setOptions(options);
		if(this.options.id||this.options.content){
			this.activate();
		}else{
			Event.observe(ctrl, 'click', this.activate.bindAsEventListener(this), false);
			ctrl.onclick = function(){return false;};
		}
	},
	setOptions:function(options){
		this.options = {
		  id:	null,	//id
		  content:null
	    }
	    Object.extend(this.options, options || {});
	},
	// Turn everything on - mainly the IE fixes
	activate: function(){
		lightboxHelper.href=this.content;//add for get the request url;
		if (browser == 'Internet Explorer'){
			this.getScroll();
			this.prepareIE('100%', 'hidden');
			this.setScroll(0,0);
			this.hideSelects('hidden');
		}
		this.displayLightbox("block");
	},
	
	// Ie requires height to 100% and overflow hidden or else you can scroll down past the lightbox
	prepareIE: function(height, overflow){
		bod = document.getElementsByTagName('body')[0];
		bod.style.height = height;
		bod.style.overflow = overflow;
  
		htm = document.getElementsByTagName('html')[0];
		htm.style.height = height;
		htm.style.overflow = overflow; 
	},
	
	// In IE, select elements hover on top of the lightbox
	hideSelects: function(visibility){
		selects = document.getElementsByTagName('select');
		for(i = 0; i < selects.length; i++) {
			selects[i].style.visibility = visibility;
		}
	},
	
	// Taken from lightbox implementation found at http://www.huddletogether.com/projects/lightbox/
	getScroll: function(){
		if (self.pageYOffset) {
			this.yPos = self.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop){
			this.yPos = document.documentElement.scrollTop; 
		} else if (document.body) {
			this.yPos = document.body.scrollTop;
		}
	},
	
	setScroll: function(x, y){
		window.scrollTo(x, y); 
	},
	
	displayLightbox: function(display){
		var flag=false;
		if(!LightBoxIsInit){
			flag=addLightboxMarkup();
		}else{
			flag=true;
		}
		if(flag&&LightBoxIsInit){
			$('overlay').style.display = display;
			$('lightbox').style.display = display;
			if(display != 'none') this.loadInfo();
		}
	},
	
	// Begin Ajax request based off of the href of the clicked linked
	loadInfo: function() {
		var c=null;
		if(this.options.id){
			c=$(this.options.id).innerHTML;
		}else if(this.options.content){
			c=this.options.content;			
		}
		if(c){
			r=new Object();
			r.responseText=c;
			this.processInfo(r);
			var a=$$("#lbContent select");
			a.each(function(e){e.style.visibility="visible";});
		}else{
			var myAjax = new Ajax.Request(
	        	this.content,{method: 'post',onComplete: this.processInfo.bindAsEventListener(this)}
			);
		}		
	},
	
	// Display Ajax response
	processInfo: function(response){
		var r=response.responseText
		if($("lbContent")){
			Element.update($("lbContent"),r);
		}else{
			info = "<div id='lbContent'>" + r + "</div>";
			new Insertion.Before($('lbLoadMessage'), info);
		}
		//setTimeout(function(){r.evalScripts();},10);
		$('lightbox').className = "done";	
		this.actions();			
	},
	
	// Search through new links within the lightbox, and attach click event
	actions: function(){
		lbActions = document.getElementsByClassName('lbAction');

		for(i = 0; i < lbActions.length; i++) {
			Event.observe(lbActions[i], 'click', this[lbActions[i].rel].bindAsEventListener(this), false);
			lbActions[i].onclick = function(){return false;};
		}

	},
	
	// Example of creating your own functionality once lightbox is initiated
	insert: function(e){
	   link = Event.element(e).parentNode;
	   Element.remove($('lbContent'));
	 
	   var myAjax = new Ajax.Request(
			  link.href,
			  {method: 'post', parameters: "", onComplete: this.processInfo.bindAsEventListener(this)}
	   );
	 
	},
	
	// Example of creating your own functionality once lightbox is initiated
	deactivate: function(){
		try{
		Element.remove($('lbContent'));
		
		if (browser == "Internet Explorer"){
			window.scrollTo(0, 0); 
			//this.setScroll(0,this.yPos);
			this.prepareIE("auto", "auto");
			this.hideSelects("visible");
		}
		this.displayLightbox("none");
		}catch(e){}
	}
}

/*-----------------------------------------------------------------------------------------------*/

// Onload, make all links that need to trigger a lightbox active
function initialize(){
	//addLightboxMarkup();
	lbox = document.getElementsByClassName('lbOn');
	for(i = 0; i < lbox.length; i++) {
		valid = new lightbox(lbox[i]);
	}
}

// Add in markup necessary to make this work. Basically two divs:
// Overlay holds the shadow
// Lightbox is the centered square that the content is put into.
function addLightboxMarkup() {
	try{
	if(browser == "Internet Explorer"&&document.readyState!="complete")	{
		alert("抱歉，请稍候再点击");
		return false;
	}
	bod 				= document.getElementsByTagName('body')[0];
	overlay 			= document.createElement('div');
	overlay.id		= 'overlay';
	lb					= document.createElement('div');
	lb.id				= 'lightbox';
	lb.className 	= 'loading';
	lb.innerHTML	= '<div  class="lbClose"><a href="#" class="imagelink" onclick="lightboxHelper.hide();return false;"><img src="/css/images/icons/window_close_grey.gif" /></a></div><div id="lbLoadMessage">' +
						  '<p>加载中...</p>' +
						  '</div>';
	bod.appendChild(overlay);
	bod.appendChild(lb);
	LightBoxIsInit=true;
	return true;
	}catch(e){
		return false;
	};
}

/*
<a href="/test.html" onclick="new render(this,{check:check(this)});return false;">run</a>
<script>
	function check(a){		
		a.setAttribute("lightboxUrl","/a.html");
		return true;
	}
</script>
//if check() return true, execute lightbox, else goto a.href
*/

var render = Class.create();
Object.extend(Object.extend(render.prototype, lightbox.prototype),{
	initialize: function(a,options) {
		this.setOptions(options);
		if(this.check()){
			this.content = a.getAttribute("lightboxUrl");
			if(!this.content){
				this.content = a.getAttribute("href");
			}
			this.activate();
		}else{						
		    if (a.target == "_blank" )		    		    
		    	window.open(a.href);
		    else
    			location.href=a.href;
		}
		return false;
  	},
  	setOptions: function(options) {
	    this.options = {
	      check:  false
	    }
	    Object.extend(this.options, options || {});
	},
	check:function(){
		return eval(this.options.check);
	}
});
/*
 user for setting lightbox width,height, etc
*/
lightboxHelper={
	setSize:function(w,h){
		$("lightbox").style.width=w;
		$("lightbox").style.heidth=h;
	},
	setWidth:function(w){
		$("lightbox").style.width=w;
	},
	setHeight:function(h){
		$("lightbox").style.heidth=h;
	},
	hide:function(){
		try{
			$("lbContent").innerHTML="";
			Element.remove($("lbContent"));
		
			if (browser == "Internet Explorer"){
				bod = document.getElementsByTagName('body')[0];
				bod.style.height = "auto";
				bod.style.overflowX = "visible";
				bod.style.overflowY = "auto";
  
				htm = document.getElementsByTagName('html')[0];
				htm.style.height = "auto";
				htm.style.overflowX = "visible";
				htm.style.overflow = "auto"; 


				selects = document.getElementsByTagName('select');
				for(i = 0; i < selects.length; i++) {
					selects[i].style.visibility = "visible";		
				}

			}
			$('overlay').style.display = "none";
			$('lightbox').style.display = "none";

		}catch(e){}
		return false;
	}
};