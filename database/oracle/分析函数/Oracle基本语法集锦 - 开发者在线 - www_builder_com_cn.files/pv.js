function pv_d(pv_subcatid){
	var now = new Date().getTime();
  	var datestr=escape(now*1000+Math.round(Math.random()*1000));
	    datestr+="befrombj";
  	var imgsrc='';		
	  	//增加产品线统计
   	

	imgsrc='http://pv.zdnet.com.cn/images/pvhit0001.gif?t='+datestr+'&subcat='+pv_subcatid+'&'+document.referrer;
	if(imgsrc!='') document.write('<img border=0 width=1 height=1 src="'+imgsrc+'">');
}

if(typeof(pv_subcatid)=="undefined")
  		var pv_subcatid=0;	 

pv_d(pv_subcatid);
document.write("<iframe src='http://showpv.zdnet.com.cn/files/adshow.php' height='0' width='0' scrolling='no'></iframe>");
