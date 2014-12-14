var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

var router = express.Router();

router.post('/receive', function(req, res) {
});

app.listen(port);
console.log('Running on port ' + port);
