var top_bottom_left_link = [
    'sub_player.outline.html',
    'sub_agreement.html',
    'sub_player.application.info.html',
    'sub_player.application.print.html',
    'sub_player.transfer.offer.html',
    'sub_player.phone.info.html'
];

var top_bottom_right_link = [
    'sub_notice.html',
    'sub_qna.html',
    'sub_oneonone.html',
    'popup_6'
];

$(document).ready(function () {
    // 탑 네비(경기인 선택)
    $('.btn_top_select').on('click', function (){
        $('.popup_select').show();
        $('.btn_close').on('click', function (){
            $(this).off('click');
            $('.popup_select').hide();
        });
    });
    $('.btn_select').each(function(idx){
        $(this).on('click', function () {
            var link_num = parseInt($(this).attr('class').split('select_')[1].substr(0,1)) - 1;
            switch (link_num) {
                case 0 : {
                    page_move('main_player.apply.html');
                    break;
                }
                case 1 : {
                    page_move('main_master.apply.html');
                    break;
                }
                case 2 : {
                    page_move('main_referee.apply.html');
                    break;
                }
                case 3 : {
                    page_move('main_manager.apply.html');
                    break;
                }
            }
        });
    });
    // 탑 네비(우 상단)
    $('#top_r_link_1').on('click', function (){
        // 종목변경(스포츠지원포털)
    });
    $('#top_r_link_2').on('click', function (){
        // 스포츠지원포털
    });
    $('#top_r_link_3').on('click', function (){
        // 화면도움말
        page_move('popup_help');
    });

    // 탑 네비(좌 하단)
    $('.pos_bottom_left .btn').each(function(idx){
        $(this).on('click', function () {
            var link_num = parseInt($(this).attr('class').split('link_')[1].substr(0,1)) - 1;
            page_move(top_bottom_left_link[link_num]);
        });
    });

    // 탑 네비(우 하단)
    $('.pos_bottom_right .btn').each(function(idx){
        $(this).on('click', function () {
            var link_num = parseInt($(this).attr('class').split('link_')[1].substr(0,1)) - 1;
            if (link_num == 2) {
                // 1:1 또는 묻고 답하기
                if ($(this).hasClass('oneonone')) {
                    // 1:1
                    page_move(top_bottom_right_link[link_num]);
                } else {
                    // 묻고 답하기
                    page_move('sub_asknanswer.html');
                }
            } else {
                page_move(top_bottom_right_link[link_num]);
            }
        });
    });

    // 개요 페이지 버튼
    $('.outline-gobtn .btn_1').on('click', function () {
        // 작성
        page_move('sub_player.application.form.html');
    });
    $('.outline-gobtn .btn_2').on('click', function () {
        // 확인/수정
        page_move('sub_player.application.info.html');
    });
    $('.outline-gobtn .btn_3').on('click', function () {
        // 이적신청
        page_move('sub_player.transfer.offer.form.html');
    });

    // 프린트 버튼
    $('.btn_print').on('click', function () {
        page_move('popup_5');
    });

    // 임시 저장 버튼
    $('.btn_temp_save').on('click', function () {
        page_move('popup_3');
    });

    // 파일 부르기
    $('.file_open').on('click', function() {
        $('#file').trigger('click');
    });

    // 신청서 작성 버튼
    $('.btn_application_form').on('click', function() {
        page_move('sub_player.application.form.html');
    });

    // 이적신청 버튼
    $('.top .right_item .right_menu .btn_1').on('click', function() {
        page_move('sub_player.transfer.offer.html');
    });

    // 활동종료 신청 버튼
    $('.top .right_item .right_menu .btn_2').on('click', function() {
        page_move('popup_7');
    });

    // 활동재개 신청 버튼
    $('.top .right_item .right_menu .btn_3').on('click', function() {
        page_move('sub_player.recommence.html');
    });

    // 신청서 내부 버튼(수정, 삭제)
    $('.btn_modify').on('click', function () {
        page_move('sub_player.transfer.offer.form.html');
    });
    $('.btn_modify_2').on('click', function () {
        page_move('sub_player.recommence.form.html');
    });

    // 메인 버튼
    $('.box_service .btn').each(function(idx){
        $(this).on('click', function () {
            var link_num = parseInt($(this).attr('class').split('btn_')[1].substr(0,1)) - 1;
            switch (link_num) {
                case 0 : {
                    page_move('sub_player.application.form.html');
                    break;
                }
                case 1 : {
                    page_move('sub_player.application.info.html');
                    break;
                }
                case 2 : {
                    page_move('sub_player.transfer.offer.html');
                    break;
                }
                case 3 : {
                    page_move('popup_5');
                    break;
                }
            }
        });
    });

    // 서브페이지 탭 이동
    $('.tab_form .li_tab').on('click', function () {
        if ($(this).attr('href') != undefined && $(this).attr('href').length > 0) {
            //console.log($(this).attr('href'));
            location_move($(this).attr('href'));
        }
    });

    // 팝업 열기
    $('.btn_send_apply').on('click', function () {
        page_move('popup_1');
    });

    // 팝업 닫기
    $('.popup .btn_cancel, .popup .btn_confirm, .popup .btn_confirm.type_2, .popup .btn_close_popup').on('click', function() {    
        console.log('close_popup');
        console.log($('.popup'));
        $('.popup').hide();
    });

    // 서브 우측 창 높이 맞춰주기
    //console.log($('.sub_center .mid').innerHeight(), $('.sub_center .mid').css('height'));
    //$('.sub_right .mid').height($('.sub_center .mid').innerHeight());

    // 우측 창 위치 고정
    var first_top = 284;
    var navi_height = 103;
    var navi_bottom_margin = 49;
    var sub_top_height = 18;

    var min_top = 20;
    var move_top = 0;
    var animate_speed = 10;

    $(document).scroll(function (){
        var _move_target = $('.mid-fixed');
        if (_move_target.length == 0) return;
        var _document_scroll_top = $(this).scrollTop();
        var _has_top = parseInt(_move_target.css('top'));
        
        if (_document_scroll_top <= navi_height + navi_bottom_margin + sub_top_height) {
            move_top = first_top - (_document_scroll_top);
            //console.log('min', $(this).scrollTop(), min_top, move_top);
            _move_target.animate({top: move_top}, animate_speed);
        } else {
            if (move_top > min_top) {
                move_top = first_top - (_document_scroll_top);
                if (move_top < min_top) {
                    move_top = min_top;
                }
            }
            
            var footer_top = $('.footer').offset().top;
            var target_top = _move_target.offset().top;
            var target_height = _move_target.outerHeight();

            if (target_top + target_height > footer_top) {
                //move_top = footer_top - (target_top + target_height) - 35;
                //console.log('footer', footer_top);
                //console.log('fixed', target_top, target_height, target_top + target_height);
                //console.log(target_top + target_height, footer_top, move_top);
            }
            
            //console.log('max', $(this).scrollTop(), min_top, move_top);
            _move_target.animate({top: move_top}, animate_speed);
        }
    });
});

