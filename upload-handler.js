var CryptoJS = require("crypto-js");
var fs = require('fs');

exports.uploadFile = function(req, res) {

  var filename = req.files.file.name;
  var emailname = req.body.email;

  var target_path = __dirname +'/api/' + CryptoJS.MD5(emailname);

  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile(target_path, data, function (err) {});
  });

  res.render('submit');
}
