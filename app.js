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

// accept POST on /receive
app.post('/receive', function(req, res) {
  request
  .get('http://api.openweathermap.org/data/2.5/weather?q=' + req.param('Body') + '&APPID=' + process.env.APP_ID)
  .set('Accept', 'application/json')
  .end(function(error, res){
    console.log(res);
    client.sendMessage({
      to: req.param('From'),
      from: process.env.TWILIO_NUMBER,
      body: res.text.main.temp
    }, function(err, responseData) {
      if (!err) {
        console.log('error!')
      }
    });
  });
});

// server listens
app.listen(port);

// signals server has started
console.log('Running on port ' + port);
