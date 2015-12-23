// JavaScript Document
if(typeof(dclk_isDartRichMediaLoaded) == "undefined") {
	dclk_isDartRichMediaLoaded = true;
	function dclkWrite(str){
		if(dclk_shouldOverride) {
			dclk_original_documentWrite(str);
		}
		else{
			document.write(str);
		}
	}
	function dclkWriteln(str){
		if(dclk_shouldOverride) {
			dclk_original_documentWriteLn(str);
		}
		else{
			document.writeln(str);
		}
	}
	function dclk_isInternetExplorer() {
		return (navigator.appVersion.indexOf("MSIE") != -1 && navigator.userAgent.indexOf("Opera") < 0);
	}
	dclk_shouldOverride = dclk_isInternetExplorer();
	if(dclk_shouldOverride) {
		dclk_original_documentWrite = document.write;
		dclk_original_documentWriteLn = document.writeln;
		document.write = dclkWrite;
		document.writeln = dclkWriteln;
	}
}