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

function loadSettings() {
    var cookieSettings = Cookies.getJSON("settings");
    if ( typeof cookieSettings != "undefined" ) {
        $("#txtIntervalTime").val( cookieSettings.intervalTime );
        $("#chkGifsOnly")[0].checked = cookieSettings.gifsOnly;
    }
}

$(function() {
    loadSettings();

    onWindowResize();
    $(window).resize(onWindowResize);

    $("a.fullscreen").click(function() {
        launchIntoFullscreen(document.documentElement);
    });
    $("#btnGo").click(function() {
        Cookies.set("settings", {
            intervalTime : $("#txtIntervalTime").val(),
            gifsOnly : $("#chkGifsOnly")[0].checked
        }, { expires: 365 });


        document.location.href = $("#txtBlog").val() + "/";
    });
    $("div.info a").click(function() {
        // $("div.info").css("overflow", "visible");
        $("div.info").css("height", "auto");
        $(this).remove();
    });
    $("a.more").click(function() {
        $(".psst").css("height", "auto");
        $(this).remove();
    });

    $(".psst .tumblrs a").click(function() {
        $("#txtBlog").val( $(this).text() );
    });
});
