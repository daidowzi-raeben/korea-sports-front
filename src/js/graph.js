$(document).ready(function () {
    // 그래프 


    //그래프 공통 드래그
    // var _el = $('.graph .graph-scroll .container li')
    //     _elLength = _el.length;
    //     var _elWidth = _el.outerWidth() + 90
    //     _ulWidth = _elLength * _elWidth
    //     _ulLeft = _ulWidth/3 ;
    //     _paWidth = _ulWidth + _ulLeft;
    //     fixedWidth = 0;
    //     if(_elLength == 0) {
    //         fixedWidth = $('.graph-scroll--table .thead').width();
    //         fixedWidth = fixedWidth;
    //         fixedWidth = 0;
    //         var _el = $('.graph .graph-scroll .container table tr.kind th');
    //         var _elLength = _el.length
    //         var _elWidth = 40
    //         _ulWidth = (_elLength * _elWidth) 
    //         _ulLeft = (_ulWidth/3 )
    //         _paWidth = _ulWidth + _ulLeft ;
    //     }


    // $('.graph .graph-scroll .parent').width(_paWidth + fixedWidth +'px');
    // $('.graph .graph-scroll .parent .container').width(_ulWidth +'px');
    // $('.graph .graph-scroll .parent .container table').width(_paWidth + fixedWidth+'px');
    // $('.graph .graph-scroll .parent').css({'left':-_ulLeft  - fixedWidth  +'px'})
    // $('.graph .graph-scroll .container').css({'left': _ulLeft  + fixedWidth  +'px'})
    // $('.graph .graph-scroll .container table').css({'left':_ulLeft +'px'})

    //막대그래프
    

    // $(".graph-scroll .container").draggable({
    //     cursor: "move",
    //     containment: "parent",
    //     stop: function () {
    //         var __w = $(this).parents('.graph-scroll--bar .parent').width();
    //         if(__w == 0) {
    //             var __w = $(this).parents('.graph-scroll--table .parent .container table').width();
    //         }
    //         // console.log(__w / 2);
    //         if (jQuery(".graph-scroll .container").position().left < 0)
    //             jQuery(".graph-scroll .container").css("left", (__w / 3) + 'px');
    //     }
    // });

    var table_h = $('.graph-scroll--table .parent table').outerHeight();
    console.log(table_h);
    $('.graph-scroll--table .parent table').css('left',)
    $('.graph-scroll--table .parent .container').css('height',table_h);
    var table_thead_w =  $('.graph-scroll--table .thead').outerWidth();
    console.log(table_thead_w);
    $('.graph-scroll--table .parent').css('width',1200 - table_thead_w);
    
    var slider = document.querySelector(".graph-scroll--table .parent .container");
        var slide_inner = document.querySelector(".graph-scroll--table .parent .container table");
        var pressed = false;
        var offsetX;
        var x;

        slider.addEventListener("mousedown", e => {
            pressed = true;
            offsetX = e.offsetX - slide_inner.offsetLeft;
            slider.style.cursor = "grabbing";
        })

        slider.addEventListener("mouseenter", () => {
            slider.style.cursor = "grab";
        })

        slider.addEventListener("mouseup", () => {
            slider.style.cursor = "grab";
        })

        window.addEventListener("mouseup", () => {
            pressed = false;
        })

        slider.addEventListener("mousemove", e => {
            if (!pressed) return
            e.preventDefault();
            x = e.offsetX;

            slide_inner.style.left = `${x - offsetX}px`;
            checkboundary();
        })

        function checkboundary() {
            var outer = slider.getBoundingClientRect();
            var inner = slide_inner.getBoundingClientRect();
            var thead_w = $('.graph-scroll--table .thead').outerWidth();
            if (parseInt(slide_inner.style.left) > 0) {
                slide_inner.style.left = 0;
            } else if (inner.right < outer.right) {
                slide_inner.style.left = `-${inner.width - outer.width}px`;
            }
        }
   

        
    function __comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
});
