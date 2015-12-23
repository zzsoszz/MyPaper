function allnad(){document.allnad.action='http://www.narrowad.com/redirect/nadRedirect.jsp';document.allnad.submit();}
var sL=0,iS=0,iP=0;
function s(v){iS=v}
function go2Url(p){var f=document.getElementById('jumpForm');f.action=p;f.submit();return true;}
var divStyle,adDescStyle,adTitleStyle,titleStyle,titleBackStyle,adBackStyle,tixa_nad_websiteID,tixa_nad_channelID
function ss(w){window.status = w;return true;}
function go(k,u){go2Url('http://click.narrowad.com/click/click.jsp?parameter='+k+'&parameter1='+u)}
function goSamulu(k,u,kw){if(kw==null || kw=='' ||  kw=='ÉµÄ¿Â¼') go2Url('http://www.samulu.com'); else go2Url('http://www.samulu.com/catalog/result.jsp?spaceType=2&keyword='+kw);}
function strCut(myString, nLength){
var i=0,j=0,index=0
while(i<2*nLength){
if(myString.charCodeAt(j++)>255)
i+=2
else
i+=1
if (i>2*nLength)
break
index++}
return myString.substr(0,index)}
function draw(list,templateValue,websiteID,channelID){
tixa_nad_websiteID=websiteID
tixa_nad_channelID=channelID
if(typeof(list)!='undefined' && list.length>0){
adLinks=list
var v=build(templateValue)
document.getElementById("adShow").innerHTML=v}}
function build(paraValue){
var temArray=paraValue.split(",")
template=new Object()
template.size=temArray[2]
template.row=temArray[0]
template.col=temArray[1]
template.ggbks=temArray[6]
template.ggds=temArray[7]
template.ggbtzs=temArray[8]
template.ggmszs=temArray[9]
template.ggydtds=temArray[10]
template.ggydtzs=temArray[12]
template.descCount=temArray[3]
template.isHeader=temArray[4]
template.headerAd=temArray[13]
template.middleAD=temArray[14]
template.footerAD=temArray[15]
divStyle='FILTER:revealTrans(transition=12,duration=1);POSITION:absolute;'
adDescStyle='font-size:12px;color:#'+template.ggmszs+';'
adTitleStyle='font-size:12px;color:#'+template.ggbtzs+';text-decoration: underline;'
titleStyle='font-size:12px;color:#'+template.ggbtzs+';'
titleBackStyle='background:#'+template.ggydtds+';'
adBackStyle='background:#'+template.ggds+';padding:3;line-height:1.5;'
var returnStr=''
returnStr+=makeHeader(template)
returnStr+=makeTableContent(template)
return returnStr}
function makeHeader(sty){return '<table width='+parseInt(sty.size)+' border=0 cellpadding=3 cellspacing=0><tr style="'+titleBackStyle+'"><td style="'+titleStyle+'" nowrap>'+cc+'</td></tr></table>'}
function makeTableContent(sty){
var strTable='',counter=0,tableWidth=parseInt(sty.size),singleAdWidth=Math.round((tableWidth-6)/sty.col)
var strnsize=(singleAdWidth-(singleAdWidth%12))/12-1
strTable+='<div id=l1 onmouseover=s(1) onmouseout=s(0) style="'+divStyle+'">'
strTable+='<table style=\'TABLE-LAYOUT:fixed;word-break:break-all\' width='+tableWidth+' border=0 cellpadding=0 cellspacing=1 bgcolor=#'+sty.ggbks+'>'
for(var i=0;i<sty.row;i++){
strTable+='<tr style="'+adBackStyle+'">'
for(var j=0;j<sty.col;j++){
var onClickStr='onClick="go(\''+adLinks[counter].clickdata+'\',\''+encodeURIComponent(adLinks[counter].href)+'\');"'
var setStatusStr='onFocus="ss(\''+adLinks[counter].href+'\')" onMouseOver="ss(\''+adLinks[counter].href+'\')" onMouseOut="ss(\'\')"'
strTable+='<td height='+20*(parseInt(sty.descCount)+1)+' width='+singleAdWidth+' style="cursor:pointer;cursor:hand" '
if(adLinks[counter].keyword.length>1)
strTable+=' title='+adLinks[counter].keyword+' '
strTable+=setStatusStr+' valign=top>'
var callbackStr="",samuluStr=""
if(adLinks[counter].iscallback==true){
var width=376,height=400,topSize=window.screen.height/2-width/2,leftSize=window.screen.width/2-height/2
callbackStr='<div style="float:left;cursor:pointer;position:absolute;" title="Á¢¼´Ãâ·Ñºô½Ð'+adLinks[counter].title+'" onClick="window.open(\'http://www.narrowad.com/customer_ppc/callback/callback.jsp?adid='+adLinks[counter].adid+'&wid='+tixa_nad_websiteID+'&cid='+tixa_nad_channelID+'&data='+adLinks[counter].clickdata+'\',\'newwindow\', \'height='+height+', width='+width+', top='+topSize+', left='+leftSize+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no\');"><img src="http://media.narrowad.com/contextual/media/callback1.gif" border="0"/></div>'
strTable+=callbackStr
adLinks[counter].symbol="&nbsp; "}
if(adLinks[counter].title.substr(0,3)=='ÉµÄ¿Â¼'){
var width=300,height=350,topSize=window.screen.height/2-width/2,leftSize=window.screen.width/2-height/2
onClickStr='onClick="goSamulu(\''+adLinks[counter].clickdata+'\',\''+encodeURIComponent(adLinks[counter].href)+'\',\''+adLinks[counter].keyword+'\');"'
strTable+='<div style="overflow: hidden; padding-left: 1px; padding-right: 1px;" '+onClickStr+'><img src="http://media.narrowad.com/contextual/media/light.gif" height=15 border="0"><font style="font-size: 12px; color: rgb(0, 0, 255); text-decoration: underline;"><b><font color="red">'+adLinks[counter].symbol+strCut(adLinks[counter].title,strnsize-2)+'</font></b></font><br><font style="font-size: 12px; color: rgb(0, 0, 0); text-decoration: underline;">'+strCut(adLinks[counter].detail,strnsize*sty.descCount-1)+'</font></div>'}
else{
 if(adLinks[counter].adid==81832) strTable+='<div style="overflow:hidden; padding-left:1px;padding-right:1px;" '+onClickStr+'><font style="'+adTitleStyle+'"><b><font color=red>'+adLinks[counter].symbol+strCut(adLinks[counter].title,strnsize-2)+'</font></b></font><br><font style="'+adDescStyle+'">'+strCut(adLinks[counter].detail,strnsize*sty.descCount-1)+'</div></td>'
 else strTable+='<div style="overflow:hidden; padding-left:1px;padding-right:1px;" '+onClickStr+'><font style="'+adTitleStyle+'"><b>'+adLinks[counter].symbol+strCut(adLinks[counter].title,strnsize-2)+'</b></font><br><font style="'+adDescStyle+'">'+strCut(adLinks[counter].detail,strnsize*sty.descCount-1)+'</div></td>'   
}
counter++}
strTable+='</tr>'}
strTable+='</table></div>'
var blockHeight=((20*(parseInt(sty.descCount)+1)+1)*sty.row-1)
strTable+='<div id=l2 onmouseover=s(1) onmouseout=s(0) style="'+divStyle+'visibility:hidden"><table style="TABLE-LAYOUT:fixed;word-break:break-all" width='+sty.size+' border=0 cellpadding=0 cellspacing=1 bgcolor=#'+sty.ggbk+'><tr style="'+adBackStyle+'"><td height='+blockHeight+' style="cursor:pointer;"><div style="width:'+sty.size+'px;height:'+blockHeight+'px;overflow:hidden;"><center></center></div></td></tr></table></div>'
return strTable}