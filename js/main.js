$(function() {
	init();
})

function playbgm(){
	window.player = new _mu.Player({
            mode: 'list',
            baseDir: 'http://labs.music.baidu.com/muplayer/doc/dist'
        });
	player.reset().setCur(encodeURIComponent("/music/夜空中最亮的星.mp3"))
	startTime = sessionStorage.getItem('PLAYER:time') || 0
	player.play(startTime);
	player.on('timeupdate', function(t){
		sessionStorage.setItem('PLAYER:time', t);
	});
}

function init() {
	renderFooter();
	renderHeader();
    playbgm();
}

function renderHeader() {
	var header =
		'<div class="wrap">' +
		'<div class="logo">' +
		'<a href="index.html"><img src="images/logo.png"/></a>' +
		'</div>' +
		'<div class="cssmenu">' +
		'<ul>' +
		'<li><a href="index.html" class="head-btn">首页</a></li>' +
		'<li><a href="album.html" class="head-btn">相册</a></li> ' +
		'<li><a href="music.html" class="head-btn">音乐</a></li>' +
		'<li><a href="blog.html" class="head-btn">文章</a></li>' +
		'<li><a href="about.html" class="head-btn">关于</a></li>' +
		'</ul>' +
		'</div>' +
		'<div class="clear"></div>' +
		'</div>',
		$header = $(header),
		route = curRoute();
	if (route == '404') route = 'index'
	if (route == 'single') route = 'blog'
	if (route == 'gallery') route = 'album'

	$header.find('a[href="' + route + '.html"]').parent().addClass('active');
	$('.header').append($header)

}

function renderFooter() {
	var footer =
		'<div class="footer-bottom">' +
		'<div class="wrap">' +
		'<div class="copy">' +
		'<p class="copy">© 2014 by dracupid</p>' +
		'</div>' +
		'<div class="clear"></div>' +
		'</div>' +
		'</div>';
	$('.footer').html(footer);
}

window.curRoute = function curRoute() {
	var url = window.location.href.split('/');
	url = url[url.length - 1].split('.')[0];
	if (!url) {
		url = 'index'
	}
	return url
}


window.query = function(qs) {
	var key, kv, parsed, pieces, tuple, value, _i, _len;
	parsed = {};
	if (_.isString(qs) && qs.length > 0) {
		if (qs[0] === '?') {
			qs = qs.substring(1);
		}
		pieces = qs.split('&');
		for (_i = 0, _len = pieces.length; _i < _len; _i++) {
			kv = pieces[_i];
			if (kv === '') {
				continue;
			}
			tuple = kv.split('=');
			key = decodeURIComponent(tuple.shift()).trim();
			value = decodeURIComponent(tuple.join('=')).trim();
			if (key === '') {
				continue;
			}
			if (_.isUndefined(parsed[key])) {
				parsed[key] = value;
			} else if (_.isArray(parsed[key])) {
				parsed[key].push(value);
			} else {
				parsed[key] = [parsed[key], value];
			}
		}
	}
	return parsed;
}(window.location.search)