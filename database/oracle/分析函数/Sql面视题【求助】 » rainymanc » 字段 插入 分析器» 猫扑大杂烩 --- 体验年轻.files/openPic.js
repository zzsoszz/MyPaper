//���ͼƬ�����ڣ����滻Ϊ��ͼƬ��
//���ͼƬ�������ӵ�һ���֣����ͼƬʱ��������
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
	
//����װ��ͼƬ�����ҽ�ԭ��ַ����ͼƬ�·�
function reloadPic(imgObj){
		try{
			if(imgObj.src.indexOf("mop.com")==-1){
				var imgIndex=Math.round(Math.random()*4);
				var sourceSrc=imgObj.src;
				var nod=document.createElement("SPAN");
				nod.innerHTML="<br>ԭͼ��ַ��<a target='_blank' href='"+sourceSrc+"'>"+sourceSrc+"</a>";
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
	
//���̽���´���	
function openPic(){		
		window.open(this.src, "","");
}

//ͼƬ�Ƿ������ӡ�
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
		