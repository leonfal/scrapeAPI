const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

// a simple api scraper coded with express in js
app.get('/', function(req, res) {
    
    let sign = req.query.sign;
    let date = req.query.date;
    let url = 'https://www.astrology.com/horoscope/daily/' + date + '/' + sign + '.html';
  
    // request takes url and callback function takes 3
    request(url, function(error, response, html) {
  
      // First we check no errors occurred when making the request
      if (!error) {
  
        // use the cheerio library (so we can scrape with css selectors)
        var $ = cheerio.load(html);
        
        // scrape the prediction of the date and sign from the website
        var prediction = $('div#content > p').text();
  
        // the JSON format we are going to send back and retrieve
        var json = {
            sign: sign,
            date: date,
            prediction: prediction
        };
  
        // send the JSON as a response to to the client
        res.send(json);
      }
  
    });
  
  });


// run it on localhost
app.listen('8080');

module.exports = app;
