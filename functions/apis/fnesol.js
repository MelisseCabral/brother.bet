const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');

exports = module.exports = functions.https.onRequest((req, res) => {
    let vlrTotal = req.query.vlrTotal;
    let vlrSolicitado = req.query.vlrSolicitado;
    let vlrContaMensal = req.query.vlrContaMensal;
    let qtdePrestacoes = req.query.qtdePrestacoes;
    let mesesCarencia = req.query.mesesCarencia;
    let tipo = req.query.tipo;
    let periodicidade = req.query.periodicidade;
    let porte = req.query.porte;

    baseURL = 'https://www.bnb.gov.br/simuladorapi/api/fne/sol';
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    let options = {
        url: baseURL,
        headers: {
            'User-Agent': userAgent,
            'Accept': 'application/json'
        },
        qs: {
            'vlrTotal': vlrTotal,
            'vlrSolicitado': vlrSolicitado,
            'vlrContaMensal': vlrContaMensal,
            'qtdePrestacoes': qtdePrestacoes,
            'mesesCarencia': mesesCarencia,
            'tipo': tipo,
            'periodicidade': periodicidade,
            'porte': porte
        }
    };
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