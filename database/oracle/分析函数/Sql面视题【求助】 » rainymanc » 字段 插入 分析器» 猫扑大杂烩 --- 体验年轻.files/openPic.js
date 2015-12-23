//如果图片不存在，则替换为新图片，
//如果图片不是链接的一部分，点击图片时弹出窗口
function picFun(){
	try{
		var imgObjs=document.images;
		for (var i=0; imgObjs.length ; i++){
			var curObj=imgObjs[i];
			if (curObj.complete==false){
				reloadPic(curObj);
			}else{
				if (!isImgALink(curObj)) {
					curObj.style.cursor="hand";
					curObj.onclick=openPic;
				}
			}
		}
	}catch (e){}
}
	
//重新装载图片，并且将原地址附在图片下方
function reloadPic(imgObj){
		try{
			if(imgObj.src.indexOf("mop.com")==-1){
				var imgIndex=Math.round(Math.random()*4);
				var sourceSrc=imgObj.src;
				var nod=document.createElement("SPAN");
				nod.innerHTML="<br>原图地址：<a target='_blank' href='"+sourceSrc+"'>"+sourceSrc+"</a>";
				//alert(imgObj.parentNode);
				if (imgObj.parentNode!=null && imgObj.parentNode.tagName=="A"){				
					imgObj.parentNode.insertAdjacentElement("afterEnd",nod);	
				}else{
					imgObj.insertAdjacentElement("afterEnd", nod);
				}
	        	imgObj.src="http://img.mop.com/images/error/X00"+imgIndex+".gif";	
				imgObj.style.width="162";
				imgObj.style.height="72";
			}else{
				imgObj.style.display='none';
			}
        }catch (e){}
}			
	
//点击探出新窗口	
function openPic(){		
		window.open(this.src, "","");
}

//图片是否有链接。
function isImgALink(imgObj){
	try{
		var parentObj=imgObj.parentNode;
		if (parentObj && parentObj.tagName=="A"){
			return true;	
		}
		if (imgObj.onclick!=null){
			return true;
		}
		return false;		
	}catch (e){}
}
		