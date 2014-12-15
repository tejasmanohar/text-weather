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
  console.log(req)
  request
  .get('http://api.openweathermap.org/data/2.5/weather?q=' + req.param('Body') + '&APPID=' + process.env.APP_ID)
  .set('Accept', 'application/json')
  .end(function(error, res){
    client.sendMessage({

      to: req.param('From'),
      from: process.env.TWILIO_NUMBER,
      body: res.text.main.temp

    }, function(err, responseData) {

      if (!err) {
        console.log(responseData.from);
        console.log(responseData.body);
      }
    });
  });
});

// server listens
app.listen(port);

// signals server has started
console.log('Running on port ' + port);
