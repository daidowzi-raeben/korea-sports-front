var ksdatepicker = (function(){
    var __this, __container, __input;
    var fnc_set;

    fnc_set = function(_cntr){
        __this = _cntr;
        __input = _cntr.find('input.calender');
        __input.on('mousedown',function(){
           
            if($(this).hasClass('term')){
                
                $(this).datepicker({
                    language: 'en',
                    autoClose: false,  
                    minDate: new Date(-8639999913600000),
                    maxDate: new Date(8639999913600000)
                });

            }else{

                $(this).datepicker({
                    language: 'en',
                    autoClose: false,                
                });

            }

/*
            if($(this).hasClass('calSelectinput') == true){
                $('.datepicker')
                    .removeClass('datepickersingle')
                    .addClass('datepickerdouble')
            }else{
                $('.datepicker')
                    .removeClass('datepickerdouble')
                    .addClass('datepickersingle')
                    
            }
*/
        })
    }


    return {fnc_set:fnc_set}

}());


