$(function() {
  $('.btn>div').tap(function(){
    if ($(this).hasClass('selected')) return;
    var thisClass = $(this)[0].className;
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.'+thisClass+'-content').show().siblings().hide();
  })
});