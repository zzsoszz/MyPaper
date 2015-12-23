var Q = "http://counter.sina.com.cn/pvcounter?pid=";

function request_pvcounter(){
	var request_url = Q;
	var elem = document.getElementsByTagName("span");
	for( i=0; i<elem.length; i++ ) {
		var att = elem[i].getAttribute("name");
		if (att == "pvcounter") {
			var pid = elem[i].getAttribute("pid");
			var key = elem[i].getAttribute("key");
			var url = elem[i].getAttribute("url");
			var expara = elem[i].getAttribute("expara");
			if (pid==null || pid=="" || key==null || key=="" || url==null || url=="")
				return false;
			request_url += encodeURIComponent(pid);
			request_url += ("&key=" + encodeURIComponent(key));
			request_url += ("&url=" + encodeURIComponent(url));
			if (expara!=null && expara!="")
				request_url += ("&expara=" + encodeURIComponent(expara));
			break;
		}
	}

	if ( navigator.userAgent.toLowerCase().indexOf('msie') >= 0 ) {
		document.getElementById("PVCOUNTER_FORIE").src = request_url; 
	} else {
		var js = document.createElement("script"); 
		js.setAttribute("type", "text/javascript");
		js.setAttribute("src", request_url);
		document.body.insertBefore(js, null);
	}
}

request_pvcounter();
