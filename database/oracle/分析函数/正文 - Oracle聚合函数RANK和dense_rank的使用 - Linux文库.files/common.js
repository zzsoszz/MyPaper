$(document).ready(function() {
if ($("#button").is('.fold')) {
    $("#button").toggle(function(){
        $(".blocks .blocks_content").slideDown("slow");
        $(this).removeClass('fold').addClass('unfold');
        $(this).children("span:eq(0)").text('隐藏文档分类快捷跳转菜单');
    }, function(){
        $(".blocks .blocks_content").slideUp("slow");
        $(this).removeClass('unfold').addClass('fold');
        $(this).children("span:eq(0)").text('显示文档分类快捷跳转菜单');
    });
} else {
    $("#button").toggle(function(){
        $(".blocks .blocks_content").slideUp("slow");
        $(this).removeClass('unfold').addClass('fold');
        $(this).children("span:eq(0)").text('显示文档分类快捷跳转菜单');
    }, function(){
        $(".blocks .blocks_content").slideDown("slow");
        $(this).removeClass('fold').addClass('unfold');
        $(this).children("span:eq(0)").text('隐藏文档分类快捷跳转菜单');
    });
}

$("#button .ads a").click(function(e) {
	if ($.browser.msie) {
		e.cancelBubble = true;
	} else {
		e.stopPropagation();
	}
});
});
