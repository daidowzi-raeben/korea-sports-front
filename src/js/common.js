
$(document).ready(function(){
    var navList = $('.nav-sub__item');

    navList.on('mouseover', function(){
        navList.removeClass('is_active');
        $(this).addClass('is_active');
        $('.nav-sub__wrap').hide();
        $(this).children('.nav-sub__wrap').show();
    })

    $('.nav-sub').on('mouseleave', function(){
        $('.nav-sub__wrap').hide();

    })

    $('.dropdown').click(function(){
        $(this).next().toggle();
    });
    

// 스크롤 이벤트 --

$('ul.tabList li').on('click',function(){
    var idx = $(this).index()
        st = $('ul.tabList').eq(idx).offset().top
        wst = $(window).scrollTop();
    $(window).scrollTop(st);
});

$(window).on('scroll', function(){

    var height = $(this).scrollTop();
    var sideBar = $('.scrollSide .double--right');



    if(height >= 287){
        sideBar.addClass('is_active');
    }else{
        sideBar.removeClass('is_active');
    }

    if(height >= $('.white-bg').height()- 331){
        sideBar.removeClass('is_active');
        sideBar.addClass('pos-bottom');
    }else{
        sideBar.removeClass('pos-bottom');
    }

    var st = $('.double--left')
        cl = $('ul.location-list li')
        wst = $(this).scrollTop();
        st.each(function(key, val) {
            if (key < st.length - 1) {
                if(st.eq(key).offset().top <= wst && st.eq(key + 1).offset().top > wst) {
                    cl.eq(key).addClass('is_active');
                } else {
                    cl.eq(key).removeClass('is_active');
                }
            } else {
                if(st.eq(key).offset().top <= wst) {
                    cl.eq(key).addClass('is_active');
                } else {
                    cl.eq(key).removeClass('is_active');
                }
            }
        });
        if(st.eq(0).offset().top > wst) {
            cl.eq(0).addClass('is_active');
        }

});



$('.top').click(function(){
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


(function($){

// input 자동완성기능 해제
$('input').attr('autocomplete','off');

// 비활성화 속성추가
$('.disabled').find('input').attr('disabled','disabled');
$('.disabled').find('select').attr('disabled','disabled');


// drop down
var dropbox = $('.dropBox');
dropbox.each(function() {
    $(this).find('dt').on('click',function(){
        if($(this).parents('.dropBox').hasClass('disabled') == false){
            var h = $(this).parents('dl').data('items');
            var l = $(this).next().find('ul li').length;

            if(h < l) {
                $(this).siblings('dd').find('ul').css({'height' : multiHeight*h + 'px' });
            } else {
                $(this).siblings('dd').find('ul').css({'height' :'auto' });
            }

            // console.log(h);
            //items 개수에 따라 height 출력
            // $(this).siblings('dd').find('ul').css({'height' : multiHeight*h + 'px' });
            $(this).siblings('dd').find('ul').stop().slideToggle();
            $(this).toggleClass('is_active');
        }
    });

    $(this).find('li').on('click',function(e){
        e.preventDefault();
        $(this).parents('ul').stop().slideUp();
        $(this).parents('dd').siblings('dt').text($(this).text());
    });
});


// select
var selectBox = $('.formInput-select');
selectBox.each(function() {
    var selectOption = $(this).find('option')
        selectList = $(this).find('ul');
        appendSelectLi = '<li data="1">'
        +'<a href="javascript:void(0)"></a>'
        +'</li>'

    $(this).find('dt').text($(this).find('option[selected]').text());
    for(i = 0; i < selectOption.length; i++){
        selectList.append(appendSelectLi);
        $(this).find('li').eq(i).find('a').text(selectOption.eq(i).text());
    }
});



var multiHeight = 35;
    $('.formInput-select a').on('click',function(e){
        e.preventDefault();
        $(this).parents('dd > ul').stop().slideUp(); //여기임
        $(this).parents('dd').siblings('dt').removeClass('is_active');
        var opIndex = $(this).parents('li').index()
            eachBox = $(this).parents('.formInput-select')
            onSelect = $(this).parents('.formInput-select').children('select')
        eachBox.find('option').removeAttr('selected');
        eachBox.find('option').eq(opIndex).attr('selected','selected');
        $(this).parents('dd').siblings('dt').text(eachBox.find('option[selected]').text());
        onSelect.trigger('change');
        if($(this).hasClass('is_active') == true){
        selectBox.find('ul').slideUp();
        selectBox.find('dt').removeClass('is_active');
        }
    });

selectBox.find('dt').on('click',function(e){
    if($(this).parents('.formInput-select').hasClass('disabled') == false){
        var h = $(this).parents('dl').data('items');
        var l = $(this).next().find('ul li').length;
        //items 개수에 따라 height 출력
        if(h < l) {
        $(this).siblings('dd').find('ul').css({'height' : multiHeight*h + 'px' });
        } else {
            $(this).siblings('dd').find('ul').css({'height' :'auto' });
        }
        e.preventDefault();
        if($(this).hasClass('is_active') == false){
            selectBox.find('ul').stop().hide();
            selectBox.find('dt').removeClass('is_active');
            $(this).siblings('dd').find('ul').stop().slideDown();
            $(this).addClass('is_active');
            console.log("*********************");
        }else{
            $(this).siblings('dd').find('ul').slideUp();
            $(this).removeClass('is_active');
            console.log("=====================");
        }
    }
});

// checkbox
var checkArea = $('.checkArea input[type=checkbox]');
checkArea.on('click',function(){
    if($(this).closest('.checkArea').hasClass('disabled') == false){
        if($(this).prop('checked') == false){
            $(this).attr('checked',false);
            $(this).siblings('label').removeClass('is_active');
        }else{
            $(this).attr('checked',true);
            $(this).siblings('label').addClass('is_active');
        }
    }
    $(this).siblings('input').trigger('change');
});

// radiobox
var radioArea = $('.radioArea');
// var radioName = $('.radioArea input[type=radio]').attr('name');
// input[name=search_value]
radioArea.each(function() {
    var radioClass = $(this).children('input').attr('name');
    $(this).addClass(radioClass);
});
radioArea.find('label').on('click',function(){
    // console.log(radioName);
    if($(this).closest(radioArea).hasClass('disabled') == false){
        var name = $(this).siblings().attr('name')
            siblingArea = $(this).parent().siblings('.' + name);
        siblingArea.children('label').removeClass('is_active');
        $('input[name='+name+']').parents('radioArea').children('label').removeClass('is_active');
        $('input[name='+name+']').next('label').removeClass('is_active')
        $('input[name='+name+']').prev('label').removeClass('is_active')
        $('input[name='+name+']').attr('checked',false);

        // radioName.parents('').children('label').removeClass('is_active');
        siblingArea.children('input').attr('checked',false);
        $(this).siblings('input').attr('checked',true);
        $(this).addClass('is_active');        
    }
});

// multiple combo box
var multiBox = $('.formInput-multiBox');
var multiHeight = 35;
multiBox.each(function() {
    $(this).find('dt').on('click',function(){
        if($(this).parents('.formInput-multiBox').hasClass('disabled') == false){
            var h = $(this).siblings('dd').find('.optionZone').data('items');
            // console.log(h);
            //items 개수에 따라 height 출력
            $(this).siblings('dd').find('.optionZone').css({'height' : multiHeight*(h+1) + 'px' });
            $(this).siblings('dd').find('ul').css({'height' : multiHeight*h + 'px' });

            // $(this).children('.optionZone').css({'height' : multiHeight*h + 'px' });
            $(this).siblings('dd').find('.optionZone').stop().slideToggle();
        }
    });
    $(this).find('button').on('click',function(e){
        e.preventDefault();
        var valText = [];
        $(this).siblings('ul').find('li').each(function(){
            var checkVal = $(this).find('input').attr('checked');
            if(checkVal == 'checked'){
                valText.push($(this).find('label').text());
            }
        });
        $(this).parents('dd').siblings('dt').text(valText);
        $(this).parent('.optionZone').stop().slideUp();
    });
});

// tooltip
var tooltip = $('.tooltip');
tooltip.each(function() {
    $(this).find('.tooltip-btn').on('mouseenter',function(e){
        e.preventDefault();
        $(this).siblings().addClass('is_hover');
    });
    $(this).on('mouseleave',function(e){
        e.preventDefault();
        $(this).find('.is_hover').removeClass('is_hover');
    });
    // $(this).find('.tooltip-btn').click(function(e){
    //     e.preventDefault();
    //     $(this).siblings().toggleClass('is_click');
    // });
});

//  Modal 

$('.btn-open').on('click', function(){
    var modalData = $(this).data().name
    $('#' + modalData).fadeIn();
});

$('.btn-close').on('click', function(){
    $('.modal-wrap').fadeOut();
});


// spincontrol
var spinControl = $('.formInput-spincontrol')
    spinInput = spinControl.find('input')
    appendSpinbtn = '<div class="spinBtn">'
    +'<button type="button" class="spinBtn-up">'
    +'<i class="icon icon-arrow-com"></i>'
    +'</button>'
    +'<button type="button" class="spinBtn-down">'
    +'<i class="icon icon-arrow-com"></i>'
    +'</button>'
    +'</div>'

spinControl.append(appendSpinbtn);

var spinBtn = spinControl.find('button');
spinControl.each(function() {
    if($(this).hasClass('disabled') == false && $(this).hasClass('formInput-error') == false){
        spinButton = $(this).find('button');
        spinButton.hover(
            function(){
                $(this).addClass('is_hover');
                $(this).children('i').addClass('is_hover');
                $(this).parents('.formInput-spincontrol').addClass('is_hover');
            },
            function(){
                $(this).removeClass('is_hover');
                $(this).children('i').removeClass('is_hover');
                $(this).parents('.formInput-spincontrol').addClass('is_hover');
            }
        );
        spinButton.mousedown(function(){
            $(this).addClass('is_active');
        });
        spinButton.mouseup(function(){
                $(this).removeClass('is_active');
        });

        spinInput.hover(
            function(){
                $(this).parents('.formInput-spincontrol').addClass('is_hover');
                $(this).siblings('.spinBtn').addClass('is_hover');
            },
            function(){
                $(this).parents('.formInput-spincontrol').removeClass('is_hover');
                $(this).siblings('.spinBtn').removeClass('is_hover');
            }
        );
        spinInput.focus(function(){
            $(this).siblings('.spinBtn').addClass('is_active');
            $(this).parents('.formInput-spincontrol').addClass('is_active');
        });
        spinInput.blur(function(){
            $(this).siblings('.spinBtn').removeClass('is_active');
            $(this).parents('.formInput-spincontrol').removeClass('is_active');
        });         
    }
    if($(this).hasClass('formInput-error') == true){
        $(this).find('i').addClass('error')
    }
});
// spin click
spinBtn.on('click',function(){
    if($(this).parents().hasClass('disabled') == false){
        var btnUp = $(this).hasClass('spinBtn-up')
            input = $(this).parents('.spinBtn').siblings('input')
            inputVal = input.val();
        
        if(inputVal == ''){
            inputVal == 0
        }
        if(btnUp == true){
            var i = Number(inputVal) + 1
            input.val(i)
        }else{
            var i = Number(inputVal) - 1
            input.val(i)
        }
    }
});

$('.top').click(function(){
    $(window).scrollTop('0')
});


// $('.select').click(function(){
//     $(this).children('.select-gray').show();
// });
$('header .select').click(function(){
    $(this).children('.select-gray').addClass('show');
});
$('.select-close').click(function(){
    $('header .select-gray').removeClass('show');
});
// tab menu
function tablink() {

    var tab = $('.tab')
    tablink = tab.find('.tab-nav a');

    tablink.click(function(e){
        e.preventDefault();
        var thisTab = $(this).parents('.tab')
        tab_id = $(this).parent('li').attr('data-tab');
        
        thisTab.find('.tab-nav li').removeClass('is_active');
        thisTab.find('.tab-con li').removeClass('is_active');
        $(this).parent('li').addClass('is_active');
        $("#"+tab_id).addClass('is_active');
    });
}
// tablink(); //탭메뉴 기능 제거(a링크로 작동)

// slide
$('.slide .slide-con').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow:$('.slide .next'),
    prevArrow:$('.slide .prev'),
    draggable : false,
    arrows : true,
});

// chartvar todayChart = document.getElementById('chartID').getContext('2d');
var todayData = 80 // 데이터 입력
    dataesle =  100 - todayData;
    todayText = '차트이름',

$('.todayPer em').text(todayData);
$('.todayText').text(todayText)

new Chart(todayChart, {
    type: 'doughnut', // 차트형식
    data: {
        datasets: [{
            label: false,
            data: [todayData,dataesle],
            backgroundColor: ['#36BAC6'],
        }],
        labels: false
    },
    options: {
        responsive: true,
        
        legend: {
            position: 'bottom'
        },
        cutoutPercentage:82,
        plugins: {
            datalabels: {
                color: ['#fff'],
                borderWidth: 0,
                borderColor: ['#fff'],
                borderRadius : 25,
                anchor: 'center',
                formatter: function(value, context) {
                    return (value > 10) ? null : null //data가 10 미만이면 숫자 값은 출력되지 않습니다.
                }
            },
        },
        title: {
            display: true,
            position: 'bottom',
        },
        tooltips: {
            enabled: false
        },
        hover: {
            animationDuration: 0
        },
    }
});



})(jQuery);

});


// 스크롤 이벤트


