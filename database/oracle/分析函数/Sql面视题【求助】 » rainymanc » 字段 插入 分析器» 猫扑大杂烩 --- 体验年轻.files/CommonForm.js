
var admin_type = new Array;
admin_type[0] = "��ͨ";
admin_type[1] = "����";
admin_type[2] = "����";
admin_type[3] = "ԭ��";
admin_type[4] = "ʵ��";
admin_type[5] = "�ټ�";
admin_type[6] = "Ǳ��";
admin_type[7] = "����";
admin_type[8] = "����";
admin_type[9] = "�Ƽ�";
admin_type[10] = "����";
//admin_type[10] = "����";

var split1_type = new Array;
split1_type[0] = "��ͨ";
split1_type[1] = "ԭ��";
split1_type[2] = "����";
split1_type[3] = "�ټ�";
split1_type[4] = "ʵ��";

var split2_type = new Array;
split2_type[0] = "��ͨ";
split2_type[1] = "����";
split2_type[2] = "����";
split2_type[3] = "�Ƽ�";
split2_type[4] = "����";
split2_type[5] = "����";

var sub_content_type= new Array;
sub_content_type[0]="�廨����";
sub_content_type[1]="�����̸";
sub_content_type[2]="���ʲt��";
sub_content_type[3]="�����ݺ�";
sub_content_type[4]="̸���۾�";
sub_content_type[5]="��ƪ����";
sub_content_type[6]="���ɹ�";
sub_content_type[7]="ԭ�����";
sub_content_type[8]="��ʷ����";
sub_content_type[9]="�ɣ�ҵ��";
sub_content_type[10]="ý��ƽ̨";
sub_content_type[11]="���ְ���";
sub_content_type[12]="��н���";
sub_content_type[13]="���ݷ���"; 
sub_content_type[14]="��è����"; 
sub_content_type[15]="����ռ��"; 
sub_content_type[16]="ʱ����Ѷ";  
sub_content_type[17]="��������";
sub_content_type[18]="�������"; 
sub_content_type[19]="�Ժ�����"; 
sub_content_type[20]="��������";
sub_content_type[21]="��Ϸ����";   
sub_content_type[22]="ס���Ҿ�";
sub_content_type[23]="è�й�Ů";
sub_content_type[24]="������"; 
sub_content_type[25]="�����۽�";
sub_content_type[26]="��������"; 
sub_content_type[27]="�������";
sub_content_type[28]="�����̿�"; 
sub_content_type[29]="�Ұ����籭";
sub_content_type[30]="Ӱ������";
sub_content_type[31]="���֡�����";
sub_content_type[32]="��������";
sub_content_type[33]="��Цè��"; 
sub_content_type[34]="bt�޼���";
sub_content_type[35]="�����ͼ";
sub_content_type[36]="è����Ӱ";
sub_content_type[37]="�ۻḯ��";
sub_content_type[38]="ɱ����Ϸ";
sub_content_type[39]="�Ϻ�";
sub_content_type[40]="����";
sub_content_type[41]="����";

              
var HOME = "http://dzh.mop.com/";
var IMAGES = "http://img.mop.com/";
var JS = "http://txt.mop.com/dzhjs/";
var STATIC_URL = "http://txt.mop.com/" ;
var reply_mp_limit = 15;//�ظ�mp����
//var reply_mp_limit = 1;//�ظ�mp����

var sub_type="";
try{
	sub_type=subject_type;	
}catch (e){}

var score_number=0;//���ִ���
var up_number = 0;//up����

var is_login = 0;//��¼״̬
var user_id = 0;//�û�id
var user_mp = 1;//�û�mp
var user_mm = 0;
var is_black = 0;//С����״̬
var can_split1 = 0;//����1 --��27
var can_split2 = 0;//����2 --��85
var is_fee_number = 0;//�г��ظ�����
var can_html = 0;//�Ƿ������html
var can_id = 0;//�Ƿ���Է�������
var can_admintopic = 0;//��������
var can_view = 0;//�쿴�ٱ�
var can_check = 0;//����
var can_eliteadmin = 0;//��������
var is_unionadmin = 0;//���˹���
var is_forbitright = 0;//�Ҽ���ֹ
var is_onekey = 0;//�Ƿ�֧��һ��ת��
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

//��¼״̬
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
				innerStr+="<a alt=�ҵ�����Ȧ' href='http://friends.mop.com/society/SocietyUserMain.do?userId="+ssuid+"' target='_blank'><img src='http://img.mop.com/images/"+imgFile+"' border='0' alt='�ҵ�����Ȧ'></a>";
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
			innerStr+="<a title='.m ��ֵǮ���Ա���Ȥ������' href='http://taobao.mop.com' target='_blank' ><img src='http://img.mop.com/images/taobao.gif' border='0' title='.m ��ֵǮ���Ա���Ȥ������' ></a>&nbsp;&nbsp;";
		}
		
		if (ssuid=="" || isNaN(ssuid)){
			if (ssuid!="") {			
				var rand=Math.floor(Math.random()*8);
				var imgFile="2icon_"+rand+".gif";
				innerStr+="<a alt='�ҵ�����Ȧ' href='http://friends.mop.com/society/SocietyUserPerson.do?userNickname="+escape(ssuid)+"' target='_blank'><img src='http://img.mop.com/images/"+imgFile+"' border='0' alt='�ҵ�����Ȧ'></a>";
			}
		}
		else{
			if (ssuid>0) {
				var rand=Math.floor(Math.random()*8);
				var imgFile="2icon_"+rand+".gif";
				innerStr+="<a alt='�ҵ�����Ȧ' href='http://friends.mop.com/society/SocietyUserMain.do?userId="+ssuid+"' target='_blank'><img src='http://img.mop.com/images/"+imgFile+"' border='0' alt='�ҵ�����Ȧ'></a>";
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
			innerStr+="<a title='.m ��ֵǮ���Ա���Ȥ������' href='http://taobao.mop.com' target='_blank' ><img src='http://img.mop.com/images/taobao.gif' border='0' title='.m ��ֵǮ���Ա���Ȥ������' ></a>&nbsp;&nbsp;";
		}
		if (nickName!="") {			
				var rand=Math.floor(Math.random()*8);
				var imgFile="2icon_"+rand+".gif";
				innerStr+="<a alt='�ҵ�����Ȧ' href='http://friends.mop.com/society/SocietyUserPerson.do?userNickname="+escape(nickName)+"' target='_blank'><img src='http://img.mop.com/images/"+imgFile+"' border='0' alt='�ҵ�����Ȧ'></a>";
		}
		if (curSpan) {
			curSpan.innerHTML=innerStr;
		}
	}catch (e){ //alert(e);
	}	
}
*/

