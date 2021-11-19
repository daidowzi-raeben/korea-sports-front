$(document).ready(function () {


    // 메인 슬라이드 
    var m_slide_idx = $('.main-slider ul li').length;
    var m_slide_interval = setInterval(function () {
        m_itv_slide('right');
    }, 5000);
    var m_slide_count = 0;
    var m_moving = $('.main-slider ul');
    var m_slide_width = $('.main-slider ul li').width();
    var m_slide_event = false;

    $(window).on('resize', function () {
        m_slide_width = $('.main-slider ul li').width();
        m_itv_slide('right');

    });


    function m_itv_slide(event) {
        if (event == 'right') {
            if (m_slide_count < m_slide_idx - 1) {
                m_slide_count++;
                m_slide_r();

            } else {
                m_slide_count = 0;
                m_slide_r();
            }
        } else if (event == 'left') {
            if (m_slide_count > 0) {
                m_slide_count--;
                m_slide_l();
            } else {
                m_slide_count = m_slide_idx - 1;
                m_slide_l();
            }
        }
    }



    $('.itr-btn__slide .arrow-right').on('click', function () {
        if (m_slide_event == false) {
            m_slide_event = true;
            clearInterval(m_slide_interval);
            $('#dot').addClass('pause');
            $('.main .circle').removeClass('active');
            m_itv_slide('right');
            m_s_event = false;
        } else {
            return false;
        }
    });

    $('.itr-btn__slide .arrow-left').on('click', function () {
        clearInterval(m_slide_interval);
        if (m_slide_event == false) {
            m_slide_event = true;
            clearInterval(m_slide_interval);
            $('#dot').addClass('pause');
            $('.main .circle').removeClass('active');
            m_itv_slide('left');
            m_s_event = false;

        } else {
            return false;
        }
    });

    function m_arrow_left() {
        if (m_slide_count == 0) {
            $('.main .arrow-left').removeClass('active');
        } else {
            $('.main .arrow-left').addClass('active');

        }

    }

    function m_slide_r() {
        m_arrow_left();
        $(m_moving).stop().animate({
            left: -m_slide_width * 2
        }, {
            duration: 300,
            complete: function () {
                $(m_moving).css({
                    "left": -m_slide_width * 1
                });

                $(m_moving).append($(m_moving).children()[0]);
                $('.page').text((m_slide_count + 1) + ' / 4');
                m_slide_event = false;
            }
        });
    }

    function m_slide_l() {
        m_arrow_left();
        $(m_moving).stop().animate({
            left: 0
        }, {
            duration: 300,
            complete: function () {
                $(m_moving).css({
                    "left": -m_slide_width * 1
                });
                $(m_moving).prepend($(m_moving).children()[m_slide_idx - 1]);
                $('.page').text((m_slide_count + 1) + ' / 4');
                m_slide_event = false;
            }
        });
    }

    var m_s_event = true;

    $('.circle-front,#dot').on('click', function () {
        if (m_s_event == true) {
            $('.main .circle').removeClass('active');
            clearInterval(m_slide_interval);
            $('#dot').addClass('pause');
            m_s_event = false;
        } else {
            $('.main .circle').addClass('active');
            m_slide_interval = setInterval(function () {
                m_itv_slide('right');
            }, 5000);
            m_s_event = true;
            $('#dot').removeClass('pause');

        }

    });



    // S피플 슬라이드
    var s_slide_count = 0;
    var s_slide_idx = $('.itv-banner ul li').length;
    var s_moving = $('.itv-banner__info--slide');
    var p_thum = $('.p-photo');
    var p_idc = $('.itv-banner__idc span');
    var s_slide_interval = setInterval(itv_slide, 4000);
    var s_width = 1200;

    function itv_slide() {
        if (s_slide_count < s_slide_idx - 1) {
            s_slide_count++;
            slide();
            idc_class();
        } else {
            s_slide_count = 0;
            slide();
            idc_class();
        }
    }

    function idc_class() {
        $(p_thum).removeClass('active');
        $(p_thum[s_slide_count]).addClass('active');
        $(p_idc).removeClass('active');
        $(p_idc[s_slide_count]).addClass('active');
        $('.p-name').removeClass('active');
        $('.itv-banner ul li').eq(s_slide_count).find('.p-name').addClass('active');

    }

    function slide() {
        $(s_moving).stop().animate({
            left: -s_width * 2
        }, {
            duration: 1000,
            complete: function () {
                $(s_moving).css({
                    "left": -s_width * 1
                });
                $(s_moving).append($(s_moving).children()[0]);
            }
        });
    }

    $('.btn-pp').click(function () {
        $(this).toggleClass('play');
        if ($(this).hasClass('play')) {
            s_slide_interval = setInterval(itv_slide, 2000);
        } else {
            clearInterval(s_slide_interval);
            console.log(s_slide_count);
        }
    });

    // ** S피플 슬라이드 썸네일, 버튼 클릭시 슬라이드 전환 
    var point_position;
    var list_length = $('.itv-banner__info--slide').children().length;

    $(".itv-banner li,.itv-banner__idc span").click(function () {
        var idx = $(this).index();
        click_idx(idx);
        $('.p-name').removeClass('active');
        $('.itv-banner ul li').eq(idx).find('.p-name').addClass('active');
        clearInterval(s_slide_interval);
        $('.btn-pp').removeClass('play');
    });

    function click_idx(idx) {
        if (s_slide_count < idx) {
            // 현재 idx보다 오른쪽 위치 클릭
            point_position = Math.abs((s_slide_count - idx));
            // 현재 itv로 돌아가는 idx 값과 클릭한 idx값을 빼서 절대값 구해주기

            for (var i = 0; i < point_position; i++) {
                $(s_moving).animate({
                    left: -1200 * 2
                }, {
                    duration: 100,
                    complete: function () {
                        // 구한 절대값만큼 for문 돌려 요소 append 해주기  
                        $(s_moving).append($(s_moving).children()[0]);
                        $(s_moving).css({
                            "left": -1200 * 1
                        });
                    }
                });

            }
            s_slide_count = idx;
            idc_class();
        }

        if (s_slide_count > idx) {
            // 현재 idx보다 왼쪽 위치 클릭
            point_position = Math.abs((s_slide_count - idx));
            for (var i = 0; i < point_position; i++) {
                $(s_moving).animate({
                    left: 0
                }, {
                    duration: 100,
                    complete: function () {
                        $(s_moving).prepend($(s_moving).children()[list_length - 1]);
                        $(s_moving).css({
                            "left": -1200
                        });
                    }
                });
            }
            s_slide_count = idx;
            idc_class();
        }
    }





    // 우측 fixed 메뉴 인터랙션
    var indicator_li = $('.fixed-right ul li');
    var section = $('.section');
    var count = 0;
    var color = ['#fff', '#90a4b5', '#949494', '#8fb3d5', '#ababab', '#ababab'];
    var ssp_color = ['#979797', '#90a4b5', '#949494', '#8fb3d5', '#ababab', '#ababab'];
    
    $(indicator_li[count]).addClass('on').siblings().removeClass('on');
    $('.fixed-right ul li').css('color', color[count]);
    $('.ssp-text').css('color', ssp_color[count]);
    
    indicator_li.each(function () {
        $(this).click(function () {
            var idx = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $('html,body').stop().animate({
                scrollTop: $(section[idx]).offset().top
            }, 1000);
            $('.fixed-right ul li').css('color', color[idx]);
            fixed_top_chg();
        });
    });

    $(window).on('scroll', function () {
        var st = $(window).scrollTop();
        offset_go(st);
        fixed_top_chg(st);

    });

    //  스크롤에 반응하는 인터랙션
    function offset_go(st) {
        section.each(function () {
            var idx = $(this).index();
            if (st - $(window).height() / 3 > $(this).offset().top) {
                count = idx;
                var n_idx = count - 1;
                fixed_side_chg(n_idx);
            } else if (st < $(window).height() / 2) {
                count = 0;
                var n_idx = count;
                fixed_side_chg(n_idx);

            }
        });
    }

    function fixed_side_chg(n_idx) {
        $(indicator_li[n_idx]).addClass('on').siblings().removeClass('on');
        $('.fixed-right ul li').css('color', color[n_idx]);
        $('.ssp-text').css('color', ssp_color[n_idx]);
    }

    function fixed_top_chg(st) {
        if (st > $(section[1]).offset().top - 50) {
            $('.fixed-top').addClass('active');
            if (st > $(section[3]).offset().top - 50) {
                $('.fixed-top').removeClass('active');
            }
            if (st > $(section[4]).offset().top - 50) {
                $('.fixed-top').addClass('active');
            }
        } else {
            $('.fixed-top').removeClass('active');
        }
    }

    //  S 미디어
    var s_count = 1;
    var s_play = $('.media ul li');
    var l_r = ['22px', 0, '-22px'];
    // var video = $('.media ul li').find('video');
    $('.inner-idt__left').on('click', function () {
        $('.media ul li').find('.v-wrap__thum').show();
        if (s_count > 0) {
            s_count--;
            s_play_sizing(s_count);
        } else if (s_count == 0) {
            s_count = 2;
            s_play_sizing(s_count);
        }
    });

    $('.inner-idt__right').on('click', function () {
        $('.media ul li').find('.v-wrap__thum').show();
        if (s_count < 2) {
            s_count++;
            s_play_sizing(s_count);
        } else if (s_count == 2) {
            s_count = 0;
            s_play_sizing(s_count);
        }
    });

    $(s_play).each(function () {
        $(this).click(function () {
            s_count = $(this).index();
            s_play_sizing(s_count);

        });
    });

    $('.btn-play').click(function () {
        if ($(this).parents('li').hasClass('active')) {
            alert('준비중입니다.');
        }
    });

    function s_play_sizing(s_count) {
        $(s_play).removeClass('active');
        $(s_play[s_count]).addClass('active');
        $(s_play[1]).find('.v-wrap').css('left', l_r[s_count]);
        $(s_play).find('dl').hide();
        $(s_play[s_count]).find('dl').delay(300).fadeIn();
    }
});