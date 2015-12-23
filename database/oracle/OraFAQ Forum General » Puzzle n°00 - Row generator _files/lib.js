

var JS_HELPOFF=false;
var DOM=(document.getElementById)? 1 : 0;var NS4=(document.layers)? 1 : 0;var IE4=(document.all)? 1 : 0;var OPERA=navigator.userAgent.indexOf('Opera')>-1 ? 1 : 0;var MAC=navigator.userAgent.indexOf('Mac')>-1 ? 1 : 0;

function insertTag(obj, stag, etag){	if(navigator.userAgent.indexOf('MSIE')>-1 && !OPERA){		insertTagIE(obj, stag, etag);}else{		insertTagMoz(obj, stag, etag);}	obj.focus();}
function insertTagMoz(obj, stag, etag){	var txt;
	if(window.getSelection){		txt=window.getSelection();}else if(document.getSelection){		txt=document.getSelection();}
	if(!txt || txt==''){		var t=document.getElementById('txtb');		var scrollPos=t.scrollTop;		if(t.selectionStart==t.selectionEnd){			t.value=t.value.substring(0, t.selectionStart)+stag+etag+ t.value.substring(t.selectionEnd, t.value.length);			t.scrollTop=scrollPos;			return;	}		txt=t.value.substring(t.selectionStart, t.selectionEnd);		if(txt){			t.value=t.value.substring(0, t.selectionStart)+stag+txt+etag+ t.value.substring(t.selectionEnd, t.value.length);			t.scrollTop=scrollPos;			return;	}}	obj.value=obj.value+stag+etag;}
function insertTagIE(obj, stag, etag){	var r=document.selection.createRange();	if(document.selection.type=='Text' &&(obj.value.indexOf(r.text)!=-1)){		a=r.text;		r.text=stag+r.text+etag;		if(obj.value.indexOf(document.selection.createRange().text)==-1){			document.selection.createRange().text=a;	}}	else insertAtCaret(obj, stag+etag);}
function dialogTag(obj, qst, def, stag, etag){	var q=prompt(qst, def);	if(!q)return;	stag=stag.replace(/%s/i, q);	insertTag(obj, stag, etag);}
function url_insert(prompt){	if(check_selection())		dialogTag(document.post_form.msg_body, prompt, 'http://', '[url=%s]', '[/url]');	else
		dialogTag(document.post_form.msg_body, prompt, 'http://', '[url]%s[/url]', '');}
function email_insert(prompt){	if(check_selection()){		dialogTag(document.post_form.msg_body, prompt, '', '[email=%s]', '[/email]');}else{		dialogTag(document.post_form.msg_body, prompt, '', '[email]%s[/email]', '');}}
function image_insert(prompt){	dialogTag(document.post_form.msg_body, prompt, 'http://', '[img]%s[/img]', '');}
function check_selection(){	var rn;	var sel;	var r;
	if(window.getSelection && window.getSelection()){		return 1;}
	if(document.layers)return 0;	if(navigator.userAgent.indexOf('MSIE')< 0)return 0;
	r=document.selection.createRange();
	if(r.text.length &&(document.post_form.msg_body.value.indexOf(r.text)!=-1)){		a=document.selection.createRange().text;		rn=Math.random();		r.text=r.text+' '+rn;		
		if(document.post_form.msg_body.value.indexOf(rn)!=-1){			sel=1;	}else{			sel=0;	}		
		document.selection.createRange().text=a;}	
	return sel;}
function storeCaret(textEl){	 if(textEl.createTextRange)textEl.caretPos=document.selection.createRange().duplicate();}
function insertAtCaret(textEl, text){	if(textEl.createTextRange && textEl.caretPos){		var caretPos=textEl.caretPos;		caretPos.text=caretPos.text.charAt(caretPos.text.length-1)==' ' ? text+' ' : text;}	else 
		textEl.value = textEl.value+text;}
function window_open(url, winName, width, height){	xpos=(screen.width-width)/2;	ypos=(screen.height-height)/2;	options='scrollbars=1,width='+width+',height='+height+',left='+xpos+',top='+ypos+'position:absolute';	window.open(url,winName,options);}
function layerVis(layer, on){	thisDiv=document.getElementById(layer);	if(thisDiv){		if(thisDiv.style.display=='none'){			thisDiv.style.display='block';	}else{			thisDiv.style.display='none';	}}}

function chng_focus(phash){	window.location.hash=phash;}

function fud_msg_focus(mid_hash){	if(!window.location.hash){		self.location.replace(window.location+'#'+mid_hash);}}

