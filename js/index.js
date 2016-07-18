var isNewPlayer = true;
var timesLeft = 3;
var isGameStarted = false;

var dolls = [{leftMin:2.38,leftMax:2.42,scaleMin:0.98,scaleMax:1},{leftMin:0.78,leftMax:0.92,scaleMin:0.77,scaleMax:0.85}];
var dollsPos = [{left: '2.4rem',bottom:'0.01rem'},{left: '1rem',bottom:'1.6rem'}];
var dollsPicSrc = ["images/Rabbit-03@2x.png","images/Rabbit-07@2x.png"];
var dollsGetSrc = ["images/Rabbit-01@2x.png","images/Rabbit-01@2x.png"];
var thisDoll;
var dollID;

var isMuted = false;
var setGameSecond = 90;
var hookScale = 1;
var hookScaleMin = 0.7;
var hookScaleMax = 1;
var progressSpeed = 1000;

var gameSecondLeft = setGameSecond;
var isTransporting = false;
var wormPos = '0px';
var gameSecondLeftCount;
var addMoneyFast,startAddMoneyFast;
var btnUp,btnLeft,btnDown,btnRight;
var changingProgress,changingProgress2;
var wormPosMin,wormPosMax,progressBarMin,progressBarMax;
var catchPosMin,catchPosMax;
var nowLeft;

var worm = $('.worm');
var progressBarNow = $('.progress-bar-now');
var timesLeftImg = $('.times-left')[0];
var timesLeftNum = $('.btn-confirm>div>span,.times-left>div>span,.word span');
var gameTimeDisplay = $('.time>span');
var hook = $('.hook');











$(function() {



	wormPosMin = deviceWidth*0.196;
	wormPosMax = deviceWidth*0.84;
	progressBarMin = deviceWidth*0.053;
	progressBarMax = deviceWidth*0.644;

	intLayout();
	setState();
	setGameDiff('easy');


	//若用户为新玩家，则赠送3次免费游戏机会。
	if (isNewPlayer) {
		timesLeft = 3;
		var free = $('.free');
		free.fadeIn(400);
		setTimeout(function(){
			free.fadeOut(500);
		},900);
	}

	//点击显示、隐藏充值页面
	$('.recharge').tap(function(){
		$('#money').val('1');
		$('.pay-page').show();
	})
	$('.cancel-1,.cancel').tap(function(){
		$('.pay-page').hide();
	})

	//将剩余游戏次数、剩余游戏时间写入html中
	timesLeftNum.text(timesLeft);
	gameTimeDisplay.text(setGameSecond);

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

		gameSecondLeftCount = setInterval(function(){
			gameSecondLeft--;
			gameTimeDisplay.text(gameSecondLeft);

			if (!gameSecondLeft) {
				fail();
				clearInterval(changingProgress);
				clearTimeout(changingProgress2);
				clearInterval(gameSecondLeftCount);
			}
		},1000)


		setTimeout(function(){
			$('.worm,.progress-bar-now,.progress-bar,.flag').css('visibility', 'visible');
		},850);
		setTimeout(function(){
			worm.animate({left: wormPosMax}, progressSpeed, 'ease-in-out');
			progressBarNow.animate({width: progressBarMax}, progressSpeed, 'ease-in-out');
			changingProgress2 = setTimeout(function(){
				worm.animate({left: wormPosMin}, progressSpeed, 'ease-in-out');
				progressBarNow.animate({width: progressBarMin}, progressSpeed, 'ease-in-out');
			},progressSpeed+50);
			changingProgress = setInterval(function(){
				worm.animate({left: wormPosMax}, progressSpeed, 'ease-in-out');
				progressBarNow.animate({width: progressBarMax}, progressSpeed, 'ease-in-out');
				changingProgress2 = setTimeout(function(){
					worm.animate({left: wormPosMin}, progressSpeed, 'ease-in-out');
					progressBarNow.animate({width: progressBarMin}, progressSpeed, 'ease-in-out');
				},progressSpeed+50);
			},progressSpeed*2+100);
		},1000)


	})

	//游戏操作



	//左
	$('.btn-left').on('touchstart', function(event) {
		drectionCtrl('left');
	});
	$('.btn-left').on('touchend', function(event) {
		clearInterval(btnLeft);
	});

	//右
	$('.btn-right').on('touchstart', function(event) {
		drectionCtrl('right');
	});
	$('.btn-right').on('touchend', function(event) {
		clearInterval(btnRight);
	});

	//上
	$('.btn-up').on('touchstart', function(event) {
		drectionCtrl('up');		
	});
	$('.btn-up').on('touchend', function(event) {
		clearInterval(btnUp);
	});

	//下
	$('.btn-down').on('touchstart', function(event) {
		drectionCtrl('down');	
	});
	$('.btn-down').on('touchend', function(event) {
		clearInterval(btnDown);
	});




	//点击ok
	$('.btn-confirm').tap(function(){
		event.preventDefault();
		if (!isGameStarted) return false;
		isGameStarted = false;

		//停止停止顶部判定栏运动
		clearInterval(changingProgress);
		clearTimeout(changingProgress2);
		clearInterval(gameSecondLeftCount);
		//固定虫和绿色进度条位置
		wormPos = worm.offset().left;
		var progressBarWidth = progressBarNow.offset().width;
		worm.css('left', wormPos);
		progressBarNow.css('width', progressBarWidth);


		//判断钩子位置是否处于娃娃的预设区域
		nowLeft = parseFloat(hook.css('left'));
		for (var i = 0; i < dolls.length; i++) {
			if (dolls[i].leftMin<=nowLeft && nowLeft<=dolls[i].leftMax) {
				if (dolls[i].scaleMin<=hookScale && hookScale<=dolls[i].scaleMax) {
					isTransporting = true;
					dollID = i;
					transportDoll(i);
					break;
				}
			}
		};

		//若没有位于娃娃预设的区域
		if (!isTransporting) {
			hook.animate({'bottom': (1-hookScale)*6+0.8+'rem'},1800,'linear',function(){
				$('.hook-sub-left,.hook-sub-right').css('transform', 'rotate(0deg)');
				hook.animate({'bottom': '2.8rem'},800);
				setTimeout(function(){
					fail();
				},900)
			});
			if (!isMuted) {$('#hook-down')[0].play();}
		}
	})




