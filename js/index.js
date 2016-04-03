window.onload = function(){

	// 管理全局变量
	var aniIndex = 0;
	var slide7IsBack = false;
	var nowDate = new Date();
	var skipSub = false;
	var waveTimer;

	// 禁止默认点击／点触／滑动／双击事件
	$('a').on('tap', 'a', function(event) {
		event.preventDefault();
	}).on('click', 'a', function(event) {
		event.preventDefault();
	});
	document.querySelector('body').addEventListener('touchstart', function (ev) {
		ev.preventDefault();
	});

	// 获取屏幕宽度
	var windowWidth = parseInt($(window).width());

	// 初始化页面框架
	var mainSwiper = new Swiper ('#main-swiper', {
		direction: 'vertical',
		effect : 'fade',
		fade: {
			crossFade: true,
		},
		hashnav: true,
		onlyExternal: true,
		onInit: function(swiper){ 
			swiperAnimateCache(swiper); 
			swiperAnimate(swiper); 
		},
		onSlideChangeStart: function(swiper){
			if (swiper.activeIndex == 2) {
				setTimeout(function(){
					$('#s2-btn').addClass('fadeIn animated');
				},400)
			}
		},
		onSlideChangeEnd: function(swiper){

			swiperAnimate(swiper);

			if (swiper.activeIndex == 2) {

				$('#s1-earth').remove();
				// 电波动效
				var wavesWidth = $('.waves').width(),
				wavesImg = $('.waves img'),
				wavesImgLeft = 0;
				$('.waves').height(wavesImg.height());
				waveTimer = setInterval(function(){
					wavesImgLeft--;
					if (wavesImgLeft < -wavesWidth+1){
						wavesImg.css('left',0);
						wavesImgLeft = 0;
					} else {
						wavesImg.css('left',wavesImgLeft);
					}					
				},15);

				// canvas绘制机器人线条
				setTimeout(function(){
					drawHexagon();
				},300);

				// 添加类名激活CSS3动画
				$('.s2-para1').addClass('s2-para1-ani');
				$('.s2-para2').addClass('s2-para2-ani');
				
				setTimeout(function(){
					$('.waves').addClass('fadeIn animated');
				},3100);
				setTimeout(function(){
					$('#s2-title').addClass('fadeInUp animated');
				},3400);
				setTimeout(function(){
					$('#s2-para').addClass('fadeInUp animated');
				},4000);
				setTimeout(function(){
					$('#s2-logo').addClass('fadeInUp animated');
				},4600);
				setTimeout(function(){
					//显示打字动画
					$('.s2-para1,.s2-para2').css('opacity', '1');
				},2000);
				setTimeout(function(){
					$('#s2-hand').fadeIn(800);
				},7400);
			}

			if (swiper.activeIndex == 3) {

				clearInterval(waveTimer);
				$('.s3-para1').addClass('s3-para1-ani');
				$('.s3-para2').addClass('s3-para2-ani');
				$('#s3-title').addClass('fadeInUp animated');
				setTimeout(function(){
					$('#s3-logo').addClass('fadeInUp animated');
				},700);
				setTimeout(function(){
					$('.s3-para1,.s3-para2').css('opacity', '1');
				},700);
				setTimeout(function(){
					$('#s3-go').addClass('fadeIn animated');
				},3600);


				
			}

			if (swiper.activeIndex == 4) {

				// 技术革命-蒸气时代动效
				$('.steam-house').addClass('bounceInDown animated');
				$('.steam-railway').addClass('fadeInUp animated');
				$('.steam-cloud1').addClass('steam-cloud1-ani');
				$('.steam-cloud2').addClass('steam-cloud2-ani');
				$('.steam-cloud3').addClass('steam-cloud3-ani');
				$('#steam-fulltrain').addClass('fulltrain-run');
				setTimeout(function(){
					if (aniIndex == 0) {
						aniSwiper.slideTo(1, 300, true);
						aniIndex = 1;
						$('#ani-circle').addClass('circle-rotate1');
					}
				},4900);

				// 技术革命底部圆盘动效
				$('#ani-circle').swipeLeft(function(){
					if (aniIndex==0) {
						$(this).addClass('circle-rotate1');
						aniSwiper.slideTo(1, 300, true);	
					}
					if (aniIndex==1) {
						$(this).removeClass().addClass('circle-rotate2');
						aniSwiper.slideTo(2, 300, true);
					}
					if (aniIndex==2) {
						$(this).removeClass().addClass('circle-rotate3');
						mainSwiper.slideTo(5, 300, true);
					}
					aniIndex++;
				});
			}

			if (swiper.activeIndex == 5) {

				aniSwiper.destroy();
				$('#ani-main').remove();
				$('.s4-para1').addClass('s4-para1-ani');
				$('.s4-para2').addClass('s4-para2-ani');
				$('.s4-para3').addClass('s4-para3-ani');
				setTimeout(function(){
					$('.s4-para1,.s4-para2,.s4-para3').css('opacity', '1');
				},700);
				setTimeout(function(){
					$('#s4-go').addClass('fadeIn animated');
				},5300);
			}

			if (swiper.activeIndex == 6) {

				// 0％到90％动效
				setTimeout(function(){
					var s5Para = 0,
					s5Per = $('.s5-percentage');
					var s5Timer = setInterval(function(){
						if(s5Para<90) {
							s5Para++;
							s5Per.html(s5Para+'%');
						} else {
							clearInterval(s5Timer);
						}
					},15);
				},1900);

				$('.s5-para1').addClass('s5-para1-ani');
				$('.s5-para2').addClass('s5-para2-ani');
				setTimeout(function(){
					$('.s5-para1,.s5-para2').css('opacity', '1');
				},700);
				setTimeout(function(){
					$('#s5-go').addClass('fadeIn animated');
				},5000);

			}

			if (swiper.activeIndex == 7) {

				$('.s6-title').addClass('s6-title-ani');
				$('.s6-circle').addClass('s6-circle-ani');
				$('.s6-word1').addClass('s6-circle-ani');
				$('.s6-lt').addClass('s6-lt-ani');
				$('.s6-rb').addClass('s6-rb-ani');

				// 实现未点击过技术／设计／策划页面无法进入下页
				if (!slide7IsBack) {
					$('#s6-btn-wrapper').addClass('s6-btn-wrapper-1');
				} else {
					$('#s6-btn-wrapper').removeClass().addClass('s6-btn-wrapper-2');
					setTimeout(function(){
						$('#s6-go').show();
						$('#s6-go').addClass('fadeIn animated');
					},700);
				}

				$('.s6-btn img:first-child').addClass('s6-btn-ani');
				$('#slide6 .s2-logo').addClass('s6-logo-ani');
			}

			if (swiper.activeIndex == 11) {
				$('.s7-para1').addClass('s7-para1-ani');
				$('.s7-para2').addClass('s7-para2-ani');
				$('.s7-para3').addClass('s7-para3-ani');
				setTimeout(function(){
					$('.s7-para1,.s7-para2,.s7-para3').css('opacity', '1');
				},200);
				setTimeout(function(){
					$('#s7-go').addClass('fadeIn animated');
				},4200);
			}

		}
	});

// 初始化技术革命页面
var aniSwiper = new Swiper ('#ani-swiper', {
	effect : 'fade',
	fade: {
		crossFade: true,
	},
	speed: 300,
	onlyExternal: true,
	onSlideChangeEnd: function(swiper){ 

		if(swiper.activeIndex==1) {
			$('.elec-house').addClass('fadeIn animated');
			$('.elec-cloud2').addClass('elec-cloud2-ani');
			$('.elec-cloud3').addClass('elec-cloud3-ani');
			$('.elec-car').addClass('elec-car-ani');
			$('.elec-bus').addClass('elec-bus-ani');

			setTimeout(function(){
				if (aniIndex == 1) {
					aniSwiper.slideTo(2, 300, true);
					aniIndex = 2;
					$('#ani-circle').addClass('circle-rotate2');
				}
			},4900);
		}
		if (swiper.activeIndex==2) {

			$('.info-house').addClass('fadeIn animated');
			$('.info-cloud1').addClass('info-cloud1-ani');
			$('.info-cloud2').addClass('info-cloud2-ani');
			$('.info-signal').addClass('info-signal-ani');
			$('.info-phone').addClass('info-phone-ani');
			$('.info-robot').addClass('info-robot-ani');

			setTimeout(function(){
				if (aniIndex == 2) {
					mainSwiper.slideTo(5, 500, true);
					aniIndex = 3;
					$('#ani-circle').addClass('circle-rotate3');
				}
			},4900);
		}
	}
}) 

// 渲染启动页
var rblineheight = $('#s2-rbline').height();
$('.s1-c1').css('top',parseInt(windowWidth*0.27));    
$('.s1-c2').css('top',parseInt(windowWidth*0.21));
$('.s1-c3').css('top',parseInt(windowWidth*0.205));
$('#s1-fp').css('top',parseInt(windowWidth*0.53));
$('#s1-earth').css('top',parseInt(windowWidth*0.335));
$('#ani-circle').css('bottom',-parseInt(windowWidth*0.48));

// 渲染欢迎页
$('#s2-robot').css('top',parseInt(windowWidth*0.51));
$('#s2-rbline').css('top',parseInt(windowWidth*0.56));

// 渲染字幕页
$('.sub').css('top', parseInt(windowWidth*0.6));

// 为各链接绑定点触事件
$('.skipSub').tap(function(){
	mainSwiper.slideTo(1, 1500,true);
	skipSub = true;
	setTimeout(function(){
		$('.sub').remove();
	},1200)
});
$('#s1-fp').tap(function(){
	
	$(this).fadeOut(300);
	$('#s1-sbl').fadeOut(300);
	$('.circle').addClass('ani-pause');
	var c1transform = $('#s1-c1').css('transform');
	var c2transform = $('#s1-c2').css('transform');
	var c3transform = $('#s1-c3').css('transform');
	$('#s1-c1').css('transform',c1transform);
	$('#s1-c2').css('transform',c2transform);
	$('#s1-c3').css('transform',c3transform);

	$('#s1-c3').removeClass().addClass('zoomBigOut');
	setTimeout(function(){
		$('#s1-c2').removeClass().addClass('zoomBigOut');
	},100);
	setTimeout(function(){
		$('#s1-c1').removeClass().addClass('zoomBigOut');
	},200);

	$('#s1-earth').addClass('ani-earth');
	setTimeout(function(){		
	},100);
	setTimeout(function(){
		mainSwiper.slideTo(2, 800,true);
	},3200);

});
$('#s2-btn').tap(function() {
	mainSwiper.slideTo(3, 800,true);
});
$('#s4-go').tap(function(event) {
	$('#s4-word1')[0].style='';
	$('#s4-word1').animate({'opacity':0}, 300);
	setTimeout(function(){
		$('#s4-lr').fadeIn(400);
	},600)
	setTimeout(function(){
		$('#slide4 .loading-mask').animate({'width': '37.5%'}, 1000);
	},1300)
	setTimeout(function(){
		mainSwiper.slideTo(6, 800, true);
	},2500)
	$(this).hide();
});
$('#s3-go').tap(function() {
	mainSwiper.slideTo(4, 800,true);
});
$('#s5-go').tap(function() {
	mainSwiper.slideTo(7, 800,true);
});
$('#s6-tech').tap(function() {
	mainSwiper.slideTo(8, 800,true);
})
$('#s6-design').tap(function() {
	mainSwiper.slideTo(9, 800,true);
})
$('#s6-planning').tap(function() {
	mainSwiper.slideTo(10, 800,true);
})
$('.s6-btn').tap(function(){
	slide7IsBack = true;	
})
$('#s6-go').tap(function() {
	mainSwiper.slideTo(11, 800,true);
})
$('.showdoc-back').tap(function() {
	$('#s6-btn-wrapper').css('opacity', '1');
	mainSwiper.slideTo(7, 800,true);
})
$('#s7-go').tap(function() {
	window.location.href = "http://m.la-chance.net/";
})

// 欢迎页显示当前日期
$('#now-date').html('&nbsp;&nbsp;' + nowDate.getFullYear() + ' / ' + padding(nowDate.getMonth()+1) + ' / ' + padding(nowDate.getDate()));
function padding(number) {
	return number < 10 ? "0" + number : "" + number; 
}

//canvas绘图相关
var stepTime = 20;
var canvasDelay = 100;
var d=10;

function drawPic(canvasId,from,to) {
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext("2d");

	var timer=null;
	var t=0,
	c1=to.x-from.x,
	c2=to.y-from.y;

	LineAnim();
	function LineAnim(){
		if (t>d) {
			clearTimeout(timer);
		}
		else{
			var x = from.x+(c1 * t / d),
			y = from.y+(c2 * t / d);
			context.beginPath();
			context.clearRect(0,0,canvas.width, canvas.height);
			context.moveTo(from.x, from.y);
			context.lineTo(x, y);
			context.closePath();
			context.strokeStyle = "#fff";
			context.lineWidth = 3;
			context.stroke();
			t++;
			// console.log(t+new Date().getTime());
			timer = setTimeout(arguments.callee, stepTime);
		}
	}
}



function drawHexagon(){
	drawPic("canvas1",{x:45,y:0}, {x:90,y:30});
	setTimeout(function(){
		drawPic("canvas2",{x:90,y:30},{x:90,y:80});
	},stepTime*d+canvasDelay);
	setTimeout(function(){
		drawPic("canvas3",{x:90,y:80},{x:45,y:110});
	},(stepTime*d+canvasDelay)*2);
	setTimeout(function(){
		drawPic("canvas4",{x:45,y:110},{x:0,y:80});
	},(stepTime*d+canvasDelay)*3);
	setTimeout(function(){
		drawPic("canvas5",{x:0,y:80},{x:0,y:30});
	},(stepTime*d+canvasDelay)*4);
	setTimeout(function(){
		drawPic("canvas6",{x:0,y:30},{x:45,y:0});
	},(stepTime*d+canvasDelay)*5);
}

//加载页面脚本-2

var loadingTimer2 = setInterval(function(){
	if (isTo80) {
		pbWidth = parseFloat(nowProgress.style.width);
		if (pbWidth<88.5) {
			nowProgress.style.width = pbWidth + 0.5 +'%';
		} else {
			
			setTimeout(function(){
				$('.loading').fadeOut(500,function(){
					setTimeout(function(){
						$('.sub').animate({'height':windowWidth*1.15,'top':0}, 12000);
					},100);
					setTimeout(function(){
						if (!skipSub) {
							mainSwiper.slideTo(1, 1500,true);
						}
					},12600);
				});
			},300);
			clearInterval(loadingTimer2);			
		}


	}
},10);

}

