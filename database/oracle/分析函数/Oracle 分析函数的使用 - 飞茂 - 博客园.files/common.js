	function WarpClass(eID, tID, fID, ev)
	{
		var eObj = document.getElementById(eID);
		var tObj = document.getElementById(tID);
		var fObj = document.getElementById(fID);
		if (eObj && tObj)
		{
			if (!tObj.style.display || tObj.style.display == "block")
			{
				tObj.style.display = "none";
				eObj.className = "Warp";
				if (fObj)
				{
					fObj.style.display = "none";
				}
			}
			else
			{
				tObj.style.display = "block";
				eObj.className = "UnWarp";
				if (ev)
				{
					eval(ev);
				}
				if (fObj)
				{
					fObj.style.display = "block";
				}
			}
		}
	}

	function PutInWz() {
	    var width = 460;
	    var height = 353;
	    var leftVal = (screen.width - width) / 2;
	    var topVal = (screen.height - height) / 2;
	    var d = document;
	    var t = d.selection ? (d.selection.type != 'None' ? d.selection.createRange().text : '') : (d.getSelection ? d.getSelection() : '');
	    window.open('http://wz.cnblogs.com/create?t=' + escape(d.title) + '&u=' + escape(d.location.href) + '&c=' +
	     escape(t) + '&i=0', '_blank', 'width=' + width + ',height=' + height + ',toolbars=0,resizable=1,left=' + leftVal + ',top=' + topVal);
	}

	function GetMeta(ametaName){
	var METAs = document.getElementsByTagName("meta"); 
	for (var i=0; i<METAs.length; i++) { 
	if(METAs[i].name.toLowerCase()==ametaName){return (METAs[i].content);}
	};
	return "";
	}
