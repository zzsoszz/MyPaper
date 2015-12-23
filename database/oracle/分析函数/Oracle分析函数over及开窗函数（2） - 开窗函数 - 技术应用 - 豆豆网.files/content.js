/* 广告 */
var tl = document.getElementById('tech_content_tl');
tl.innerHTML = '<a href="http://www.cnspeed.com/" title="数字引擎" target="_blank"><img src="http://ad.ddvip.com/2013_760X60.gif" width="760px" height="60px" border="0px"/></a><a href="http://www.1stchina.com/"><img src="http://ad.ddvip.com/1stchina.gif" alt="" border="0" /></a><a href="http://www.163ns.com/"><img src="http://ad.ddvip.com/163ns.gif" alt="" border="0" /></a><a href="http://www.linkwww.com/" target="_blank"><img src="http://down.ddvip.com/images/ad/760-609.gif" border="0" /></a><a href="http://www.itrenzheng.com/" target="_blank"><img src="http://ad.ddvip.com/itrenzheng.gif" width="760px" height="60px" border="0px"/></a><a href="http://www.enkj.com/" target="_blank"><img src="http://ad.ddvip.com/enkj.gif" alt="" border="0" /></a>';
var ad_580x60 = document.getElementById('top_ad_580x60');
ad_580x60.innerHTML = '<a href="http://ip345.com/zuyong" target="_blank"><img src="http://ad.ddvip.com/ip345.gif" border="0" /></a>';
//固定漂浮广告

			var adLeftSrc = "http://ad.ddvip.com/no1dns.gif"

			var adLeftFlash = "" //如果为FLASH，就填写FLASH

			var adLeftHref = "http://www.no1dns.com/style/info/hezu.asp"

			var adLeftWidth = 100

			var adLeftHeight = 100

			var adRightSrc = ""
			var adRight_bSrc = ""

			var adRightFlash = ""

			var adRightHref = ""
			var adRight_bHref = ""

			var adRightWidth = 100

			var adRightHeight = 100

			var marginTop = 10

			var marginLeft = 1

			var navUserAgent = navigator.userAgent

			function load(){

				judge();

				move();

			}

			function move() {

				judge();

				setTimeout("move();",80)

			}

			function judge(){

				if (navUserAgent.indexOf("Firefox") >= 0 || navUserAgent.indexOf("Opera") >= 0) {

					if (adLeftSrc != "") {document.getElementById("adLeftFloat").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + ((document.body.clientHeight > document.documentElement.clientHeight)?document.documentElement.clientHeight:document.body.clientHeight) - adLeftHeight - marginTop + 'px';}

					if (adRightSrc != "") {

						document.getElementById("adRightFloat").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + ((document.body.clientHeight > document.documentElement.clientHeight)?document.documentElement.clientHeight:document.body.clientHeight) - adRightHeight - marginTop + 'px';

						document.getElementById("adRightFloat").style.left = ((document.body.clientWidth > document.documentElement.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth) - adRightWidth - marginLeft + 'px';

					} 

				}

				else{

					if (adLeftSrc != "") {document.getElementById("adLeftFloat").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + ((document.documentElement.clientHeight == 0)?document.body.clientHeight:document.documentElement.clientHeight) - adLeftHeight - marginTop + 'px';}

					if (adRightSrc != "") {

						//document.getElementById("adRightFloat").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + ((document.documentElement.clientHeight == 0 )?document.body.clientHeight:document.documentElement.clientHeight) - adRightHeight - 110 - marginTop + 'px';
						document.getElementById("adRightFloat").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + ((document.documentElement.clientHeight == 0 )?document.body.clientHeight:document.documentElement.clientHeight) - adRightHeight - marginTop + 'px';

						document.getElementById("adRightFloat").style.left = ((document.documentElement.clientWidth == 0)?document.body.clientWidth:document.documentElement.clientWidth) - adRightWidth - marginLeft + 'px';

					}

				}

				if (adLeftSrc != "") {document.getElementById("adLeftFloat").style.left = marginLeft + 'px';}

			}

			if (adLeftSrc != "") {

				if (adLeftFlash == "flash") {

					document.write("<div id=\"adLeftFloat\" style=\"position: absolute;width:" + adLeftWidth + ";\"><a href=\"" + adLeftHref +"\"><embed src=\"" + adLeftSrc + "\" quality=\"high\"  width=\"" + adLeftWidth + "\" height=\"" + adLeftHeight + "\" type=\"application/x-shockwave-flash\"></embed></a></div>");

				}

				else{

					document.write("<div id=\"adLeftFloat\" style=\"position: absolute;width:" + adLeftWidth + ";\"><a href=\"" + adLeftHref +"\" target=\"_blank\"><img src=\"" + adLeftSrc + "\"  width=\"" + adLeftWidth + "\" height=\"" + adLeftHeight + "\"  border=\"0\" \></a></div>");

				}

			}

			if (adRightSrc != "") {

				if (adRightFlash == "flash") {

					document.write("<div id=\"adRightFloat\" style=\"position: absolute;width:" + adRightWidth + ";\"><a href=\"" + adRightHref +"\"><embed src=\"" + adRightSrc + "\" quality=\"high\"  width=\"" + adLeftWidth + "\" height=\"" + adRightHeight + "\" type=\"application/x-shockwave-flash\"></a></embed></div>");

				}

				else{

					//document.write("<div id=\"adRightFloat\" style=\"position: absolute;width:" + adRightWidth + ";\"><a href=\"" + adRightHref +"\" target=\"_blank\"><img src=\"" + adRightSrc + "\"   width=\"" + adLeftWidth + "\" height=\"" + adRightHeight + "\"  border=\"0\"  \></a><br /><br /><a href=\"" + adRight_bHref +"\" target=\"_blank\"><img src=\"" + adRight_bSrc + "\"   width=\"" + adLeftWidth + "\" height=\"" + adRightHeight + "\"  border=\"0\"  \></a></div>");
					document.write("<div id=\"adRightFloat\" style=\"position: absolute;width:" + adRightWidth + ";\"><a href=\"" + adRightHref +"\" target=\"_blank\"><img src=\"" + adRightSrc + "\"   width=\"" + adLeftWidth + "\" height=\"" + adRightHeight + "\"  border=\"0\"  \></a></div>");

				}

			}

			load();
document.write('<script src="http://www230.clickeye.cn/common/clickeye.js"></script>');
document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/js.tongji.cn.yahoo.com\/11826\/ystat.js\"><\/script><noscript><a href=\"http:\/\/tongji.cn.yahoo.com\"><img src=\"http:\/\/img.tongji.cn.yahoo.com\/11826\/ystat.gif\"\/><\/a><\/noscript>");