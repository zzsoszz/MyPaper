var xmlHttp;
var xmlHttpType;
function createXMLHttpRuest(){
    if(window.ActiveXObject){
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlHttpType="POST";
    }
    else if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
        xmlHttpType="GET";
    }
}
function onReadyStateChange(){
	if(xmlHttp.readyState == 4){
	    if(xmlHttp.status==200){
            var text = xmlHttp.responseText;
            if(text==0){return false;}else{return true;}    
		}
	}
}
function onDataChange(){
	if(xmlHttp.readyState == 4){
	    if(xmlHttp.status==200){
            var text = xmlHttp.responseText;
            return text;   
		}
	}
}
function Init()
{
    setSearch();
    var Ylogin = document.getElementById("Ylogin");
    var Nlogin = document.getElementById("Nlogin");
    var YYlogin = document.getElementById("YYlogin");
    var NNlogin = document.getElementById("NNlogin");
    var data = document.getElementById("data");
    var path = window.location.href;
    var str = path.split('/')[2];
    var url=''
    switch(str){
        case "www.mcuol.com":
            url = "http://www.mcuol.com/aspx/transfer.aspx";
            break;
        case "mcuol.com":
            url = "http://mcuol.com/aspx/transfer.aspx";
            break;
        case "job.mcuol.com":
            url = "http://job.mcuol.com/TransLogin/TransLogin.aspx";
            break;
        case "company.mcuol.com":
            url = "http://company.mcuol.com/TransLogin/TransLogin.aspx";
            break;
    }
    createXMLHttpRuest();
    xmlHttp.onreadystatechange = onDataChange;
    xmlHttp.open(xmlHttpType,url,false);
    xmlHttp.send(null);
    var text = onDataChange();
    if(text==0){
        Nlogin.innerHTML="<a href=\"javascript:void(0)\" onClick=\"openWindow('http://www.mcuol.com/aspx/login.aspx','280','180','会员登录','登录');\">登录</a>  | <a href=\"http://reg.mcuol.com/Register.aspx\" target=\"_blank\">注册</a> | <a href=\"http:\/\/www.mcuol.com\/\">首页<\/a> | <a href=\"javascript:;\" onclick=\"window.external.addFavorite(\'http:\/\/www.mcuol.com\',\'嵌入式在线\');\" >收藏<\/a>";  
        Nlogin.style.display="block";
        data.innerHTML="<input type=\"hidden\" name=\"uid\" id=\"uid\" value=\"0\" /><input type=\"hidden\" name=\"ct\" id=\"ct\" value=\"0\" />"; 	    
        NNlogin.innerHTML="<input name=\"uname\" id=\"uname\" type=\"text\" value=\"嵌入式在线网友\" size=\"20\" readonly/>  <a href=\"javascript:void(0)\" onClick=\"openWindow('http://www.mcuol.com/aspx/login.aspx','280','180','会员登录','登录');\">我要登录 >> </a><span class=\"note\">提示：请用嵌入式在线帐号登录，以方便您与此处网友进行交流。</span>";
        NNlogin.style.display="block";
    }
    else{
        var uid = text.split(',')[0];
        var nickname = text.split(',')[1];
        var uname = text.split(',')[2];
        var type = text.split(',')[3];
        if(type==0){
            Ylogin.innerHTML="您好，<font color=red>"+nickname+"</font> [<a href=\"http://www.mcuol.com/aspx/logout.aspx?type=0\">退出</a>]&nbsp;<a href='http://blog.mcuol.com/"+uname+"'>我的博客</a>&nbsp;&nbsp;<a href=\"http://blog.mcuol.com/admin\" target=\"_blank\">管理后台</a>";
            Ylogin.style.display="block";
            data.innerHTML="<input type=\"hidden\" name=\"uid\" id=\"uid\" value="+uid+" /><input type=\"hidden\" name=\"ct\" id=\"ct\" value=\"1\" />"; 	
            YYlogin.innerHTML="您好，<span class=\"red\"><font color=red>"+nickname+"</font></span> &nbsp;[<a href=\"http://www.mcuol.com/aspx/logout.aspx?type=0\">退出</a>]";
            YYlogin.style.display="block";
        }
        else{
            Ylogin.innerHTML="您好，<font color=red>"+nickname+"</font> [<a href=\"http://www.mcuol.com/aspx/logout.aspx?type=1\">退出</a>]&nbsp;&nbsp;<a href=\"http://company.mcuol.com/Manage\" target=\"_blank\">进入管理后台</a>";
            Ylogin.style.display="block";
            data.innerHTML="<input type=\"hidden\" name=\"uid\" id=\"uid\" value="+uid+" /><input type=\"hidden\" name=\"ct\" id=\"ct\" value=\"2\" />"; 
            YYlogin.innerHTML="您好，<span class=\"red\"><font color=red>"+nickname+"</font></span> &nbsp;[<a href=\"http://www.mcuol.com/aspx/logout.aspx?type=1\">退出</a>]";
            YYlogin.style.display="block";
        }
    }
}
function jfdj_Login()
{
    var YLogin = document.getElementById("YLogin");
    var url = "http://www.mcuol.com/aspx/transfer.aspx";
    createXMLHttpRuest();
    xmlHttp.onreadystatechange = onDataChange;
    xmlHttp.open(xmlHttpType,url,false);
    xmlHttp.send(null);
    var text = onDataChange();
    if(text==0){
        YLogin.innerHTML="<a href=\"javascript:void(0)\" onClick=\"openWindow('http://www.mcuol.com/aspx/login.aspx','280','180','会员登录','登录');\">登录</a>  | <a href=\"http://reg.mcuol.com/Register.aspx\" target=\"_blank\">注册</a> | <a href=\"http://www.mcuol.com/\">嵌入式在线首页</a> | <a href=\"http://www.mcuol.com/about/help.htm\" target=\"_blank\">帮助</a>";  
        YLogin.style.display="block";
    }
    else{
        var uid = text.split(',')[0];
        var nickname = text.split(',')[1];
        var uname = text.split(',')[2];
        var type = text.split(',')[3];
        if(type==0){
            YLogin.innerHTML="您好，<font color=red>"+nickname+"</font> [<a href=\"http://www.mcuol.com/aspx/logout.aspx?type=0\">退出</a>]&nbsp;<a href='http://blog.mcuol.com/"+uname+"'>我的博客</a>&nbsp;&nbsp;<a href=\"http://blog.mcuol.com/admin\" target=\"_blank\">管理后台</a>";
            YLogin.style.display="block";
        }
        else{
            YLogin.innerHTML="您好，<font color=red>"+nickname+"</font> [<a href=\"http://www.mcuol.com/aspx/logout.aspx?type=1\">退出</a>]&nbsp;&nbsp;<a href=\"http://company.mcuol.com/Manage\" target=\"_blank\">进入管理后台</a>";
            YLogin.style.display="block";
        }
    }
}
function chkLogin()
{
    var url = "http://www.mcuol.com/aspx/transfer.aspx";
    createXMLHttpRuest();
    xmlHttp.onreadystatechange = onDataChange;
    xmlHttp.open(xmlHttpType,url,false);
    xmlHttp.send(null);
    var text = onDataChange();
    return text;
}
function List()
{
    setSearch();
    var Ylogin = document.getElementById("Ylogin");
    var Nlogin = document.getElementById("Nlogin");
    var url = "http://www.mcuol.com/aspx/transfer.aspx"
    createXMLHttpRuest();
    xmlHttp.onreadystatechange = onDataChange;
    xmlHttp.open(xmlHttpType,url,false);
    xmlHttp.send(null);
    var text = onDataChange();
    if(text==0){
        Nlogin.innerHTML="<a href=\"javascript:void(0)\" onClick=\"openWindow('http://www.mcuol.com/aspx/login.aspx','280','180','会员登录','登录');\">登录</a>  | <a href=\"http://reg.mcuol.com/Register.aspx\">注册</a> | <a href=\"http:\/\/www.mcuol.com\/\">首页<\/a> | <a href=\"javascript:;\" onclick=\"window.external.addFavorite(\'http:\/\/www.mcuol.com\',\'嵌入式在线\');\" >收藏<\/a>";  
        Nlogin.style.display="block";
    }
    else{
        var uid = text.split(',')[0];
        var nickname = text.split(',')[1];
        var uname = text.split(',')[2];
        var type = text.split(',')[3];
        if(type==0){
            Ylogin.innerHTML="您好，<font color=red>"+nickname+"</font> [<a href=\"http://www.mcuol.com/aspx/logout.aspx?type=0\">退出</a>]&nbsp;<a href='http://blog.mcuol.com/"+uname+"'>我的博客</a>&nbsp;&nbsp;<a href=\"http://blog.mcuol.com/admin\" target=\"_blank\">管理后台</a>";
            Ylogin.style.display="block";
        }
        else{
            Ylogin.innerHTML="您好，<font color=red>"+nickname+"</font> [<a href=\"http://www.mcuol.com/aspx/logout.aspx?type=1\">退出</a>]&nbsp;&nbsp;<a href=\"http://company.mcuol.com/Manage\" target=\"_blank\">进入管理后台</a>";
            Ylogin.style.display="block";
        }
    }
}
function IndexInit()
{
    var Nlogin1 = document.getElementById("Nlogin1");
    var Nlogin2 = document.getElementById("Nlogin2");
    var Nlogin3 = document.getElementById("Nlogin3");
    var url = "";
    var path = window.location.href;
    var str = path.split('/')[2];
    switch(str){
        case "www.mcuol.com":
            url = "http://www.mcuol.com/aspx/transfer.aspx";
            break;
        case "mcuol.com":
            url = "http://mcuol.com/aspx/transfer.aspx";
            break;
        case "job.mcuol.com":
            url = "http://job.mcuol.com/TransLogin/TransLogin.aspx";
            break;
    }
    createXMLHttpRuest();
    xmlHttp.onreadystatechange = onDataChange;
    xmlHttp.open(xmlHttpType,url,false);
    xmlHttp.send(null);
    var text = onDataChange();
    if(text==0){
        Nlogin1.innerHTML="<span onClick=\"openWindow('http://www.mcuol.com/aspx/login.aspx','280','180','会员登录','登录');\" style=\"cursor:pointer;\">登录</span> | "; 
        Nlogin2.innerHTML="<a href=\"http://reg.mcuol.com/Register.aspx\">注册<span class=\"icon_award\"></span></a> &nbsp;&nbsp;|&nbsp;&nbsp;"; 
        Nlogin1.style.display="block";
        Nlogin2.style.display="block";
    }
    else{
        var uid = text.split(',')[0];
        var nickname = text.split(',')[1];
        var uname = text.split(',')[2];
        var type = text.split(',')[3];
        if(type==0){
            Nlogin3.innerHTML="您好，<font color=red>"+nickname+"</font> [<SPAN style=\"CURSOR: pointer\" onclick=\"location.href='http://www.mcuol.com/aspx/logout.aspx?type=5'\">退出</span>]&nbsp;<a href='http://blog.mcuol.com/"+uname+"'>我的博客</a>&nbsp;&nbsp;<a href=\"http://blog.mcuol.com/admin\" target=\"_blank\">管理后台</a> | ";
            Nlogin3.style.display="block";
        }
        else{
            Nlogin3.innerHTML="您好，<font color=red>"+nickname+"</font> [<SPAN style=\"CURSOR: pointer\" onclick=\"location.href='http://www.mcuol.com/aspx/logout.aspx?type=6'\">退出</span>]&nbsp;&nbsp;<a href=\"http://company.mcuol.com/Manage\" target=\"_blank\">进入管理后台</a> | ";
            Nlogin3.style.display="block";
        }
    }
}
function setSearch()
{
    var href= window.location.href;
    var channel = href.split('/')[3].toLowerCase();
    if(channel=="news"){
        document.getElementById("SelectType").selectedIndex = 1;
        return;
    }
    else if(channel=="domain"){
        document.getElementById("SelectType").selectedIndex = 1;
        return;
    }
    else if(channel=="tech"){
        document.getElementById("SelectType").selectedIndex = 8;
        return;
    }
    else if(channel=="solution"){
        document.getElementById("SelectType").selectedIndex = 4;
        return;
    }
    else if(channel=="download"){
        document.getElementById("SelectType").selectedIndex = 7;
        return;
    }
    else if(channel=="product"){
        document.getElementById("SelectType").selectedIndex = 3;
        return;
    }
    else if(channel=="edu"){
        document.getElementById("SelectType").selectedIndex = 1;
        return;
    }
    else if(channel=="meeting"){
        document.getElementById("SelectType").selectedIndex = 1;
        return;
    }
    else{
        var o = href.split('/')[2].toLowerCase();
        if(o=="company.mcuol.com"){
            document.getElementById("SelectType").selectedIndex = 2;
            return;
        }
        else if(o=="bbs.mcuol.com"){
            document.getElementById("SelectType").selectedIndex = 5;
            return;
        }
        else if(o=="blog.mcuol.com"){
            document.getElementById("SelectType").selectedIndex = 6;
            return;
        }
        else if(o=="bulo.mcuol.com"){
            document.getElementById("SelectType").selectedIndex = 6;
            return;
        }
        else{
            document.getElementById("SelectType").selectedIndex = 0;
            return;
        }
    }
}
function searchT()
{
    var SelectType=document.getElementById("SelectType")
    var type = SelectType.options[SelectType.selectedIndex].value;
    var content = escape(document.getElementById("search").value.trim());
    if(content=="")
    {
        window.alert('请输入要搜索的内容!');
	    return;
    }
    if(type==0){
        window.location="http://search.mcuol.com/search.aspx?type=0&q="+content;
    }
    else if(type==1){
        window.location="http://search.mcuol.com/search.aspx?type=1&q="+content;
    }
    else if(type==2){
        window.location="http://search.mcuol.com/search.aspx?type=2&q="+content;
    }
    else if(type==3){
        window.location="http://search.mcuol.com/search.aspx?type=3&q="+content;
    }
	else if(type==4){
	    window.location="http://search.mcuol.com/search.aspx?type=4&q="+content;
	}
    else if(type==5){
	    window.location="http://search.mcuol.com/search.aspx?type=5&q="+content;
	}
	else if(type==6){
	    window.location="http://search.mcuol.com/search.aspx?type=6&q="+content;
	}
    else if(type==7){
	    window.location="http://search.mcuol.com/search.aspx?type=7&q="+content;
	}
    else{
        window.location="http://search.mcuol.com/search.aspx?type=8&q="+content;
    }
}
function searchKey(key)
{
    var url = "http://search.mcuol.com/search.aspx?type=8&q="+escape(key);
    window.location.href=url;
}
function getimgcode(){
    var getimagecode = document.getElementById("getcode");
    getimagecode.src = "http://www.mcuol.com/include/VerifyCode.aspx?x="+Math.random();
}
function out_code(code){
    var url;
    var now = new Date(); 
    var num=now.getYear()+now.getMonth()+now.getDay()+now.getHours()+now.getMinutes()+now.getTime();
    url = "http://www.mcuol.com/include/ValidCode.aspx?v="+code+"&x="+num;
    createXMLHttpRuest();
    xmlHttp.onreadystatechange = onReadyStateChange;
    xmlHttp.open(xmlHttpType,url,false);
    xmlHttp.send(null);
    if(!onReadyStateChange()){return false;}else{return true;}
}
function checkComment()
{
    var content = document.getElementById("content").value.trim();
    var code = document.getElementById("code").value.trim();
    var contentlen = sl(content);
    var ct = document.getElementById("ct").value.trim();
    if(ct==2){
        alert("企业用户是不能参与文章评论，请更换个人身份评论该文章!");  
        return;
    }
    else if(content==''){
        alert("评论内容不能为空");  
        document.getElementById("content").focus();
        return;
    }
    else if(contentlen>1000){
        alert("最多只能输入500个汉字");  
        document.getElementById("content").focus();
        return;
    }
    else if(code=='' || code.length<4){
        alert("验证码输入错误!");
        document.getElementById("code").focus();
        return;
    }
    else if(!out_code(code)){
        alert("验证码输入错误!");  
        document.getElementById("code").focus();
        return;
    }
    document.PForm.submit();
}
String.prototype.trim = function()
{
    // 用正则表达式将前后空格，用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
//检查中文字符长度
function sl(st){
	sl1=st.length;
	strLen=0;
	for(i=0;i<sl1;i++){
		if(st.charCodeAt(i)>255) strLen+=2;
	 else strLen++;
	}
	return strLen;
}