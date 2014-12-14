// require express
var express = require('express');
// initialize app
var app = express();

// server port
var port = process.env.PORT || 3000;
// twilio client
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
// superagent module
var request = require('superagent');

// express router
var router = express.Router();

// accept POST on /receive
router.post('/receive', function(req, res) {
  // log sms body
  console.log(req.param('Body'));
});

// server listens
app.listen(port);

// signals server has started
console.log('Running on port ' + port);
