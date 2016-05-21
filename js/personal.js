$(function() {
	//前端页面测试时，默认为已支付
	var isPayed = true;

	// 布局
	$('.md-player').css({'margin-top':$(window).height()*0.03,'margin-bottom':$(window).height()*0.01});
	$('.md-ad').css({'margin-top':$(window).height()*0.02,'margin-bottom':$(window).height()*0.02});
	$('.md-want-hear').css('top',$(window).height()*0.63);
	$('.md-want-record').css('top',$(window).height()*0.74);
	$('#real-player').css('top',$(window).height()*0.5);
	var progressWidth;
	


    //点击“我要听听”弹出支付模块
    $('.md-want-hear a').click(function(event) {
    	$('#md-pay').show();
    	return false;
    });

	//点击支付按钮，完成后续支付...
	$('.pay-btn').click(function(event) {
		$('#md-pay,.md-want-share').hide();
		$('#player').show();

		// 支付跳转之类的在此书写
		// 若已支付

		if (isPayed) {
			$('.md-want-record,#real-player').show();
			$('.md-want-hear').hide();
			progressWidth = $('.progress').width();
		}

		return false;

	});


	//音频播放
	var Voice = document.getElementById('audio');


	var isLoad = false;
	var isPlaying = false;
	var durationTime;
	var timer;
	var nowSec = 0;

	Voice.addEventListener('loadedmetadata',initTimeDisplay);


	$('.start-btn').click(function(event) {
		if(isLoad && !isPlaying) {
			$('.progress-now').css('width', '0');
			$('.time').text('00:00');
			$('.progress-now').animate({'width': progressWidth}, Voice.duration*1000);
			isPlaying = true;
			nowSec = 1;
			timer = setInterval(function(){
				$('.time').text('00:'+padding(nowSec));
				if (nowSec==parseInt(durationTime)) {
					isPlaying = false;
					clearInterval(timer);
				}
				nowSec++;				
			},1000)
			Voice.play();
		}
		Voice.removeEventListener('canplaythrough',initTimeDisplay);
		return false;
	});




	function padding(number) {
		return number < 10 ? "0" + number : "" + number;  //注意多使用switch
	}

	function initTimeDisplay() {
		durationTime = Voice.duration;
		$('.time').text('00:'+padding(parseInt(durationTime)));
		isLoad = true;
	}





});