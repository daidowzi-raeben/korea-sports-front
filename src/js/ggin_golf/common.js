window.onload = function(){

    function fnChecked(el) {
        var is_chk = $(el).prop('checked');
        var chkValue = $(el).val();
        var chk = '';
        is_chk === true ? chk = true : chk = false;
        console.log(chk);
        console.log(chkValue);
    }
}