function fud_tree_msg_focus(mid, s, CHARSET){	jQuery('body').css('cursor', 'progress');	jQuery('#msgTbl').fadeTo('fast', 0.33);
	jQuery.ajax({		url: 'index.php?t=tree_msg&id='+mid+'&S='+s,
		dataType: 'html',
		contentType: 'text/html;charset='+CHARSET,
		beforeSend: function(xhr){			if(xhr.overrideMimeType){			    xhr.overrideMimeType('text/html;charset='+CHARSET);		}	},
		success: function(data){		
			jQuery('#msgTbl').empty().append('<tbody><tr><td>'+data+'</td></tr></tbody>').fadeTo('fast', 1);
		
			var read_img=jQuery('#b'+cur_msg).find('img').first();			read_img.attr('src', read_img.attr('src').replace('unread', 'read'));
		
			jQuery('#b'+mid).removeClass().addClass('RowStyleC');			jQuery('#b'+cur_msg).removeClass().addClass((cur_msg % 2 ? 'RowStyleA' : 'RowStyleB'));			cur_msg=mid;	},
		error: function(xhr, desc, e){			alert('Failed to submit: '+desc);	},
		complete: function(){			chng_focus('page_top');			jQuery('body').css('cursor', 'auto');	}});}

function highlightWord(node, word, Wno){	
	if(node.hasChildNodes){		for(var i=0;node.childNodes[i];i++){			highlightWord(node.childNodes[i], word, Wno);	}}
	
	if(node.nodeType==3){
		var tempNodeVal=node.nodeValue.toLowerCase();		var pn=node.parentNode;		var nv=node.nodeValue;
		if((ni=tempNodeVal.indexOf(word))==-1 || pn.className.indexOf('st')!=-1)return;
		
		before=document.createTextNode(nv.substr(0,ni));		after=document.createTextNode(nv.substr(ni+word.length));		if(document.all && !OPERA){			hiword=document.createElement('<span class="st'+Wno+'"></span>');	}else{			hiword=document.createElement('span');			hiword.setAttribute('class', 'st'+Wno);	}		hiword.appendChild(document.createTextNode(word));		pn.insertBefore(before,node);		pn.insertBefore(hiword,node);		pn.insertBefore(after,node);		pn.removeChild(node);}}

function highlightSearchTerms(searchText){	searchText=searchText.toLowerCase();	var terms=searchText.split(' ');	var e=document.getElementsByTagName('span');

	for(var i=0;e[i];i++){		if(e[i].className !='MsgBodyText')continue;		for(var j=0, k=0;j < terms.length;j++, k++){			if(k > 9)k=0;
			highlightWord(e[i], terms[j], k);	}}
	e=document.getElementsByTagName('td');
	for(var i=0;e[i];i++){		if(e[i].className.indexOf('MsgSubText')==-1)continue;		for(var j=0, k=0;j < terms.length;j++, k++){			if(k > 9)k=0;
			highlightWord(e[i], terms[j], k);	}}}

function rs_txt_box(col_inc, row_inc){	var obj=jQuery('textarea');	obj.height(obj.height()+row_inc);	obj.width(obj.width()+col_inc);}
function topicVote(rating, topic_id, ses, sq){	jQuery.ajax({		url: 'index.php?t=ratethread&sel_vote='+rating+'&rate_thread_id='+topic_id+'&S='+ses+'&SQ='+sq,
		success: function(data){			jQuery('#threadRating').html(data);			jQuery('#RateFrm').empty();	},
		error: function(xhr, desc, e){			alert('Failed to submit: '+desc);	}});}
function changeKarma(msg_id, user_id, updown, ses, sq){	jQuery.ajax({		url: 'index.php?t=karma_change&karma_msg_id='+msg_id+'&sel_number='+updown+'&S='+ses+'&SQ='+sq,
		success: function(data){			jQuery('.karma_usr_'+user_id).html(data);			jQuery('#karma_link_'+msg_id).hide();	},
		error: function(xhr, desc, e){			alert('Failed to submit: '+desc);}	});}
