
function _st_u_en(str) 
{ 
	var en="",i=0; 
	
	for(i=0;i<str.length;i++){ 
		if(str.charCodeAt(i)>=0&&str.charCodeAt(i)<=255){ 
			en=en+escape(str.charAt(i)); 
		} 
		else { 
			en=en+str.charAt(i); 
		} 
	}
	
	return en; 
} 

function _st_g_sr() 
{ 
	if (self.screen) { 
		sr=screen.width+"x"+screen.height; 
	} 
	else if (self.java) { 
		var j=java.awt.Toolkit.getDefaultToolkit(); 
		var s=j.getScreenSize(); 
		sr=s.width+"x"+s.height; 
	} 

	return sr; 
} 

function _st_g_sc() 
{ 
	var sc=""; 

	if (self.screen) { 
		sc=screen.colorDepth+"-bit"; 

	} 
	return sc; 
} 

function _st_g_lg() 
{ 
	var lg=""; 
	var n=navigator; 

	if (n.language) { 
		lg=n.language.toLowerCase(); 
	} 
	else if (n.browserLanguage) { 
		lg=n.browserLanguage.toLowerCase(); 
	}
	
	return lg; 
} 

function _st_g_ag() 
{ 
	var ag=""; 
	var n=navigator; 

	if (n.userAgent) { 
		ag = n.userAgent; 
	} 

	return ag; 
}

function _st_g_je() { 
	var je=""; 
	var n=navigator; 
	je = n.javaEnabled()?1:0; 

	return je; 
} 

function _st_g_fl() 
{ 
	var f="",n=navigator; 
	
	if (n.plugins && n.plugins.length) { 
		for (var ii=0;ii<n.plugins.length;ii++) { 
			if (n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) { 
				f=n.plugins[ii].description.split('Shockwave Flash ')[1]; 
				break; 
			} 
		} 
	} 
	else if (window.ActiveXObject) { 
		for (var ii=10;ii>=2;ii--) { 
			try { 
				var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');"); 
				if (fl) { 
					f=ii + '.0'; break; 
				} 
			} catch(e) {} 
		} 
	} 
	
	return f; 
}

function _st_c_co()
{
	var c_en = (navigator.cookieEnabled)? 1 : 0;

	return c_en;
}

function _st_g_ss_val(str)
{
	len=str.indexOf("_"); 
	str=str.substring(len+1); 
	len=str.indexOf("_"); 
	str=str.substring(len+1); 

	return str; 
}

function _st_c_mm_stf(ref)
{
	if(ref.indexOf(".alimama.com/") > 0){
		if(ref.indexOf("/alimama.php") > 0){
			return 1;
		} 

		if(ref.indexOf("/ncpa.php") > 0){
			return 2;
		}
	}

	return 0;
}

function _st_g_mm_pid(ref)
{
	var pid="0";

	if( ref ){
			
		len=ref.indexOf("?i=");
		if(len < 0){
			len=ref.indexOf("&i=");
		}
			
		if(len < 0){
			return pid;
		}
			
		ref=ref.substring(len+1);

		len=ref.indexOf("&");
		if(len < 0){
			pid=ref.substring(2);
		}
		else{
			pid=ref.substr(2,len-2);
		}
	}

	if(!pid){
		pid = "0";
	}

	return pid;
}

function _st_g_mm_fbid(ref)
{
	var fbid="0";

	if( ref ){
		len=ref.indexOf("&fb=");
		if(len < 0){
			len=ref.indexOf("?fb=");
		}
			
		if(len < 0){
			return fbid;
		}
			
		ref=ref.substring(len+1);

		len=ref.indexOf("&");

		if(len < 0){
			fbid=ref.substring(3);
		}
		else{
			fbid=ref.substr(3,len-3);
		}
	}

	if(!fbid){
		fbid= "0";
	}

	return fbid;
}

function _st_g_mm_sid(ref)
{
	var sid="0";

	if( ref ){
		len=ref.indexOf("&si=");
		if(len < 0){
			len=ref.indexOf("?si=");
		}
			
		if(len < 0){
			return sid;
		}
			
		ref=ref.substring(len+1);

		len=ref.indexOf("&");

		if(len < 0){
			sid=ref.substring(3);
		}
		else{
			sid=ref.substr(3,len-3);
		}
	}

	if(!sid){
		sid= "0";
	}

	return sid;
}

