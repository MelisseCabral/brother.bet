const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');

exports = module.exports = functions.https.onRequest((req, res) => {
    let serie = req.query.serie;
    const urlBase = 'http://globoesporte.globo.com/futebol/brasileirao-serie-';
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    var options = {
        url: urlBase + serie,
        headers: {
            'User-Agent': userAgent
        }
    };
    request(options, (error, response, html) => {
        if (!error) {

            var $ = cheerio.load(html);
            var lista = [];
            $('.tabela-times tbody tr').each(function () {
                var item = $(this);
                var time = {};
                time.nome = item.find('.tabela-times-time-nome').text();
                lista.push(time);
            });
            var x = 0;
            $('.tabela-pontos tbody tr').each(function () {
                var item = $(this);
                lista[x].posicao = x + 1;
                if (lista[x].posicao <= 4) {
                    //Goes to libertadores.
                    lista[x].bonus = 4;
                } else if (lista[x].posicao <= 6) {
                    //Goes to pre-libertadores.
                    lista[x].bonus = 3;
                } else if (lista[x].posicao <= 12) {
                    //Goes to sulamericana.
                    lista[x].bonus = 2;
                } else if (lista[x].posicao <= 16) {
                    //Goes to nothing.
                    lista[x].bonus = 1;
                } else {
                    //Goes to Serie B.
                    lista[x].bonus = 0;
                }
                lista[x].pontos = Number(item.find('.tabela-pontos-ponto').text());
                lista[x].jogos = Number(item.find('.tabela-pontos-ponto').next().text());
                lista[x].vitorias = Number(item.find('.tabela-pontos-ponto').next().next().text());
                lista[x].empates = Number(item.find('.tabela-pontos-ponto').next().next().next().text());
                lista[x].derrotas = Number(item.find('.tabela-pontos-ponto').next().next().next().next().text());
                lista[x].golsPro = Number(item.find('.tabela-pontos-ponto').next().next().next().next().next().text());
                lista[x].golsContra = Number(item.find('.tabela-pontos-ponto').next().next().next().next().next().next().text());
                lista[x].saldoGols = Number(item.find('.tabela-pontos-ponto').next().next().next().next().next().next().next().text());
                lista[x].percentual = Number(item.find('.tabela-pontos-ponto').next().next().next().next().next().next().next().next().text());
                lista[x].ultimosJogos = 0;
                x++;
            });
            var y = 0;
            $('.tabela-pontos-ultimos-jogos').each(function () {
                var item = $(this);
                lista[y].ultimosJogos = 3 * ($(this).children(".tabela-icone-v").length) + $(this).children(".tabela-icone-e").length;
                y++;

            });
            throw res.send(lista);
        } else {
            error({ error: "Was not possible return the informations!" });
        }
    });
});