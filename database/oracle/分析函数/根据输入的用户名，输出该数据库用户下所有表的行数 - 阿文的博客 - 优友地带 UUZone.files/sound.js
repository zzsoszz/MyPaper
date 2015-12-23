
var soundManager = null;
function OnSoundApiLoad( sndMgr )
{
	soundManager = sndMgr;
}
function playSound( id )
{
	if( soundManager )
	{
		soundManager.play( id , 1 , true );
	}
}
function InitSoundApi()
{
	if( Browser.browser == BrowserType.IE && document.readyState != "complete" )
	{
		setTimeout( InitSoundApi , 100 );
		return;
	}
	var div = document.createElement("div");
	div.style.width = "1px";
	div.style.height = "1px";
	div.style.overflow = "hidden";
	div.innerHTML = "<iframe src='/html/sound/soundapi.html'/>";
	document.documentElement.appendChild(div);
}
InitSoundApi();


	
