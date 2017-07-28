var UI = {
    hasStarted : false,

    init : function() {
        $("#sLoading").hide();
        UI.setNextPhoto();

        setInterval( UI.setNextPhoto, Settings.intervalTime );
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