function _st_g_mm_cg(ref)
{
	var cg="0";

	if( ref ){
//		if(ref.indexOf(".alimama.com/") > 0){
//			if(!ref.indexOf("/alimama.php") && !ref.indexOf("/ncpa.php")){
//				return pid;
//			}
			
		len=ref.indexOf("&cg=");
		if(len < 0){
			len=ref.indexOf("?cg=");
		}
		
		if(len < 0){
			return cg;
		}
			
		ref=ref.substring(len+1);

		len=ref.indexOf("&");

		if(len < 0){
			cg=ref.substring(3);
		}
		else{
			cg=ref.substr(3,len-3);
		}
//		}
	}

	if(!cg){
		cg = "0";
	}

	return cg;
}

function _st_g_co(name) 
{ 
	var mn=name+"="; 
	var b,e; 
	var co=document.cookie; 

	if (mn=="=") { 
		return co; 
	} 
	b=co.indexOf(mn); 
	if (b < 0) { 
		return ""; 
	} 
	
	e=co.indexOf(";", b+name.length); 

	if (e < 0) { 
		return co.substring(b+name.length + 1); 
	} 
	else { 
		return co.substring(b+name.length + 1, e); 
	} 
} 

function _st_s_co(name,val,cotp) 
{ 
	var date=new Date; 
	var year=date.getFullYear(); 
	var hour=date.getHours(); 

	var cookie="";

	if (cotp == 0) { 
		cookie=name+"="+val+";"; 
	} 
	else if (cotp == 1) { 
		year=year+10; 
		date.setYear(year); 
		cookie=name+"="+val+";expires="+date.toGMTString()+";"; 
	} 
	else if (cotp == 2) { 
		hour=hour+1; 
		date.setHours(hour); 
		cookie=name+"="+val+";expires="+date.toGMTString()+";"; 
	} 

	var d=_st_g_dom(document.domain);
	if(d != ""){
		cookie +="domain="+d+";";
	}
	cookie +="path="+"/;";
	document.cookie=cookie;
} 

function _st_g_dom(host)
{
	var d=host.replace(/^www\./, "");

	var ss=d.split(".");
	var l=ss.length;

	if(l == 3){
		if(_st_c_ctry_top_dom(ss[1]) && _st_c_ctry_dom(ss[2])){
		}
		else{
			d = ss[1]+"."+ss[2];
		}
	}
	else if(l >= 3){
		var ip_pat = "^[0-9]*\.[0-9]*\.[0-9]*\.[0-9]*$";

		if(host.match(ip_pat)){
			return d;
		}

		if(_st_c_ctry_top_dom(ss[l-2]) && _st_c_ctry_dom(ss[l-1])){
			d = ss[l-3]+"."+ss[l-2]+"."+ss[l-1];
		}
		else{
			d = ss[l-2]+"."+ss[l-1];
		}
	}
		
	return d;
}

function _st_c_ctry_top_dom(str)
{
	var pattern = "/^aero$|^cat$|^coop$|^int$|^museum$|^pro$|^travel$|^xxx$|^com$|^net$|^gov$|^org$|^mil$|^edu$|^biz$|^info$|^name$|^ac$|^mil$|^co$|^ed$|^gv$|^nt$|^bj$|^hz$|^sh$|^tj$|^cq$|^he$|^nm$|^ln$|^jl$|^hl$|^js$|^zj$|^ah$|^hb$|^hn$|^gd$|^gx$|^hi$|^sc$|^gz$|^yn$|^xz$|^sn$|^gs$|^qh$|^nx$|^xj$|^tw$|^hk$|^mo$|^fj$|^ha$|^jx$|^sd$|^sx$/i";

	if(str.match(pattern)){
		return 1;
	}

	return 0;
}

