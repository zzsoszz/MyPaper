/******************************************************************************
  Crossday Discuz! Board - Common Modules for Discuz!
  Copyright 2001-2006 Comsenz Inc. (http://www.comsenz.com)
*******************************************************************************/
/*
var sPop = null;
var postSubmited = false;
var waitTime;
var titleTime=350;
document.write("<style type='text/css'id='defaultPopStyle'>");
document.write(".cPopText { font-family: Tahoma, Verdana; background:#F9FCFD;word-break:break-all; border:1px solid #B0C4CE; font-size: 12px;text-align:left; padding-right: 4px; padding-left: 4px; line-height: 18px; padding-top: 5px; padding-bottom: 5px; visibility: hidden; filter: Alpha(Opacity=100)}");

document.write("</style>");
document.write("<div id='popLayer' style='position:absolute;z-index:1000' class='cPopText'></div>");


function showPopupText(event) {
   document.getElementById("popLayer").style.visibility="hidden";
	if(event.srcElement) o = event.srcElement; else o = event.target;
	MouseX=event.clientX;
	MouseY=event.clientY;
	if(o.alt!=null && o.alt!="") { o.pop=o.alt;o.alt="" }
	if(o.title!=null && o.title!=""){ o.pop=o.title;o.title="" }
	if(o.pop!=sPop) {
		sPop=o.pop;
		if(sPop==null || sPop=="") {
		     document.getElementById("popLayer").style.visibility="hidden";
		} else {
			if(o.dyclass!=null) 
			    popStyle=o.dyclass; 
			else 
			    popStyle="cPopText";
			
			//clearTimeout(waitTime);
            waitTime=window.setTimeout("sleepTimeVisible()",titleTime);
			showIt();
			 
		}
	}
}

function sleepTimeVisible(){
    
   document.getElementById("popLayer").style.visibility="visible";
  
}

function showIt() {
    
	document.getElementById("popLayer").className=popStyle;
	document.getElementById("popLayer").innerHTML=sPop.replace(/<(.*)>/g,"&lt;$1&gt;").replace(/\n/g,"<br>");;
	popWidth=document.getElementById("popLayer").clientWidth;
	popHeight=document.getElementById("popLayer").clientHeight;
	if(MouseX+12+popWidth>document.body.clientWidth) popLeftAdjust=-popWidth-24; else popLeftAdjust=0;
	if(MouseY+12+popHeight>document.body.clientHeight) popTopAdjust=-popHeight-24; else popTopAdjust=0;
	document.getElementById("popLayer").style.left=MouseX+12+document.body.scrollLeft+popLeftAdjust;
	//document.documentElement.scrollTop 获取位于对象最顶端和窗口中可见内容的最顶端之间的距离。
	document.getElementById("popLayer").style.top=MouseY+12+document.documentElement.scrollTop+popTopAdjust;
}
function tooltip(e,content){
	var nondefaultpos = false;
	var x = e.pageX ? pageXOffset + e.clientX + 20 :(document.body.scrollLeft|document.documentElement.scrollLeft)+ e.x;
	var y = e.pageY ? pageYOffset + e.clientY : (document.body.scrollTop|document.documentElement.scrollTop) + e.y;
	var tip = document.createElement("div");
	tip.id="tip";
	tip.style.cssText="position:absolute;left:"+x+"px;top:"+y+"px;text-align:left;filter:progid:DXImageTransform.Microsoft.Shadow(color=gray,direction=30);"
	var img = "<img src='/images/decoration/tooltip.gif' style='margin-left:10px;z-index:10px;' />";
	tip.innerHTML = img+"<div style='background-color:infobackground;padding:5px;border-bottom:1px solid scrollbar;'>"+content+"</div>";
	document.body.appendChild(tip);
} 
function findobj(n, d) {
    
	var p, i, x;
	if(!d) d = document;
	if((p = n.indexOf("?"))>0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document;
		n = n.substring(0, p);
	}
	if(x != d[n] && d.all) x = d.all[n];
	for(i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
	for(i = 0; !x && d.layers && i < d.layers.length; i++) x = findobj(n, d.layers[i].document);
	if(!x && document.getElementById) x = document.getElementById(n);
	return x;
}

if(!document.onmouseover) {
	document.onmouseover = function(e) {
		if (!e) showPopupText(window.event); else showPopupText(e);
	};
}
*/

