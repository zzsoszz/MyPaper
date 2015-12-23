 function dialog(){
	var titile = '';
	var width = 300;
	var height = 180;
	var src = "";
	var path = "";
	var sFunc = '<input id="dialogOk" type="button" style="width:45px;height:20px;border:#8a8484 1px solid;background:url(\'http://www.mcuol.com/images/buttom_bg.gif\');line-height:14px;" value="确认" onclick="new dialog().reset();" /> <input id="dialogCancel" type="button" style="width45px;height:20px;border:#8a8484 1px solid;background:url(\'http://www.mcuol.com/images/buttom_bg.gif\');line-height:14px;" value="取消" onclick="new dialog().reset();" />';
	var sClose = '<input type="image" id="dialogBoxClose" onclick="new dialog().reset();" src="http://www.mcuol.com/images/close0.jpg" border="0" width="26" height="23" onmouseover="this.src=\'http://www.mcuol.com/images/close1.jpg\';" onmouseout="this.src=\'http://www.mcuol.com/images/close0.jpg\';" align="absmiddle" />';
	var sBody = '\
		<table id="dialogBodyBox" border="0" align="center" cellpadding="0" cellspacing="0">\
			<tr height="10"><td colspan="4"></td></tr>\
			<tr>\
				<td width="10"></td>\
				<td width="10" height="20" align="center" valign="absmiddle"></td>\
				<td id="dialogMsg" height="50" style="font-size:12px;color:#000;"></td>\
				<td width="10"></td>\
			</tr>\
			<tr height="10"><td colspan="4" align="center"></td></tr>\
			<tr><td id="dialogFunc" colspan="4" align="center">' + sFunc + '</td></tr>\
			<tr height="10"><td colspan="4" align="center"></td></tr>\
		</table>\
	';
	var sBox = '\
		<table id="dialogBox" width="' + width + '" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #65B8E7;display:none;z-index:10;" alt="dialog_utf8">\
			<tr>\
				<td height="26" bgcolor="#C6E2F1">\
					<table onselectstart="return false;" style="-moz-user-select:none;" width="100%" border="0" cellpadding="0" cellspacing="0">\
						<tr>\
							<td width="6" style="padding:0;"></td>\
							<td id="dialogBoxTitle" onmousedown="new dialog().moveStart(event, \'dialogBox\')" style="color:#02599C;cursor:move;font-size:12px;font-weight:bold; text-align:left; padding:3px 0 0 0;">系统提示信息</td>\
							<td id="dialogClose" width="27" valign="middle" style="padding:0;">\
								' + sClose + '\
							</td>\
							<td width="6" style="padding:0;"></td>\
						</tr>\
					</table>\
				</td>\
			</tr>\
			<tr height="2" bgcolor="#EDEDED"><td></td></tr>\
			<tr id="dialogHeight" style="height:' + height + '" valign="top">\
				<td id="dialogBody" style="background:#fff;color:#000;" valign="top">' + sBody + '</td>\
			</tr>\
		</table>\
		<iframe id="dialogBoxIframe" style="position:absolute;display:none;" frameborder="0"></iframe>\
		<div id="dialogBoxShadow" style="display:none;z-index:9;"></div>\
	';
	function $(_sId){return document.getElementById(_sId)}
	this.show = function(){
		//$('dialogBodyBox') ? function(){} : this.init();
		this.middle('dialogBox');
		this.shadow();
	}
	this.reset = function(){this.hideModule('select', '');$('dialogBox').style.display='none';$('dialogBoxShadow').style.display = "none";$('dialogBoxIframe').style.display='none';$('dialogBody').innerHTML = sBody;$('bgDiv').style.display='none';}
	this.html = function(_sHtml){$("dialogBody").innerHTML = _sHtml;this.show();}
	this.init = function(){
		$('dialogCase') ? $('dialogCase').parentNode.removeChild($('dialogCase')) : function(){};
		var oDiv = document.createElement('span');
		oDiv.id = "dialogCase";
		oDiv.innerHTML = sBox;
		document.body.appendChild(oDiv);
	}
	this.button = function(_sId, _sFuc){
		if($(_sId)){
			$(_sId).style.display = '';
			if($(_sId).addEventListener){
				if($(_sId).act){$(_sId).removeEventListener('click', function(){eval($(_sId).act)}, false);}
				$(_sId).act = _sFuc;
				$(_sId).addEventListener('click', function(){eval(_sFuc)}, false);
			}else{
				if($(_sId).act){$(_sId).detachEvent('onclick', function(){eval($(_sId).act)});}
				$(_sId).act = _sFuc;
				$(_sId).attachEvent('onclick', function(){eval(_sFuc)});
			}
		}
	}
	this.shadow = function(){
		var oShadow = $('dialogBoxShadow');
		var oDialog = $('dialogBox');
		var oIframe = $('dialogBoxIframe');
		oShadow['style']['position'] = "absolute";
		oShadow['style']['background']	= "#478ABE";
		oShadow['style']['display']	= "";
		oIframe['style']['display']	= "";
		oShadow['style']['opacity']	= "0.2";
		oShadow['style']['filter'] = "alpha(opacity=30)";
		oShadow['style']['top'] = oDialog.offsetTop + 6;
		oShadow['style']['left'] = oDialog.offsetLeft + 6;
		oShadow['style']['width'] = oDialog.offsetWidth;
		oShadow['style']['height'] = oDialog.offsetHeight;
	}
	this.open = function(_sUrl, _sMode){
		this.show();
		if(!_sMode || _sMode == "no" || _sMode == "yes"){
			$("dialogBody").innerHTML = "<iframe id='dialogFrame' width='100%' height='"+ height +" ' frameborder='0' scrolling='" + _sMode + "'></iframe>";
			$("dialogFrame").src = _sUrl;
		}
	}
	this.showWindow = function(_sUrl, _iWidth, _iHeight, _sMode){
		var oWindow;
		var sLeft = (screen.width) ? (screen.width - _iWidth)/2 : 0;
		var sTop = (screen.height) ? (screen.height - _iHeight)/2 : 0;
		if(window.showModalDialog && _sMode == "m"){
			oWindow = window.showModalDialog(_sUrl,"","dialogWidth:" + _iWidth + "px;dialogheight:" + _iHeight + "px");
		} else {
			oWindow = window.open(_sUrl, '', 'height=' + _iHeight + ', width=' + _iWidth + ', top=' + sTop + ', left=' + sLeft + ', toolbar=no, menubar=no, scrollbars=' + _sMode + ', resizable=no,location=no, status=no');
		}
	}
	this.event = function(_sMsg, _sOk, _sCancel, _sClose){
		$('dialogFunc').innerHTML = sFunc;
		$('dialogClose').innerHTML = sClose;
		$('dialogBodyBox') == null ? $('dialogBody').innerHTML = sBody : function(){};
		$('dialogMsg') ? $('dialogMsg').innerHTML = _sMsg  : function(){};
		this.show();
		_sOk ? this.button('dialogOk', _sOk) | $('dialogOk').focus() : $('dialogOk').style.display = 'none';
		_sCancel ? this.button('dialogCancel', _sCancel) : $('dialogCancel').style.display = 'none';
		_sClose ? this.button('dialogBoxClose', _sClose) : function(){};
		//_sOk ? this.button('dialogOk', _sOk) : _sOk == "" ? function(){} : $('dialogOk').style.display = 'none';
		//_sCancel ? this.button('dialogCancel', _sCancel) : _sCancel == "" ? function(){} : $('dialogCancel').style.display = 'none';
	}
	this.set = function(_oAttr, _sVal){
		var oShadow = $('dialogBoxShadow');
		var oDialog = $('dialogBox');
		var oHeight = $('dialogHeight');
		var oIframe = $('dialogBoxIframe');
		if(_sVal != ''){
			switch(_oAttr){
				case 'title':
					$('dialogBoxTitle').innerHTML = _sVal;
					title = _sVal;
					break;
				case 'width':
					oDialog['style']['width'] = _sVal;
					width = _sVal;
					if (! isIE()) oDialog.style.width = width + 'px';
					break;
				case 'height':
					oHeight['style']['height'] = _sVal;
					height = _sVal;
					if (! isIE()) oHeight.style.height = height + 'px';
					break;
				case 'src':
					if(parseInt(_sVal) > 0){
						$('dialogBoxFace') ? $('dialogBoxFace').src = path + _sVal + '.gif' : function(){};
					}else{
						$('dialogBoxFace') ? $('dialogBoxFace').src = _sVal : function(){};
					}
					src = _sVal;
					break;
			}
		}
		this.middle('dialogBox');
		oShadow['style']['top'] = oDialog.offsetTop + 6;
		oShadow['style']['left'] = oDialog.offsetLeft + 6;
		oShadow['style']['width'] = oDialog.offsetWidth;
		oShadow['style']['height'] = oDialog.offsetHeight;
		oIframe['style']['top'] = oDialog.offsetTop;
		oIframe['style']['left'] = oDialog.offsetLeft;
		oIframe['style']['width'] = oDialog.offsetWidth;
		oIframe['style']['height'] = oDialog.offsetHeight;
	}
	this.moveStart = function (e, _sId){
		function fixE(e) {
			if (typeof e == 'undefined') e = window.event;
			if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
			if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
			return e;
		}
		function getX(e){ return fixE(e).clientX; };
		function getY(e){	return fixE(e).clientY; };
		function drag(e){
			v = document.getElementById(_sId);
			var nX = getX(e);
			var nY = getY(e);
			var ll = v.rL + nX - v.oX;
			var tt = v.rT + nY - v.oY;
			v.style.left = ll + 'px';
			v.style.top  = tt + 'px';
			$('dialogBoxShadow').style.left = ll + 6 +'px';
			$('dialogBoxShadow').style.top = tt + 6 + 'px';
			$('dialogBoxIframe').style.left = ll + 'px';
			$('dialogBoxIframe').style.top = tt + 'px';
			return false;
		}
		function end() {
			document.onmousemove	= null;
			document.onmouseup		= null;
		}
		v = $(_sId);
		v.oX = getX(e);
		v.oY = getY(e);
		v.rL = parseInt(v.style.left ? v.style.left : 0);
		v.rT = parseInt(v.style.top  ? v.style.top  : 0);
		document.onmousemove = drag;
		document.onmouseup	 = end;
		return false;

	}
	this.hideModule = function(_sType, _sDisplay){
		var aIframe = parent.document.getElementsByTagName("iframe");aIframe=0;
		var aType = document.getElementsByTagName(_sType);
		var iChildObj, iChildLen;
		for (var i = 0; i < aType.length; i++){
			aType[i].style.display	= _sDisplay;
		}
		for (var j = 0; j < aIframe.length; j++){
			iChildObj = document.frames ? document.frames[j] : aIframe[j].contentWindow;
			iChildLen = iChildObj.document.body.getElementsByTagName(_sType).length;
			for (var k = 0; k < iChildLen; k++){
				iChildObj.document.body.getElementsByTagName(_sType)[k].style.display = _sDisplay;
			}
		}
	}
	this.middle = function(_sId,pos){
		var obj = $(_sId);
		obj.style.display = "";
		obj.style.position = "absolute";
        var sWidth	= document.documentElement.clientWidth;
		var sHeight	= document.documentElement.clientHeight;
		var sSrolltop	= document.documentElement.scrollTop;
		var sScrollleft	= document.documentElement.scrollLeft;
		if (isNull(pos))
		{
			pos = 0;
		}
		obj.style.top		= sHeight/2 - obj.offsetHeight/2 + sSrolltop + pos + 'px';
		obj.style.left		= sWidth/2 - obj.offsetWidth/2 + sScrollleft + pos + 'px';
	}
}

