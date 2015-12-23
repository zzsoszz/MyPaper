function turnswitch(text)
{
	if(document.getElementById(text).style.display == "none")
		document.getElementById(text).style.display = "block";
	else
		document.getElementById(text).style.display = "none";
	createCookie(text, document.getElementById(text).style.display, 365);

}
function turnon(text)
{
		if (document.getElementById(text)) document.getElementById(text).style.display = "block";
}
function turnoff(text)
{
		if (document.getElementById(text)) document.getElementById(text).style.display = "none";
}

function turnonall()
{
	turnon('archives');
	turnon('recentposts');
	turnon('recentcomments');
	turnon('topreadposts');
	turnon('topcommentposts');
	turnon('blog_statistics');
	turnon('mylinks');
	turnon('recentsiteposts');
	
}
function turnoffall()
{
	turnoff('archives');
	turnoff('recentposts');
	turnoff('recentcomments');
	turnoff('topreadposts');
	turnoff('topcommentposts');
	turnoff('blog_statistics');
	turnoff('mylinks');
	turnoff('recentsiteposts');
}
