const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');

exports = module.exports = functions.https.onRequest((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    var result;
    if(req.query.funcRead === undefined){
        result = req.body;
    }else{
        result = req.query;
    }
    let funcRead = result.funcRead;
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    let options = {
        url: 'http://187.19.164.236:9001/readable',
        method: 'POST',
        headers: {
            'User-Agent': userAgent,
            'accept': 'application/json'
        },
        data: {
            'funcRead': "listEvents"
        }
    };
    request(options, (error, response, html) => {
        if (!error) {
            page = cheerio.load(html);
            dataReceived = JSON.parse(page.text());
            res.send(dataReceived);
        } else {
            console.log(error,response,html);
            res.send(error,response,html);
        }
    });
});