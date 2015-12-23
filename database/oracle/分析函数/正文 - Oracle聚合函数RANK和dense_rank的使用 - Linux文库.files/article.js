$(document).ready(function() {

$(".side_content >ul").tabs({event:'mouseover'});

// 移除最后一个链接的下边框
// 替换方法：使用CSS3选择器，或者是手动给这个链接加上类名
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

// 正文内容长度设定,使其不小于边栏内容的长度值
var $side_content_height = $('.side_content').height();
var $current_article_height = $('.article').height();
if ($current_article_height < $side_content_height) {
  $('.article').height($side_content_height);
}

});