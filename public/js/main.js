function onWindowResize() {
    $("#mainWrapper").height( window.innerHeight );
}

function launchIntoFullscreen() {
    var element = document.documentElement;

  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

$(function() {
    onWindowResize();
    $(window).resize(onWindowResize);

    $("#txtQtyLoadedMax").text( Photos.QTY_PHOTOS_TO_LOAD );
    $("#goFullscreen").click( launchIntoFullscreen );

    Settings.init();
    Photos.init();
});
