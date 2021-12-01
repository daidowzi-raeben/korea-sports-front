$(document).ready(function () {

    // 미디어 레이어 팝업
    var media_li = $('.container.media .img-box');
    media_li.click(function () {
        $('.layer-media').fadeIn();
    });

    $('.layer-media .btn-close,.layer-media .dim').click(function () {
        $('.layer-media').hide();
    });

    // 서브메뉴

    var navList = $('.nav-sub__item');

    navList.on('mouseover', function () {
        navList.removeClass('show');
        $(this).addClass('show');
        $('.nav-sub__wrap').hide();
        $(this).children('.nav-sub__wrap').show();
    })

    $('.nav-sub').on('mouseleave', function () {
        navList.removeClass('show');
        $('.nav-sub__wrap').hide();

    })

    // dropdown click





    //조건선택 탭 열기

    var eventTab = $('.midSelect-con__item .dropdown:not(.dropdown__non)');
    var eventItem = $('.option li');

    eventTab.click(function () {
        if ($(this).parents('.midSelect-con__item').hasClass('notData')) {
            alert('이전 조건을 선택하세요')
            return false;
        }

        if ($(this).hasClass('is_active')) {
            $(this).removeClass('is_active');
            $(this).siblings('.option').hide();
            return
        }
        eventTab.removeClass('is_active');
        $('.option').hide();
        $(this).addClass('is_active');
        $(this).siblings('.option').show();

    });



    // console.log($('.con-event label').length);

    // $('.con-event label').html();
    // console.log($('.con-event label').html())

    // var labelValue = ''
    // $('.con-event label').each(function(i,a){
    //     if(a == '전체') {
    //         labelValue += '<li class="event--all>'+$('.con-event label').eq(i).text()+'</li>';
    //     } else {
    //         labelValue += '<li>'+$('.con-event label').eq(i).text()+'</li>';
    //     }
    // });
    // $('.con-event .event').append(labelValue);
    // console.log();



    // fn_dataLoad();
    // function fn_dataLoad(el) {
    //     if(el) {
    //         $('.'+el).append();
    //     } else {
    //         //전체데이터를 토글에 어팬드
    //     }
    // }

    // 조건선택 all

    $('.option li').click(function () {
        if ($(this).siblings('.event--all').hasClass('is_active')) {
            $(this).siblings('.event--all').removeClass('is_active');
        }
        $(this).toggleClass('is_active');
    });

    $('.event--all').click(function () {
        $(this).siblings('li').removeClass('is_active');

    });

    // 선택 초기화 버튼

    $('.option .btn-reset').click(function () {
        $(this).parents('.option').find('li').removeClass('is_active');
    });

    $('.select-con--item input[type=radio]').click(function () {
        $('.select-con--item input[type=radio]').next('label').removeClass('is_active');
        $('.select-con--item input[type=radio]').attr('checked', false);
        $(this).attr('checked', true);
        $(this).next('label').addClass('is_active');
    });
    $('.option .btn-submit').click(function () {
        $(this).parents('.midSelect-con__item').find('label').removeClass('is_active');
        $(this).parents('.option').find('li').each(function (key, val) {
            if ($(this).hasClass('is_active') == true) {
                var d = $(this).data('for');
                $(this).parents('li.midSelect-con__item').find('.select-con--item').each(function (key2, val2) {
                    var c = $(this).find('input').prop('id');

                    if (c === d) {
                        $(this).find('label').addClass('is_active')
                    }
                })
            }
            $(this).removeClass('is_active')

        })

        $(this).parents('.option').hide();
        $('.dropdown').removeClass('is_active');
    });






    // 스크롤 이벤트 --

    $('ul.tabList li').on('click', function () {
        var idx = $(this).index()
        st = $('ul.tabList').eq(idx).offset().top
        wst = $(window).scrollTop();
        $(window).scrollTop(st);
    });

    $(window).on('scroll', function () {

        var height = $(this).scrollTop();
        var sideBar = $('.scrollSide .double--right');



        if (height >= 287) {
            sideBar.addClass('is_active');
        } else {
            sideBar.removeClass('is_active');
        }

        if (height >= $('.white-bg').height() - 331) {
            sideBar.removeClass('is_active');
            sideBar.addClass('pos-bottom');
        } else {
            sideBar.removeClass('pos-bottom');
        }

        var st = $('.double--left')
        cl = $('ul.location-list li')
        wst = $(this).scrollTop();
        st.each(function (key, val) {
            if (key < st.length - 1) {
                if (st.eq(key).offset().top <= wst && st.eq(key + 1).offset().top > wst) {
                    cl.eq(key).addClass('is_active');
                } else {
                    cl.eq(key).removeClass('is_active');
                }
            } else {
                if (st.eq(key).offset().top <= wst) {
                    cl.eq(key).addClass('is_active');
                } else {
                    cl.eq(key).removeClass('is_active');
                }
            }
        });
        if (st.eq(0).length != 0) {
            if (st.eq(0).offset().top > wst) {
                cl.eq(0).addClass('is_active');
            }
        } else {
            return false;
        }

    });



    $('.top').click(function () {
        $(window).scrollTop('0')
    });

    // 숫자 콤마추가
    function inputNumberFormat(obj) {
        obj.value = comma(uncomma(obj.value));
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }


    (function ($) {

        // input 자동완성기능 해제
        $('input').attr('autocomplete', 'off');

        // 비활성화 속성추가
        $('.disabled').find('input').attr('disabled', 'disabled');
        $('.disabled').find('select').attr('disabled', 'disabled');


        // drop down
        var dropbox = $('.dropBox');
        dropbox.each(function () {
            $(this).find('dt').on('click', function () {
                if ($(this).parents('.dropBox').hasClass('disabled') == false) {
                    var h = $(this).parents('dl').data('items');
                    var l = $(this).next().find('ul li').length;

                    if (h < l) {
                        $(this).siblings('dd').find('ul').css({
                            'height': multiHeight * h + 'px'
                        });
                    } else {
                        $(this).siblings('dd').find('ul').css({
                            'height': 'auto'
                        });
                    }

                    // console.log(h);
                    //items 개수에 따라 height 출력
                    // $(this).siblings('dd').find('ul').css({'height' : multiHeight*h + 'px' });
                    $(this).siblings('dd').find('ul').stop().slideToggle();
                    $(this).toggleClass('is_active');
                }
            });

            $(this).find('li').on('click', function (e) {
                e.preventDefault();
                $(this).parents('ul').stop().slideUp();
                $(this).parents('dd').siblings('dt').text($(this).text());
            });
        });


        // select
        var selectBox = $('.formInput-select');
        selectBox.each(function () {
            var selectOption = $(this).find('option')
            selectList = $(this).find('ul');
            appendSelectLi = '<li data="1">' +
                '<a href="javascript:void(0)"></a>' +
                '</li>'

            $(this).find('dt').text($(this).find('option[selected]').text());
            for (i = 0; i < selectOption.length; i++) {
                selectList.append(appendSelectLi);
                $(this).find('li').eq(i).find('a').text(selectOption.eq(i).text());
            }
        });



        var multiHeight = 35;
        $('.formInput-select a').on('click', function (e) {
            e.preventDefault();
            $(this).parents('dd > ul').stop().slideUp(); //여기임
            $(this).parents('dd').siblings('dt').removeClass('is_active');
            var opIndex = $(this).parents('li').index()
            eachBox = $(this).parents('.formInput-select')
            onSelect = $(this).parents('.formInput-select').children('select')
            eachBox.find('option').removeAttr('selected');
            eachBox.find('option').eq(opIndex).attr('selected', 'selected');
            $(this).parents('dd').siblings('dt').text(eachBox.find('option[selected]').text());
            onSelect.trigger('change');
            if ($(this).hasClass('is_active') == true) {
                selectBox.find('ul').slideUp();
                selectBox.find('dt').removeClass('is_active');
            }
        });

        selectBox.find('dt').on('click', function (e) {
            if ($(this).parents('.formInput-select').hasClass('disabled') == false) {
                var h = $(this).parents('dl').data('items');
                var l = $(this).next().find('ul li').length;
                //items 개수에 따라 height 출력
                if (h < l) {
                    $(this).siblings('dd').find('ul').css({
                        'height': multiHeight * h + 'px'
                    });
                } else {
                    $(this).siblings('dd').find('ul').css({
                        'height': 'auto'
                    });
                }
                e.preventDefault();
                if ($(this).hasClass('is_active') == false) {
                    selectBox.find('ul').stop().hide();
                    selectBox.find('dt').removeClass('is_active');
                    $(this).siblings('dd').find('ul').stop().slideDown();
                    $(this).addClass('is_active');
                    console.log("*********************");
                } else {
                    $(this).siblings('dd').find('ul').slideUp();
                    $(this).removeClass('is_active');
                    console.log("=====================");
                }
            }
        });

        // checkbox
        var checkArea = $('.checkArea input[type=checkbox]');
        checkArea.on('click', function () {
            if ($(this).closest('.checkArea').hasClass('disabled') == false) {
                if ($(this).prop('checked') == false) {
                    $(this).attr('checked', false);
                    $(this).siblings('label').removeClass('is_active');
                } else {
                    $(this).attr('checked', true);
                    $(this).siblings('label').addClass('is_active');
                }
            }
            $(this).siblings('input').trigger('change');
        });

        // radiobox
        var radioArea = $('.radioArea');
        // var radioName = $('.radioArea input[type=radio]').attr('name');
        // input[name=search_value]
        radioArea.each(function () {
            var radioClass = $(this).children('input').attr('name');
            $(this).addClass(radioClass);
        });
        radioArea.find('label').on('click', function () {
            // console.log(radioName);
            if ($(this).closest(radioArea).hasClass('disabled') == false) {
                var name = $(this).siblings().attr('name')
                siblingArea = $(this).parent().siblings('.' + name);
                siblingArea.children('label').removeClass('is_active');
                $('input[name=' + name + ']').parents('radioArea').children('label').removeClass('is_active');
                $('input[name=' + name + ']').next('label').removeClass('is_active')
                $('input[name=' + name + ']').prev('label').removeClass('is_active')
                $('input[name=' + name + ']').attr('checked', false);

                // radioName.parents('').children('label').removeClass('is_active');
                siblingArea.children('input').attr('checked', false);
                $(this).siblings('input').attr('checked', true);
                $(this).addClass('is_active');
            }
        });

        // multiple combo box
        var multiBox = $('.formInput-multiBox');
        var multiHeight = 35;
        multiBox.each(function () {
            $(this).find('dt').on('click', function () {
                if ($(this).parents('.formInput-multiBox').hasClass('disabled') == false) {
                    var h = $(this).siblings('dd').find('.optionZone').data('items');
                    // console.log(h);
                    //items 개수에 따라 height 출력
                    $(this).siblings('dd').find('.optionZone').css({
                        'height': multiHeight * (h + 1) + 'px'
                    });
                    $(this).siblings('dd').find('ul').css({
                        'height': multiHeight * h + 'px'
                    });

                    // $(this).children('.optionZone').css({'height' : multiHeight*h + 'px' });
                    $(this).siblings('dd').find('.optionZone').stop().slideToggle();
                }
            });
            $(this).find('button').on('click', function (e) {
                e.preventDefault();
                var valText = [];
                $(this).siblings('ul').find('li').each(function () {
                    var checkVal = $(this).find('input').attr('checked');
                    if (checkVal == 'checked') {
                        valText.push($(this).find('label').text());
                    }
                });
                $(this).parents('dd').siblings('dt').text(valText);
                $(this).parent('.optionZone').stop().slideUp();
            });
        });

        // tooltip
        var tooltip = $('.tooltip');
        tooltip.each(function () {
            $(this).find('.tooltip-btn').on('mouseenter', function (e) {
                e.preventDefault();
                $(this).siblings().addClass('is_hover');
            });
            $(this).on('mouseleave', function (e) {
                e.preventDefault();
                $(this).find('.is_hover').removeClass('is_hover');
            });
            // $(this).find('.tooltip-btn').click(function(e){
            //     e.preventDefault();
            //     $(this).siblings().toggleClass('is_click');
            // });
        });

        //  Modal 

        $('.btn-open').on('click', function () {
            var modalData = $(this).data().name
            $('#' + modalData).fadeIn();
        });

        $('.btn-close').on('click', function () {
            $('.modal-wrap').fadeOut();
        });


        // spincontrol
        var spinControl = $('.formInput-spincontrol')
        spinInput = spinControl.find('input')
        appendSpinbtn = '<div class="spinBtn">' +
            '<button type="button" class="spinBtn-up">' +
            '<i class="icon icon-arrow-com"></i>' +
            '</button>' +
            '<button type="button" class="spinBtn-down">' +
            '<i class="icon icon-arrow-com"></i>' +
            '</button>' +
            '</div>'

        spinControl.append(appendSpinbtn);

        var spinBtn = spinControl.find('button');
        spinControl.each(function () {
            if ($(this).hasClass('disabled') == false && $(this).hasClass('formInput-error') == false) {
                spinButton = $(this).find('button');
                spinButton.hover(
                    function () {
                        $(this).addClass('is_hover');
                        $(this).children('i').addClass('is_hover');
                        $(this).parents('.formInput-spincontrol').addClass('is_hover');
                    },
                    function () {
                        $(this).removeClass('is_hover');
                        $(this).children('i').removeClass('is_hover');
                        $(this).parents('.formInput-spincontrol').addClass('is_hover');
                    }
                );
                spinButton.mousedown(function () {
                    $(this).addClass('is_active');
                });
                spinButton.mouseup(function () {
                    $(this).removeClass('is_active');
                });

                spinInput.hover(
                    function () {
                        $(this).parents('.formInput-spincontrol').addClass('is_hover');
                        $(this).siblings('.spinBtn').addClass('is_hover');
                    },
                    function () {
                        $(this).parents('.formInput-spincontrol').removeClass('is_hover');
                        $(this).siblings('.spinBtn').removeClass('is_hover');
                    }
                );
                spinInput.focus(function () {
                    $(this).siblings('.spinBtn').addClass('is_active');
                    $(this).parents('.formInput-spincontrol').addClass('is_active');
                });
                spinInput.blur(function () {
                    $(this).siblings('.spinBtn').removeClass('is_active');
                    $(this).parents('.formInput-spincontrol').removeClass('is_active');
                });
            }
            if ($(this).hasClass('formInput-error') == true) {
                $(this).find('i').addClass('error')
            }
        });
        // spin click
        spinBtn.on('click', function () {
            if ($(this).parents().hasClass('disabled') == false) {
                var btnUp = $(this).hasClass('spinBtn-up')
                input = $(this).parents('.spinBtn').siblings('input')
                inputVal = input.val();

                if (inputVal == '') {
                    inputVal == 0
                }
                if (btnUp == true) {
                    var i = Number(inputVal) + 1
                    input.val(i)
                } else {
                    var i = Number(inputVal) - 1
                    input.val(i)
                }
            }
        });

        $('.top').click(function () {
            $(window).scrollTop('0')
        });

        //체육일정 상단 버튼
        $('.schedule-btn').click(function () {
            $(this).addClass('is_active').siblings().removeClass('is_active')
        });

        // $('.select').click(function(){
        //     $(this).children('.select-gray').show();
        // });
        $('header .select').click(function () {
            $(this).children('.select-gray').addClass('show');
        });
        $('.select-close').click(function () {
            $('header .select-gray').removeClass('show');
        });
        // tab menu
        function tablink() {

            var tab = $('.tab')
            tablink = tab.find('.tab-nav a');

            tablink.click(function (e) {
                e.preventDefault();
                var thisTab = $(this).parents('.tab')
                tab_id = $(this).parent('li').attr('data-tab');

                thisTab.find('.tab-nav li').removeClass('is_active');
                thisTab.find('.tab-con li').removeClass('is_active');
                $(this).parent('li').addClass('is_active');
                $("#" + tab_id).addClass('is_active');
            });
        }
        // tablink(); //탭메뉴 기능 제거(a링크로 작동)

        // slide
        $('.slide .slide-con').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            nextArrow: $('.slide .next'),
            prevArrow: $('.slide .prev'),
            draggable: false,
            arrows: true,
        });

        fn_dropDownLoad()
    })(jQuery);



});



