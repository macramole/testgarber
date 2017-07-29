var Settings = {
    gifsOnly : true,
    intervalTime : 20000,

    init : function() {
        var cookieSettings = Cookies.getJSON("settings");

        if ( typeof cookieSettings != "undefined" ) {
            Settings.gifsOnly = cookieSettings.gifsOnly;
            Settings.intervalTime = cookieSettings.intervalTime * 1000;
        }
    }
}
