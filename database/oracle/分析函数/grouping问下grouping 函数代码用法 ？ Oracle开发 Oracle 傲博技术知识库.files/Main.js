
function myAlert(data,callback)
{
    var sid="<div align='center' class='alert'><h3>" +  data+ "</h3><input type='button'  class='alertbtn'  value='确定' id='btnYes'></div>";
    $.QstBlock(sid,{
        border:"1px solid #333",
        backgroundColor:"#336699",
        color:"#fff"
    });
    if (callback != undefined)
    {
        $("#btnYes").click(callback);
        
    }else
    {
         $("#btnYes").click(function(){qstUnblock()});
    }
}
function myConfirm(data,callback)
{
    var sid="<div align='center' class='alert'><h3>" +  data+ "</h3><input type='button' value='确定' id='btnSure'  class='alertbtn' ><input type='button' class='alertbtn' value='取消'  onclick='qstUnblock();'/></div>";
    $.QstBlock(sid,{
        border:"1px solid #333",
        backgroundColor:"#336699",
        color:"#fff"
    });
    if (callback != undefined)
    {
        $("#btnSure").click(callback);
    }else
    {
         $("#btnSure").click(function(){qstUnblock()});
    }
}
function myLoading(str){
    $.QstBlock("<h3>"+ str + "</h3>",{
        border:"1px solid #333",
        backgroundColor:"#336699",
        color:"#fff"
    });
}
function toggleList(obj)
{
   var o= $("div.box2");
   if (o.css("display") =="none")
   {
    o.fadeIn();
    $(obj).html("简洁模式");
   }else
   {
    o.fadeOut();
    $(obj).html("摘要模式");
   }
}
function saveComment()
{
    var uName = $("#txtUserName").val();
    var cnt = $("#txtContent").val();
    var artID = $("#txtArticleID").val();
    if (uName.length <=0)
    {
        myAlert("请填写您的昵称");
        return false;
    }
    if (cnt.length <=1)
    {
        myAlert("评论内容不能小于2个字符");
        return false;
    }
    myLoading("正在提交评论，请稍后...");
    $.ajax({
        url:"/Ajax.aspx?Action=CommentSave&ArticleID="+artID+"&s="+Math.random(),
        type:"POST",
        data:{
            nickName:uName,
            content:cnt
        },
        success:function(s){
            if (s == "818384")
            {
                myAlert("发布评论成功",function(){
                    window.location.reload();
                  
                });
            }
            else
            {
                myAlert(s);
            }
        },
        error:function(){
            myAlert("添加评论失败，请重试");
            return;
        }
    });
    return false;
}
function dig(id){
    myLoading("正在处理请求....");
    $.ajax({
        url:"/Ajax.aspx?Action=Dig&ArticleID="+id+"&s="+ Math.random(),
        success:function(data)
        {
            if (data == "818384")
            {
                myAlert("提交成功，感谢您的支持",function(){
                var o= $("#digg" + id +" div.diggnum");
                var t = parseInt(o.html());
                t+=1;
                o.html(t);
                qstUnblock();
                });
                
                
            }else
            {
                myAlert(data);
            }
        },
        error:function()
        {
            myAlert("失败，请重试");
            return;
        }
    });
    
    
}
function copy(obj)
{
    if (!obj){
       obj = document.getElementById("txtArtUrl");
    }
    try{
    var v= "推荐一篇文章给你:\n" + obj.value + "\n";
    v += $("#txtArtTitle").val();
    clipboardData.setData('text',v);
    alert("已经成功将网址复制到您的剪切板，请将网址粘贴给您的好友"); 
    }
    catch(e){}
}
//function s(key)
//{
   
   // var url="http://www.baidu.com/s?wd=" + escape(key + " site:aub.org.cn");
   // window.open(url);
    //document.write("<a href='" + url + "' target='_blank'>查看更多关于“<span style='color:#ff6600; font-size:14px'>" + key+"</span>”的内容</a>");
    
//}
function s(key,tit)
{     
    var url="http://www.baidu.com/s?wd=" + key;
    document.write("<a href='" + url + "' target='_blank'>查看更多关于“<span style='color:#ff6600; font-size:14px'>" + tit+"</span>”的内容</a>");
}