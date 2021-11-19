// 가이드 페이지 생성
var guideBox = $('.guide-content').children('div');
var guideList = $('.guide-list');
var pre = $('pre');
pre.find('.formInput li').remove();

// 코드 복사
function copyText(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    alert('코드를 복사하였습니다');
}

// 컬러가이드 색추가
var colorTag = $('.colorTag');
    colorTag.each(function(index, item) {
        var colorMark = $(this).find('i')
            colorChip = $(this).find('span')
            colorText = '';

        colorText =  colorChip.text();
        if(colorText == '#FFFFFF'){
            colorMark.css({'backgroundColor':colorText,'border':'1px solid #A7A7A7'});
    }else{
            colorMark.css({'backgroundColor':colorText});
    }
});

// spincontrol hover&focus action
$('.guideSpin button.spinBtn-up i').addClass('guideSpinhover')
$('.guideSpin button.spinBtn-up i').addClass('guideSpinactive')
var link = document.location.href
    //[타이틀,파일명] 파일명 같을 시 null 처리
    guideList = [
        ['inputbox',null],
        ['selectbox',null],
        ['textarea',null],
        ['button',null],
        ['popup',null],
        ['table',null],
        ['pagination',null],
        ['dropdown',null],
        ['multiple',null],
        ['check-radio',null],
        ['tooltip',null],
        ['spincontrol',null],
        ['tabmenu',null],
        ['calender',null],
        ['slide.js',null],
        ['chart.js',null],
        ['icon',null],
    ]
    splitLink = link.split("/")
    splitLength = splitLink.length
    place = splitLink[splitLength-1]
    splitPlace = place.split(".")
    active = splitPlace[0]
    var append = '';

(function($){
    $.each(guideList, function (key, val) {
        val[1] ?  url = val[1] :  url = val[0];
        if(url == active) is_active = "active";
        else is_active = "";
        append += '<li class="'+is_active+'"><a href="./'+url+'.html" target="_self">'+val[0]+'</a></li>';        
    });
    $('.guide > .guide-list').append(append)

    })(jQuery);