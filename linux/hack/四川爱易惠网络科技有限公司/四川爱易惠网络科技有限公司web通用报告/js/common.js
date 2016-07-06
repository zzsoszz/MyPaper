//更改主界面连接
function GetLeftUrl (url) {
	window.parent.frames["mainFrame"].window.location.href = url;
}
//隐藏和显示
function hideAndShow (showID, hideID) {
	document.getElementById(showID).style.display = '';
	document.getElementById(hideID).style.display = 'none';
}
//隐藏或显示
function hideOrShow (itemID) {
	var Item = document.getElementById(itemID);
	if (Item.style.display == "") {
		Item.style.display = "none";
	}else {
		Item.style.display = "";
	}
}
//带图片的隐藏和显示
function hideBodyImg (hide_id, imgID, hide_image, show_image) {
	var hide_item = document.getElementById(hide_id);
	var img = document.getElementById(imgID);
	if (hide_item.style.display == "") {
		hide_item.style.display = "none";
		img.src = hide_image;
	}else {
		hide_item.style.display = "";
		img.src = show_image;
	}
}
//编辑状态开关
function DisableBody (edit_id) {
	var edit_item = document.getElementById(edit_id);
	if (edit_item.disabled == true) {
		edit_item.disabled = false;
	}else {
		edit_item.disabled = true;
	}
}
//创建新窗口
function CreateNewWindow (openUrl, windowName, widthNum, heightNum) {
	var winObj = window.open(openUrl, windowName, "width=" + widthNum + ", height=" + heightNum + ",toolbar=no, directories=no, status=no, scrollbars=yes");
}
//全屏显示
function FullScreen (item_id) {
	if (item_id.value == "全屏显示") {
		item_id.value = "取消全屏";
		window.parent.leftMenu.style.display = "none";
		window.parent.topMenu.style.display = "none";
	}else {
		item_id.value = "全屏显示";
		window.parent.leftMenu.style.display = "";
		window.parent.topMenu.style.display = "";
	}
}
function more_toggle(o,id,same_bg) {
		var tr_more=document.getElementById(id);
		var tr_class=(o.parentNode.parentNode.className!=""&&same_bg)?(" "+o.parentNode.parentNode.className):"";
		if (tr_more.className=="more hide"||tr_more.className=="more hide"+tr_class) {
			o.className="ico minus";
			tr_more.className="more"+tr_class;
		}
		else {
			o.className="ico plus";
			tr_more.className="more hide"+tr_class;
		}
};
function showTab(o,n) {
		var tabs = o.parentNode.parentNode.getElementsByTagName("li");
		for (i = 0; i < tabs.length; i++) {
			tabs[i].className = "select";
		}
		tabs[n].className = "selected";
		var con = o.parentNode.parentNode.parentNode.getElementsByTagName("div");
		for (i = 0; i < con.length; i++) {
			con[i].className = "tab_content hide";
		}
		con[n].className = "tab_content";
		return false;
}

