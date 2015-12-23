var POST_REFRESH	= 500;
var content_form = document.getElementById('comment_form');
function create_div(Url){
	var newEl = document.createElement('div');
	newEl.setAttribute('id', "cmtdiv");
	document.getElementById('cntComment').appendChild(newEl);
	newEl.innerHTML = '<iframe style="display:none" src="'+Url+'"></iframe>';
}
//alert(subid);
if(node != '' && subid != ''){
    var getUrl = "http://cmt.ddvip.com/getcmt.php?r_node=" + node + "&r_subid=" + subid;
	var postUrl = "http://cmt.ddvip.com/postcmt.php?r_node=" + node + "&r_subid=" + subid;
    create_div(getUrl);
}

function submit_post(){
	var user1 = content_form.anonymous.checked;
	var user2 = content_form.user.value;
	if(!user1 && !user2){
		alert( "请核选“匿名发表”或者填写“昵称”");
		return false;
	}
	var content = content_form.content.value;
	if ( trim(content) == "") {
		alert( "请输入您的留言" );
		return false;
	}
	if ( content.length > 1000) {
		alert( "评论超过允许的长度" );
		return false;
	}
	var num = content_form.num.value;
	if ( trim(num) == "") {
		alert( "请输入验证码" );
		return false;
	}
	content_form.action = postUrl;
	content_form.submit();
	alert('谢谢您发表留言，稍后本页面将自动返回');
	window.setTimeout("reload_all()",POST_REFRESH);
}

function reload_all(){
	document.getElementById('content').value = '';
	document.location.reload(); 
}
function trim( s ) {
	if ( s==null || s=="" ) return "";
	var Str = new String( s );
	var newstr = Str.replace( /^\s*/, "" );
	return newstr.replace( /\s*$/, "" );
}
function quick_reply(id,content){
	content_form.content.value = content;
	content_form.rid.value = id;
    submit_post();
}
function quote_reply(id){
	content_form.rid.value = id;
	var quote = document.getElementById('showmsg'+id).innerHTML;
	var s = document.getElementById('quote_content');
	s.innerHTML = '回复第 '+ id +' 楼：' + quote;
	s.style.display = "block";
}