function graph_pop_open(pop_name) {
    var contents = $('.modal-contents').clone();
    $('#' + pop_name).show();
    $('.registration_pop .modal-con__body').html(contents);
    var table_h = $('.modal-contents .graph-scroll--table .parent table').outerHeight();
    $('.modal-contents .graph-scroll--table .parent .container').css('height', table_h);
    $('.modal-contents .graph-scroll--table .parent').each(function () {
        var parent_w = $(this).parents('.modal-contents').outerWidth();
        var table_thead_w = $('.modal-contents .graph-scroll--table .thead').outerWidth();
        $(this).css('width', parent_w - table_thead_w + 16);
    });
    $('.modal-contents .graph-scroll--table table').css('left', 0);

    $('body').css('overflow', 'hidden');
    var t_slider = document.querySelector(".graph-scroll--table .parent .container");
    var t_slider_inner = document.querySelector(".graph-scroll--table .parent .container table");
    var t_pressed = false;
    var offsetX;
    var x;

    t_slider.addEventListener("mousedown", function (e) {
        t_pressed = true;
        offsetX = e.offsetX - t_slider_inner.offsetLeft;
        t_slider.style.cursor = "grabbing";
    })

    t_slider.addEventListener("mouseenter", function () {
        t_slider.style.cursor = "grab";
    })

    t_slider.addEventListener("mouseup", function () {
        t_slider.style.cursor = "grab";
    })

    window.addEventListener("mouseup", function () {
        t_pressed = false;
    })

    t_slider.addEventListener("mousemove", function (e) {
        if (!t_pressed) return
        e.preventDefault();
        x = e.offsetX;

        t_slider_inner.style.left = (x - offsetX) + 'px';
        checkboundary(t_slider, t_slider_inner);
    })

    var bar_el = $('.registration_pop .graph-scroll--bar .parent .container li');
    var bar_total_w = 0;

        if(bar_el.length != 0){

            bar_el.each(function () {
                bar_total_w += bar_el.outerWidth();
            });
        }else{
            return false;
        }

    $('.registration_pop .graph-scroll--bar .parent .container').css({
        'width': bar_total_w,
        'display': 'flex'
    });

    bar_el_w = bar_el.outerWidth();
    bar_el_length = bar_el.length;
    $('.registration_pop .graph-scroll--bar .parent .container').css('width', bar_el_w * bar_el_length - 70);
    $('.modal-contents .graph-scroll--bar .parent .container').css('left', 0);

    // 그래프 드래그
    var g_slider = document.querySelector(".registration_pop .graph-scroll--bar .parent");
    var g_slider_inner = document.querySelector(".registration_pop .graph-scroll--bar .parent .container");
    var g_pressed = false;
    var g_start;
    var x;

    $('.registration_pop .lookupTable .lookup-header').append('<button type="button" class="btn download">다운로드</button>');
    g_slider.addEventListener("mousedown", function (e) {
        g_pressed = true;
        g_start = e.offsetX - g_slider_inner.offsetLeft;
        g_slider.style.cursor = "grabbing";
    })

    g_slider.addEventListener("mouseenter", function () {
        g_slider.style.cursor = "grab";
    })

    g_slider.addEventListener("mouseup", function () {
        g_slider.style.cursor = "grab";
    })

    window.addEventListener("mouseup", function () {
        g_pressed = false;
    })

    g_slider.addEventListener("mousemove", function (e) {
        if (!g_pressed) return
        e.preventDefault();
        x = e.offsetX;

        g_slider_inner.style.left = (x - g_start) + 'px';
        checkboundary(g_slider, g_slider_inner);
    })

    function checkboundary(slide, slide_inner) {
        var outer = slide.getBoundingClientRect();
        var inner = slide_inner.getBoundingClientRect();

        if (parseInt(slide_inner.style.left) > 0) {
            slide_inner.style.left = "0px";
        } else if (inner.right < outer.right) {
            slide_inner.style.left = '-' + (inner.width - outer.width) + 'px';
        }
    }


}

