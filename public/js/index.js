// Find the right method, call on correct element
function launchIntoFullscreen(element) {
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

function onWindowResize() {
    $("#mainWrapper").height( window.innerHeight );
}

$(function() {
    onWindowResize();
    $(window).resize(onWindowResize);

    $("a.fullscreen").click(function() {
        launchIntoFullscreen(document.documentElement);
    });
    $("#btnGo").click(function() {
        document.location.href = $("#txtBlog").val() + "/";
    });
    $("div.info a").click(function() {
        // $("div.info").css("overflow", "visible");
        $("div.info").css("height", "auto");
    });
});
