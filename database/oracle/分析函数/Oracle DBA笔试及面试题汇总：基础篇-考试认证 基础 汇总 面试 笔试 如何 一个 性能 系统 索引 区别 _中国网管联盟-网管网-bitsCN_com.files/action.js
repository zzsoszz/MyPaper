var canSub = true;
function TexFocus(o){
	if ('��������������Ҫ�����������Ϣ'==o.value) o.value='';
	if('block'!=$('code_pic').style.display){ 
		$('code_pic').src='/include/validateimg.php';
		$('code_pic').style.display='inline';
	}
}
function submitForm(e) {
	try{
		e = e ? e : window.event;
		if(e.ctrlKey&&e.keyCode==13)
		return true;
	}catch(e){}
	return false
} 		
function commSubmit(form)
{
	if (!canSub)return false;
	if ('��������������Ҫ�����������Ϣ' == $('comment_text').value)
	{
		$('comment_text').focus();
		return false;
	}
	if ($('comment_text').value.length > 500 || $('comment_text').value.length < 4)
	{
		alert("��������������4��100��֮�䣡");
		$('comment_text').focus();
		return false;
	}
	if (!(/^[a-z]|[0-9]|[A-Z]{4}$/.test($('validate').value)))
	{
		alert("������4λ������֤�룡");
		$('validate').focus();
		return false;
	}
	canSub = false;
	postfeeback();
}
//ajax load freeback list..
function loadfeeback(id,page){
	var URL = "/plus/ajax_feedback.php";
	var pars = 'arcID=' + id + '&nowpage='+page+'&action=show';
	new Ajax.Updater(
		{success: 'comm_content'},
		URL, {method: "get",parameters:pars}
	);	
}

//ajax submit data....
function postfeeback(){
	var opt = {
		method: 'post',
		postBody: 'action=send&arcID='+$('arcID').value
			+'&notuser=1&isconfirm=1&msg='+ escape($('comment_text').value)
			+'&username=' + escape($('username').value) + '&validate='+$('validate').value,
		onSuccess: function(t) {
			$('ajaxBackMsg').update(t.responseText);
			loadfeeback($('arcID').value,1);
			canSub = true;
			$('comment_text').value = '';
			$('username').value = '';
			$('validate').value = '';
			$('code_pic').src = '/include/validateimg.php?'+Math.random();
		},
		on404: function(t) {$('ajaxBackMsg').update('�������������Ժ����ԣ�')},
		onFailure: function(t) {$('ajaxBackMsg').update('�ύʧ�ܣ����Ժ����ԣ�')}
	};
	new Ajax.Request("/plus/ajax_feedback.php", opt);
}

//ajax good and bad
function postGoodBad(i,a,d){
	var opt = {
		method: 'post',
		postBody: 'feedid='+i+'&action='+a+'&arcID='+d,
		onSuccess: function(t) {$(i + 'span' + a).update(t.responseText)},
		on404: function(t) {},
		onFailure: function(t) {}
	};
	new Ajax.Request("/plus/ajax_feedback.php", opt);
}
