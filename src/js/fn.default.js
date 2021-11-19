// select 추가함수
function fnChangeSelect(el) {
    var selVal = el.value;
    alert(selVal);
}

//라디오, 체크박스 체크여부
function fnChecked(el) {
    var is_chk = $(el).prop('checked');
    var chkValue = $(el).val();
    var chk = '';
    is_chk === true ? chk = true : chk = false;
    console.log(chk);
    console.log(chkValue);
}
