function onWindowResize() {
    $("#mainWrapper").height( window.innerHeight );
}

$(function() {
    onWindowResize();
    $(window).resize(onWindowResize);

    $("#txtQtyLoadedMax").text( Photos.QTY_PHOTOS_TO_LOAD );

    Photos.init();
});