$('.continue').tap(function(){
	resetState();
	$('.fail-page').hide();
})

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
		event.preventDefault();
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


	$('.pay-page .confirm').tap(function(){
		alert('待开发');
		wx.chooseWXPay({
    		timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    		nonceStr: '', // 支付签名随机串，不长于 32 位
    		package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    		signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    		paySign: '', // 支付签名
    		success: function (res) {

        		timesLeft = timesLeft + //充值的次数；

        		//用新的游戏剩余次数更新页面
        		timesLeftNum.text(timesLeft);
        		timesLeftImg.style.backgroundImage = 'url(images/heart03@2x.png)';
        	}
        });
	})

	//成功夹到

	$('.success-page .submit').tap(function(event){
		if ($('#name').val() == '') {
			alert('请填写您的姓名!');
			return;
		}
		if ($('#tel').val() == '') {
			alert('请填写您的电话!');
			return;
		}
		if ($('#address').val() == '') {
			alert('请填写您的地址!');
			return;
		}

		//ajax提交，成功则回到初始状态
		

		
		resetState();

		//timesLeft此时与数据库同步
		alert('您的信息已成功提交!');
		$('.success-page').hide();
	});

});




function intLayout() {
	worm.css('left', wormPosMin);
	progressBarNow.width(progressBarMin);
	hook.css({
		bottom: '4.3rem',
		left : '2.4rem'
	});
}

function setState() {	
	hookScale = 1;
	hook.css('-webkit-transform', 'scale(1,1)');
	hook.css('transform', 'scale(1,1)');
	isTransporting = false;
	if (!timesLeft) {
		timesLeftImg.style.backgroundImage = 'url(images/heart04@2x.png)';
	}
}

function setGameDiff(difficulty){
	switch (difficulty) {
		case 'easy':
		catchPosMin = deviceWidth*0.5;
		catchPosMax = deviceWidth*0.7;
		break;
		case 'normal':
		catchPosMin = deviceWidth*0.587;
		catchPosMax = deviceWidth*0.626;
		break;
		default:
		catchPosMin = deviceWidth*0.587;
		catchPosMax = deviceWidth*0.626;
	}
}

function resetState(){
	intLayout();
	setState();
	gameSecondLeft = setGameSecond;
	gameTimeDisplay.text(gameSecondLeft);
	if (thisDoll) {
		thisDoll.css({
			'left': dollsPos[dollID].left,
			'bottom': dollsPos[dollID].bottom
		});
	}
	$('.hook-sub-left').css('transform', 'rotate(30deg)');
	$('.hook-sub-right').css('transform', 'rotate(-30deg)');
	$('.worm,.progress-bar-now,.progress-bar,.flag').css('visibility', 'hidden');
	$('.machine').css('transform','scale(0.766,0.766)');
	$('.tips,.start-game').show();
}

