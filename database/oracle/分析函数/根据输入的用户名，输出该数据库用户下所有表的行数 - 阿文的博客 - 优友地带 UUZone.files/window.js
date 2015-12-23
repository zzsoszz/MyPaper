// Copyright (c) 2006 Sébastien Gruhier (http://xilinus.com, http://itseb.com)
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// VERSION 0.80

var Window = Class.create();
Window.prototype = {
	// Constructor
	// Available parameters : className, title, minWidth, minHeight, maxWidth, maxHeight, width, height, top, left, bottom, right, resizable, zIndex, opacity, 
	//                        hideEffect, showEffect, showEffectOptions, hideEffectOptions, effectOptions, url, draggable, closable, minimizable, maximizable, parent, onload
	initialize: function(id, parameters) {
		this.id = id;
		this.hasEffectLib = String.prototype.parseColor != null;
		this.minWidth = parameters.minWidth || 100;
		this.minHeight = parameters.minHeight || 20;
		this.maxWidth = parameters.maxWidth;
		this.maxHeight = parameters.maxHeight;
		this.showEffect = parameters.showEffect || (this.hasEffectLib ? Effect.Appear : Element.show);
		this.hideEffect = parameters.hideEffect || (this.hasEffectLib ? Effect.Fade : Element.hide);
		this.hidetitle	= parameters.hidetitle;
		this.hidestatus = parameters.hidestatus;
		
		this.showEffectOptions = parameters.showEffectOptions || parameters.effectOptions;
		this.hideEffectOptions = parameters.hideEffectOptions || parameters.effectOptions;
		this.draggable = parameters.draggable != null ? parameters.draggable : true;
		this.userData = parameters.userData;
		this.bottommost = parameters.bottommost;

		var resizable = parameters.resizable != null ? parameters.resizable : true;
		var closable = parameters.closable != null ? parameters.closable : true;
		var minimizable = parameters.minimizable != null ? parameters.minimizable : true;
		var maximizable = parameters.maximizable != null ? parameters.maximizable : true;
		var className = parameters.className != null ? parameters.className : "dialog";
		this.className = className;
		
		var parent = parameters.parent || document.getElementsByTagName("body").item(0);
		this.element = this.createWindow(id, className, parent, resizable, closable, minimizable, maximizable, parameters.title, parameters.url, parameters.hidetitle , parameters.hidestatus , parameters.onload);
		this.isIFrame = parameters.url != null;
		this.event_sink	= parameters.event_sink;
		
		// Bind event listener
    this.eventMouseDown = this.initDrag.bindAsEventListener(this);
  	this.eventMouseUp   = this.endDrag.bindAsEventListener(this);
  	this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
  	this.eventKeyPress = this.keyPress.bindAsEventListener(this);
  	this.eventOnLoad = this._getWindowBorderSize.bindAsEventListener(this);

		this.topbar = $(this.element.id + "_top");
		this.bottombar = $(this.element.id + "_bottom");
		
		Event.observe(this.topbar, "mousedown", this.eventMouseDown);
		Event.observe(this.bottombar, "mousedown", this.eventMouseDown);
		Event.observe(window, "load", this.eventOnLoad);
		
		if (this.draggable)  {
			try
			{
			
			this.bottombar.addClassName("bottom_draggable");
			this.topbar.addClassName("top_draggable");
			}
			catch(e){}
    }		
    
		var offset = [0,0];
		if (resizable) {
			this.sizer = $(this.element.id + "_sizer");
    	Event.observe(this.sizer, "mousedown", this.eventMouseDown);
    }	
		var width = parseFloat(parameters.width) || 200;
		var height = parseFloat(parameters.height) || 200;

		if (parameters.left != null) {
			this.element.setStyle({left: parseFloat(parameters.left) + offset[0] + 'px'});
			this.useLeft = true;
		}

		if (parameters.right != null) {
			this.element.setStyle({right: parseFloat(parameters.right) + 'px'});
			this.useLeft = false;
		}

		if (parameters.top != null) {
			this.element.setStyle({top: parseFloat(parameters.top) + 'px'});
			this.useTop = true;
		}

		if (parameters.bottom != null) {
			this.element.setStyle({bottom: parseFloat(parameters.bottom) + 'px'});			
			this.useTop = false;
		}

    this.storedLocation = null;
    
		if (parameters.opacity)
			this.setOpacity(parameters.opacity);
		if (parameters.zIndex)
			this.setZIndex(parameters.zIndex)

		this.destroyOnClose = false;

    this._getWindowBorderSize();
		this.setSize(width, height);
		Windows.register(this);	    
  },
  
	// Destructor
 	destroy: function() {
		Windows.notify("onDestroy", this);
  	Event.stopObserving(this.topbar, "mousedown", this.eventMouseDown);
  	Event.stopObserving(this.bottombar, "mousedown", this.eventMouseDown);
		Event.stopObserving(window, "load", this.eventOnLoad);

		if (this.sizer)
    		Event.stopObserving(this.sizer, "mousedown", this.eventMouseDown);

	 	if(this.iefix) 
			Element.hide(this.iefix);

    Element.remove(this.element);

		Windows.unregister(this);	    
	},
  	
	// Sets window deleagte, should have functions: "canClose(window)" 
	setDelegate: function(delegate) {
		this.delegate = delegate
	},
	
	// Gets current window delegate
	getDelegate: function() {
		return this.delegate;
	},
	
	// Gets window content
	getContent: function () {
		return $(this.element.id + "_content");
	},
	
	// Sets the content with an element id
	setContent: function(id, autoresize, autoposition) {
		var d = null;
		var p = null;

		if (autoresize) 
			d = Element.getDimensions(id);
		if (autoposition) 
			p = Position.cumulativeOffset($(id));

		var content = this.getContent()
		content.appendChild($(id).cloneNode(true) );
		
		if (autoresize) 
			this.setSize(d.width, d.height);
		if (autoposition) 
		  this.setLocation(p[1] - this.heightN, p[0] - this.widthW);	  
	},
	
	// Stores position/size in a cookie, by default named with window id
	setCookie: function(name, expires, path, domain, secure) {
		name = name || this.element.id;
		this.cookie = [name, expires, path, domain, secure];
		
		// Get cookie
		var value = WindowUtilities.getCookie(name)
		// If exists
		if (value) {
			var values = value.split(',');
			var x = values[0].split(':');
			var y = values[1].split(':');

			var w = parseFloat(values[2]), h = parseFloat(values[3]);
			var mini = values[4];
			var maxi = values[5];

		  this.setSize(w, h);
			if (mini == "true")
			  this.minimize();
			else if (maxi == "true")
			  this.doMaximize = true // Maiximize will be done at onload window event

			this.useLeft = x[0] == "l";
			this.useTop = y[0] == "t";

			this.element.setStyle(this.useLeft ? {left: x[1]} : {right: x[1]});
			this.element.setStyle(this.useTop ? {top: y[1]} : {bottom: y[1]});
		}
	},
	
	// Gets window ID
	getId: function() {
		return this.element.id;
	},
	
	// Detroys itself when closing 
	setDestroyOnClose: function() {
		this.destroyOnClose = true;
	},
	
	// initDrag event
	initDrag: function(event) {
		// Get pointer X,Y
  	this.pointer = [Event.pointerX(event), Event.pointerY(event)];
		this.doResize = false;
		
		// Check if click on close button, 
		var closeButton = $(this.getId() + '_close');
		if (closeButton && Position.within(closeButton, this.pointer[0], this.pointer[1])) {
			return;
		}
		this.toFront();

		// Check if click on sizer
		if (this.sizer && Position.within(this.sizer, this.pointer[0], this.pointer[1])) {
			this.doResize = true;
    	this.widthOrg = this.width;
    	this.heightOrg = this.height;
    	this.bottomOrg = parseFloat(this.element.getStyle('bottom'));
    	this.rightOrg = parseFloat(this.element.getStyle('right'));
			Windows.notify("onStartResize", this);
		}
		else {
  		if (! this.draggable) 
  		  return;
			Windows.notify("onStartMove", this);
		}
  	
		// Register global event to capture mouseUp and mouseMove
		Event.observe(document, "mouseup", this.eventMouseUp);
  	Event.observe(document, "mousemove", this.eventMouseMove);
		
		// Add an invisible div to keep catching mouse event over the iframe
		if (this.isIFrame) {
			var objBody = document.getElementsByTagName("body").item(0);
			var div = document.createElement("div");
			div.style.position = "absolute";
			div.style.top = this.heightN + "px";
			div.style.left = this.widthW + "px";
			div.style.zIndex = Windows.maxZIndex;
			div.style.height = this.height + "px";
			div.style.width = this.width + "px";
			this.element.appendChild(div);
			this.tmpDiv = div;			
		}
  	Event.stop(event);
  },

  // updateDrag event
	updateDrag: function(event) {
   	var pointer = [Event.pointerX(event), Event.pointerY(event)];    
		var dx = pointer[0] - this.pointer[0];
		var dy = pointer[1] - this.pointer[1];
		
		// Resize case, update width/height
		if (this.doResize) {
			this.setSize(this.widthOrg + dx , this.heightOrg + dy);
			
      dx = this.width - this.widthOrg
      dy = this.height - this.heightOrg
			
		  // Check if it's a right position, update it to keep upper-left corner at the same position
			if (! this.useLeft) 
				this.element.setStyle({right: (this.rightOrg -dx) + 'px'});
			// Check if it's a bottom position, update it to keep upper-left corner at the same position
			if (! this.useTop) 
				this.element.setStyle({bottom: (this.bottomOrg -dy) + 'px'});

			if (this.tmpDiv)
			  Element.setStyle(this.tmpDiv, {width: this.width + "px", height: this.height + "px"})
		}
		// Move case, update top/left
		else {
		  this.pointer = pointer;
  		
			if (this.useLeft) 
				this.element.setStyle({left: parseFloat(this.element.getStyle('left')) + dx + 'px'});
			else 
				this.element.setStyle({right: parseFloat(this.element.getStyle('right')) - dx + 'px'});
			
			if (this.useTop) 
				this.element.setStyle({top: parseFloat(this.element.getStyle('top')) + dy + 'px'});
		  else 
				this.element.setStyle({bottom: parseFloat(this.element.getStyle('bottom')) - dy + 'px'});
		}
		if (this.iefix) 
			this._fixIEOverlapping(); 
			
		this._removeStoreLocation();
    Event.stop(event);
	},

	 // endDrag callback
 	endDrag: function(event) {
		if (this.doResize)
			Windows.notify("onEndResize", this);
		else
			Windows.notify("onEndMove", this);
		
		// Release event observing
		Event.stopObserving(document, "mouseup", this.eventMouseUp);
    Event.stopObserving(document, "mousemove", this.eventMouseMove);

		// Remove temporary div
		if (this.isIFrame) {
			this.tmpDiv.parentNode.removeChild(this.tmpDiv);
			this.tmpDiv = null;
		}
		// Store new location/size if need be
		this._saveCookie()

    Event.stop(event);
  },

	keyPress: function(event) {
		//Dialog.cancelCallback();
	},
	
	// Creates HTML window code
	createWindow: function(id, className, parent, resizable, closable, minimizable, maximizable, title, url, hidetitle , hidestatus , onload) {
		win = document.createElement("div");
		win.setAttribute('id', id);
		win.className = "dialog";
	 	if (!title)
			title = "&nbsp;";

		var content;
		if (url)
			content= "<IFRAME name=\"" + id + "_content\"  id=\"" + id + "_content\" SRC=\"" + url + "\" onload=\"" + onload + "\" > </IFRAME>";
		else
			content ="<DIV id=\"" + id + "_content\" class=\"" +className + "_content\" onload=\"" + onload + "\"> </DIV>";

		win.innerHTML = "\
		<div class='"+ className +"_close' id='"+ id +"_close' onclick='Windows.close(\""+ id +"\")'> </div>\
		<div class='"+ className +"_minimize' id='"+ id +"_minimize' onclick='Windows.minimize(\""+ id +"\")'> </div>\
		<div class='"+ className +"_maximize' id='"+ id +"_maximize' onclick='Windows.maximize(\""+ id +"\")'> </div>\
		<table id='"+ id +"_header' class='"+ className +"_header'>\
			<tr id='"+ id +"_row1'>\
				<td>\
					<table id = '"+id+"_topbartable'>\
						<tr>\
							<td id='"+ id +"_nw' class='"+ className +"_nw'><div class='"+ className +"_nw'> </div></td>\
							<td class='"+ className +"_n'  valign='middle'><div id='"+ id +"_top' class='"+ className +"_title'>"+ title +"</div></td>\
							<td class='"+ className +"_ne'> <div class='"+ className +"_ne'></div></td>\
						</tr>\
					</table>\
				</td>\
			</tr>\
			<tr id='"+ id +"_row2'>\
				<td>\
					<table >\
						<tr>\
							<td class='"+ className +"_w'><div class='"+ className +"_w'> </div></td>\
							<td class='"+ className +"_content'>"+ content +"</td>\
							<td class='"+ className +"_e'><div class='"+ className +"_e'> </div></td>\
						</tr>\
					</table>\
				</td>\
			</tr>\
			<tr id='"+ id +"_row3'>\
				<td>\
					<table id = '"+id+"_statusbartable'>\
						<tr>\
							<td class='"+ className +"_sw' id='"+ id +"_sw'><div class='"+ className +"_sw'></div> </td>\
							<td class='"+ className +"_s'><div  id='"+ id +"_bottom' class='"+ className +"_s'></div></td>\
							<td class='"+ className +"_se'>"+ (resizable  ? "<div id='"+ id + "_sizer' class='"+ className +"_sizer'></div>" : "<div class='"+ className +"_se'></div>") +"</td>\
						</tr>\
					</table>\
				</td>\
			</tr>\
		</table>\
		";
		
		Element.hide(win);
		parent.insertBefore(win, parent.firstChild);
		
		if (!closable)
		  Element.hide(id +"_close")
  	if (!minimizable)
  	  Element.hide(id +"_minimize")
  	if (!maximizable)
  	  Element.hide(id +"_maximize")
	 if( hidetitle )	
	 {
		$(id +'_topbartable').style.display="none";
		$(id +'_row1').style.height = "1px";
		//$(id +'_content').style.borderTop = "solid 1px black";
		$(id +'_row1').style.overflow = "hidden";
	 }
	 if( hidestatus )
	 {
		//$(id +'_row3').style.display="none";
		$(id +'_statusbartable').style.display="none";
		$(id +'_row3').style.height = "1px";
		//$(id +'_content').style.borderBottom = "solid 1px #3a3a3a";
		$(id +'_row3').style.overflow = "hidden";
	 }
		return win;
	},
	
	// Sets window location
	setLocation: function(top, left) {
	  if (top < 0)
	    top = 0;
    if (left < 0)
      left= 0
		this.element.setStyle({top: top + 'px'});
		this.element.setStyle({left: left + 'px'});
		this.useLeft = true;
		this.useTop = true;
	},
		
	// Sets window size
	setSize: function(width, height) {    
		// Check min and max size
		if (width < this.minWidth)
			width = this.minWidth;

		if (height < this.minHeight)
			height = this.minHeight;
			
		if (this.maxHeight && height > this.maxHeight)
			height = this.maxHeight;

		if (this.maxWidth && width > this.maxWidth)
			width = this.maxWidth;

  	this.width = width;
		this.height = height;
		this.element.setStyle({width: width + this.widthW + this.widthE + "px"})
		this.element.setStyle({height: height + this.heightN + this.heightS + "px"})

		// Update content height
		var content = $(this.element.id + '_content')
		content.setStyle({height: height  + 'px'});
		content.setStyle({width: width  + 'px'});
		if( !isIE && this.event_sink && this.event_sink.OnClientResize )
		{
			this.event_sink.OnClientResize(this.event_sink);
		}
		
	},
	
	// Brings window to front
	
	toFront: function() {
	if( this.bottommost )
		return;

    this.setZIndex(Windows.maxZIndex + 20);
	},
	
	// Displays window modal state or not
	show: function(modal) {
		if (modal) {
			WindowUtilities.disableScreen(this.className);
			this.modal = true;			
			this.setZIndex(Windows.maxZIndex + 20);
			Windows.unsetOverflow(this);
			Event.observe(document, "keypress", this.eventKeyPress);	      	
		}
		
		// To restore overflow if need be
		if (this.oldStyle)
		  this.getContent().setStyle({overflow: this.oldStyle});
			
		this.setSize(this.width, this.height);
		if (this.showEffect != Element.show && this.showEffectOptions )
			this.showEffect(this.element, this.showEffectOptions);	
		else
			this.showEffect(this.element);	
			
    this._checkIEOverlapping();
	},
	
	// Displays window modal state or not at the center of the page
	showCenter: function(modal) {
		this.setSize(this.width, this.height);
		this.center();
		
		this.show(modal);
	},
	
	center: function() {
		var windowScroll = WindowUtilities.getWindowScroll();    
		var pageSize = WindowUtilities.getPageSize();    

    this.setLocation(windowScroll.top + (pageSize.windowHeight - (this.height + this.heightN + this.heightS))/2, 
                     windowScroll.left + (pageSize.windowWidth - (this.width + this.widthW + this.widthE))/2);
    this.toFront();
	},
	
	// Hides window
	hide: function() {
		if (this.modal) {
			WindowUtilities.enableScreen();
			Windows.resetOverflow();
			Event.stopObserving(document, "keypress", this.eventKeyPress);			
		}
		// To avoid bug on scrolling bar
		this.getContent().setStyle({overflow: "hidden"});
	  this.oldStyle = this.getContent().getStyle('overflow');
	  
		if (this.hideEffect != Element.hide && this.hideEffectOptions)
			this.hideEffect(this.element, this.hideEffectOptions);	
		else
			this.hideEffect(this.element);	

	 	if(this.iefix) 
			this.iefix.hide();
	},

  minimize: function() {
    var r2 = $(this.getId() + "_row2");
    var r3 = $(this.getId() + "_row3");
    if (r2.visible()) {
      r2.hide();
      r3.hide();
      
    } else {
      r2.show();
      r3.show();
    }
    
    // Store new location/size if need be
		this._saveCookie()
  },
  
  maximize: function() {
    if (this.storedLocation != null) {
      this._restoreLocation();
      if(this.iefix) 
  			this.iefix.hide();
    }
    else {
      this._storeLocation();
      Windows.unsetOverflow(this);
      
      var windowScroll = WindowUtilities.getWindowScroll();
  		var pageSize = WindowUtilities.getPageSize();    

			this.element.setStyle(this.useLeft ? {left: windowScroll.left} : {right: windowScroll.left});
  		this.element.setStyle(this.useTop ? {top: windowScroll.top} : {bottom: windowScroll.top});

      this.setSize(pageSize.windowWidth - this.widthW - this.widthE, pageSize.windowHeight - this.heightN - this.heightS)
      this.toFront();
      if (this.iefix) 
  			this._fixIEOverlapping(); 
    }

		// Store new location/size if need be
		this._saveCookie()
  },
  
  isMinimized: function() {
    var r2 = $(this.getId() + "_row2");
    return !r2.visible();
  },
  
  isMaximized: function() {
    return (this.storedLocation != null);
  },
  
	setOpacity: function(opacity) {
		if (Element.setOpacity)
			Element.setOpacity(this.element, opacity);
	},
	
	setZIndex: function(zindex) {
		this.element.setStyle({zIndex: zindex});
		Windows.updateZindex(zindex, this);
	},
  setBottomMost:function( bTrue ){
	this.bottommost = bTrue;
  },

  setTitle: function(newTitle) {
  	if (!newTitle) 
  	  newTitle = "&nbsp;";
  	Element.update(this.element.id + '_top', newTitle);
  },

	setStatusBar: function(element) {
		var statusBar = $(this.getId() + "_bottom");

    if (typeof(element) == "object") {
      if (this.bottombar.firstChild)
        this.bottombar.replaceChild(element, this.bottombar.firstChild);
      else
        this.bottombar.appendChild(element);
    }
    else
		  this.bottombar.innerHTML = element;
	},

	_checkIEOverlapping: function() {
    if(!this.iefix && (navigator.appVersion.indexOf('MSIE')>0) && (navigator.userAgent.indexOf('Opera')<0) && (this.element.getStyle('position')=='absolute')) {
        new Insertion.After(this.element.id, '<iframe id="' + this.element.id + '_iefix" '+ 'style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" ' + 'src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
        this.iefix = $(this.element.id+'_iefix');
    }
    if(this.iefix) 
			setTimeout(this._fixIEOverlapping.bind(this), 50);
	},

	_fixIEOverlapping: function() {
	    Position.clone(this.element, this.iefix);
	    this.iefix.style.zIndex = this.element.style.zIndex - 1;
	    this.iefix.show();
	},
	
	_getWindowBorderSize: function(event) {
    // Hack to get real window border size!!
    var div = this._createHiddenDiv(this.className + "_n")
		this.heightN = Element.getDimensions(div).height;		
		div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.className + "_s")
		this.heightS = Element.getDimensions(div).height;		
		div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.className + "_e")
		this.widthE = Element.getDimensions(div).width;		
		div.parentNode.removeChild(div)

    var div = this._createHiddenDiv(this.className + "_w")
		this.widthW = Element.getDimensions(div).width;
		div.parentNode.removeChild(div);
		
		if (this.doMaximize)
		  this.maximize();
  },
 
  _createHiddenDiv: function(className) {
    var objBody = document.getElementsByTagName("body").item(0);
    var win = document.createElement("div");
		win.setAttribute('id', this.element.id+ "_tmp");
		win.className = className;
		win.style.display = 'none'
		win.innerHTML = ''
		objBody.insertBefore(win, objBody.firstChild)   
		return win
  },
  
	_storeLocation: function() {
	  if (this.storedLocation == null) {
	    this.storedLocation = {useTop: this.useTop, useLeft: this.useLeft, 
	                           top: this.element.getStyle('top'), bottom: this.element.getStyle('bottom'),
	                           left: this.element.getStyle('left'), right: this.element.getStyle('right'),
	                           width: this.width, height: this.height };
	  }
	},
	
  _restoreLocation: function() {
    if (this.storedLocation != null) {
      this.useLeft = this.storedLocation.useLeft;
      this.useTop = this.storedLocation.useTop;
      
      this.element.setStyle(this.useLeft ? {left: this.storedLocation.left} : {right: this.storedLocation.right});
  		this.element.setStyle(this.useTop ? {top: this.storedLocation.top} : {bottom: this.storedLocation.bottom});
		  this.setSize(this.storedLocation.width, this.storedLocation.height);
      
		  Windows.resetOverflow();
		  this._removeStoreLocation();
    }
  },
  
  _removeStoreLocation: function() {
    this.storedLocation = null;
  },
  
  _saveCookie: function() {
    if (this.cookie) {
  		var value = "";
  		if (this.useLeft)
  			value += "l:" +  (this.storedLocation ? this.storedLocation.left : this.element.getStyle('left'))
  		else
  			value += "r:" + (this.storedLocation ? this.storedLocation.right : this.element.getStyle('right'))
  		if (this.useTop)
  			value += ",t:" + (this.storedLocation ? this.storedLocation.top : this.element.getStyle('top'))
  		else
  			value += ",b:" + (this.storedLocation ? this.storedLocation.bottom :this.element.getStyle('bottom'))
  			
  		value += "," + (this.storedLocation ? this.storedLocation.width : this.width);
  		value += "," + (this.storedLocation ? this.storedLocation.height : this.height);
  		value += "," + this.isMinimized();
  		value += "," + this.isMaximized();
  		WindowUtilities.setCookie(value, this.cookie)
    }
  }
};

