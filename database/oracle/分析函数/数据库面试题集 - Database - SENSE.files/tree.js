//Preloading images
var _PreloadedImages = new Array();

function PreloadImages()
{
	for (var i=0; i<PreloadImages.arguments.length; i++)
	{
		_PreloadedImages[_PreloadedImages.length] = new Image();
		_PreloadedImages[_PreloadedImages.length-1].src = PreloadImages.arguments[i];
	}
}

//CTreeNode
function CTreeNode(pTree, pParent, stName, stURL)
{
	this.pTree = pTree;
	this.pParent = pParent;
	this.stName = stName;
	this.stURL = stURL;
	this.bOpen = false;
	this.bFolder = true;
	this.nArrIndex = 0;
	this.Children = new Array;

	if (pParent)
		pParent.AddChild(this);
}

CTreeNode.prototype.AddChild = function(pNode)
{
	this.bFolder = true;
	this.Children[this.Children.length] = pNode;
}

CTreeNode.prototype.GetChildrenHTMLCode = function(nLevel)
{
	var st = '';

	for (var i=0; i<this.Children.length; i++)
		st += this.Children[i].GetHTMLCode(nLevel);

	return st;
}

CTreeNode.prototype.GetHTMLCode = function(nLevel)
{
	var st = '<div><table border="0" cellspacing="0" cellpadding="0">';
	st += '<tr><td valign="middle" nowrap>';

	//Shift spaces
	for (var i=0; i<nLevel; i++)
		st += '<img src="' + this.pTree.Files.imgEmpty + '" ' + this.pTree.Files.stIconProps + '>';

	//Sign or extra space
	if (this.bFolder)
	{
		st += '<a href="javascript:void(0)" onclick="javascript: ' + this.pTree.stName + '.OnNodeClick(' + this.nArrIndex + ',true);">';
		st += '<img id="sign' + this.pTree.stName + this.nArrIndex + '" src="';
		st += this.bOpen ? this.pTree.Files.imgMinus : this.pTree.Files.imgPlus;
		st += '" ' + this.pTree.Files.stIconProps + '></a>';
	}
	else
		st += '<img src="' + this.pTree.Files.imgEmpty + '" ' + this.pTree.Files.stIconProps + '>';

	//General link code
	var stA = '<a href="' + this.stURL + '" class="listtree"';
	if (this.pTree.stTarget)
		stA += ' target="' + this.pTree.stTarget + '"';
	if (this.bFolder)
		stA += ' onclick="javascript: ' + this.pTree.stName + '.OnNodeClick(' + this.nArrIndex + ',false);"';
	stA +='>';

	//Icon
	if (this.pTree.bShowIcons)
	{
		st += stA;
		st += '<img id="icon' + this.pTree.stName + this.nArrIndex + '" src="';
		st += (!this.bFolder) ? this.pTree.Files.imgNode : (this.bOpen ? this.pTree.Files.imgOpenFolder : this.pTree.Files.imgClosedFolder);
		st += '" ' + this.pTree.Files.stIconProps + '>';
		st += "</a>";
	}

        st += '</td><td valign="middle" nowrap>';

	//Text
	st += stA;
	st += this.stName;
	st += '</a>'

	st += '</td></tr></table></div>';

	//Children
	if (this.bFolder)
	{
		st += '<div id="div' + this.pTree.stName + this.nArrIndex + '" style="display:' + (this.bOpen ? 'block' : 'none') + ';">';
		st += this.GetChildrenHTMLCode(nLevel+1);
		st += '</div>';
	}

	return st;
}

CTreeNode.prototype.SetOpen = function(bOpen)
{
	document.getElementById('sign' + this.pTree.stName + this.nArrIndex).src = bOpen ? this.pTree.Files.imgMinus : this.pTree.Files.imgPlus;
	if (this.pTree.bShowIcons)
		document.getElementById('icon' + this.pTree.stName + this.nArrIndex).src =
			(!this.bFolder) ? this.pTree.Files.imgNode : (bOpen ? this.pTree.Files.imgOpenFolder : this.pTree.Files.imgClosedFolder);
	document.getElementById('div' + this.pTree.stName + this.nArrIndex).style.display = bOpen ? 'block' : 'none';

	this.bOpen = bOpen;
	

}

CTreeNode.prototype.CloseNeighbors = function()
{
	if (!this.pParent)
		return;

	for (var i=0; i<this.pParent.Children.length; i++)
		if ((this.pParent.Children[i] != this) && this.pParent.Children[i].bFolder && this.pParent.Children[i].bOpen)
		{
			this.pParent.Children[i].SetOpen(false);
			this.pParent.Children[i].CloseChildren();
		}
}

CTreeNode.prototype.CloseChildren = function()
{
	for (var i=0; i<this.Children.length; i++)
		if (this.Children[i].bFolder && this.Children[i].bOpen)
		{
			this.Children[i].SetOpen(false);
			this.Children[i].CloseChildren();
		}
}


//CTree
function CTree(stName)
{
	this.stName = stName;
	this.stTarget = null;
	this.bShowIcons = true;
	this.bAutoClose = true;

	this.Files =
	{
		imgClosedFolder: '../../templates/green/images/ClosedFolder.gif',
		imgOpenFolder: '../../templates/green/images/OpenFolder.gif',
		imgEmpty: '../../templates/green/images/TreeBlank.gif',
		imgNode: '../../templates/green/images/Page.gif',
		imgPlus: '../../templates/green/images/Plus.gif',
		imgMinus: '../../templates/green/images/Minus.gif',
		stIconProps: 'alt="" width="19" height="19" style="border: 0px;"'
	};

	PreloadImages(this.Files.imgOpenFolder, this.Files.imgMinus);

	this.NodeArr = new Array();
	this.NodeArr[0] = new CTreeNode(this, null);
}

CTree.prototype.AddNode = function(pParent, stName, stURL)
{
	if (!pParent)
		pParent = this.NodeArr[0];

	var pNode = new CTreeNode(this, pParent, stName, stURL);
	this.NodeArr[this.NodeArr.length] = pNode;
	pNode.nArrIndex = this.NodeArr.length-1;

	return pNode;
}

CTree.prototype.GetHTMLCode = function()
{
	return '<div>' + this.NodeArr[0].GetChildrenHTMLCode(0) + '</div>';
}

CTree.prototype.OnNodeClick = function(nArrIndex, bFromSign)
{
	var pNode = this.NodeArr[nArrIndex];
	if (!pNode.bOpen || bFromSign)
	{
		pNode.SetOpen(!pNode.bOpen);
		if (this.bAutoClose)
			pNode.CloseNeighbors();
	}
}