process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const functions = require('firebase-functions');
const axios = require('axios');
const https = require('https')

exports = module.exports = functions.https.onRequest((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (req.query.funcRead === undefined) {
        result = req.body;
    } else {
        result = req.query;
    }
    var require = result.funcRead
    var filtered = JSON.stringify(result.filter)
    var lang = result.locale
    var hereURL = `https://127.0.0.1:9001/readable?funcRead=${require}&filter=${filtered}&locale=${lang}`;
    var thereURL = `https://187.19.164.236:9001/readable?funcRead=${require}&filter=${filtered}&locale=${lang}`;
    axios.post(thereURL,
        {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
        }).then(response => {
            throw res.send(response.data);
        }).catch(error => {
            throw console.log(error);
        });
});