const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

var tumblr = require('tumblr');
var oauth = {
  consumer_key: process.env.OAUTH_CONSUMER_KEY,
  consumer_secret: process.env.OAUTH_CONSUMER_SECRET
};
const TUMBLR_LIMIT = 20;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render("index");
});
app.get('/:blog', function (req, res) {
    res.render("main", { blog : req.params.blog });
});

app.get('/getPhotos/:blog/:offset', function (req, res) {
    var blog = new tumblr.Blog(req.params.blog + '.tumblr.com', oauth);
    var offset = req.params.offset * TUMBLR_LIMIT;

    blog.photo({ limit: TUMBLR_LIMIT, offset: offset }, function(error, response) {
      var ret = {
          status : "ok",
          photos : []
      };

      if (!error) {
          for ( photo of response.posts ) {
              ret.photos.push( photo.photos[0].original_size.url );
          }
      } else {
          console.log(error);
          ret.status = "error";
      }

      res.send(ret);
    });
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})
