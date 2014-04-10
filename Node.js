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
  
  var CryptoJS = require("crypto-js");

  app.use(express.bodyParser()); 

  // Configures for the static pages
  app.configure(function(){app.use('/', express.static(__dirname + '/public'));})
  app.configure(function(){app.use('/api', express.static(__dirname + '/api'));})



  // Reads the HTML file for when the form is uploaded
  fs.readFile('submit.html', 'UTF-8', function(err, sitefile) {
        submit_site = sitefile;
      })
  

// Handle for when the form is submited
app.post("/upload", function (req, res) {

// Get the name of the file
  var filename=req.files.file.name;

// Get the name of the email
  var emailname = req.body.email;

// console.log('name of the text written:')
// console.log(req.body.email)

  var msg="";
  var i = filename.lastIndexOf('.');

// console.log("File Path")
// console.log(req.files.file.path)

// Creating the api by converting the email to MD5 hash and naming the image that in the api
  var target_path = __dirname +'/api/' + CryptoJS.MD5(emailname);; 

 //  console.log("The Paths are: ")
 //  console.log(target_path)
 

 // Reading the file that is submitted
  fs.readFile(req.files.file.path, function (err, data) {
  // Writing that file that was read and putting it in the taget path
    fs.writeFile(target_path, data, function (err) {
  });

    
    });


  msg="File uploaded sucessfully" 

  // Sending the submit site 
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(submit_site)
  res.end();

});

// Listening through the port

var port = process.env.PORT || 1337;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
