$(function() {

	// 布局
	var rankingHeight = $('.md-ranking>img').height();
	$('.md-ranking>img').css('top', rankingHeight*(-0.15));
	$('.md-ranking>ul').css({'top':rankingHeight*(0.3),'height':rankingHeight*0.44});
	$('.record-btn').css('height', $('.record-btn').width()*0.2282);
	$('a').click(function(event) {
		event.preventDefault();
	});




	// 录音
	var el = document.querySelector('.record-btn');
	var startPosition, endPosition, deltaX, deltaY;

	//点击开始录音
	el.addEventListener('touchstart', function (e) {
		e.preventDefault();
		var touch = e.touches[0];
		startPosition = {
			x: touch.pageX,
			y: touch.pageY
		}

		$('.cancel').show();

		//调用微信开始录音的接口
		wx.startRecord();

	});


	el.addEventListener('touchmove', function (e) {
            var touch = e.touches[0];
            endPosition = {
                x: touch.pageX,
                y: touch.pageY
            }

            deltaY = endPosition.y - startPosition.y;

           if (deltaY<-30) {
           		$('.cancel img').attr('src', 'images/cancel-2.png');
           } else {
           		$('.cancel img').attr('src', 'images/cancel.png');
           }

    });


	//松开手停止录音
	el.addEventListener('touchend', function (e) {

		//如果是上滑取消录音
		if ((deltaY)<-30) {
			$('.cancel').hide();
			$('.cancel img').attr('src', 'images/cancel.png');

			// 取消录音？

		} else {
			wx.stopRecord({
				success: function (res) {
					var localId = res.localId;
					wx.uploadVoice({
    					localId: '', 
    					isShowProgressTips: 1, 
    					success: function (res) {
        					var serverId = res.serverId; 
   						}
					});
				}
			});
		}

		$('.cancel').hide();
		deltaY = 0;
		return false;
	})


	wx.onVoiceRecordEnd({
    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
    complete: function (res) {
    	var localId = res.localId; 
    	wx.uploadVoice({
    		localId: '',
    		isShowProgressTips: 1, 
    		success: function (res) {
        		var serverId = res.serverId; 
   			}
		});

		$('.cancel').hide();
		$('.cancel img').attr('src', 'images/cancel.png');

		//window.location.href="share.html“; 
    }
});



});