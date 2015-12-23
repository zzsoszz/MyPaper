
var admin_type = new Array;
admin_type[0] = "普通";
admin_type[1] = "精彩";
admin_type[2] = "下载";
admin_type[3] = "原创";
admin_type[4] = "实用";
admin_type[5] = "召集";
admin_type[6] = "潜力";
admin_type[7] = "另类";
admin_type[8] = "热门";
admin_type[9] = "推荐";
admin_type[10] = "公告";
//admin_type[10] = "连载";

var split1_type = new Array;
split1_type[0] = "普通";
split1_type[1] = "原创";
split1_type[2] = "下载";
split1_type[3] = "召集";
split1_type[4] = "实用";

var split2_type = new Array;
split2_type[0] = "普通";
split2_type[1] = "精彩";
split2_type[2] = "热门";
split2_type[3] = "推荐";
split2_type[4] = "另类";
split2_type[5] = "公告";

var sub_content_type= new Array;
sub_content_type[0]="五花八门";
sub_content_type[1]="社会杂谈";
sub_content_type[2]="国际瞭望";
sub_content_type[3]="军事纵横";
sub_content_type[4]="谈股论经";
sub_content_type[5]="长篇连载";
sub_content_type[6]="悬疑鬼话";
sub_content_type[7]="原创天地";
sub_content_type[8]="文史纵论";
sub_content_type[9]="ＩＴ业界";
sub_content_type[10]="媒体平台";
sub_content_type[11]="娱乐八卦";
sub_content_type[12]="情感交流";
sub_content_type[13]="美容服饰"; 
sub_content_type[14]="阿猫阿狗"; 
sub_content_type[15]="星座占卜"; 
sub_content_type[16]="时尚资讯";  
sub_content_type[17]="旅游休闲";
sub_content_type[18]="汽车天地"; 
sub_content_type[19]="吃喝玩乐"; 
sub_content_type[20]="数码生活";
sub_content_type[21]="游戏部落";   
sub_content_type[22]="住房家居";
sub_content_type[23]="猫男狗女";
sub_content_type[24]="生理健康"; 
sub_content_type[25]="体育聚焦";
sub_content_type[26]="足球世界"; 
sub_content_type[27]="篮球天地";
sub_content_type[28]="足球盘口"; 
sub_content_type[29]="我爱世界杯";
sub_content_type[30]="影视评论";
sub_content_type[31]="享“乐”生活";
sub_content_type[32]="动画漫画";
sub_content_type[33]="暴笑猫扑"; 
sub_content_type[34]="bt无极限";
sub_content_type[35]="疯狂贴图";
sub_content_type[36]="猫扑摄影";
sub_content_type[37]="聚会腐败";
sub_content_type[38]="杀人游戏";
sub_content_type[39]="上海";
sub_content_type[40]="广州";
sub_content_type[41]="海外";

              
var HOME = "http://dzh.mop.com/";
var IMAGES = "http://img.mop.com/";
var JS = "http://txt.mop.com/dzhjs/";
var STATIC_URL = "http://txt.mop.com/" ;
var reply_mp_limit = 15;//回复mp限制
//var reply_mp_limit = 1;//回复mp限制

var sub_type="";
try{
	sub_type=subject_type;	
}catch (e){}

var score_number=0;//评分次数
var up_number = 0;//up次数

var is_login = 0;//登录状态
var user_id = 0;//用户id
var user_mp = 1;//用户mp
var user_mm = 0;
var is_black = 0;//小黑屋状态
var can_split1 = 0;//分贴1 --〉27
var can_split2 = 0;//分贴2 --〉85
var is_fee_number = 0;//有偿回复次数
var can_html = 0;//是否可以用html
var can_id = 0;//是否可以发任意帖
var can_admintopic = 0;//管理帖子
var can_view = 0;//察看举报
var can_check = 0;//审帖
var can_eliteadmin = 0;//精华管理
var is_unionadmin = 0;//联盟管理
var is_forbitright = 0;//右键禁止
var is_onekey = 0;//是否支持一键转贴
var waist1 = "";
var waist2 = "";
var waist3 = "";

