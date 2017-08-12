var UI = {
    hasStarted : false,
    keys : {
        "zoomMode" : 90,
        "mosaicMode" : 77,
        "next" : 32
    },
    slideInterval : null,

    init : function() {
        $("#sLoading").hide();
        UI.setNextPhoto();
        UI.startSlide();

        $("body").keyup(function(event) {
            // console.log(event.which);
            switch( event.which ) {
                case UI.keys.zoomMode:
                    $("#mainWrapper").toggleClass("zoomMode");
                    break;
                case UI.keys.mosaicMode:
                    $("#mainWrapper").toggleClass("mosaicMode");
                    break;
                case UI.keys.next:
                    UI.setNextPhoto();
                    UI.startSlide();
                    break;
            }
        });
    },
    startSlide : function() {
        if ( UI.slideInterval != null ) {
            clearInterval(UI.slideInterval);
        }
        UI.slideInterval = setInterval( UI.setNextPhoto, Settings.intervalTime );
        UI.hasStarted = true;
    },
    setNextPhoto : function() {
        var nextPhoto = Photos.getNextPhoto();
        if ( nextPhoto != null ) {
            $("#mainWrapper").css("background-image", "url('"+ nextPhoto +"')");
        } else {
            console.log("oops");
        }
    },
    onPhotoLoaded : function(qtyLoaded) {
        if ( !UI.hasStarted ) {
            $("#txtQtyLoaded").text( qtyLoaded );
        }
    }
}