function location_move(target) {
    var jq_target = $(target);
    $('html, body').animate({scrollTop: jq_target.offset().top}, 500);
    //location.href = target;
}

function page_move(url, target) {
    var check_html = url.split('html').length == 1 ? false : true;
    var check_popup = url.split('popup').length == 1 ? false : true;
    //console.log('check_popup', check_popup);
    if (!check_html && check_popup) {
        // 팝업
        /*
        1 : 신청서 제출
        2 : 저장
        3 : 임시 저장
        4 : 이용약관 동의
        5 : 신청서 출력
        6 : 로그 아웃
        7 : 활동 종료
        8 : 활동 종료 처리

        help : 도움말
        */
        var popup_num = parseInt(url.split('popup_')[1]);
        if (isNaN(popup_num)) {
            var popup_name = url.split('popup_')[1];
            console.log(popup_name);
            $('.wrap-out.upper').css('height', $('body').prop('scrollHeight'));

            $('.popup').show();
            $('.confirm').hide();
            $('.ex_popup').show();
        } else {
            $('.wrap-out.upper').css('height', $('body').prop('scrollHeight'));

            $('.popup').show();
            $('.ex_popup').hide();
            $('.confirm').show();
            $('.confirm .confirm_inside').removeClass('active');
            var popup_class = '.confirm .confirm_inside.type_' + popup_num;
            $(popup_class).addClass('active');

            // 이용약관 제출 시, 다음 페이지(신청서 작성) 이동
            if (popup_num == 4) {
                $('.type_4 .btn_confirm').bind('click', function() {
                    page_move('sub_player.application.form.html');
                });
            }

            // 활동종료 신청 시, 활동종료 확인 팝업
            if (popup_num == 7) {
                $('.type_7 .btn_confirm').on('click', function(e) {
                    page_move('popup_8');
                });
            }
        }
    } else {
        // 링크
        var main_url = 'http://localhost:3000/dist/html/ggin_golf/';
        var link = main_url + url;
        var set_target = target == undefined ? '_self' : target;
        window.open(link, set_target);
    }
}