var user_status = "";
function is_logon(){
  var allcookie = document.cookie.split('; ');
  for(var i=0;i<allcookie.length;i++){
    var cookiename = allcookie[i].split('=')[0];
    if(cookiename=='mop_logon'){
      return true;
    }
  }
  return false;
}

function getCookie(key){//mop_user_key
  var allcookie = document.cookie.split('; ');
  for(var i=0;i<allcookie.length;i++){ 
    var cookiename = allcookie[i].split('=')[0];
    if(cookiename.indexOf("mop_user_key")>=0){
      return allcookie[i].split('=')[1];
    }
  }
  return "";
}

//get cookie value
function getCookieValue(key){
  var allcookie = document.cookie.split('; ');
  for(var i=0;i<allcookie.length;i++){
    var cookiename = allcookie[i].split('=')[0];
    if(cookiename==key){
      return allcookie[i].split('=')[1];
    }
  }
  return "";
}

//登录状态
if(is_logon()){
  is_login = 1;
}
user_status = getCookieValue('user_status');

if(user_status != ""){
  //
  var user_statusArray = user_status.split("|");
  try{
    user_id = user_statusArray[0];
    user_mp = user_statusArray[1];
    user_mm = user_statusArray[2];
    is_black = user_statusArray[3];
    can_split1 = user_statusArray[4];
    can_split2 = user_statusArray[5];
    is_fee_number = user_statusArray[6];
    can_html = user_statusArray[7];
    can_id = user_statusArray[8];
    can_admintopic = user_statusArray[9];
    can_view = user_statusArray[10];
    can_check = user_statusArray[11];
    can_eliteadmin = user_statusArray[12];
    is_unionadmin = user_statusArray[13];
    is_forbitright = user_statusArray[14];	
    is_onekey = user_statusArray[15];
  }catch(e){
  }
}

var mop_user_value = getCookie("mop_user_key");
if(mop_user_value!=""){
  //
  try{
    score_number=mop_user_value.split("%7C")[2];
    up_number = mop_user_value.split("%7C")[1];
  }catch(e){
  }
}

var mop_logon_vlue=getCookie("mop_logon");
var user_mop_mail="";
if(mop_logon_vlue!=""){
  try{
    user_mop_mail=mop_logon_vlue.split("%7C")[1];
    if (user_mop_mail==' ') user_mop_mail='';
  }catch(e){}
}


var filt=1000*Math.random(); 
var filtLimit=180;
try{
 var nowDate=new Date();
 var nowHour=nowDate.getHours();
 if (nowHour>=0 && nowHour<=9) filtLimit=900;
 else if (nowHour>9 && nowHour<12) filtLimit=900;
 else if (nowHour>=12 && nowHour<18) filtLimit=700;
 else if (nowHour>18 && nowHour<23) filtLimit=800; 
 else if (nowHour==18 || nowHour==23) filtLimit=900; 
}catch (e){}

function setColValue(sid,userId){
	var allcookie = document.cookie.split('; ');
	var newCookieValue="";
	var hasValue=false;
	newCookieValue="col_ad="+sid+"_"+userId+" ; maxage=-1 ; path=/ ; domain=mop.com";
	document.cookie=newCookieValue;
}

function toFriends(){
	var titleValue=document.all('span_Title').innerText;
	var bodyValue=document.all('span_Body').innerText;
	var len=250; 
	bodyValue=(bodyValue.length>len?bodyValue.substring(0,len):bodyValue);
	document.frm_to_friend.txtTitle.value=titleValue;
	document.frm_to_friend.txtBody.value=bodyValue;
	if (user_mop_mail!='') { 
		document.frm_to_friend.myemail.value=user_mop_mail+"@mop.com"; 
	}		
	document.frm_to_friend.submit();	
}	 
function isEmail(email){	
	invalidChars = " /;,:{}[]|*%$#!()`<>?";	
	if (email == '') {		return false;	}	
	for (i=0; i< invalidChars.length; i++)		{
		badChar = invalidChars.charAt(i);		
		if (email.indexOf(badChar,0) > -1){	return false;}	
	}	
	atPos = email.indexOf("@",1);	
	if (atPos == -1)  {   
		return false;  
	}	
	if (email.indexOf("@", atPos+1) != -1) {  return false;  }	
	periodPos = email.indexOf(".",atPos);	
	if(periodPos == -1) {
		return false;  
	}	
	if ( atPos +2 > periodPos)  {		
		return false;  
	}	
	if ( periodPos +3 > email.length)  {
	   	return false;  
	}	
	return true;
}

