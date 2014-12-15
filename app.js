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
app.get('/receive', function(req, res) {
  console.log('yes')
  request
    .get('http://api.openweathermap.org/data/2.5/weather?q=' + req.query['Body'] + '&APPID=' + process.env.APP_ID)
    .end(function(error, response){
      var data = JSON.parse(response.text);
      console.log(data.main);
      var alreadyCalled = false;
      client.sendMessage({
        to: req.query['From'],
        from: process.env.TWILIO_NUMBER,
        body: data.main.temp
      }, function(err, responseData) {
        if (alreadyCalled) return;
        alreadyCalled = true;
        if (err) {
          console.log('error')
          res.sendStatus(500);
        } else {
          console.log('success')
          res.sendStatus(200);
        }
      });
    });
});

// server listens
app.listen(port);

// signals server has started
console.log('Running on port ' + port);