function _confirm_msg_show(msg, click_ok, click_no, title)
{
    click_ok = click_ok ? click_ok : ' ';
    click_no = click_no ? click_no : ' ';
    title = title ? title : '';

    dg=new dialog();
    dg.init();
    dg.set('src', 3);   // smile
    dg.set('title', title);
    dg.event(msg, click_ok, click_no, click_no);
}

function _error_msg_show(msg, click, icon, title)
{
    click = click ? click : ' ';
    icon = icon ? icon : '';
    title = title ? title : '系统提示信息';

    switch (icon)
    {
    case 'forbid':
        icon = 1;
        break;

    case 'succ':
        icon = 2;
        break;

    case 'smile':
        icon = 3;
        break;

    case 'forget':
        icon = 4;
        break;

    case 'sorry':
        icon = 5;
        break;

    case 'care':
        icon = 6;
        break;

    case '':
        icon = 5;
        break;
    }

    dg=new dialog();
    dg.init();
    dg.set('src', icon);
    dg.set('title', title);
    dg.event(msg, click, '', click);
}

//消息框操作屏蔽内容层
function sAlert(){
	var obj = document.getElementById("bgDiv")
	try       //对象存在,就只要显示,因为不能同时创建两个相同的DOM
	{
	   var str=obj.toString();
	   if( str.indexOf('object') != -1 )
	   {
		  obj.style.display = '';
		  return;
	   }
	}
	catch ( e ) //对象不存在
	{
		var sWidth,sHeight;
		sWidth=document.body.offsetWidth;
		sHeight=document.body.offsetHeight;
	
		var bgObj=document.createElement("div");
		bgObj.setAttribute('id','bgDiv');
		bgObj.style.position="absolute";
		bgObj.style.top="0";
		bgObj.style.background="#000";
		bgObj.style.filter="alpha(opacity=10)";
		bgObj.style.opacity="0.1";
		bgObj.style.left="0";
		bgObj.style.width=sWidth + "px";
		bgObj.style.height=sHeight + "px";
		document.body.appendChild(bgObj);
	}
}