//层叠样式部分
var waitInterval;
var MDelayTime=0;
function CourseOrDetailSwitch(obj){
    clearTimeout(waitInterval);
	
    if(obj=="classinfo"){
        waitInterval=window.setTimeout("onOverClassInfo()",MDelayTime);
    }
    else{
        waitInterval=window.setTimeout("onOverDetailInfo()",MDelayTime);
    }
}
function onOverClassInfo(){
    clearTimeout(waitInterval);
    var tempclass="classinfo";
    var tempdetail="detailinfo";
    document.getElementById(tempclass).className="s1";
    document.getElementById(tempdetail).className="s2";
    document.getElementById(tempclass+"1").style.display='block';
    document.getElementById(tempclass+"2").style.display='block';
    document.getElementById(tempdetail+"1").style.display='none';
    document.getElementById(tempdetail+"2").style.display='none';  
}
function onOverDetailInfo(){
    clearTimeout(waitInterval);
    var tempclass="classinfo";
    var tempdetail="detailinfo";
   
    document.getElementById(tempclass).className="b1";
     document.getElementById(tempdetail).className="b2";
    document.getElementById(tempclass+"1").style.display='none';
    document.getElementById(tempclass+"2").style.display='none';
    document.getElementById(tempdetail+"1").style.display='block';
    document.getElementById(tempdetail+"2").style.display='block';                 
}

function getbg(strID,num,sum)
	{
		GetObj(strID+num).className="bg";	
		
		for(var i=0;i<sum;i++)
		{
			if(num != i)
			{
				document.getElementById(strID+i).className="";
			}
		}
	}
	
	function getShow(strID,num,sum)
	{
			
		GetObj(strID+num).className="bg";	
		for(var i=0;i<sum;i++)
		{
			if(num != i)
			{
			    
				document.getElementById(strID+i).className="";
				document.getElementById(strID+i+i).className="vis";
		
			}
		}
		document.getElementById(strID+num+num).className="rc";
	
	}
	
	function GetObj(objName){
			if(document.getElementById){
				return eval('document.getElementById("' + objName + '")');
			}else if(document.layers){
				return eval("document.layers['" + objName +"']");
			}else{
				return eval('document.all.' + objName);
			}
		}
		

/* 资料中心 选择*/
var oNowLeft="qdd0";
var oNowRight="qdd00";
function overMouse(objLeft,objRight)
	{
	    if(oNowLeft!=null || oNowRight!=null)
	    {	   
	        document.getElementById(oNowLeft).className="";
	        document.getElementById(oNowRight).className="vis";
	    }	    
        document.getElementById(objLeft).className = "bg";
        document.getElementById(objRight).className = "rc";
        oNowLeft = objLeft ;
        oNowRight = objRight ;  	
	    
	}
	
	
