$(document).ready(function() {

$(".side_content >ul").tabs({event:'mouseover'});

// �Ƴ����һ�����ӵ��±߿�
// �滻������ʹ��CSS3ѡ�������������ֶ���������Ӽ�������
$("#menu .menu_top ul ul a:last").css({
  borderBottom:"none"
});

$("#menu .menu_top").bind('mouseover', function() {
  //$(this).children('ul').addClass('jquery_show');
  //$(this).children('ul').show('slow');
  $(this).children('ul').show();
  $(this).children('ul').fadeTo('slow', 0.77);
});
$('#menu .menu_top').bind('mouseout', function() {
  //$(this).children('ul').fadeOut('slow');
  //$(this).children('ul').hide('slow');
  $(this).children('ul').hide();
});

// �������ݳ����趨,ʹ�䲻С�ڱ������ݵĳ���ֵ
var $side_content_height = $('.side_content').height();
var $current_article_height = $('.article').height();
if ($current_article_height < $side_content_height) {
  $('.article').height($side_content_height);
}

});