
var isNewPlayer = false;
var timesLeft = 4;
var isGameStarted = false;

var dolls = [];

var isMuted = false;
var addMoneyFast;
var startAddMoneyFast;
var gameSecondLeft = 30;
var gameSecondLeftCount;
var btnUp;
var btnLeft;
var btnDown;
var btnRight;
var hookScale = 1;
var hookScaleMin = 0.7;

$(function() {

	$('.hook').css({
		bottom: '4.3rem',
		left : '2.4rem'
	});

	$('#base-bg')[0].pause();

		// alert(10);



	//若用户为新玩家，则赠送3次免费游戏机会。
	if (isNewPlayer) {
		timesLeft = 3;
		$('.free').fadeIn(400);
		setTimeout(function(){
			$('.free').fadeOut(500);
		},900);
	} else {
		if (!timesLeft) {
			$('.times-left')[0].style.backgroundImage = 'url(images/heart04@2x.png)';
		}
	}

	//点击显示、隐藏充值页面
	$('.recharge').tap(function(){
		$('.pay-page').show();
	})
	$('.cancel-1,.cancel').tap(function(){
		$('.pay-page').hide();
	})

	//将剩余游戏次数写入html中
	$('.btn-confirm>div>span,.times-left>div>span').text(timesLeft);

	//点击显示/隐藏游戏提示页面
	$('.tips').tap(function(){
		$('.tips-page').show();
	})
	$('.tips-page').tap(function(){
		$(this).hide();
	});

	//点击开始游戏
	$('.start-game').tap(function(){
		if (!timesLeft) {
			$('.pay-page').show();
			return false;
		}
		if (!isMuted) {
			$('#start')[0].play();
		}
		$(this).fadeOut(300);
		$('.tips').fadeOut(300);
		setTimeout(function(){
			$('.machine').animate({transform: 'scale(1,1)'}, 400,'ease-in')
		},400);

		isGameStarted = true;

		// timesLeft--;
		// $('.btn-confirm>div>span,.times-left>div>span').text(timesLeft);
		// $('.fail-page .word span').text(timesLeft);

		// gameSecondLeftCount = setInterval(function(){
		// 	gameSecondLeft--;
		// 	$('.time>span').text(gameSecondLeft);

		// 	if (!gameSecondLeft) {
		// 		$('.fail-page').show();
		// 		$('#fail')[0].play();

		// 		isGameStarted = false;
		// 		clearInterval(gameSecondLeftCount);
		// 	}
		// },1000)

})

	//游戏操作

	//左
	$('.btn-left').on('touchstart', function(event) {
		$('#moving')[0].play();
		var nowLeft = parseFloat($('.hook').css('left'));
		console.log(nowLeft);
		$('.hook').css('left', nowLeft-0.02+'rem');
		btnLeft = setInterval(function(){
			var nowLeft = parseFloat($('.hook').css('left'));
			$('.hook').css('left', nowLeft-0.02+'rem');
		},30)
	});
	$('.btn-left').on('touchend', function(event) {
		clearInterval(btnLeft);
	});

	//右
	$('.btn-right').on('touchstart', function(event) {
		$('#moving')[0].play();
		var nowRight = parseFloat($('.hook').css('left'));
		$('.hook').css('left', nowRight+0.02+'rem');
		btnRight = setInterval(function(){
			var nowRight = parseFloat($('.hook').css('left'));
			$('.hook').css('left', nowRight+0.02+'rem');
		},30)
	});
	$('.btn-right').on('touchend', function(event) {
		clearInterval(btnRight);
	});

	//上
	$('.btn-up').on('touchstart', function(event) {
		if (hookScale == hookScaleMin) {return false};
		$('#moving')[0].play();
		hookScale = hookScale-0.005;
		$('.hook').css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
		$('.hook').css('transform','scale('+hookScale+','+hookScale+')');
		btnUp = setInterval(function(){
			hookScale = hookScale-0.005;
			$('.hook').css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
			$('.hook').css('transform','scale('+hookScale+','+hookScale+')');
			if (hookScale == hookScaleMin) {clearInterval(btnUp);}
		},30)
	});
	$('.btn-up').on('touchend', function(event) {
		clearInterval(btnUp);
	});

	//开关背景音乐
	$('.sound-control').tap(function(){

		if (isMuted) {
			$('#base-bg')[0].play();
		} else {
			$('#base-bg')[0].pause();
		}
		this.style.backgroundImage = isMuted ? 'url(images/sound_04@2x.png)' : 'url(images/sound_03@2x.png)';
		isMuted = !isMuted;
	})


	//支付页面
	$('.add-money').on('touchstart', function(event) {
		if (parseInt($('#money').val())>98) {return false};
		$('#money').val(parseInt($('#money').val())+1);
		startAddMoneyFast = setTimeout(function(){
			addMoneyFast = setInterval(function(){

				$('#money').val(parseInt($('#money').val())+1);
				if (parseInt($('#money').val())>98) {clearInterval(addMoneyFast);}
			},60);
		},500)
	});
	$('.add-money').on('touchend', function(event) {
		clearTimeout(startAddMoneyFast);
		clearInterval(addMoneyFast);
	});

});