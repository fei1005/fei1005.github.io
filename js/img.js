var collection = {};

var albums = [
    ['作品', 3, 'wenti'],
    ['运动', 14, "wenti"],
    ['自拍', 34, 'qingchun'],
    ['服饰文化节', 8, 'wenti'],
    ["指挥", 5, 'wenti'],
    ["写真",  6, 'qingchun' ],
    ['戏剧', 1, 'wenti'],
    ['其他', 36, 'lvyou'],
    ["校园生活", 23, 'xiaoyuan'],
    ['毕业', 22, 'xiaoyuan'],
    ["厦门", 58, 'lvyou'],
    ['街拍', 7, 'qingchun'],
    ['合影', 4, 'xiaoyuan'],
    ['点滴', 52, 'shenghuo'],
    ["海边", 10, 'lvyou'],
    ["景山", 4, 'lvyou'],
    ["云台山-洛阳", 21, 'lvyou']
]
var flow = [5, 2];
var include = ["毕业/1","厦门/53", "指挥/5"]

$(function(){
    if(curRoute() === 'gallery'){
        renderImage();
    }
    if(curRoute() === 'index'){
        renderImageFlow();
    }
    if(curRoute() === 'album'){
        renderAlbum();
    }
})

function renderAlbum(){
    var dom = ''
    var tpl = _.template('<div class="portfolio <%=catelog%> mix_all" data-cat="<%=catelog%>" style="display: inline-block; opacity: 1;">' +
                    '<div class="portfolio-wrapper">' +
                        '<a href="gallery.html?name=<%=name%>&num=<%=num%>">' +
                            '<img src="photo/<%=name%>/1.jpg" alt="<%=name%>" style="height:300px;margin:auto;">' +
                        '</a>' +
                        '<div class="links">' +
                            '<h4><a href=""><%=name%></a></h4>' +
                        '</div>' +
                    '</div>' +
                '</div>')
    _.forEach(albums, function(album){
        a = {name:album[0], num: album[1], catelog: album[2]};
        dom += tpl(a);
    });
    $('.wrapper').html(dom + '<div class="clear"> </div>')
}

function renderImage(){
    var album = query.name || '作品',
        num = query.num || 3,
        tpl = '';
    for(var i = 1; i <= num; i++){
        tpl +=
            '<li><a href="#">' +
                '<img src="photo/' + album + '/' + i + '.jpg" data-large="photo/' + album + '/' + i + '.jpg"/>' +
            '</a></li>'
    }

    $('.es-carousel').html('<ul>' + tpl + '</ul>')
}

function renderImageFlow(){
    var tpl = '';

    _.each(flow, function(num){
        var a = albums[num];
        for(var i = 1; i <= a[1]; i++){
            if(a[0] == "自拍"){
                if(i == 9 || i == 10 || i == 27 || i == 11 || i == 17 || i == 24){
                    continue ;
                }
            }
        tpl +=
            '<li>' +
                '<a href="photo/' + a[0] + "/" + i + '.jpg" rel="lightbox" class="cboxElement">' +
                    '<img src="photo/' + a[0] + "/" + i + '.jpg" width="200" height="auto">' +
                '</a>' +
            '</li>'
    }
    });

    _.each(include, function(path){
        tpl +=
            '<li>' +
                '<a href="photo/' + path + '.jpg" rel="lightbox" class="cboxElement">' +
                    '<img src="photo/' + path + '.jpg" width="200" height="auto">' +
                '</a>' +
            '</li>'
    })

    $('#tiles').html(tpl);

    $('#tiles').imagesLoaded(function() {
        // Prepare layout options.
        var options = {
            autoResize: true, // This will auto-update the layout when the browser window is resized.
            container: $('#main1'), // Optional, used for some extra CSS styling
            offset: 2, // Optional, the distance between grid items
            itemWidth: 200 // Optional, the width of a grid item
        };

        // Get a reference to your grid items.
        var handler = $('#tiles li');

        // Call the layout function.
        handler.wookmark(options);

        // Init lightbox
        $('a', handler).colorbox({
            rel: 'lightbox'
        });
    });
}