function _st_c_ctry_dom(str)
{
	var pattern = "/^ac$|^ad$|^ae$|^af$|^ag$|^ai$|^al$|^am$|^an$|^ao$|^aq$|^ar$|^as$|^at$|^au$|^aw$|^az$|^ba$|^bb$|^bd$|^be$|^bf$|^bg$|^bh$|^bi$|^bj$|^bm$|^bo$|^br$|^bs$|^bt$|^bv$|^bw$|^by$|^bz$|^ca$|^cc$|^cd$|^cf$|^cg$|^ch$|^ci$|^ck$|^cl$|^cm$|^cn$|^co$|^cr$|^cs$|^cu$|^cv$|^cx$|^cy$|^cz$|^de$|^dj$|^dk$|^dm$|^do$|^dz$|^ec$|^ee$|^eg$|^eh$|^er$|^es$|^et$|^eu$|^fi$|^fj$|^fk$|^fm$|^fo$|^fr$|^ly$|^hk$|^hm$|^hn$|^hr$|^ht$|^hu$|^id$|^ie$|^il$|^im$|^in$|^io$|^ir$|^is$|^it$|^je$|^jm$|^jo$|^jp$|^ke$|^kg$|^kh$|^ki$|^km$|^kn$|^kp$|^kr$|^kw$|^ky$|^kz$|^la$|^lb$|^lc$|^li$|^lk$|^lr$|^ls$|^lt$|^lu$|^lv$|^ly$|^ga$|^gb$|^gd$|^ge$|^gf$|^gg$|^gh$|^gi$|^gl$|^gm$|^gn$|^gp$|^gq$|^gr$|^gs$|^gt$|^gu$|^gw$|^gy$|^ma$|^mc$|^md$|^mg$|^mh$|^mk$|^ml$|^mm$|^mn$|^mo$|^mp$|^mq$|^mr$|^ms$|^mt$|^mu$|^mv$|^mw$|^mx$|^my$|^mz$|^na$|^nc$|^ne$|^nf$|^ng$|^ni$|^nl$|^no$|^np$|^nr$|^nu$|^nz$|^om$|^re$|^ro$|^ru$|^rw$|^pa$|^pe$|^pf$|^pg$|^ph$|^pk$|^pl$|^pm$|^pr$|^ps$|^pt$|^pw$|^py$|^qa$|^wf$|^ws$|^sa$|^sb$|^sc$|^sd$|^se$|^sg$|^sh$|^si$|^sj$|^sk$|^sl$|^sm$|^sn$|^so$|^sr$|^st$|^su$|^sv$|^sy$|^sz$|^tc$|^td$|^tf$|^th$|^tg$|^tj$|^tk$|^tm$|^tn$|^to$|^tp$|^tr$|^tt$|^tv$|^tw$|^tz$|^ua$|^ug$|^uk$|^um$|^us$|^uy$|^uz$|^va$|^vc$|^ve$|^vg$|^vi$|^vn$|^vu$|^ye$|^yt$|^yu$|^za$|^zm$|^zr$|^zw$/i";

	if(str.match(pattern)){
		return 1;
	}

	return 0;
}

function _st_s_co_time(name, val, day)
{
	var date=new Date;
	var vDay = date.getDate();

	var cookie="";

	vDay=vDay+day;

	date.setDate(vDay);

	cookie=name+"="+val+";expires="+date.toGMTString()+";";

	var d=_st_g_dom(document.domain);
	if(d != ""){
		cookie +="domain="+d+";";
	}
	cookie +="path="+"/;";
	document.cookie=cookie;
}

function _st_g_so() 
{ 
	var so=""; 
	var n=navigator; 
	
	if (n.appName) { 
		so=n.appName; 
	} 
	
	return so; 
} 

function _st_g_stm() 
{ 
	var date = new Date(); 
	var yy=date.getFullYear(); 
	var mm=date.getMonth(); 
	var dd=date.getDate(); 
	var hh=date.getHours(); 
	var ii=date.getMinutes(); 
	var ss=date.getSeconds(); 
	var i; 
	var tm=0; 
	for(i = 1970; i < yy; i++) { 
		if ((i % 4 == 0 && i % 100 != 0) || (i % 100 == 0 && i % 400 == 0)) { 
			tm=tm+31622400; 
		} 
		else { 
			tm=tm+31536000; 
		} 
	}
	mm=mm+1;
	
	for(i = 1; i < mm; i++) { 
		if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) { 
			tm=tm+2678400; 
		} 
		else { 
			if (i == 2) { 
				if ((yy % 4 == 0 && yy % 100 != 0) || (yy % 100 == 0 && yy % 400 == 0)) { 
					tm=tm+2505600; 
				} 
				else { 
					tm=tm+2419200; 
				} 
			} 
			else { 
				tm=tm+2592000; 
			} 
		} 
	}
	
	tm = tm +  (dd-1) * 86400; tm = tm +  hh * 3600; 
	tm = tm +  ii * 60; 
	tm = tm +  ss; 
	return tm; 
} 