// Windows containers, register all page windows
var Windows = {
  windows: [],
  observers: [],
  focusedWindow: null,
  maxZIndex: 0,

  addObserver: function(observer) {
    this.observers.push(observer);
  },
  
  removeObserver: function(observer) {  
    this.observers = this.observers.reject( function(o) { return o==observer });
  },
  
  notify: function(eventName, win) {  //  onStartResize(), onEndResize(), onStartMove(), onEndMove(), onClose(), onDestroy()
    this.observers.each( function(o) {if(o[eventName]) o[eventName](eventName, win);});
  },

  // Gets window from its id
  getWindow: function(id) {
	  return this.windows.detect(function(d) { return d.getId() ==id });
  },

  // Registers a new window (called by Windows constructor)
  register: function(win) {
    this.windows.push(win);
  },
  
  // Unregisters a window (called by Windows destructor)
  unregister: function(win) {
    this.windows = this.windows.reject(function(d) { return d==win });
  }, 

  // Closes a window with its id
  close: function(id) {
  	win = this.getWindow(id);
  	// Asks delegate if exists
    if (win) {
	  	if (win.getDelegate() && ! win.getDelegate().canClose(win)) 
	  		return;
	
  			this.notify("onClose", win);
  			win.hide();
  			if (win.destroyOnClose)  
    			win.destroy();
  	}
  },
  
  // Closes all windows
  closeAll: function() {  
    this.windows.each( function(w) {Windows.close(w.getId())} );
  },
  
  // Minimizes a window with its id
  minimize: function(id) {
  	win = this.getWindow(id);
  	win.minimize();
  },
  
  // Maximizes a window with its id
  maximize: function(id) {
  	win = this.getWindow(id);
  	win.maximize();
  },
  
  unsetOverflow: function(except) {		
  	this.windows.each(function(d) { d.oldOverflow = d.getContent().getStyle("overflow") || "auto" ; d.getContent().setStyle({overflow: "hidden"}) });
  	if (except && except.oldOverflow)
  		except.getContent().setStyle({overflow: except.oldOverflow});
  },

  resetOverflow: function() {
	  this.windows.each(function(d) { if (d.oldOverflow) d.getContent().setStyle({overflow: d.oldOverflow}) });
  },

  updateZindex: function(zindex, win) {
  	if (zindex > this.maxZIndex)
  		this.maxZIndex = zindex;
    this.focusedWindow = win;
  }
};

