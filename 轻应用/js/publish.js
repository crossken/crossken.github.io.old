function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#blah').attr('src', e.target.result).show();
    }

    reader.readAsDataURL(input.files[0]);
  }


}

$(function() {

  //预览图片
  $("#imgInp").change(function(){
    readURL(this);
  });

  //弹出/关闭微发布的规则文字
  $('.instruction-btn').tap(function(){
    $('.instruction').show();
    return false;
  })
  $('.instruction').tap(function(){
    $(this).hide();
  })

  //显示/关闭发布按钮
  $('.publish-btn').tap(function(){
    $('.submit').show();
    return false;
  })
  $('.cancel-btn').tap(function(){
    $('.submit').hide();
    return false;
  })

  //点击顶部菜单切换模块
  $('.md-nav a').tap(function(){
    if ($(this).hasClass('selected')) return false;
    var $parentItem = $(this).parent('li');
    var Index = $parentItem.index();
    $(this).addClass('selected');
    $parentItem.siblings().find('a').removeClass('selected');
    $('.container>section:eq('+Index+')').show().siblings('section').hide();
    return false;
  })

  //点击删除当前条目
  $('.container>section').on('tap', '.delete-btn', function(event) {
      $(this).parent().remove();
      return false;
  });

  //点击查看条目详情
  var navHeight = $('.md-nav').height();
  var windowHeight = $(window).height();
  $('.details-content>div').height(windowHeight-navHeight);
  $('.container>section').on('tap', '.content', function(event) {
      $('.details-content').show();
      return false;
  });
  $('.details-content').tap(function(){
    $(this).hide();
  })

  //滚动加载条目
  var $publicSec = $('.public-sec');
  var $contributionSec = $('.contribution-sec');
  var $detailsContent = $('.details-content');
  $(window).scroll(scrollHandler);




  function scrollHandler() {
  var pageH = $(document).height()
  var scrollT = $(window).scrollTop(); 
  var winheight=$(window).height();
  //距离页面底部50px
  if (parseInt(scrollT)+parseInt(winheight)+50>=parseInt(pageH)) {
    
    //微发布的这个页面要增加判断当前选择的导航项，还要判断是不是在详情页面，再执行下一步操作。

    if ($publicSec.find('a').hasClass('selected') && $detailsContent.is(':hidden')) {
      //此时处于公开页面，同时详情页没有点开
      $('.loader').show();
      //对公开页面提起ajax请求插入数据，请求完成之后再把loading隐藏
    }

    if ($contributionSec.find('a').hasClass('selected') && $detailsContent.is(':hidden')) {
      //此时处于投稿页面，同时详情页没有点开
      $('.loader').show();
      //对投稿页面提起ajax请求插入数据，请求完成之后再把loading隐藏
    }
    
  } else {
    return;
  }

}


});



