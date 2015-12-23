window.addEvent('domready',function(){
    var myAjax = '';
    var queryStr = '';
    var url = '/techzone/test_story_comment_submit.php';
    
    $('commentForm').addEvent('submit',function(e){
        //终止上次的ajax提交动作
        new Event(e).stop();

        if(Validate(this,'')){
            //表单验证通过后对表单做处理
            $('onStatChange').innerHTML = '<img src="http://icon.zdnet.com.cn/product/pic/b_product/spinner.gif">评论提交中，请稍等....';
            
            $('commentForm').send({
                onComplete: function(request){
                    $('onStatChange').innerHTML = '';
                    
                    if(request == "wrongcode"){
                        alert("验证码错误，请输入正确的验证码后重试！");
                        return false;
                    }
                    else if(request == "wrong_filter"){
                        alert("评论内容含有敏感词汇，请修改后重试！");
                        return false;
                    }
                    else{
                        //提交成功后对表单元素进行处理
                        
                        $('comment_list').innerHTML = request;
                        alert('评论提交成功！');
                        var rand = Math.random();
                        $('validateCodeImg').innerHTML = '<img src="/techzone/validateCode.php?rand="'+rand+' />';
                        switchTabs(0, $('requip-tab0').parentNode);
                        $('commentForm').reset();
                    }
                }
            });
        }
    });
});


