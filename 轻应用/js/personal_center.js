$(function() {

  //点击切换『我的积分』和『我喜爱的』
  $('.btn>div').tap(function(){
    if ($(this).hasClass('selected')) return;
    var thisClass = $(this)[0].className;
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.'+thisClass+'-content').show().siblings().hide();
  })

  //点击显示/隐藏规则说明
  $('.instruction-btn').tap(function(){
    $('.instruction').show();
    return false;
  })

  $('.instruction').tap(function(){
    $(this).hide();
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