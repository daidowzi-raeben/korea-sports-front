$(document).ready(function () {
    var table_h = $('.graph-scroll--table .parent table').outerHeight();
    var table_thead_w =  $('.graph-scroll--table .thead').outerWidth();
    $('.graph-scroll--table .parent .container').css('height',table_h);
    $('.graph-scroll--table .parent').css('width',1200 - table_thead_w);
    
        var slider = document.querySelector(".graph-scroll--table .parent .container");
        var slide_inner = document.querySelector(".graph-scroll--table .parent .container table");
        var pressed = false;
        var offsetX;
        var x;

        slider.addEventListener("mousedown",function(e){
            pressed = true;
            offsetX = e.offsetX - slide_inner.offsetLeft;
            slider.style.cursor = "grabbing";
        })

        slider.addEventListener("mouseenter",function(){
            slider.style.cursor = "grab";
        })

        slider.addEventListener("mouseup", function(){
            slider.style.cursor = "grab";
        })

        window.addEventListener("mouseup",function(){
            pressed = false;
        })

        slider.addEventListener("mousemove", function(e){
            if (!pressed) return
            e.preventDefault();
            x = e.offsetX;

            slide_inner.style.left = (x - offsetX) + 'px';
            checkboundary();
        })

        function checkboundary() {
            var outer = slider.getBoundingClientRect();
            var inner = slide_inner.getBoundingClientRect();
            if (parseInt(slide_inner.style.left) > 0) {
                slide_inner.style.left = 0;
            } else if (inner.right < outer.right) {
                slide_inner.style.left = '-' + (inner.width - outer.width) + 'px';
            }
        }
   
            
});
