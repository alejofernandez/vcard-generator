var express = require("express");
var app = express();
app.use(express.logger());

app.get('/get-vcard', function(request, response) {
  var card = '' +
    'BEGIN:VCARD\n' +
    'VERSION:2.1\n' +
    'N:' + (request.query.name || '') + ';\n' +
    'FN:\n' +
    'ORG:\n' +
    'TEL;WORK;VOICE;PREF:+' + (request.query.phone || '') + '\n' +
    'REV:20110412165200\n' +
    'END:VCARD';

  response.setHeader('Content-disposition', 'inline; filename=contact.vcf');
  response.setHeader('Content-type', 'text/x-vcard');

  response.send(card);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});