$(function() {

  //点击图片放大/缩小
  var $largeImg = $('.large-img');
  $('.content').on('tap', 'img', function(event) {
    $largeImg.find('img').attr('src', this.src);
    $largeImg.show(200);
  });
  $largeImg.tap(function(){
    $(this).hide(200);
  })

  //监听滚动事件
  $(window).scroll(scrollHandler);
});

function scrollHandler() {
  var pageH = $(document).height()
  var scrollT = $(window).scrollTop(); 
  var winheight=$(window).height();
  //距离页面底部50px
  if (parseInt(scrollT)+parseInt(winheight)+50>=parseInt(pageH)) {
    $('.loader').show();
    //提起ajax请求，请求完成之后再把loading隐藏
  } else {
    return;
  }
}