var express = require("express");
var app = express();

app.use(express.logger());

app.get('/get-vcard', function(request, response) {
  var fullName = request.query.name || '';
  var firstName = fullName.substr(0, fullName.indexOf(' '));
  var lastName = fullName.substr(fullName.indexOf(' ') + 1);
  var phone = '+' + (request.query.phone || '');
  var card = '' +
    'BEGIN:VCARD\n' +
    'VERSION:2.1\n' +
    'N:' + lastName + ';' + firstName + '\n' +
    'FN:' + fullName + '\n' +
    'ORG:PayFriendz\n' +
    'TEL;CELL;VOICE;PREF:' + phone + '\n' +
    'END:VCARD';

  response.setHeader('Content-disposition', 'inline; filename=contact.vcf');
  response.setHeader('Content-type', 'text/x-vcard');

  response.send(card);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});