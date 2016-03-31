$(document).ready(function() {









});

window.onload = function(){
		// alert(1);
	// setInterval(function(){
	// 	console.log($('#s1-c1').css('transform'));
	// },30)
			// 禁止默认点击／点触时间
			$('a').on('tap', 'a', function(event) {
				event.preventDefault();
			}).on('click', 'a', function(event) {
				event.preventDefault();
			});

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
				onSlideChangeEnd: function(swiper){ 
					swiperAnimate(swiper);

					if (swiper.activeIndex == 1) {

						setTimeout(function(){
							drawHexagon();
						},700)
					}
					if (swiper.activeIndex == 2) {


					}

					if (swiper.activeIndex == 3) {
						var aniSwiper = new Swiper ('#ani-swiper', {
							effect : 'fade',
							fade: {
								crossFade: true,
							},
							onlyExternal: true,
							onInit: function(swiper){ 
								swiperAnimateCache(swiper); 
								swiperAnimate(swiper); 
							},
							onSlideChangeEnd: function(swiper){ 
								swiperAnimate(swiper);	
							}
						})  
						var aniIndex = 0;
						$('#ani-circle').swipeLeft(function(){
							if (aniIndex==0) {
								$(this).addClass('circle-rotate1');
								aniSwiper.slideTo(1, 800, true);	
							}
							if (aniIndex==1) {
								$(this).removeClass().addClass('circle-rotate2');
								aniSwiper.slideTo(2, 800, true);
							}
							if (aniIndex==2) {
								$(this).removeClass().addClass('circle-rotate3');
								mainSwiper.slideTo(4, 800, true);
							}
							aniIndex++;	

						})
					}



				},
				onTransitionEnd: function(swiper){


				}
			})


$('#ani-swiper').tap(function(){

})



var windowWidth = parseInt($(window).width());
var rblineheight = $('#s2-rbline').height();
$('.s1-c1').css('top',parseInt(windowWidth*0.27));    
$('.s1-c2').css('top',parseInt(windowWidth*0.21));
$('.s1-c3').css('top',parseInt(windowWidth*0.205));
$('#s1-fp').css('top',parseInt(windowWidth*0.53));
$('#s1-earth').css('top',parseInt(windowWidth*0.335));
$('#ani-circle').css('bottom',-parseInt(windowWidth*0.48));

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
		
	},100)
	setTimeout(function(){
		mainSwiper.slideTo(1, 1200,true);
	},3200)

	

})
$('#s2-btn').tap(function() {
	mainSwiper.slideTo(2, 800,true);

});

$('#s2-robot').css('top',parseInt(windowWidth*0.51));
$('#s2-rbline').css('top',parseInt(windowWidth*0.56));

var nowDate = new Date();
$('#now-date').html('&nbsp;&nbsp;' + nowDate.getFullYear() + ' / ' + padding(nowDate.getMonth()+1) + ' / ' + padding(nowDate.getDate()));

$('#ani-1').css('top',parseInt(windowWidth*0.32));

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
		mainSwiper.slideTo(5, 800, true);
	},2500)
});

$('#s3-go').tap(function() {
	mainSwiper.slideTo(3, 800,true);
});

$('#s5-go').tap(function() {
	mainSwiper.slideTo(6, 800,true);
});
$('#s6-tech').tap(function() {
	mainSwiper.slideTo(7, 800,true);
})
$('#s6-design').tap(function() {
	mainSwiper.slideTo(8, 800,true);
})
$('#s6-planning').tap(function() {
	mainSwiper.slideTo(9, 800,true);
})
$('#s6-go').tap(function() {
	mainSwiper.slideTo(10, 800,true);
})
$('.showdoc-back').tap(function() {
	mainSwiper.slideTo(6, 800,true);
})
$('#s7-go').tap(function() {
	window.location.href = "http://m.la-chance.net/";
})

var stepTime = 4;
var canvasDelay = 200;

function drawPic(canvasId,from,to) {
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext("2d");

	var timer=null;
	var t=0,
	c1=to.x-from.x,
	c2=to.y-from.y,
	d=50;
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
			timer = setTimeout(arguments.callee, stepTime);
		}
	}
}



function drawHexagon(){
	drawPic("canvas1",{x:45,y:0}, {x:90,y:30});
	setTimeout(function(){
		drawPic("canvas2",{x:90,y:30},{x:90,y:80});
	},stepTime*50+canvasDelay);
	setTimeout(function(){
		drawPic("canvas3",{x:90,y:80},{x:45,y:110});
	},(stepTime*50+canvasDelay)*2);
	setTimeout(function(){
		drawPic("canvas4",{x:45,y:110},{x:0,y:80});
	},(stepTime*50+canvasDelay)*3);
	setTimeout(function(){
		drawPic("canvas5",{x:0,y:80},{x:0,y:30});
	},(stepTime*50+canvasDelay)*4);
	setTimeout(function(){
		drawPic("canvas6",{x:0,y:30},{x:45,y:0});
	},(stepTime*50+canvasDelay)*5);
}


var nowProgress2 = document.getElementById('nowprogress');
nowProgress2.style.width = '0%';
var loadingTimer2 = setInterval(function(){
var pbWidth2 = parseFloat(nowProgress2.style.width);
			if (pbWidth2<88.5) {
				nowProgress2.style.width = pbWidth2 + 0.5 +'%';
			} else {
				clearInterval(loadingTimer);
				// setTimeout(function())
				setTimeout(function(){
					$('.loading').fadeOut(500);
				},300)
			}
		},20);
}

function padding(number) {
	return number < 10 ? "0" + number : "" + number; 
}