/**************************************资料，题库，下载**************************************************/	
var DivID1 = null
var DivID2 = null;
var current = null;
function setstate(obj)
{
	if(current == null)
	{
		DivID2 = obj.childNodes(0).id+1;
		obj.childNodes(0).className='';
		document.getElementById(DivID2).className='vis';
	}
}
function overshow(obj)
{
	if(current == null)
	{

		DivID1 = obj.id+1;
		document.getElementById(DivID1).className='rc';
		current=obj;
		obj.className="bg";	
	}
	else
	{	
		DivID1 = obj.id+1;
		DivID2 = current.id+1;
		current.className="";
		document.getElementById(DivID2).className='vis';
		obj.className="bg";
		document.getElementById(DivID1).className='rc';
		current=obj;
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////
	
/* 关于本站，友情链接等 静态页面，左面菜单所用到的脚本 */		
function mouse_state(strID,flag)
{
	if(flag)
	{
		document.getElementById(strID).className="bg"
	}
	else
	{
		document.getElementById(strID).className=""
	}
}		
/* 收藏首页 */
function addBookmark(title,url)
{
	if (window.sidebar) 
	{ 
		window.sidebar.addPanel(title, url,""); 
	} else if( document.all ) 
	{
		window.external.AddFavorite( url, title);
	} else if( window.opera && window.print ) 
	{
		return true;
	}
}
/* 将本页设为首页 */
function addDef(strID,url)
{
	document.getElementById("main").style.behavior="url(#default#homepage)";
	document.getElementById("main").setHomePage(url);
	
}

/* CenterList.aspx，DataLists.aspx 脚本 */
function MoveGB(divID){
		document.getElementById(divID).className="s bg";
	}
function OutGB(divID){
		document.getElementById(divID).className="s";
	}
	
/* 所有搜索连接跳转 */
var search_type;
function Search(obj)
{
    var search_txt="";
	var search_href="";
    search_href=obj;
    document.getElementById("hrefsearch").href="#";
    switch(search_href){
            case "course":
               
                document.getElementById("menu0").className="bg";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="";	    
                break;
            case "center":
                
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="bg";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="";
                break;
            case "news":
               
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="bg";
                document.getElementById("menu3").className="";
                break;
            case "data":
              
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="bg";
                break;
         }
//    document.getElementById("hrefsearch").href=search_href;
        search_type=search_href;
     
}
function SearchURL(pathUrl)
{
    var search_temp=pathUrl;
    
    search_temp=search_temp.substring(search_temp.length-1,search_temp.length);
    if(search_temp="\\")
    {
        pathUrl=pathUrl.substring(0,pathUrl.length-1);
    }


    var search_txt="";
    var search_href="";
    var search_target="";
    search_txt=document.getElementById("searchkeyword").value;
    if(search_type!=undefined){
        
        search_href=search_type;
      
    }else{
        search_href="course";
      
    }
    
    search_txt = search_txt.replace(/^\s*/g,"");
    search_txt = search_txt.replace(/\s*$/g,"");
    
    if(search_txt.length>0)
    {
        search_target=pathUrl+"/searchlist.html?type="+search_href+"&keyword="+search_txt;
        
    }else
    {   
        switch(search_href){
            case "course":
                search_target="index.html";
                document.getElementById("menu0").className="bg";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="";	    
                break;
            case "center":
                search_target="ALL/center/centerlist.html";    
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="bg";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="";
                break;
            case "news":
                search_target="news/";    
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="bg";
                document.getElementById("menu3").className="";
                break;
            case "data":
                search_target="dataALL/ALL.html";    
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="bg";
                break;
            default :
                search_target="index.html";
                document.getElementById("menu0").className="bg";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="";	
                break;
         }  
         search_target=pathUrl+"/"+search_target;
    }
    document.getElementById("hrefsearch").href=search_target;
}

function KeydownImg()
 {
    if (event.keyCode == 13  )
	{
			event.returnValue=false;
            event.cancel = true;
            
            document.getElementById("hrefsearch").click();
     		
    }
	
		
}

//4.14增加的模糊查询方法
function CourseSearchURL(pathUrl)
{
    var search_temp=pathUrl;    
    search_temp=search_temp.substring(search_temp.length-1,search_temp.length);
    if(search_temp="\\")
    {
        pathUrl=pathUrl.substring(0,pathUrl.length-1);
    }
    var search_txt="";
    var search_href="";
    var search_target="";
    search_txt=document.getElementById("coursekey").value;

    
    search_txt = search_txt.replace(/^\s*/g,"");
    search_txt = search_txt.replace(/\s*$/g,"");
    
    if(search_txt.length>0)
    {
        search_target=pathUrl+"/hot.aspx?key="+search_txt;
        
    }else
    {   
       search_target=pathUrl+"/"+search_target;
    }
    document.getElementById("courseSearch").href=search_target;
}
// 课程页面推荐好友
function CvFriend(url)
	{
		alert("可以使用Ctrl+V来将" + url +  "推荐给您的好友！");
		clipboardData.setData('Text',url);
	}

function SearchDDL(pathUrl)
{

    var search_txt="";
    var search_href=document.getElementById("searchddl").value;
    var search_target=""
    search_txt=document.getElementById("searchkeyword").value;

    
    search_txt = search_txt.replace(/^\s*/g,"");
    search_txt = search_txt.replace(/\s*$/g,"");
    
    if(search_txt.length>0)
    {
        search_target=pathUrl+"searchlist.html?type="+search_href+"&keyword="+search_txt;
        
    }else
    {   
        switch(search_href){
            case "course":
                search_target="index.html";
                document.getElementById("menu0").className="bg";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="";	    
                break;
            case "center":
                search_target="ALL/center/centerlist.html";    
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="bg";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="";
                break;
            case "news":
                search_target="news/";    
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="bg";
                document.getElementById("menu3").className="";
                break;
            case "data":
                search_target="dataALL/ALL.html";    
                document.getElementById("menu0").className="";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="bg";
                break;
            default :
                search_target="index.html";
                document.getElementById("menu0").className="bg";
                document.getElementById("menu1").className="";
                document.getElementById("menu2").className="";
                document.getElementById("menu3").className="";	
                break;
         }  
         search_target=pathUrl+"/"+search_target;
    }
    document.getElementById("hrefsearch").href=search_target;
}

function TaVoting(votingurl)
{
  var votinghref;
  
   for(var i = 0;i<document.getElementsByName("voting").length;i++)
   {
     if(document.getElementsByName("voting").item(i).checked)
     {
       votinghref = document.getElementsByName("voting").item(i).value;
       var   sarray= new  Array(); 
	   sarray=votinghref.split(','); 
       break;
     }
  }
  document.getElementById("votingid").href=votingurl+"VotingResult.aspx?vsid="+sarray[0]+"&vtid="+sarray[1];
}
function TaVotingResult(votingurl)
{
  var votinghref;
  
   for(var i = 0;i<document.getElementsByName("voting").length;i++)
   {
     if(document.getElementsByName("voting").item(i).checked)
     {
       votinghref = document.getElementsByName("voting").item(i).value;
       var   sarray= new  Array(); 
	   sarray=votinghref.split(','); 
       break;
     }
  }
  document.getElementById("votingidresult").href=votingurl+"VotingResult.aspx?vtid="+sarray[1];
}

/* 收藏页面脚本 */
function bookmarksite(title, url){
    if (document.all)
        window.external.AddFavorite(url, title);
    else if (window.sidebar)
        window.sidebar.addPanel(title, url, "")
}
/* 滚动广告 */
function rollad(title_01,title_02,title_03,url_01,url_02,url_03)
{
imgUrl1="Images/01.jpg"; //图片地址
imgtext1=(title_01); //标题
imgLink1=escape(url_01); //连接
imgUrl2="Images/02.jpg";
imgtext2=(title_02);
imgLink2=escape(url_02);
imgUrl3="Images/03.jpg";
imgtext3=(title_03);
imgLink3=escape(url_03);


 var focus_width=210
 var focus_height=160
 var text_height=18

 var swf_height = focus_height+text_height
 
 var pics=imgUrl1+"|"+imgUrl2+"|"+imgUrl3
 var links=imgLink1+"|"+imgLink2+"|"+imgLink3
 var texts=imgtext1+"|"+imgtext2+"|"+imgtext3
 
 document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ focus_width +'" height="'+ swf_height +'">');
 document.write('<param name="allowScriptAccess" value="sameDomain"><param name="movie" value="picflash.swf"><param name="quality" value="high"><param name="bgcolor" value="#F8F9FE">');
 document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
 document.write('<param name="FlashVars" value="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'"></object>');
}

/***************************首页在线咨询***************************/
var saleNum=0;
function nextSale(order){
	if(order=="down")	saleNum++;
	else saleNum--;
	if(saleNum>2)	saleNum=0
	else if(saleNum<0) saleNum=2;
	for(i=0;i<3;i++)
		document.getElementById("saleList"+i).style.display="none";
	document.getElementById("saleList"+saleNum).style.display="";
}