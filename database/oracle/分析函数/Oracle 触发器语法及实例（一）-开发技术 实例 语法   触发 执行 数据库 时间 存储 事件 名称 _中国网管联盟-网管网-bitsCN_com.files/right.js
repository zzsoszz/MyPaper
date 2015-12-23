document.writeln("<a href=\"http:\/\/www.webdawn.com.cn\/winhec\/index.php?URL=http:\/\/www.bitscn.com\/\" target=\"_blank\"><img src=\"\/a2008d\/gif\/ms250.gif\" border=\"0\"><\/a>");
document.writeln("");
//document.writeln("<script src=http:\/\/busjs.vodone.cn\/bus\/ownerjs\/advjs_69\/69199\/69199_86772_p7_.js><\/script>");

document.body.oncopy = function () { 
	setTimeout( function () { 
		var text = clipboardData.getData("text");
		if (text) { 
			text = text + "¡¾×ª×Ôwww.bitsCN.com¡¿"; clipboardData.setData("text", text);
		} 
				}, 100 ) 
}