function _st_g_ade_val(str)
{
	len=str.indexOf("_"); 
	str=str.substring(0,len); 

	return str; 
}

function _st_g_ade_sttime(str)
{
	len=str.indexOf("_"); 
	str=str.substring(len+1); 
	len=str.indexOf("_"); 

	str=str.substring(0,len); 

	return parseInt(str); 
}

function _st_g_ade_adtime(str)
{
	len=str.indexOf("_"); 
	str=str.substring(len+1); 
	len=str.indexOf("_"); 
	str=str.substring(len+1); 

	return parseInt(str); 
}

function _st_g_ctm(str) 
{ 
	len=str.indexOf("_"); 
	str=str.substring(len+1); 
	len=str.indexOf("_"); 
	str=str.substring(0,len); 
	return parseInt(str, 10); 
}

function _st_g_u_sn(str) 
{ 
	len=str.indexOf("_"); 
	str=str.substring(0,len); 

	return parseInt(str); 
}

var _st_unit_id=6355;
var _st_expr_tm=1800; 
var _st_url_sn=0;
var _st_ip="dt.tongji.cn.yahoo.com";
var _st_dest_path="/ystat.do?unit_id="+_st_unit_id; 
var _st_nuv=0; 
var _st_uv =""; 
var _st_ss =""; 
var _st_ref=""; 
var _st_url=""; 
var _st_clr=""; 
var _st_scr=""; 
var _st_lng=""; 
var _st_agt=""; 
var _st_jvm=""; 
var _st_flu="";
var _st_sof=""; 
var _st_cva=""; 
var _st_len=0; 
var _st_dom="";
var _st_host="";

var _st_loc_ip = "";
_st_loc_ip = "222.209.223.34";

var _st_icon_link_host="";

var rand;
var _en_co = _st_c_co();
var _ss_val = 0;

var _st_cg="0";
var _st_mm_land=0;
var _st_cpa="0";

_st_host=document.location.host;
_st_dom = _st_g_dom(_st_host.toLocaleLowerCase());

var _st_ha = 0;
var i = 0;
for (i=0; i< _st_dom.length; i++){
        _st_ha += _st_dom.charCodeAt(i);
}

var _st_ft = 0;

//_st_uv=""; 
_st_uv=_st_g_co("ystat_bc_"+String(_st_unit_id));
if(_st_uv==""){
	_st_nuv=1;

	var rand1 = parseInt( Math.random() * 4000000000 );
	var rand2 = parseInt( Math.random() * 4000000000 );
	_st_uv = String(rand1)+String(rand2);

	_st_s_co("ystat_bc_"+String(_st_unit_id), _st_uv, 1);
}

_st_ss=_st_g_co("ystat_ss_"+String(_st_unit_id)); 
if (_st_ss == "") { 
	_st_url_sn = 0;
	rand = parseInt( Math.random() * 4000000000 );
	_st_ss="0_"+_st_g_stm()+"_"+String(rand);
	_st_s_co("ystat_ss_"+String(_st_unit_id), _st_ss, 0); 
} 
else { 
	if (_st_g_stm() - _st_g_ctm(_st_ss) > _st_expr_tm) { 
		_st_url_sn = 0;
		rand = parseInt( Math.random() * 4000000000 );
		_st_ss="0_"+_st_g_stm()+"_"+String(rand); 
	} 
	else{
		_st_url_sn = _st_g_u_sn(_st_ss) + 1;
		_ss_val = _st_g_ss_val(_st_ss);
		_st_ss = String(_st_url_sn)+"_"+_st_g_stm()+"_"+_ss_val; 
	}
		
	_st_s_co("ystat_ss_"+String(_st_unit_id), _st_ss, 0); 
} 

