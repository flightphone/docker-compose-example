var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const fetch = require('node-fetch');
var fs = require('fs');
var FormData = require('form-data');
var Duplex = require('stream').Duplex;

var app = express();

var uploadfile = function (req, res) {
  var filename = req.file.originalname.split(".")[0] + ".pdf";
  var url = 'http://84.201.148.77:3000/unoconv/pdf';
  var tmpfile = './web/f' + Math.random().toString();
  var tmpfilepdf = tmpfile + '.pdf';
  fs.writeFile(tmpfile, req.file.buffer, function (err) {
    var form = new FormData();
    form.append('file', fs.createReadStream(tmpfile));
    fetch(url, {
      method: 'POST',
      body: form
    })
      .then(r => r.buffer())
      .then(buf => {
        fs.writeFile(tmpfilepdf, buf, function (err) {
          res.download(tmpfilepdf, filename, function (err) {
            fs.unlink(tmpfilepdf, function(err){});
            fs.unlink(tmpfile, function(err){});
          });
        });

      });


  });


}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('web'));
app.post('/upload', upload.single('file'), uploadfile);

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});