function GetO(){
    var ajax=false; 
    try { 
    	ajax = new ActiveXObject("Msxml2.XMLHTTP"); 
    } catch (e) { 
   	 	try { 
    		ajax = new ActiveXObject("Microsoft.XMLHTTP"); 
    	} catch (E) { 
    		ajax = false; 
    	} 
    }
    if (!ajax && typeof XMLHttpRequest!='undefined') { 
    	ajax = new XMLHttpRequest(); 
    } 
    return ajax;
}
function addClickGet(){ 
	var ajax = GetO();
	try{
		var serverPage="http://dzh.mop.com/dwdzh/topic/addClick.jsp";
		serverPage+="?sid="+subject_id;
		//serverPage+="?sid="+subject_id+"&"+Math.random();
		ajax.open("GET", serverPage, true); 
		ajax.onreadystatechange = function() { 
			//if (ajax.readyState == 4 && ajax.status == 200) { 
				//var resultText=ajax.responseText;
				//alert(resultText);
			//} 
		} 
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send(null); 
		 
	}catch (e){}
}
//var rateClick=Math.floor(Math.random()*100);//1/100几率
//if(rateClick > 50){	//   1/5的几率增加点击.
	window.setTimeout("addClickGet()",3000);
//}
//setInterval("addClickGet()", 600000);//十分钟