var _st_cna=_st_g_co("cna"); 

var _st_ade_cookie = _st_g_co("ystat_ade_"+String(_st_unit_id)); 

var _st_ade_value = "0";
var _st_ade_sttime = 0;
var _st_ade_adtime = 0;

if(_st_ade_cookie){
	_st_ade_value = _st_g_ade_val(_st_ade_cookie);
	_st_ade_sttime = _st_g_ade_sttime(_st_ade_cookie);
//	_st_ade_adtime = _st_g_ade_adtime(_st_ade_cookie);
}


_st_cva=String(Math.random()); 
_st_len=_st_ss.indexOf("_"); 
_st_ss=_st_g_ss_val(_st_ss);

_st_ref=document.referrer; 

//_st_pid=_st_g_mm_pid(_st_ref);
var _st_mid=0;
var _st_mm_stf=_st_c_mm_stf(_st_ref);

_st_cg=_st_g_co("ystat_cg_"+String(_st_unit_id));
if(!_st_cg){
	_st_cg = "0";
}

_st_cpa=_st_g_co("ystat_cpa_"+String(_st_unit_id));
if(!_st_cpa){
	_st_cpa = "0";
}

if(_st_mm_stf){
	var _st_sid=_st_g_mm_sid(_st_ref);
	var _st_pid=_st_g_mm_pid(_st_ref);
	var _st_fbid=_st_g_mm_fbid(_st_ref);
	
	_st_mm_land=1; //mark if land pv

	_st_ade_sttime = 1227975945;

	if(_st_mm_stf == 2){
		_st_cpa=String(_st_sid)+"_"+String(_st_pid)+"_"+String(_st_fbid);
		_st_s_co_time("ystat_cpa_"+String(_st_unit_id), _st_cpa, _st_ade_adtime); 
	}

	_st_cg=_st_g_mm_cg(_st_ref);
	
	if(_st_cg != "0"){
		//set cg
		_st_s_co("ystat_cg_"+String(_st_unit_id), _st_cg, 0);
	}

	if(_st_mm_stf == 1){
		if(_st_ade_cookie){
			//reset
			_st_ade_value = _st_g_ade_val(_st_ade_cookie);

			_st_ade_cookie=_st_ade_value+"_"+String(_st_ade_sttime)+"_"+String(_st_ade_adtime);
			_st_s_co_time("ystat_ade_"+String(_st_unit_id), _st_ade_cookie, _st_ade_adtime); 
		}
		else{
			rand_1 = parseInt( Math.random() * 4000000000 );
			rand_2 = parseInt( Math.random() * 4000000000 );
			_st_ade_value = String(rand_1)+String(rand_2);

			_st_ade_cookie=_st_ade_value+"_"+String(_st_ade_sttime)+"_"+String(_st_ade_adtime);
			_st_s_co_time("ystat_ade_"+String(_st_unit_id), _st_ade_cookie, _st_ade_adtime); 
		}
	}
}

_st_ref=_st_u_en(String(_st_ref)); 

_st_url=document.URL; 
_st_url=_st_u_en(String(_st_url)); 
_st_clr=_st_g_sc(); 
_st_clr=_st_u_en(String(_st_clr)); 
_st_scr=_st_g_sr(); 
_st_scr=_st_u_en(String(_st_scr)); 
_st_lng=_st_g_lg(); 
_st_lng=_st_u_en(String(_st_lng)); 
_st_agt=_st_g_ag(); 
_st_agt=_st_u_en(String(_st_agt)); 
_st_jvm=_st_g_je(); 
_st_jvm=_st_u_en(String(_st_jvm)); 
_st_flu=_st_g_fl(); 
_st_flu=_st_u_en(String(_st_flu)); 
_st_sof=_st_g_so(); 
_st_sof=_st_u_en(String(_st_sof)); 


var fds = new Array();

