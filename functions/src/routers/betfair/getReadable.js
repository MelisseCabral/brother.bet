process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const express = require('express')
const router = express.Router()
const axios = require('axios')
const https = require('https')

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

module.exports = router.post("/", ((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (req.query.funcRead === undefined) {
        result = req.body;
    } else {
        result = req.query;
    }
    
    var email = req.query.email
    var password = req.query.password
    var apiKey = req.query.apiKey
    var require = result.funcRead
    var filtered = JSON.stringify(result.filter)
    var lang = result.locale
    const request = `funcRead=${require}&filter=${filtered}&locale=${lang}&email=${email}&password=${password}&apiKey=${apiKey}`
    const hereURL = `https://127.0.0.1:9001/readable?${request}`;
    const thereURL = `https://187.19.164.236:9001/readable?${request}`;
    axios.post(thereURL,
        {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
        }).then(response => {
            throw res.send(response.data);
        }).catch(error => {
            throw res.send(error);
        });
}));