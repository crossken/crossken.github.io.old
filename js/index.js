var isNewPlayer = true;
var timesLeft = 3;
var isGameStarted = false;

var dolls = [{leftMin:2.38,leftMax:2.42,scaleMin:0.98,scaleMax:1}];
var dollsPicSrc = ["images/Rabbit-03@2x.png"]

var isMuted = false;
var addMoneyFast;
var startAddMoneyFast;
var gameSecondLeft = 90;
var gameSecondLeftCount;
var btnUp;
var btnLeft;
var btnDown;
var btnRight;
var resetHookScale;
var hookScale = 1;
var hookScaleMin = 0.7;
var hookScaleMax = 1;
var isTransporting = false;
var changingProgress;
var progressSpeed = 1000;




$(function() {

	$('.hook').css({
		bottom: '4.3rem',
		left : '2.4rem'
	});

	$('#base-bg')[0].pause();

	alert(16);



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

	//将剩余游戏次数、剩余游戏时间写入html中
	$('.btn-confirm>div>span,.times-left>div>span').text(timesLeft);
	$('.time>span').text(gameSecondLeft);


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

	setTimeout(function(){
		$('.worm').animate({left: '5.95rem'}, progressSpeed, 'ease-in-out');
		$('.progress-bar-now').animate({width: '5.25rem'}, progressSpeed, 'ease-in-out');
		setTimeout(function(){
			$('.worm').animate({left: '1.1rem'}, progressSpeed, 'ease-in-out');
			$('.progress-bar-now').animate({width: '0.4rem'}, progressSpeed, 'ease-in-out');
		},progressSpeed+50);
		changingProgress = setInterval(function(){
			$('.worm').animate({left: '5.95rem'}, progressSpeed, 'ease-in-out');
			$('.progress-bar-now').animate({width: '5.25rem'}, progressSpeed, 'ease-in-out');
			setTimeout(function(){
				$('.worm').animate({left: '1.1rem'}, progressSpeed, 'ease-in-out');
				$('.progress-bar-now').animate({width: '0.4rem'}, progressSpeed, 'ease-in-out');
			},progressSpeed+50);
		},progressSpeed*2+100);
	},900)

})

	//游戏操作

	//左
	$('.btn-left').on('touchstart', function(event) {
		event.preventDefault()
		if (!isGameStarted) return false;
		var nowLeft = parseFloat($('.hook').css('left'));
		if (nowLeft <= 0) return false;
		if (!isMuted) {$('#moving')[0].play();}
		$('.hook').css('left', nowLeft-0.02+'rem');
		btnLeft = setInterval(function(){
			var nowLeft = parseFloat($('.hook').css('left'));
			$('.hook').css('left', nowLeft-0.02+'rem');
			if (nowLeft <= 0) {clearInterval(btnLeft);};
		},30)
	});
	$('.btn-left').on('touchend', function(event) {
		clearInterval(btnLeft);
	});

	//右
	$('.btn-right').on('touchstart', function(event) {
		event.preventDefault()
		if (!isGameStarted) return false;
		var nowRight = parseFloat($('.hook').css('left'));
		if (nowRight >= 4.46) return false;
		if (!isMuted) {$('#moving')[0].play();}
		$('.hook').css('left', nowRight+0.02+'rem');
		btnRight = setInterval(function(){
			var nowRight = parseFloat($('.hook').css('left'));
			$('.hook').css('left', nowRight+0.02+'rem');
			if (nowRight >= 4.46) {clearInterval(btnRight);};
		},30)
	});
	$('.btn-right').on('touchend', function(event) {
		clearInterval(btnRight);
	});

	//上
	$('.btn-up').on('touchstart', function(event) {
		event.preventDefault()
		if (!isGameStarted) return false;
		if (hookScale <= hookScaleMin) {return false};
		if (!isMuted) {$('#moving')[0].play();}
		hookScale = hookScale-0.005;
		$('.hook').css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
		$('.hook').css('transform','scale('+hookScale+','+hookScale+')');
		btnUp = setInterval(function(){
			hookScale = hookScale-0.005;
			$('.hook').css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
			$('.hook').css('transform','scale('+hookScale+','+hookScale+')');
			if (hookScale <= hookScaleMin) {clearInterval(btnUp);}
		},30)
	});
	$('.btn-up').on('touchend', function(event) {
		clearInterval(btnUp);
	});

	//下
	$('.btn-down').on('touchstart', function(event) {
		event.preventDefault();
		if (!isGameStarted) return false;
		if (hookScale >= hookScaleMax) {return false};
		if (!isMuted) {$('#moving')[0].play();}
		hookScale = hookScale+0.005;
		$('.hook').css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
		$('.hook').css('transform','scale('+hookScale+','+hookScale+')');
		btnDown = setInterval(function(){
			hookScale = hookScale+0.005;
			$('.hook').css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
			$('.hook').css('transform','scale('+hookScale+','+hookScale+')');
			if (hookScale >= hookScaleMax) {clearInterval(btnDown);}
		},30)
	});
	$('.btn-down').on('touchend', function(event) {
		clearInterval(btnDown);
	});




	//点击ok
	$('.btn-confirm').tap(function(){
		event.preventDefault();
		if (!isGameStarted) return false;
		isGameStarted = false;
		// if (isTransporting) return false;
		clearInterval(changingProgress);
		// var wormPos = $('.worm').css('left');
		// $('.worm').stop(toEnd);
		// $('.worm').css(wormPos);
		// $('.worm').css('transition-property','');

		var nowPosX = parseFloat($('.hook').css('left'));
		for (var i = 0; i < dolls.length; i++) {
			if (dolls[i].leftMin<=nowPosX && nowPosX<=dolls[i].leftMax) {
				if (dolls[i].scaleMin<=hookScale && hookScale<=dolls[i].scaleMax) {
					isTransporting = true;
					transportDoll(i);
					break;
				}
			}
		};
	})

	function transportDoll(dollID){
		$('.hook').animate({'bottom': '0.8rem'}, 1800);
		if (!isMuted) {$('#hook-down')[0].play();}
		setTimeout(function(){
			$('.doll-'+dollID).hide();
			$('.doll-catch').css('background-image', 'url('+dollsPicSrc[dollID]+')');
			$('.hook-sub-left,.hook-sub-right').css('transform', 'rotate(0deg)');
			$('.hook').animate({'bottom': '4.3rem'}, 1600);
		},1800);

		setTimeout(function(){
			btnDown = setInterval(function(){
				hookScale = hookScale+0.005;
				$('.hook').css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
				$('.hook').css('transform','scale('+hookScale+','+hookScale+')');
				if (hookScale >= hookScaleMax) {
					$('.hook').animate({'left': '-0.1rem'}, 1600);
					setTimeout(function(){
						$('.hook-sub-left').css('transform', 'rotate(30deg)');
						$('.hook-sub-right').css('transform', 'rotate(-30deg)');
						$('.doll-'+dollID).css({
							left: '-0.1rem',
							bottom: '3rem'
						}).show();
						$('.doll-catch').css('background-image', '');
						setTimeout(function(){
							$('.doll-'+dollID).animate({'bottom': '-2.2rem'}, 1200);
						},50)
					},1700)
					clearInterval(btnDown);
				}
			},30)
		},3600);
	}

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