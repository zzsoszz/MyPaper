$(document).ready(function() {
if ($("#button").is('.fold')) {
    $("#button").toggle(function(){
        $(".blocks .blocks_content").slideDown("slow");
        $(this).removeClass('fold').addClass('unfold');
        $(this).children("span:eq(0)").text('�����ĵ���������ת�˵�');
    }, function(){
        $(".blocks .blocks_content").slideUp("slow");
        $(this).removeClass('unfold').addClass('fold');
        $(this).children("span:eq(0)").text('��ʾ�ĵ���������ת�˵�');
    });
} else {
    $("#button").toggle(function(){
        $(".blocks .blocks_content").slideUp("slow");
        $(this).removeClass('unfold').addClass('fold');
        $(this).children("span:eq(0)").text('��ʾ�ĵ���������ת�˵�');
    }, function(){
        $(".blocks .blocks_content").slideDown("slow");
        $(this).removeClass('fold').addClass('unfold');
        $(this).children("span:eq(0)").text('�����ĵ���������ת�˵�');
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