function fail() {
	timesLeft--;
	timesLeftNum.text(timesLeft);
	$('.fail-page').show();
	$('#fail')[0].play();
	isGameStarted = false;
}

function success() {
	timesLeft--;
	timesLeftNum.text(timesLeft);
	$('.success-page').show();
	$('#success')[0].play();
}

function transportDoll(dollID){
	hook.animate({'bottom': (1-hookScale)*6+0.8+'rem'}, 1800);
	if (!isMuted) {$('#hook-down')[0].play();}
	thisDoll = $('.doll-'+dollID);
	setTimeout(function(){
		thisDoll.hide();
		$('.doll-catch').css('background-image', 'url('+dollsPicSrc[dollID]+')');
		$('.hook-sub-left,.hook-sub-right').css('transform', 'rotate(0deg)');
		hook.animate({'bottom': '4.3rem'}, 1600);
	},1850);

	if (wormPos<catchPosMax && wormPos>catchPosMin) {
		setTimeout(function(){
			btnDown = setInterval(function(){
				if (hookScale >= hookScaleMax) {
					hook.animate({'left': '-0.1rem'}, 1600);
					setTimeout(function(){
						$('.hook-sub-left').css('transform', 'rotate(30deg)');
						$('.hook-sub-right').css('transform', 'rotate(-30deg)');
						thisDoll.css({
							left: '-0.1rem',
							bottom: '3rem'
						}).show();
						$('.doll-catch').css('background-image', '');
						setTimeout(function(){
							thisDoll.animate({'bottom': '-2.2rem'}, 1200, 'linear', function(){
								success();
							});
						},50)
					},1700)
					clearInterval(btnDown);
				} else {
					hookScale = hookScale+0.005;
					hook.css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
					hook.css('transform','scale('+hookScale+','+hookScale+')');
				}
			},30)
		},3600);
	} else {
		setTimeout(function(){
			$('.hook-sub-left').css('transform', 'rotate(30deg)');
			$('.hook-sub-right').css('transform', 'rotate(-30deg)');
			thisDoll.css({bottom: '3rem'}).show();
			$('.doll-catch').css('background-image', '');
			$('.fail-page .word span').text(timesLeft);
			setTimeout(function(){
				thisDoll.animate({'bottom': dollsPos[dollID].bottom}, 1200, 'linear', function(){
					fail();
				});
			},50)
		},3600);
	}


}


function drectionCtrl(drec){
	event.preventDefault();
	if (!isGameStarted) return false;
	switch (drec) {
		case 'left':
			nowLeft = parseFloat(hook.css('left'));
			if (nowLeft <= 0) return false;
			if (!isMuted) {$('#moving')[0].play();}
			hook.css('left', nowLeft-0.02+'rem');
			btnLeft = setInterval(function(){
				nowLeft = parseFloat(hook.css('left'));
				hook.css('left', nowLeft-0.02+'rem');
				if (nowLeft <= 0) {clearInterval(btnLeft);};
			},30);
			break;
		case 'right':
			nowLeft = parseFloat(hook.css('left'));
			if (nowLeft >= 4.46) return false;
			if (!isMuted) {$('#moving')[0].play();}
			hook.css('left', nowLeft+0.02+'rem');
			btnRight = setInterval(function(){
				nowLeft = parseFloat(hook.css('left'));
				hook.css('left', nowLeft+0.02+'rem');
				if (nowLeft >= 4.46) {clearInterval(btnRight);};
			},30);
			break;
		case 'up':
			if (hookScale <= hookScaleMin) {return false};
			if (!isMuted) {$('#moving')[0].play();}
			hookScale = hookScale-0.005;
			hook.css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
			hook.css('transform','scale('+hookScale+','+hookScale+')');
			btnUp = setInterval(function(){
				hookScale = hookScale-0.005;
				hook.css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
				hook.css('transform','scale('+hookScale+','+hookScale+')');
				if (hookScale <= hookScaleMin) {clearInterval(btnUp);}
			},30);
			break;
		case 'down':
			if (hookScale >= hookScaleMax) {return false};
			if (!isMuted) {$('#moving')[0].play();}
			hookScale = hookScale+0.005;
			hook.css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
			hook.css('transform','scale('+hookScale+','+hookScale+')');
			btnDown = setInterval(function(){
				hookScale = hookScale+0.005;
				hook.css('-webkit-transform', 'scale('+hookScale+','+hookScale+')');
				hook.css('transform','scale('+hookScale+','+hookScale+')');
				if (hookScale >= hookScaleMax) {clearInterval(btnDown);}
			},30);
			break;
		default:
			return false;
	}
}