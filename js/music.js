var songs = ["彩虹.mp3","传奇1(弹奏).mp3","传奇2(弹奏).mp3","给我一首歌的时间(弹奏).mp3",
"红尘客栈(弹奏).mp3","可惜不是你.mp3", "慢慢.mp3", "明明就(弹奏).m4a","明明就(弹奏)2.m4a",
"那些年.mp3","情歌.mp3","人质.mp3","人质(弹奏).mp3","圣诞快乐(弹奏).mp3","天马座の幻想(弹奏).mp3",
"突然好想你(弹奏).mp3","我的歌声里.mp3","下一个天亮(弹奏).mp3","夜空中最亮的星.mp3",
"指弹.mp3","Let it go.mp3","memory二人版（修改版）.mp3","memory二人版（修改版2）.mp3","what are words(弹奏).mp3","非你莫属.mp3"]


$(function(){
	initPlayList();
	setTimeout(initPlayer, 100);
    $('<img src="/icon/pause.png" />')
});


initPlayList = function(){
	var tpl = 
		'<div style="display:inline-block;width:50%;border:1px solid #BAB7F3;box-sizing:border-box">' +
			"<%_.each(songs, function(song){%>" +
				'<li data-link="music/<%=encodeURIComponent(song)%>"><i class="play-btn"></i><%=song.replace(".mp3", "").replace(".m4a", "")%></li>' +
			"<%});%>" +
		'</div>',
		data, left, right, l = Math.ceil(songs.length / 2) , tfun;
	left = songs.slice(0, l);
	right = songs.slice(l);
	tfun = _.template(tpl);
	data = tfun({songs: left}) + tfun({songs: right});
	$('#playlist-demo').html(data);
}

initPlayer = function(){
	player.pause()
	var $pl = $('#playlist-demo'),
        reset = function() {
            $pl.find('li').removeClass('playing pause')
                .find('.time').remove();
        },
        findCurrItem = function() {
            var link = player.getCur();
            link = link.substring(link.indexOf('music/'));
            return $pl.find('[data-link="' + link + '"]');
        },
        $time = $('<span class="time"></span>');

    $pl.on('click', 'li', function() {
        var $this = $(this),
            sids;
        if ($this.hasClass('playing')) {
            player.pause();
        } else if ($this.hasClass('pause')) {
            player.play();
        } else {
            sids = $this.parent().find('li').map(function() {
                return $(this).data('link');
            }).get();

            player.reset().add(sids)
                .setCur($this.data('link')).play();
        }
    });

    player.on('playing pause', function() {
        reset();
        findCurrItem().addClass(player.getState()).append($time);
    }).on('ended', reset).on('timeupdate', function() {
        $time.text(player.curPos(true) + ' / ' + player.duration(true));
    }).on('player:play', function(){
        reset()
        findCurrItem().addClass("playing");
    });
}