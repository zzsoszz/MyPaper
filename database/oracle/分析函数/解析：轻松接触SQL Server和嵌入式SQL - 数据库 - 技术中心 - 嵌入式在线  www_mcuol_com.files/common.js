<!--
//文章打印
function doPrint(){
if(window.print !=null){
window.print();
}else{alert('Your browser does not support this feature. Please select Print from the File menu.');}
}

//层的显示和隐藏
function getElement ( ElementID ) {
	return document.getElementById(ElementID);
}
function changeDiv ( ElementID ) {
	getElement(ElementID).style.display = getElement(ElementID).style.display == "none" ? "" : "none";
}

function openContent()
{
	var a = document.getElementById("contant");
	var b = document.getElementById("c_b");
	a.style.height = a.style.height == "auto" ? "150px" : "auto";
	b.style.display = b.style.display == "none" ? "" : "none";
}

function openContent1()
{
	var a = document.getElementById("contant1");
	var b = document.getElementById("c_b");
	a.style.height = a.style.height == "auto" ? "150px" : "auto";
	b.style.display = b.style.display == "none" ? "" : "none";
}
//-->