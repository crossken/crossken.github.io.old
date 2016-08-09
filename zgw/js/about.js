$(function() {
  $('h3').each(function(index, el) {
    el.isSpread = false;
  });
  $('h3').tap(function(){
    if (this.isSpread) {
      $(this).siblings('div').animate({'height': 0}, 200, 'ease-in-out')
      $(this).siblings('i').css('background-image', 'url(images/down.png)');
    } else {
      var height = $(this).siblings('div').children().length*0.92+'rem';
      $(this).siblings('div').animate({'height': height}, 200, 'ease-in-out');
      $(this).siblings('i').css('background-image', 'url(images/up.png)');
    }

    this.isSpread = !this.isSpread;

    return false;
    
  })
});