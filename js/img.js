var albumNum = {
    '1' : 10
}

var albums = [
    {
        id: '',
        name: '',
        imgNum: '',
        catelog: ''

    }
]

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
    _.forEach(albums, function(album){
        var id = album.id,
            name = album.name,
            num = album.name,
            catelog = album.catelog;
        var tpl =   '<div class="portfolio <%=catelog%> mix_all" data-cat="<%=catelog%>" style="display: inline-block; opacity: 1;">' +
                        '<div class="portfolio-wrapper">' +
                            '<a href="gallery.html/?albun=<%albumId%>&imgNum=<%imgNum%>">' +
                                '<img src="images/album/<%=albumId%>/<%imgNum%>.jpg" alt="<%=name%>">' +
                            '</a>' +
                            '<div class="links">' +
                                '<h4><a href=""><%=name%></a></h4>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

    });
}

function renderImage(){
    var album = query.album || 1,
        num = albumNum[album],
        tpl = '';
    for(var i = 1; i <= num; i++){
        tpl +=
            '<li><a href="#">' +
                '<img src="images/album/' + album + '/' + i + '.jpg" data-large="images/album/' + album + '/' + i + '.jpg"/>' +
            '</a></li>'
    }
    for(var i = 1; i <= num; i++){
        tpl +=
            '<li><a href="#">' +
                '<img src="images/album/' + album + '/' + i + '.jpg" data-large="images/' + i + '.jpg"/>' +
            '</a></li>'
    }
    $('.es-carousel').html('<ul>' + tpl + '</ul>')
}

function renderImageFlow(){
    var tpl = '';
    for(var i = 1; i <= 10; i++){
        tpl +=
            '<li>' +
                '<a href="images/album/1/' + i + '.jpg" rel="lightbox" class="cboxElement">' +
                    '<img src="images/album/1/' + i + '.jpg" width="200" height="auto">' +
                '</a>' +
            '</li>'
    }
    for(var i = 1; i <= 10; i++){
        tpl +=
            '<li>' +
                '<a href="images/album/1/' + i + '.jpg" rel="lightbox" class="cboxElement">' +
                    '<img src="images/album/1/' + i + '.jpg" width="200" height="auto">' +
                '</a>' +
            '</li>'
    }
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
