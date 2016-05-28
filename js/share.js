$(function() {
	// 布局
	$('.md-player').css({'margin-top':$(window).height()*0.03,'margin-bottom':$(window).height()*0.01});
	$('.md-ad').css({'margin-top':$(window).height()*0.02,'margin-bottom':$(window).height()*0.02});
	$('a').click(function(event) {
		event.preventDefault();
	});

	$('.md-share-btn a').tap(function(event) {
		$('.to-share').show();
		return false;
	});
	$('.to-share').tap(function(event) {
		$('.to-share').hide();
		return false;
	});

	var Voice = document.getElementById('audio');



	var isLoad = false;
	var isPlaying = false;
	var isPlayed = false;
	var durationTime;
	var timer;

	Voice.addEventListener('loadedmetadata',initTimeDisplay);

	$('.md-player a').tap(function(event) {
		if(isLoad && !isPlaying) {
			if (isPlayed) {
				$('.md-player p').text('0\'\'');
				isPlayed = false;
			} else {
				$('.md-player p').text(Math.round(Voice.currentTime)+'\'\'');
			}

			isPlaying = true;
			timer = setInterval(function(){
				$('.md-player p').text(Math.round(Voice.currentTime)+'\'\'');
				console.log(Voice.currentTime);	
			},1000)
			Voice.play();
			$('.md-player>a>img').attr('src', 'images/pause-btn.png');
		} else if (isLoad && isPlaying) {
			clearInterval(timer);
			Voice.pause();
			$('.md-player>a>img').attr('src', 'images/share-play-btn.png');
			isPlaying = false;
		}
		return false;
	});

	Voice.addEventListener('ended',function(){
		clearInterval(timer);
		$('.md-player>a>img').attr('src', 'images/share-play-btn.png');
		$('.md-player p').text(Math.round(Voice.currentTime)+'\'\'');
		isPlaying = false;
		isPlayed = true;
	});




	function initTimeDisplay() {
		alert(Voice.duration);
		durationTime = Voice.duration;
		console.log(durationTime);
		$('.md-player p').text(parseInt(durationTime)+'\'\'');
		isLoad = true;
	}


});