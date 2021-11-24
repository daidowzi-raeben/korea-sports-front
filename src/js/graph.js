

$(document).ready(function () {
    //그래프 공통 드래그
    var _el = $('.graph .graph-scroll .container li')
        _elLength = _el.length;
        var _elWidth = _el.outerWidth() + 90
        _ulWidth = _elLength * _elWidth
        _ulLeft = _ulWidth/3 ;
        _paWidth = _ulWidth + _ulLeft;
        fixedWidth = 0;
        if(_elLength == 0) {
            fixedWidth = $('.graph-scroll--table .thead').width();
            fixedWidth = fixedWidth;
            fixedWidth = 0;
            var _el = $('.graph .graph-scroll .container table tr.kind th');
            var _elLength = _el.length
            var _elWidth = 30
            _ulWidth = (_elLength * _elWidth) 
            _ulLeft = (_ulWidth/3 )
            _paWidth = _ulWidth + _ulLeft ;
        }
        console.log(fixedWidth);
        
        
        $('.graph .graph-scroll .parent').width(_paWidth + fixedWidth +'px');
        $('.graph .graph-scroll .parent .container').width(_ulWidth +'px');
        $('.graph .graph-scroll .parent .container table').width(_paWidth + fixedWidth+'px');
        $('.graph .graph-scroll .parent').css({'left':-_ulLeft  - fixedWidth  +'px'})
        $('.graph .graph-scroll .container').css({'left': _ulLeft  + fixedWidth  +'px'})
        // $('.graph .graph-scroll .container table').css({'left':_ulLeft +'px'})
    
    //막대그래프
    var pH = $('.graph .graph-scroll .parent .container-graph').height() - 40;
    
    _elBar = $('.graph .graph-scroll--bar .container li')
        
    $('.container-graph > div.item > span').css({'height': pH + 'px'});

    barTotal = [];
    barMax = [];
    // var barMax = new Array();
    var _barDataLength = _elBar.children('.container-graph').eq(0).find('div.item').length;
    _elBar.children('.container-graph').each(function(key, val) {
        barTotal[key] = 0;
        barMax[key] = new Array();
        // barMax[key] = new Array();
        _elBar.children('.container-graph').eq(key).find('div.item').each(function(key2, val2) {
            _barDataOption = _elBar.children('.container-graph').eq(key).find('div.item').eq(key2).data('option');
            barTotal[key] += Number(_barDataOption);
            barMax[key].push(_barDataOption);
        })
        totalLengthItem = _elBar.children('.container-graph').eq(key).find('div.item').length;
        __max = Math.max.apply(null, barMax[key]);
        _elBar.children('.container-graph').eq(key).find('div.item').each(function(key2, val2) {
            _elHeight = _elBar.children('.container-graph').eq(key).find('div.item').eq(key2).data('option');
            _elDataTitle= _elBar.children('.container-graph').eq(key).find('div.item').eq(key2).data('title');
            _totalHeight = _elBar.children('.container-graph').height();
            var j = _elHeight / __max  * 100;           
            // console.log((barTotal[key] / totalLengthItem));
            // console.log(j);
                j < 20 ? j = 20 : j = j;
                j == 100 ? j = "calc(100% - 40px)" : j = "calc("+j+"% - 40px)";
            _elBar.children('.container-graph').eq(key).find('div.item').children('span').eq(key2).css({'height' :  j });
            _append = '<div class="data-option">'+ __comma(_elHeight) +'</div>';
            _appendTitle = '<div class="data-title">'+_elDataTitle+'</div>';
            _elBar.children('.container-graph').eq(key).find('div.item').eq(key2).append(_append + _appendTitle);
            $('.container-graph').eq(key).children('div.item').find('.data-option').eq(key2).css({'bottom' : j })
        })

    })

    $(".graph-scroll .container").draggable({
        cursor: "move",
        containment: "parent",
        stop: function () {
            var __w = $(this).parents('.graph-scroll--bar .parent').width();
            if(__w == 0) {
                var __w = $(this).parents('.graph-scroll--table .parent .container table').width();
            }
            // console.log(__w / 2);
            if (jQuery(".graph-scroll .container").position().left < 0)
                jQuery(".graph-scroll .container").css("left", (__w / 3) + 'px');
        }
    });

   
});

function __comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

