window.addEvent('domready',function(){
    var myAjax = '';
    var queryStr = '';
    var url = '/techzone/test_story_comment_submit.php';
    
    $('commentForm').addEvent('submit',function(e){
        //��ֹ�ϴε�ajax�ύ����
        new Event(e).stop();

        if(Validate(this,'')){
            //����֤ͨ����Ա�������
            $('onStatChange').innerHTML = '<img src="http://icon.zdnet.com.cn/product/pic/b_product/spinner.gif">�����ύ�У����Ե�....';
            
            $('commentForm').send({
                onComplete: function(request){
                    $('onStatChange').innerHTML = '';
                    
                    if(request == "wrongcode"){
                        alert("��֤�������������ȷ����֤������ԣ�");
                        return false;
                    }
                    else if(request == "wrong_filter"){
                        alert("�������ݺ������дʻ㣬���޸ĺ����ԣ�");
                        return false;
                    }
                    else{
                        //�ύ�ɹ���Ա�Ԫ�ؽ��д���
                        
                        $('comment_list').innerHTML = request;
                        alert('�����ύ�ɹ���');
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