var Dialog = {
 	win: null,

	confirm: function(message, parameters) {
	  parameters = parameters || {};
		var okLabel = parameters.okLabel ? parameters.okLabel : "Ok";
		var cancelLabel = parameters.cancelLabel ? parameters.cancelLabel : "Cancel";

		var windowParam = parameters.windowParameters || {};
		windowParam.className = windowParam.className || "alert";

    buttonClass = parameters.buttonClass ? "class=" + parameters.buttonClass : "" 
		var content = "\
			<div class='" + windowParam.className + "_message'>" + message  + "</div>\
				<div class='" + windowParam.className + "_buttons'>\
					<input type='button' value='" + okLabel + "' onclick='Dialog.okCallback()'" + buttonClass + "/>\
					<input type='button' value='" + cancelLabel + "' onclick='Dialog.cancelCallback()" + buttonClass + "'/>\
				</div>\
		";
	  this.openDialog(content, parameters)
	  return this.win
	},
	
	alert: function(message, parameters) {
	  parameters = parameters || {};
		var okLabel = parameters.okLabel ? parameters.okLabel : "Ok";

		var windowParam = parameters.windowParameters || {};
		windowParam.className = windowParam.className || "alert";

    buttonClass = parameters.buttonClass ? "class=" + parameters.buttonClass : "" 
		var content = "\
			<div class='" + windowParam.className + "_message'>" + message  + "</div>\
				<div class='" + windowParam.className + "_buttons'>\
					<input type='button' value='" + okLabel + "' onclick='Dialog.okCallback()" + buttonClass + "'/>\
				</div>";
		return this.openDialog(content, parameters)
	},
	
	info: function(message, parameters) {    
	  parameters = parameters || {};
	  parameters.windowParameters = parameters.windowParameters || {};
	  
		var className = parameters.windowParameters.className || "alert";

		var content = "<div id='modal_dialog_message' class='" + className + "_message'>" + message  + "</div>";
		if (parameters.showProgress)
		  content += "<div id='modal_dialog_progress' class='" + className + "_progress'>	</div>";

		parameters.windowParameters.ok = null;
		parameters.windowParameters.cancel = null;
    parameters.windowParameters.className = className;
		
		return this.openDialog(content, parameters)
	},
	
	setInfoMessage: function(message) {
		$('modal_dialog_message').update(message);
	},
	
	closeInfo: function() {
		Windows.close('modal_dialog');
	},
	
	openDialog: function(content, parameters) {
		// remove old dialog
		if (this.win) 
			this.win.destroy();

		var windowParam = parameters && parameters.windowParameters ? parameters.windowParameters : {};
		windowParam.resizable = windowParam.resizable || false;
		
		windowParam.effectOptions = windowParam.effectOptions || {duration: 1};

		this.win = new Window('modal_dialog', windowParam);
		this.win.getContent().innerHTML = content;
		this.win.showCenter(true);	
		
		this.win.cancelCallback = parameters.cancel;
		this.win.okCallback = parameters.ok;
		
		if (! this.eventResize)
		  this.eventResize = this.recenter.bindAsEventListener(this);
		  
  	Event.observe(window, "resize", this.eventResize);
  	Event.observe(window, "scroll", this.eventResize);

		return this.win;		
	},
	
	okCallback: function() {
		this.win.hide();
		Event.stopObserving(window, "resize", this.eventResize);
		Event.stopObserving(window, "scroll", this.eventResize);
      	
		if (this.win.okCallback)
			this.win.okCallback(this.win);
	},

	cancelCallback: function() {
		this.win.hide();
		Event.stopObserving(window, "resize", this.eventResize);
		Event.stopObserving(window, "scroll", this.eventResize);
		
		if (this.win.cancelCallback)
			this.win.cancelCallback(this.win);
	},

	recenter: function(event) {
		var pageSize = WindowUtilities.getPageSize();
		// set height of Overlay to take up whole page and show
		if ($('overlay_modal'))
		  $('overlay_modal').style.height = (pageSize.pageHeight + 'px');
		
		this.win.center();
	}
}
/*
	Based on Lightbox JS: Fullsize Image Overlays 
	by Lokesh Dhakar - http://www.huddletogether.com

	For more information on this script, visit:
	http://huddletogether.com/projects/lightbox/

	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	(basically, do anything you want, just leave my name and link)
*/