fds[0] = "gro#tra763";
fds[1] = "moc#olzd";
fds[2] = "moc#tra763";
fds[3] = "moc#df571";
fds[4] = "ten#oog1";
fds[5] = "nc#ppk1";
fds[6] = "nc#osnaknak";
fds[7] = "nc#emocwww";
fds[8] = "nc#psalla";
fds[9] = "moc#oesii";
fds[10] = "moc#kh0083";
fds[11] = "nc#kpwww";
fds[12] = "nc#moc#zw001";
fds[13] = "nc#kpemoc";
fds[14] = "moc#eyiq063";
fds[15] = "moc#qqa4";
fds[16] = "ten#aboakoak";
fds[17] = "moc#ecilliw";
fds[18] = "nc#moc#ibeea";
fds[19] = "moc#ibeea";
fds[20] = "nc#tra763";
fds[21] = "moc#025sns";
fds[22] = "moc#og321oah";
fds[23] = "moc#9zznc";

var _temp_st_dom = str_reverse(_st_dom);
var i = 0;
for (i in fds){
        if(fds[i] == _temp_st_dom)
		_st_ft = 1;	
}

var fips = new Array();


var i = 0;
for (i in fips){
        if(fips[i] == _st_loc_ip){
		_st_ft = 1;
		break;
        }
}

_st_dest="http://"+_st_ip+_st_dest_path+"&uv="+_st_uv+"&nuv="+_st_nuv+"&cna="+_st_cna+"&cg="+_st_cg+"&mid="+_st_mid+"&mmland="+_st_mm_land+"&ade="+_st_ade_value+"&adtm="+_st_ade_adtime+"&sttm="+_st_ade_sttime+"&cpa="+_st_cpa+"&ss="+_st_ss+"&usn="+_st_url_sn+"&ec="+_en_co+"&ref="+_st_ref+"&url="+_st_url+"&dom="+_st_dom+"&ha="+_st_ha+"&ft="+_st_ft+"&nac="+_st_sof+"&agt="+_st_agt+"&clr="+_st_clr+"&scr="+_st_scr+"&lng="+_st_lng+"&jvm="+_st_jvm+"&flu="+_st_flu+"&tm=1227975945"+"&tc=34010259"+"&ut=0"+"&cnu="+_st_cva;


document.open();
document.write("<script language=\"JavaScript\" type=\"text/javascript\" src=\""+_st_dest+"\"></script>");


_st_icon_link_host="tongji.cn.yahoo.com";

document.write( "<a href=\"http://"+_st_icon_link_host+"/report.html?unit_id="+_st_unit_id+"\" target=\"_blank\">Yahoo!Stat.</a>" );
document.close();


function mmtrace(button_name)
{
	if(button_name == null){
		// set default button name
		button_name='button';
	}
	
	// avoid log request to be cached
	_st_cva=String(Math.random()); 
	
	_st_button_dest="http://"+_st_ip+_st_dest_path+"&uv="+_st_uv+"&nuv="+_st_nuv+"&cna="+_st_cna+"&cg="+_st_cg+"&mid="+_st_mid+"&mmland="+_st_mm_land+"&ade="+_st_ade_value+"&adtm="+_st_ade_adtime+"&sttm="+_st_ade_sttime+"&mmtrace="+button_name+"&ss="+_st_ss+"&usn="+_st_url_sn+"&ec="+_en_co+"&ref="+_st_ref+"&url="+_st_url+"&dom="+_st_dom+"&host="+_st_host+"&nac="+_st_sof+"&agt="+_st_agt+"&clr="+_st_clr+"&scr="+_st_scr+"&lng="+_st_lng+"&jvm="+_st_jvm+"&flu="+_st_flu+"&tm=1227975945"+"&tc=34010259"+"&ut=0"+"&cnu="+_st_cva;

	var oTempjs = document.createElement("script");
	oTempjs.type = 'text/javascript';
	oTempjs.src = _st_button_dest;

	document.body.appendChild(oTempjs);
}

function mamatrace(button_name)
{
	mmtrace(button_name);
}

function str_reverse(str) {
	var ln = str.length;
	var i=0;
	var temp="";
	for(i=ln-1; i>-1; i--) {
		if(str.charAt(i)==".")
			temp += "#";
		else
			temp += str.charAt(i);
	}

	return temp;
}

