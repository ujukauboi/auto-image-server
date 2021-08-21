const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const puppeteer = require('./app')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', async function(req, res) {
    res.send(await puppeteer(req.body));
});

const listener = app.listen(7453, function() {
    console.log('Your app is listening on port ' + listener.address().port);
  });
  