function graph_pop_close(pop_name) {
    $('#' + pop_name).hide();
    $('.registration_pop .modal-con__body').html('');
    $('body').css('overflow', 'auto');

}

function fn_dropDownLoad() {
    var labelValue = '';
    $('.midSelect-con__list .midSelect-con__item').each(function (key, val) {
        $(this).children('.option').find('li').remove();
        $(this).children('.select-con').find('label').each(function (key2, val2) {
            if ($(this).text() == '전체') {
                labelValue += '<li class="event--all" data-for="' + $(this).prop('for') + '">' + $(this).text() + '</li>';
            } else {
                labelValue += '<li class="" data-for="' + $(this).prop('for') + '">' + $(this).text() + '</li>';
            }
        })

        $(this).children('.option').find('ul').append(labelValue)
        labelValue = '';
    });
    $('.option li').click(function () {
        if ($(this).siblings('.event--all').hasClass('is_active')) {
            $(this).siblings('.event--all').removeClass('is_active');
        }
        $(this).toggleClass('is_active');
    });

    $('.event--all').click(function () {
        $(this).siblings('li').removeClass('is_active');

    });

    // dropDown ridop
    var dropRadio = $('.event-radio li');
    dropRadio.click(function () {
        dropRadio.removeClass('is_active');
        $(this).addClass('is_active');
    });
}