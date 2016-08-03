$(function() {
  var $largeImg = $('.large-img');
  $('.content').on('tap', 'img', function(event) {
    // alert(this.src);
    $largeImg.find('img').attr('src', this.src);
    $largeImg.show(200);
  });
  $largeImg.tap(function(){
    $(this).hide(200);
  })
});