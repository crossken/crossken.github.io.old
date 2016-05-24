$(function() {

	// alert('19');

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
	var isStarted = false,upLoading = false;
	var voice = {
		localId: '',
		serverId: ''
	};

	//点击开始录音
	$(el).tap(function(){

		if (upLoading) return false;

		if (!isStarted) {

			$('.cancel').show();
			$('.record-btn').css('background-image', 'url(images/record-end.png)');

			wx.startRecord({
				cancel: function () {
					
					alert('用户拒绝授权录音');

					$('.cancel').hide();
					$('.record-btn').css('background-image', 'url(images/record-btn.png)');
					isStarted = false;
				}
			});

			isStarted = true;

		} else {

			$('.cancel').hide();
			$('.record-btn').css('background-image', 'url(images/waiting.png)');
			upLoading = true;

			wx.stopRecord({
				success: function (res) {
					voice.localId = res.localId;
					if (voice.localId == '') {
						alert('请先使用 startRecord 接口录制一段声音');
						return;
					}
					wx.uploadVoice({
						localId: voice.localId, 
						isShowProgressTips: 1, 
						success: function (res) {
							voice.serverId = res.serverId; 
							$.ajax({
								type: "POST",
								url : $("#url").val(),
								data: {"media_id" : voice.serverId, "openid" : $("#opid").val()},
								dataType : "json",
								success:function(data){
									if(data.res == 'ok'){
										window.location.href = _site  + "/uploadv/share/" + data.openid + "/" + data.vid;
									}
								}
							})
						}
					});
				}
			});

		}



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
			$('.record-btn').css('background-image', 'url(images/record-btn.png)');


	}
});



});