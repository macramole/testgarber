var Photos = {
    allPhotos : [],
    loadedPhotos : [],
    usedPhotos : [],

    qtyTumblrQueries : 0,

    QTY_PHOTOS_TO_LOAD : 5,

    init : function() {
        Photos.getMorePhotos(null);
    },
    getNextPhoto : function() {
        if ( Photos.loadedPhotos.length == 0 ) {
            return null;
        }

        var randomIndex = Math.floor(Math.random()*Photos.loadedPhotos.length);
        var randomPhoto = Photos.loadedPhotos[randomIndex];
        Photos.usedPhotos.push( randomPhoto );
        Photos.loadedPhotos.splice( randomIndex, 1 )
        return randomPhoto;
    },

    onPhotoLoaded : function() {
        Photos.loadedPhotos.push( this.src );

        //LET THE PHUN BEGIN !
        if ( Photos.loadedPhotos.length == Photos.QTY_PHOTOS_TO_LOAD && !UI.hasStarted ) {
            UI.init();
        }

        UI.onPhotoLoaded( Photos.loadedPhotos.length );

        //ALL PHOTOS LOADED? GRAB MORE!
        if ( Photos.loadedPhotos.length + Photos.usedPhotos.length == Photos.allPhotos.length ) {
            Photos.getMorePhotos(null);
        }
    },
    preparePhotos : function(photos) {
        photos = Photos.filterPhotos(photos);
        Photos.allPhotos = Photos.allPhotos.concat( photos );

        for ( photo of photos ) {
            var img = new Image();
            img.onload = Photos.onPhotoLoaded;
            img.src = photo;
        }
    },
    getMorePhotos : function(callback) {
        $.get(
            "/getPhotos/" + BLOG + "/" + Photos.qtyTumblrQueries,
            {},
            function(response) {
                if ( Photos.allPhotos.length == 0 && response.photos.length == 0 ) {
                    $("#sLoading").html("<div class='error'><h1>Ooops, we are experiencing a heavy crash</h1><div>The tumblr you've entered doesn't exist or the API just don't like it<div></div>");
                }

                Photos.qtyTumblrQueries++;
                Photos.preparePhotos(response.photos);
                if ( callback ) {
                    callback();
                }
            },
            "json"
        );
    },
    filterPhotos : function(photos) {
        var filteredPhotos = [];

        for ( photo of photos ) {
            if ( Settings.gifsOnly ) {
                if ( photo.substr( photo.length - 3 ) == "gif" ) {
                    filteredPhotos.push(photo);
                }
            } else {
                filteredPhotos.push(photo);
            }
        }

        return filteredPhotos;
    }

}
