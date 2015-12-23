

var ImageHoverBar = Class.create();

ImageHoverBar.prototype = {
	initialize:function( parameters )
	{
		var HoverBarID				= UniqueGenerator.getUniqueID();
		var UUMenuButtonID			= UniqueGenerator.getUniqueID();
		this.parameters = parameters;		
		this.HoverBar = document.createElement("div");
		
		this.HoverBar.id = HoverBarID;
		this.HoverBar.className = parameters.ButtonStyle;
		this.HoverBar.style.position = "absolute";
		this.HoverBar.style.zIndex = "9999";
		this.HoverBar.innerHTML = "<div id=\""+UUMenuButtonID+"\" class=\"MenuButton\"></div>";
		document.body.appendChild( this.HoverBar );
		
		this.MenuButton = $(UUMenuButtonID);
		Event.observe( this.MenuButton , "click" , this.OnMenuButonClick.bindAsEventListener( this ) );
	},
	Show:function( ele , parameters )
	{	
		this.CurElementParamters = parameters;
		this.CurElement = ele;
		var ew=ele.offsetWidth;
		var eh=ele.offsetHeight;
		var el=ele.offsetLeft;
		var et=ele.offsetTop;
		
		var e = ele;
		while(e=e.offsetParent){
			et+=e.offsetTop;
			el+=e.offsetLeft;
		};
		var patrn=/blog\/([0-9a-zA-Z_]+)(.*)/;  
		if (window.XMLHttpRequest || location.href.match(patrn) == null) {	
			// IE 7, mozilla, safari, opera 9
			this.HoverBar.style.left = el - 20 + ew +"px";
			this.HoverBar.style.top  = et + eh - 22+"px";
		} else {
			// IE6, older browsers
			//alert(el + ","+ ew);
			if(ew == 48){
				//alert(40);
				this.HoverBar.style.left = el - 40 + ew +"px";
				this.HoverBar.style.top  = et + eh - 32+"px";
			}
			else{
				//alert(80);
				this.HoverBar.style.left = el - 80 + ew +"px";
				this.HoverBar.style.top  = et + eh - 22+"px";
			}
		}
		Event.observe( ele , "mouseout" , this.OnBindObjectOnMouseOut.bindAsEventListener( this ) );	
		this.HoverBar.style.display="";	
	},
	Hide:function()
	{
		this.HoverBar.style.display="none";	
	},
	OnBindObjectOnMouseOut:function(evt)
	{
		if( evt.toElement )
		{
			if( evt.toElement != this.HoverBar &&
				evt.toElement != this.MenuButton )
			{
				this.Hide();
			}
		}
		else if( evt.relatedTarget )
		{
			if( evt.relatedTarget != this.HoverBar &&
				evt.relatedTarget != this.MenuButton)
			{
				this.Hide();
			}
		}
	},
	OnMenuButonClick:function(evt)
	{
		if( this.CurElementParamters && this.CurElementParamters.OnMenuButonClick )
		{
			this.CurElementParamters.OnMenuButonClick( this.CurElement , evt );
		}
	}
};