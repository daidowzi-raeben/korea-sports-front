$(document).ready(function () {
        var bar_el = $('.graph-scroll--bar .parent .container li');
        var bar_total_w = 0;
        
        bar_el.each(function () {
            bar_total_w += bar_el.outerWidth();
        });
        
        $('.graph-scroll--bar .parent .container').css({
            'width': bar_total_w,
            'display': 'flex'
        });

        bar_el = $('.graph-scroll--bar .parent .container li').outerWidth();
        bar_el_length = $('.graph-scroll--bar .parent .container li').length;
            
        $('.graph-scroll--bar .parent .container').css('width', bar_el * bar_el_length - 70);   

    var g_slider = document.querySelector(".graph-scroll--bar .parent");
    var g_slider_inner = document.querySelector(".graph-scroll--bar .parent .container");
    var g_pressed = false;
    var g_start;
    var x;

    g_slider.addEventListener("mousedown",function(e){
        g_pressed = true;
        g_start = e.offsetX - g_slider_inner.offsetLeft;
        g_slider.style.cursor = "grabbing";
    })

    g_slider.addEventListener("mouseenter",function(){
        g_slider.style.cursor = "grab";
    })

    g_slider.addEventListener("mouseup", function(){
        g_slider.style.cursor = "grab";
    })

    window.addEventListener("mouseup",function(){
        g_pressed = false;
    })

    g_slider.addEventListener("mousemove",function(e){
        if (!g_pressed) return
        e.preventDefault();
        x = e.offsetX;

        g_slider_inner.style.left = (x - g_start) + 'px';
        checkboundary();
    })

    function checkboundary() {
        var outer = g_slider.getBoundingClientRect();
        var inner = g_slider_inner.getBoundingClientRect();

        if (parseInt(g_slider_inner.style.left) > 0) {
            g_slider_inner.style.left = "0px";
        } else if (inner.right < outer.right) {
            g_slider_inner.style.left = '-' + (inner.width - outer.width) + 'px';
        }
    }

    var pH = $('.graph .graph-scroll .parent .container-graph').height() - 40;

    _elBar = $('.graph .graph-scroll--bar .container li')

    $('.container-graph > div.item > span').css({
        'height': pH + 'px'
    });

    barTotal = [];
    barMax = [];
    // var barMax = new Array();
    var _barDataLength = _elBar.children('.container-graph').eq(0).find('div.item').length;
    _elBar.children('.container-graph').each(function (key, val) {
        barTotal[key] = 0;
        barMax[key] = new Array();
        // barMax[key] = new Array();
        _elBar.children('.container-graph').eq(key).find('div.item').each(function (key2,
            val2) {
            _barDataOption = _elBar.children('.container-graph').eq(key).find(
                'div.item').eq(key2).data('option');
            barTotal[key] += Number(_barDataOption);
            barMax[key].push(_barDataOption);
        })
        totalLengthItem = _elBar.children('.container-graph').eq(key).find('div.item').length;
        __max = Math.max.apply(null, barMax[key]);
        _elBar.children('.container-graph').eq(key).find('div.item').each(function (key2,
            val2) {
            _elHeight = _elBar.children('.container-graph').eq(key).find('div.item').eq(
                key2).data('option');
            _elDataTitle = _elBar.children('.container-graph').eq(key).find('div.item')
                .eq(key2).data('title');
            _totalHeight = _elBar.children('.container-graph').height();
            var j = _elHeight / __max * 100;
            // console.log((barTotal[key] / totalLengthItem));
            // console.log(j);
            j < 20 ? j = 20 : j = j;
            j == 100 ? j = "calc(100% - 40px)" : j = "calc(" + j + "% - 40px)";
            _elBar.children('.container-graph').eq(key).find('div.item').children(
                'span').eq(key2).css({
                'height': j
            });
            _append = '<div class="data-option">' + __comma(_elHeight) + '</div>';
            _appendTitle = '<div class="data-title">' + _elDataTitle + '</div>';
            _elBar.children('.container-graph').eq(key).find('div.item').eq(key2)
                .append(_append + _appendTitle);
            $('.container-graph').eq(key).children('div.item').find('.data-option').eq(
                key2).css({
                'bottom': j
            })
        })

    })

    function __comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    
});