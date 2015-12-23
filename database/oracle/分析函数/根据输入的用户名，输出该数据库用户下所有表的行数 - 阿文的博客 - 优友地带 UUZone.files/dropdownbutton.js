
/*
create by janes
for dropdown menu button control
need prototype
*/

var BropDownButton = Class.create();

BropDownButton.prototype = {
	initialize:function( paramter )
	{
		var LinkButtonID				= UniqueGenerator.getUniqueID();
		var LinkbuttonContentID			= UniqueGenerator.getUniqueID();
		var LinkbuttonDropdownArrowID	= UniqueGenerator.getUniqueID();
		var LinkElementID				= UniqueGenerator.getUniqueID();
		var ButtonStyle = paramter.ButtonStyle?paramter.ButtonStyle:"";
		this.Linkbutton = document.createElement("div");
		this.Linkbutton.id = LinkButtonID;
		this.Linkbutton.className = ButtonStyle;
		this.Linkbutton.style.position = "absolute";
		this.Linkbutton.innerHTML = "\
			<div id=\""+LinkbuttonContentID+"\" class=\"LinkbuttonContent\">\
				<a href=\"#\" id=\""+LinkElementID+"\" target=\"\"></a>\
			</div>\
			<div id=\""+LinkbuttonDropdownArrowID+"\" class=\"LinkbuttonDropdownArrow_Normal\">\
			</div>";
		this.Linkbutton					= document.body.appendChild(this.Linkbutton);
		this.LinkbuttonContent			= $(LinkbuttonContentID);
		this.LinkElement				= $(LinkElementID);
		this.paramter					= paramter;
		this.paramter.DropArrowWidth	= paramter.DropArrowWidth?paramter.DropArrowWidth:50;
		this.paramter.LeftMargin		= paramter.LeftMargin?paramter.LeftMargin:-4;
		this.paramter.TopMargin			= paramter.TopMargin?paramter.TopMargin:-4;
		this.paramter.RightMargin		= paramter.RightMargin?paramter.RightMargin:4;
		this.paramter.BottomMargin		= paramter.BottomMargin?paramter.BottomMargin:4;
		
		this.LinkbuttonDropdownArrow	= $(LinkbuttonDropdownArrowID);
		Event.observe( this.LinkbuttonDropdownArrow , "click", this.OnDropdownClick.bindAsEventListener(this) );
		Event.observe( this.LinkbuttonDropdownArrow , "mouseover", this.OnMouseOver.bindAsEventListener(this) );
	
		Event.observe( this.LinkbuttonDropdownArrow , "mouseout", this.OnMouseOut.bindAsEventListener(this) );
		Event.observe( this.Linkbutton , "mouseout", this.OnLBMouseOut.bindAsEventListener(this) );
	},
	OnEmptyEvent:function(evt)
	{
		if (window.event) 
			evt.cancelBubble=true
		else if (evt.stopPropagation) 
			evt.stopPropagation()
	},
	OnMouseOver:function(evt)
	{
		this.LinkbuttonDropdownArrow.className = "LinkbuttonDropdownArrow_Selected";
	},
	OnMouseOut:function(evt)
	{
		this.LinkbuttonDropdownArrow.className = "LinkbuttonDropdownArrow_Normal";
	},
	contains:function( a , b )
	{
		while (b&&b.parentNode)
		if ((b = b.parentNode) == a)
		return true;
		return false;
	},
	OnLBMouseOut:function(evt)
	{
		if( window.event )
		{
			if( !this.Linkbutton.contains( evt.toElement ) )
			{
				this.Hide();
			}
		}
		else
		{
			if( !this.contains( this.Linkbutton , evt.relatedTarget ) )
			{
				this.Hide();				
			}
		}
	},
	OnDropdownClick:function( e )
	{
		this.ShowPopMenu = true;
		if( typeof( this.onClick ) == "function" )
		{
			this.onClick(this.LinkbuttonDropdownArrow,e);
			this.LinkbuttonDropdownArrow.className = "LinkbuttonDropdownArrow_Clicked";
		}
	},	
	Hide:function(evt)
	{
		this.Linkbutton.style.display = "none";
		this.ShowPopMenu = false;
	},
	Show:function( ele , onClick )
	{
		this.LinkbuttonDropdownArrow.className = "LinkbuttonDropdownArrow_Normal";
		this.curElement = ele;
		this.onClick	= onClick;

		var ew=ele.offsetWidth;
		var eh=ele.offsetHeight;
		var el=ele.offsetLeft;
		var et=ele.offsetTop;
		
		var e = ele;
		while(e=e.offsetParent){
			et+=e.offsetTop;
			el+=e.offsetLeft;
		};
		this.Linkbutton.style.left			= el + this.paramter.LeftMargin+"px";
		this.Linkbutton.style.top			= et + this.paramter.TopMargin+"px";
		if( document.all )
		{
			this.Linkbutton.style.width			= ew - this.paramter.LeftMargin+ this.paramter.RightMargin + 6 + this.paramter.DropArrowWidth+"px";
			this.Linkbutton.style.height		= eh - this.paramter.TopMargin + this.paramter.BottomMargin+"px";
			this.Linkbutton.style.overflow		= "hidden";
			this.LinkbuttonContent.style.marginLeft = -this.paramter.LeftMargin-2+"px";
			this.LinkbuttonContent.style.marginTop	= "2px";
			this.LinkbuttonContent.style.width  = ew + this.paramter.RightMargin + "px";
			this.LinkbuttonContent.style.height  = eh + "px";	

		}
		else
		{
			this.Linkbutton.style.width			= ew - this.paramter.LeftMargin+ this.paramter.RightMargin + 3 + this.paramter.DropArrowWidth+"px";
			this.Linkbutton.style.height		= eh - this.paramter.TopMargin + this.paramter.BottomMargin + 3 +"px";
			this.Linkbutton.style.overflow		= "hidden";
			this.LinkbuttonContent.style.marginLeft = -this.paramter.LeftMargin+"px";
			this.LinkbuttonContent.style.marginTop	= "6px";
			this.LinkbuttonContent.style.width  = ew + this.paramter.RightMargin + "px";
			this.LinkbuttonContent.style.height  = eh + "px";		
			this.LinkElement.style.marginLeft    = "3px";

		}
		
		
		this.LinkbuttonDropdownArrow.style.width  =  this.paramter.DropArrowWidth+"px";
		
		this.LinkElement.href				= ele.href;
		this.LinkElement.target				= ele.target;
		this.LinkElement.className			= ele.className;
		this.LinkElement.innerHTML			= ele.innerHTML;	
		this.LinkElement.style.marginLeft   = "0px";

		this.Linkbutton.style.display		= "block";
	}
};

