  /*
  Author: Nick Smith

  Use: Server written in nodeJS to handle image service

  Un-comment Console logs for debugging
*/
  // Requires for different packages
  var http = require('http');
  url = require('url');
  var https = require('https');
  var fs = require('fs')
  var express = require("express"),
  app = express();
  path = require('path')
  var site = "";

  var UploadHandler = require('./upload-handler');

  app.use(express.bodyParser());
  app.set('view engine', 'jade');
  app.set('views', __dirname + "/views");

  // Configures for the static pages
  app.use('/', express.static(__dirname + '/public'));
  app.use('/api', express.static(__dirname + '/api'));

  // Reads the HTML file for when the form is uploaded
  fs.readFile('submit.html', 'UTF-8', function(err, sitefile) {
    submit_site = sitefile;
  })

  // app.get('/', function(req, res){
  //   res.render('index');
  // });


app.post('/upload', UploadHandler.uploadFile);

// Listening through the port

var port = process.env.PORT || 1337;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