function checkForm(inputObj){ 
	if(!isEmail(inputObj.value)) {
		alert("please confirm!");
		inputObj.focus();
		return false;
	}else {
		 document.frm_to_friend.toemail.value=inputObj.value; 
		 return true;	
	}
}

			function copyToClipBoard(){
				var clipBoardContent='';
				clipBoardContent+=document.all('span_Title').innerText;
				clipBoardContent+="\r\n"+url;	
				window.clipboardData.setData("Text",clipBoardContent);
			}
	
var curRid=0;
var curSSUid=0;
var isTaobao=0;
var ssUserName="";
	
function writeSS(rid, ssuid){
	var innerStr="";
	try{
                var curSpan=eval("document.all.rspan"+rid);
		if (ssuid>0) {
			
			if (curSpan) {
				var rand=Math.floor(Math.random()*8);
				var imgFile="2icon_"+rand+".gif";
				innerStr+="<a alt=我的朋友圈' href='http://friends.mop.com/society/SocietyUserMain.do?userId="+ssuid+"' target='_blank'><img src='http://img.mop.com/images/"+imgFile+"' border='0' alt='我的朋友圈'></a>";
			}
		}
		curSpan.innerHTML=innerStr;
	}catch (e){ //alert(e);
	}
}
	
function writeSS(rid, ssuid, isTB){
	var innerStr="";
	try{
                var curSpan=eval("document.all.rspan"+rid);
		if (isTB==1){
			innerStr+="<a title='.m 很值钱，淘宝乐趣很严重' href='http://taobao.mop.com' target='_blank' ><img src='http://img.mop.com/images/taobao.gif' border='0' title='.m 很值钱，淘宝乐趣很严重' ></a>&nbsp;&nbsp;";
		}
		
		if (ssuid=="" || isNaN(ssuid)){
			if (ssuid!="") {			
				var rand=Math.floor(Math.random()*8);
				var imgFile="2icon_"+rand+".gif";
				innerStr+="<a alt='我的朋友圈' href='http://friends.mop.com/society/SocietyUserPerson.do?userNickname="+escape(ssuid)+"' target='_blank'><img src='http://img.mop.com/images/"+imgFile+"' border='0' alt='我的朋友圈'></a>";
			}
		}
		else{
			if (ssuid>0) {
				var rand=Math.floor(Math.random()*8);
				var imgFile="2icon_"+rand+".gif";
				innerStr+="<a alt='我的朋友圈' href='http://friends.mop.com/society/SocietyUserMain.do?userId="+ssuid+"' target='_blank'><img src='http://img.mop.com/images/"+imgFile+"' border='0' alt='我的朋友圈'></a>";
			}
		}
		if (curSpan) {	curSpan.innerHTML=innerStr;}
	}catch (e){ //alert(e);
	}
}


/*
function writeSpan(rid, nickName ,isTB) {
	var innerStr="";
	try{
        var curSpan=eval("document.all.rspan"+rid);
		if (isTB==1){
			innerStr+="<a title='.m 很值钱，淘宝乐趣很严重' href='http://taobao.mop.com' target='_blank' ><img src='http://img.mop.com/images/taobao.gif' border='0' title='.m 很值钱，淘宝乐趣很严重' ></a>&nbsp;&nbsp;";
		}
		if (nickName!="") {			
				var rand=Math.floor(Math.random()*8);
				var imgFile="2icon_"+rand+".gif";
				innerStr+="<a alt='我的朋友圈' href='http://friends.mop.com/society/SocietyUserPerson.do?userNickname="+escape(nickName)+"' target='_blank'><img src='http://img.mop.com/images/"+imgFile+"' border='0' alt='我的朋友圈'></a>";
		}
		if (curSpan) {
			curSpan.innerHTML=innerStr;
		}
	}catch (e){ //alert(e);
	}	
}
*/

