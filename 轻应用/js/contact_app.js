$(function() {
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