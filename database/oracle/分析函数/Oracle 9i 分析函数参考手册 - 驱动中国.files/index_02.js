document.writeln("<script>");
document.writeln("var adarray = new Array()");
document.writeln("adarray[0]= \"..\/..\/..\/..\/..\/..\/..\/..\/..\/..\/ad\/img\/gps_qd.swf\"");
document.writeln("adarray[1]= \"..\/..\/..\/..\/..\/..\/..\/..\/..\/..\/..\/..\/ad\/img\/gps_qd.swf\"");
document.writeln("adarray[2]= \"..\/..\/..\/..\/..\/..\/..\/..\/..\/..\/ad\/img\/gps_qd.swf\"");
document.writeln("var swfwidth=960;");
document.writeln("var swfheight=90;");
document.writeln("var rndNum = Math.round(Math.random() * (adarray.length-1));");
document.writeln("htmlcode = \'<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http:\/\/download.macromedia.com\/pub\/shockwave\/cabs\/flash\/swflash.cab#version=5,0,0,0\" width=\"\'+swfwidth+\'\" height=\"\'+swfheight+\'\"><param name=movie value=\"\'+adarray[rndNum]+\'\"><PARAM NAME=wmode VALUE=opaque><param name=quality value=high><embed src=\"\'+adarray[rndNum]+\'\" quality=high pluginspage=\"http:\/\/www.macromedia.com\/shockwave\/download\/index.cgi?P1_Prod_Version=ShockwaveFlash\" type=\"application\/x-shockwave-flash\" width=\"\'+swfwidth+\'\" height=\"\'+swfheight+\'\"><\/embed> <\/object>\';");
document.writeln("document.write(htmlcode);");
document.writeln("<\/script>")