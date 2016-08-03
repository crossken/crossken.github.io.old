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
  $("#imgInp").change(function(){
    readURL(this);
  });

  $('.instruction-btn').tap(function(){
    $('.instruction').show();
    return false;
  })

  $('.instruction').tap(function(){
    $(this).hide();
  })

  $('.publish-btn').tap(function(){
    $('.submit').show();
    return false;
  })

  $('.cancel-btn').tap(function(){
    $('.submit').hide();
    return false;
  })

  $('.md-nav a').tap(function(){
    // console.log(1);
    // alert(1);
    if ($(this).hasClass('selected')) return false;
    var $parentItem = $(this).parent('li');
    var Index = $parentItem.index();
    $(this).addClass('selected');
    $parentItem.siblings().find('a').removeClass('selected');
    $('.container>section:eq('+Index+')').show().siblings('section').hide();
    return false;
  })
});