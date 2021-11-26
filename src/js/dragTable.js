$(document).ready(function () {
    var table_h = $('.graph-scroll--table .parent table').outerHeight();
    var table_thead_w =  $('.graph-scroll--table .thead').outerWidth();
    $('.graph-scroll--table .parent .container').css('height',table_h);
    $('.graph-scroll--table .parent').css('width' , 1200 - table_thead_w);
    
    t_slider_fuc();
    // $('.graph-scroll--table .parent').css('width','calc(100% - ' + (- table_thead_w) + ')' );
    function t_slider_fuc(){
        
        var t_slider = document.querySelector(".graph-scroll--table .parent .container");
        var t_slider_inner = document.querySelector(".graph-scroll--table .parent .container table");
        var t_pressed = false;
        var offsetX;
        var x;

        t_slider.addEventListener("mousedown",function(e){
            t_pressed = true;
            offsetX = e.offsetX - t_slider_inner.offsetLeft;
            t_slider.style.cursor = "grabbing";
        })

        t_slider.addEventListener("mouseenter",function(){
            t_slider.style.cursor = "grab";
        })

        t_slider.addEventListener("mouseup", function(){
            t_slider.style.cursor = "grab";
        })

        window.addEventListener("mouseup",function(){
            t_pressed = false;
        })

        t_slider.addEventListener("mousemove", function(e){
            if (!t_pressed) return
            e.preventDefault();
            x = e.offsetX;

            t_slider_inner.style.left = (x - offsetX) + 'px';
            checkboundary();
        })

        function checkboundary() {
            var outer = t_slider.getBoundingClientRect();
            var inner = t_slider_inner.getBoundingClientRect();
            if (parseInt(t_slider_inner.style.left) > 0) {
                t_slider_inner.style.left = 0;
            } else if (inner.right < outer.right) {
                t_slider_inner.style.left = '-' + (inner.width - outer.width) + 'px';
            }
        }
   
    }
            
});

