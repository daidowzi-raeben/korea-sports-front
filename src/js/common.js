$(document).ready(function(){

    $('.done .more button').click(function(){
        $(this).parent().next('.contents-edit').toggleClass('active');
    });
     
    $('.contents-item .edit').click(function(){
        $(this).parents('.inner').next('.contents-edit').toggleClass('active');
    });
});