function prevCat(id){	var p=document.getElementById(id);	if(!p){		return;}	while(p=p.previousSibling){		if(p.id && p.id.substring(0,1)=='c' && p.style.display !='none'){			chng_focus(p.id);			break;	}}}
function nextCat(id){	var p=document.getElementById(id);	if(!p){		return;}	while(p=p.nextSibling){		if(p.id && p.id.substring(0,1)=='c' && p.style.display !='none'){			chng_focus(p.id);			break;	}}}
function min_max_cats(theme_image_root, img_ext, minimize_category, maximize_category, sq, s){	jQuery(document).ready(function(){		var toggleMinus=theme_image_root+'/min'+img_ext;		var togglePlus =theme_image_root+'/max'+img_ext;
		jQuery('.collapsed').prepend('<img src="'+togglePlus+'" alt="+" title="'+maximize_category+'"/> ')		               .addClass('collapsable');		jQuery('.expanded').prepend('<img src="'+toggleMinus+'" alt="-" title="'+minimize_category+'"/> ')		              .addClass('collapsable');
  jQuery('img', jQuery('.collapsable')).addClass('clickable')  .css('cursor', 'pointer')  .click(function(){    var toggleSrc=jQuery(this).attr('src');    var cat=jQuery(this).parents('tr').attr('id');    var on;
    if(toggleSrc.indexOf(toggleMinus)>=0){       
      jQuery(this).attr('src', togglePlus)             .attr('title', maximize_category)             .attr('alt', '+')             .parents('tr').siblings('.child-'+cat).fadeOut('slow');      on=1;   }else{                            
      jQuery(this).attr('src', toggleMinus)             .attr('title', minimize_category)             .attr('alt', '-')             .parents('tr').siblings('.child-'+cat).fadeIn('slow');      on=0;   };
    if(sq !=''){       jQuery.ajax({          type: 'POST',
          url: 'index.php?t=cat_focus',
          data: 'SQ='+sq+'&S='+s+'&c='+cat.substr(1)+'&on='+on
       });   }

 });})}
function min_max_posts(theme_image_root, img_ext, minimize_message, maximize_message){jQuery(document).ready(function(){  var toggleMinus=theme_image_root+'/min'+img_ext;  var togglePlus =theme_image_root+'/max'+img_ext;
  jQuery('td.MsgSubText').prepend('<img src="'+toggleMinus+'" alt="-" title="'+minimize_message+'" class="collapsable"/> ');
  jQuery('.collapsable').addClass('clickable').css('cursor', 'pointer')  .click(function(){    var toggleSrc=jQuery(this).attr('src');
    if(toggleSrc.indexOf(toggleMinus)>=0){       
      jQuery(this).attr('src', togglePlus)             .attr('title', maximize_message)             .attr('alt', '+')             .parents('.MsgTable').find('td').not('.MsgR1').fadeOut('slow');   }else{                                            
      jQuery(this).attr('src', toggleMinus)             .attr('title', minimize_message)             .attr('alt', '-')             .parents('.MsgTable').find('td').fadeIn('slow');   }; });})}

function select_code(a){	var e=a.parentNode.parentNode.getElementsByTagName('PRE')[0];	if(window.getSelection){
		var s=window.getSelection();		if(s.setBaseAndExtent){
			s.setBaseAndExtent(e, 0, e, e.innerText.length-1);	}else{
			var r=document.createRange();			r.selectNodeContents(e);			s.removeAllRanges();			s.addRange(r);	}}else if(document.getSelection){
		var s=document.getSelection();		var r=document.createRange();		r.selectNodeContents(e);		s.removeAllRanges();		s.addRange(r);}else if(document.selection){
		var r=document.body.createTextRange();		try{			r.moveToElementText(e);			r.select();	}catch(err){}}}

function format_code(codeMsg, selMsg, hideMsg){	jQuery(document).ready(function(){		jQuery('div pre').each(function(){		
			var content=jQuery(this).parent().html();			jQuery(this).parent().html(			  '<span><div class="codehead">'+codeMsg+' '+			  '[<a href="#" onclick="select_code(this);return false;">'+selMsg+'</a>] '+			  '[<a href="#" onclick="jQuery(this).parent().parent().find(\'pre\').slideToggle();return false;">'+hideMsg+'</a>]'+			  '</div>'+content+'</span>');	});});}

function quote_selected_text(quoteButtonText){
	jQuery(".miniMH").parent().parent().append('<div class="ar"><button class="button" id="quote">'+quoteButtonText+'</button></class>');

	jQuery("#quote").click(function(){	
		var selectedText='';		if(window.getSelection){			selectedText=window.getSelection().toString();	}else if(document.getSelection){			selectedText=document.getSelection();	}else if(document.selection){			selectedText=document.selection.createRange().text;	}
	
		if(selectedText){			var textAreaVal=jQuery("#txtb").val();			jQuery("#txtb").val(textAreaVal+"\n[quote]"+selectedText+"[/quote]").focus();	}});}

function passwords_match(password1, password2){	if(jQuery(password2).attr("value")!=jQuery('#'+password1).attr('value')){		jQuery(password2).css("color", "red");}else{		jQuery(password2).css("color", "green");}}

jQuery(function init(){	
	jQuery('a[href^="http://"]').attr({		target: "_blank", 
		title: "Opens in a new window"
});

	


	
	jQuery("textarea:visible").resizable({		minHeight: 32,
		handles: "s"
});
	


	

	
	



});