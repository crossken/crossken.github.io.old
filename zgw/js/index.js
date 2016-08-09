var isNavSpread = false;
var $nav = $('.nav');
$(function() {
  $('.nav-btn').tap(function(){
    // alert(1);
    if (isNavSpread) {
      $nav.animate({'width': '0'}, 300, 'ease-in-out');
    } else {
      $nav.animate({'width': '3.18rem'}, 300, 'ease-in-out');
    }
    isNavSpread = !isNavSpread;
  })

  $('.nav a').tap(function(){
    $('.md-header h2').text($(this).text());
  })
});