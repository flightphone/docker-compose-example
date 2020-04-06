var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const fetch = require('node-fetch');
var stream = require('stream');

var app = express();

var uploadfile = function (req, res)
{
  var filename = req.file.originalname.split(".")[0] + ".pdf";
  var url = 'http://84.201.148.77:3000/unoconv/pdf';
  fetch(url, { method: 'POST', body: req.file.buffer})
    .then(r => r.buffer())
    .then(buf => {
      res.set('Content-disposition', 'attachment; filename=' + filename);
      res.set('Content-Type', 'application/pdf');
      var readStream = new stream.PassThrough();
      readStream.end(buf);
      readStream.pipe(res);

    });
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('web'));
app.post('/upload', upload.single('file'), uploadfile);

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});