var isIE = navigator.appVersion.match(/MSIE/) == "MSIE";

var WindowUtilities = {
  // From script.aculo.us
  getWindowScroll: function() {
    var w = window;
      var T, L, W, H;
      with (w.document) {
        if (w.document.documentElement && documentElement.scrollTop) {
          T = documentElement.scrollTop;
          L = documentElement.scrollLeft;
        } else if (w.document.body) {
          T = body.scrollTop;
          L = body.scrollLeft;
        }
        if (w.innerWidth) {
          W = w.innerWidth;
          H = w.innerHeight;
        } else if (w.document.documentElement && documentElement.clientWidth) {
          W = documentElement.clientWidth;
          H = documentElement.clientHeight;
        } else {
          W = body.offsetWidth;
          H = body.offsetHeight
        }
      }
      return { top: T, left: L, width: W, height: H };
    
  }, 
  //
  // getPageSize()
  // Returns array with page width, height and window width, height
  // Core code from - quirksmode.org
  // Edit for Firefox by pHaez
  //
  getPageSize: function(){
  	var xScroll, yScroll;

  	if (window.innerHeight && window.scrollMaxY) {	
  		xScroll = document.body.scrollWidth;
  		yScroll = window.innerHeight + window.scrollMaxY;
  	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
  		xScroll = document.body.scrollWidth;
  		yScroll = document.body.scrollHeight;
  	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
  		xScroll = document.body.offsetWidth;
  		yScroll = document.body.offsetHeight;
  	}

  	var windowWidth, windowHeight;

  	if (self.innerHeight) {	// all except Explorer
  		windowWidth = self.innerWidth;
  		windowHeight = self.innerHeight;
  	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
  		windowWidth = document.documentElement.clientWidth;
  		windowHeight = document.documentElement.clientHeight;
  	} else if (document.body) { // other Explorers
  		windowWidth = document.body.clientWidth;
  		windowHeight = document.body.clientHeight;
  	}	
  	var pageHeight, pageWidth;

  	// for small pages with total height less then height of the viewport
  	if(yScroll < windowHeight){
  		pageHeight = windowHeight;
  	} else { 
  		pageHeight = yScroll;
  	}

  	// for small pages with total width less then width of the viewport
  	if(xScroll < windowWidth){	
  		pageWidth = windowWidth;
  	} else {
  		pageWidth = xScroll;
  	}

  	return {pageWidth: pageWidth ,pageHeight: pageHeight , windowWidth: windowWidth, windowHeight: windowHeight};
  },

 	disableScreen: function(className) {
		WindowUtilities.initLightbox(className);
		var objBody = document.getElementsByTagName("body").item(0);

		// prep objects
	 	var objOverlay = $('overlay_modal');

		var pageSize = WindowUtilities.getPageSize();

		// Hide select boxes as they will 'peek' through the image in IE
		if (isIE) {
			selects = document.getElementsByTagName("select");
		    for (var i = 0; i != selects.length; i++) {
		    	selects[i].style.visibility = "hidden";
		    }
		}	
	
		// set height of Overlay to take up whole page and show
		objOverlay.style.height = (pageSize.pageHeight + 'px');
		objOverlay.style.display = 'block';	
	},

 	enableScreen: function() {
	 	var objOverlay = $('overlay_modal');
		if (objOverlay) {
			// hide lightbox and overlay
			objOverlay.style.display = 'none';

			// make select boxes visible
			if (isIE) {
				selects = document.getElementsByTagName("select");
			    for (var i = 0; i != selects.length; i++) {
					selects[i].style.visibility = "visible";
				}
			}
			objOverlay.parentNode.removeChild(objOverlay);
		}
	},

	// initLightbox()
	// Function runs on window load, going through link tags looking for rel="lightbox".
	// These links receive onclick events that enable the lightbox display for their targets.
	// The function also inserts html markup at the top of the page which will be used as a
	// container for the overlay pattern and the inline image.
	initLightbox: function(className) {
		// Already done, just update zIndex
		if ($('overlay_modal')) {
			Element.setStyle('overlay_modal', {zIndex: Windows.maxZIndex + 10});
		}
		// create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
		else {
			var objBody = document.getElementsByTagName("body").item(0);
			var objOverlay = document.createElement("div");
			objOverlay.setAttribute('id', 'overlay_modal');
			objOverlay.className = "overlay_" + className
			objOverlay.style.display = 'none';
			objOverlay.style.position = 'absolute';
			objOverlay.style.top = '0';
			objOverlay.style.left = '0';
			objOverlay.style.zIndex = Windows.maxZIndex + 10;
		 	objOverlay.style.width = '100%';

			objBody.insertBefore(objOverlay, objBody.firstChild);
		}
	},
	
	setCookie: function(value, parameters) {
    document.cookie= parameters[0] + "=" + escape(value) +
      ((parameters[1]) ? "; expires=" + parameters[1].toGMTString() : "") +
      ((parameters[2]) ? "; path=" + parameters[2] : "") +
      ((parameters[3]) ? "; domain=" + parameters[3] : "") +
      ((parameters[4]) ? "; secure" : "");
  },

  getCookie: function(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
  }
}


