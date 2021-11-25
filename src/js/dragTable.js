$(document).ready(function () {
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
   
            
});
