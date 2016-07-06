(function($) {
    var $suspension = $('.suspension');

    var suspensionProcessor = {
        timeHander : null,
        setPosition : function() {
            if (this.timeHander) {
                clearTimeout(this.timeHander);
            }

            this.timeHander = setTimeout(this.init, 0);
        },
        init : function() {
            var ch = document.documentElement.clientHeight;
            var st = document.documentElement.scrollTop || document.body.scrollTop;
            var ol = $('#report').offset().left;

            $suspension.css('margin-right', (-ol - 800) / 2).css('top', ch / 2 + st);
        }
    };

    suspensionProcessor.init();
    $suspension.css('display', 'block');

    $(window, document).bind('resize', function() {
        suspensionProcessor.setPosition();
    });

    $('.suspension .tp, .suspension .bt').mouseenter(function() {
        $(this).find('.a-wrap').stop().animate({
            'top' : -40
        }, 200);
    });

    $('.suspension .tp, .suspension .bt').mouseleave(function() {
        $(this).find('.a-wrap').stop().animate({
            'top' : 0
        }, 50);
    });

})(jQuery);