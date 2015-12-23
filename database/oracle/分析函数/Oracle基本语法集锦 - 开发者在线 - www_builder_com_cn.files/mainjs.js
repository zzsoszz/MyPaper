// JavaScript Document
function switchTabs(tabNum, parentId) {
	var tabs = document.getElementById(parentId.id).getElementsByTagName('li');
	var boxId = parentId.parentNode.id;
	for (var i = 0; i < tabs.length; i++) {
		var thisTab = tabs[i];
		if ((thisTab.id != '')) {
			document.getElementById(boxId+'-content'+i).style.display = 'none';
			if (i == tabNum) {
					thisTab.className = 'on';
				document.getElementById(boxId+'-content'+i).style.display = 'block';
			} else {
				thisTab.className = '';
			}
		}
	}
}