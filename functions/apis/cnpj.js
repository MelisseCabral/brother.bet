const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');

exports = module.exports = functions.https.onRequest((req, res) => {
    let cnpj = req.query.cnpj;
    baseURL = 'https://receitaws.com.br/v1/cnpj/' + cnpj;
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    let options = {
        url: baseURL,
        headers: {
            'User-Agent': userAgent,
            'accept': 'application/json'
        }
    };
    console.log(options.url);
    request(options, (error, response, html) => {
        if (!error) {
            page = cheerio.load(html);
            dataCompany = JSON.parse(page.text());
            res.send(dataCompany);
        } else {
            console.log(error);
        }
    });
});