(function($){
	$.fn.report_tree = function(options){
		var defaults = {}
		var options = $.extend(defaults, options);
		this.each(function(){
			$(this).find("a.dot").bind("click",function(){
				if($(this).hasClass('up')){
					$(this).removeClass('up').addClass("down").nextAll('ul').hide();
				}
				else if($(this).hasClass('down')){
					$(this).removeClass('down').addClass("up").nextAll('ul').show();
				}
				else return false;
			})	
		});
	};
	$.fn.catalog = function(options){
		var defaults = {"title":"title"}
		var options = $.extend(defaults, options);
		var spreadlevel = options.spreadlevel;
		//var level=1; //标记当前生成目录的级数
		var c_log=function(_ul,_id,_p){
			
			_id.find(">div.report_h").each(function(i){
				var li=$("<li></li>").appendTo(_ul);
				var _s=$(this);
				_s.attr("id",_p+String(i));
			
				var _h=$("<a class='dot'></a><a class='link' href='###' data-href='"+_p+String(i)+"' onclick='setCatPosition.call(this)'>"+_s.html()+"</a>").appendTo(li);
				var _sc=_s.next("div.report_content");
			
				if(_sc.find(">div.report_h").length){
					var titleLevel = (_p+String(i)).length-options.title.length;
					var cl = titleLevel >1 ? "down":"up";
					
					if(spreadlevel && spreadlevel >= (titleLevel+1)){
						cl="up";
					}

					li.find("a.dot").addClass(cl).bind("click",function(){
						if($(this).hasClass('up')){
							$(this).removeClass('up').addClass("down").nextAll('ul').hide();
						}
						else if($(this).hasClass('down')){
							$(this).removeClass('down').addClass("up").nextAll('ul').show();
						}
						else return false;
					});
					var _2ul=$("<ul style='display:"+(cl=='down'?'none':'')+"'></ul>").appendTo(li);
					
					c_log(_2ul,_sc,_p+String(i));
				}
			});
			
			$("#catalog").find("a.link").bind("click",function(){
				hideCatContent();
				//$("#catalog").find("div.report_content").hide();
				$("#catalog").find(".h1_dot").addClass("up");
			});
			return _ul;
		};
		this.each(function(){
			var _s=$(this)
			var _c=_s.find("#catalog");
			var _co=$("<div class='report_content'><ul id='catalog_tree'></ul></div>").appendTo(_c);
			var _h=_s.find("#content");
			_co=_s.find("#catalog_tree");
			c_log(_co,_h,options.title);
			var _a=$("<a class='h1_dot'></a>").appendTo(_s.find(".report_h1"));
			//if($('#catalog')[0]==$(_a[0]).parent().parent()[0]){$(_a[0]).addClass("up");}
			_s.find(".report_h1").click(function(){
				$(this).next("div.report_content").toggle();
				$(this).find(".h1_dot").toggleClass("up");
				overflowCatalog.call(window);
				
				setTimeout(function(){setTopPosition.call(window)},350);
			});
			var _a2=$("<a class='h2_dot'></a>").appendTo(_s.find(".report_h2"));
			_s.find(".report_h2").click(function(){
				$(this).next("div").toggle();
				$(this).find(".h2_dot").toggleClass("up");
				
				setTimeout(function(){setTopPosition.call(window)},350);
			});
		});
	};
	
	$.fn.expandCatalog=function(options){
		var header1 = $(this).find(".report_h1");
		$.each(header1,function(){
			$(this).next("div").show();
			if($(this).find(".h1_dot").length<=0){
				$("<a class='h1_dot'></a>").appendTo($(this));
			}
			
			$(this).find(".h1_dot").removeClass("up");
		})
		
		var header2 = $(this).find(".report_h2");
		$.each(header2,function(){
			$(this).next("div").show();
			if($(this).find(".h2_dot").length<=0){
				$("<a class='h2_dot'></a>").appendTo($(this));
			}
			
			$(this).find(".h2_dot").removeClass("up");
		})
		
		$(parent).scrollTop(0);
	};

	$.gotop=function(id){
		var _t=window==parent;
		var _topheight = window.frameElement?window.frameElement.offsetTop:0;
		var goTopCtrl=$('body').find('.gotop');
		_aTop=goTopCtrl.parentsUntil().length<=0 ? $("<a title='' class='gotop' onfoucs='this.blur()' style='display:none;' href='#"+(id||"")+"'></a>").appendTo($('body')) : goTopCtrl;
		if(!_t)_aTop.css("top","300px");
		$(parent).scroll(function(){
			setTopPosition.call(window);
			
			hideCatContent();
            $("#catalog > div.report_h1 > a").addClass("up");
			//$("#catalog").find("div.report_content").hide();
		});
	};
	
	
	$.setFrameWidth = function(){
		var doc=document;
		var html = doc.documentElement;
		var width = Math.max( doc.body.scrollWidth, doc.body.offsetWidth, 
							   html.clientWidth, html.scrollWidth, html.offsetWidth );
		var cacheWidth = $(window.frameElement).attr("cache-width");

		if(parent.document.body.clientWidth < width + 15 && 
		  (!cacheWidth || cacheWidth != width)){
			$(window.frameElement).css({'width': width + 15});
			$(window.frameElement).attr("cache-width",width+15);
		}
		
		$(window).bind('resize',function(){
			setTimeout(function(){$.setFrameWidth()},100);
		});
	}
	
	
	function overflowCatalog(){
		var frameTop = window.frameElement?window.frameElement.offsetTop:0;
		var cat = $("#catalog").find("div.report_content").get(0);
		var pclientHeight = parent.document.body.clientHeight;
		var pScrollTop = $(parent).scrollTop(),
			catScrollHeight = cat.scrollHeight;

		if(catScrollHeight > pclientHeight){
			var catHeight = pclientHeight-100;
			if(catHeight<=0){
				catHeight = pclientHeight;
			}
			$(cat).css({'overflow-y':'auto','_height':catHeight,'max-height':catHeight,'width':'97.3%'});
		}
	}
	
	
	function setTopPosition(_t,_topheight,_aTop){
		if(!_t) _t=window==parent;
		if(!_topheight) _topheight = window.frameElement?window.frameElement.offsetTop:0;
		if(!_aTop){	
			var goTopCtrl=$('body').find('.gotop');
			_aTop=goTopCtrl.parentsUntil().length<=0 ? $("<a title='' class='gotop' onfoucs='this.blur()' style='display:none;' href='#"+(id||"")+"'></a>").appendTo($('body')) : goTopCtrl;
		}
		
		var topBarRight=12;
		if(parent.document.body.clientWidth <= document.body.clientWidth - 5){
			topBarRight = document.body.clientWidth - parent.document.body.clientWidth - parent.document.body.scrollLeft + 10;
			
			if(topBarRight<12){
				topBarRight = 12;
			}
		}
		$(parent).scrollTop()>100?_aTop.css({'display':'block','right':topBarRight}):_aTop.hide();

		if(!_t){
			_aTop.css("top",$(parent).scrollTop()- _topheight + $(parent).height() - 100);
			_aTop.click(function(){
				$(parent).scrollTop(0);
				return false;
			})	
		};
		if($.browser.msie && $.browser.version<7){_aTop.attr("class","gotop")};
		
		if($("#content").offset().top + _topheight<=$(parent).scrollTop()) 
		{
			$("#catalog").addClass("fixed_top");
			if(parent.frames.length>0)
			{
				$("#catalog").css("top",$(parent).scrollTop()-_topheight);
			}	
			$("#catalog").css('width',$("#report").width());
		}
		else
		{
			$("#catalog").removeClass("fixed_top");
		}
	}
	
	
	

})(jQuery);


function setCatPosition(){
	hideCatContent();
	var top = getOffsetTop(this);

	parent.window.scrollTo(0,top);
}

function hideCatContent(){
	jQuery("#catalog").find("div.report_content").hide();
}
	
function getOwnerFrame(o){
	var doc =  o.contentWindow?o.contentWindow.document: o.ownerDocument;
	var win = null;
	if(doc){
		win = doc.parentWindow || doc.defaultView || null;
	}
	if(win){
		return win.frameElement;
	}
	return null;
}
function getOffsetTop(o){
	var frameElement = getOwnerFrame(o);
	var id = UI.A(o,'data-href');//o.href;//.substring(o.href.lastIndexOf('#')+1);

	var scrollTop=0;
	if(frameElement)
	{
		scrollTop = document.getElementById(id).offsetTop + frameElement.offsetTop - 35;
	}
	else
	{
		scrollTop = document.getElementById(id).offsetTop;
	}
	
	return scrollTop;
}
	
jQuery(function($){
	//$.catalogDefaults ={'spreadlevel':3};

	$("#catalog_tree").report_tree();
	$("#report").catalog($.catalogDefaults || {});
	$.gotop();
	
	//$.setFrameWidth();
	
});
