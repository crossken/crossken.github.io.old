$(function() {
	// 布局
	$('.md-player').css({'margin-top':$(window).height()*0.03,'margin-bottom':$(window).height()*0.01});
	$('.md-ad').css({'margin-top':$(window).height()*0.02,'margin-bottom':$(window).height()*0.02});

	$('.md-share-btn a').click(function(event) {
		$('.to-share').show();
		return false;
	});
	$('.to-share').click(function(event) {
		$('.to-share').hide();
		return false;
	});

	var Voice = document.getElementById('audio');

	var isLoad = false;
	var isPlaying = false;
	var durationTime;
	var timer;
	var nowSec = 0;

	Voice.addEventListener('loadedmetadata',initTimeDisplay);

	$('.md-player a').click(function(event) {
		if(isLoad && !isPlaying) {
			$('.md-player p').text('0\'\'');
			isPlaying = true;
			nowSec = 1;
			timer = setInterval(function(){
				$('.md-player p').text(nowSec+'\'\'');
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




	function initTimeDisplay() {
		durationTime = Voice.duration;
		console.log(durationTime);
		$('.md-player p').text(parseInt(durationTime)+'\'\'');
		isLoad = true;
	}


});