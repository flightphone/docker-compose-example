var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const fetch = require('node-fetch');
var fs = require('fs');
var FormData = require('form-data');
const Readable = require('stream').Readable ;

var app = express();

var uploadfile = function (req, res)
{
  var filename = req.file.originalname.split(".")[0] + ".pdf";
  var url = 'http://84.201.148.77:3000/unoconv/pdf';
  var form = new FormData();
  stream = new Readable ();
  stream.push(req.file.buffer);
  stream.push(null);
  form.append('file', stream);
  fetch(url, { 
    method: 'POST', 
    body: form
    })
    .then(r => r.buffer())
    .then(buf => {
      fs.writeFile("aaa.pdf", buf, function (err) {
        return;
    });
    res.send("ok");
    });
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('web'));
app.post('/upload', upload.single('file'), uploadfile);

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});