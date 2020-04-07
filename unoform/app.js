var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const fetch = require('node-fetch');
var fs = require('fs');
var FormData = require('form-data');
//var streamifier = require('streamifier');


var app = express();
var convhost = process.env.CONV_HOST || '84.201.148.77'
var convport = process.env.CONV_PORT || '3000'
var uploadfile = function (req, res) {
  var filename = req.file.originalname.split(".")[0] + ".pdf";
  var url = 'http://' + convhost + ':' + convport + '/unoconv/pdf';
  var tmpfile = './web/f' + Math.random().toString();
  fs.writeFile(tmpfile, req.file.buffer, function (err) 
  {
    var form = new FormData();
    form.append('file', fs.createReadStream(tmpfile));
    //form.append('file', streamifier.createReadStream(req.file.buffer));

    fetch(url, {
      method: 'POST',
      body: form
    }).then(r => r.buffer())
      .then(buf => {

        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="' + encodeURIComponent(filename) + '"',
          'Content-Length': buf.length
        });
        res.end(buf);
        fs.unlink(tmpfile, function (err){});
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


function convert(buf, chunkSize) {
  if (typeof buf === 'string') {
    buf = Buffer.from(buf, 'utf8')
  }
  if (!Buffer.isBuffer(buf)) {
    throw new TypeError(`"buf" argument must be a string or an instance of Buffer`)
  }

  const reader = new Readable()
  const hwm = reader._readableState.highWaterMark

  // If chunkSize is invalid, set to highWaterMark.
  if (!chunkSize || typeof chunkSize !== 'number' || chunkSize < 1 || chunkSize > hwm) {
    chunkSize = hwm
  }

  const len = buf.length
  let start = 0

  // Overwrite _read method to push data from buffer.
  reader._read = function () {
    while (reader.push(
      buf.slice(start, (start += chunkSize))
    )) {
      // If all data pushed, just break the loop.
      if (start >= len) {
        reader.push(null)
        break
      }
    }
  }
  return reader
}