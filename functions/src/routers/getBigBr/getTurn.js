const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cheerio = require('cheerio');

exports = module.exports = functions.https.onRequest((req, res) => {
    let serieTurn = req.query.serieTurn.split('-');
    let serie = serieTurn[0];
    var n_turns = serieTurn[1];
    var turnBaseURL = '';
    if (serie === 'a') {
        turnBaseURL = 'https://globoesporte.globo.com/servico/backstage/esportes_campeonato/esporte/futebol/modalidade/futebol_de_campo/categoria/profissional/campeonato/campeonato-brasileiro/edicao/campeonato-brasileiro-2018/fases/fase-unica-seriea-2018/rodada/%s/jogos.html';
    } else {
        turnBaseURL = 'https://globoesporte.globo.com/servico/backstage/esportes_campeonato/esporte/futebol/modalidade/futebol_de_campo/categoria/profissional/campeonato/campeonato-brasileiro-b/edicao/brasileiro-serie-b-2018/fases/fase-unica-serieb-2018/rodada/%s/jogos.html';
    }
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
    turnBaseURL = turnBaseURL.replace('%s', n_turns);
    var options = {
        url: turnBaseURL,
        headers: {
            'User-Agent': userAgent
        }
    };
    request(options, (error, response, html) => {
        if (!error) {
            var $ = cheerio.load(html);
            var lista = [];
            $('.lista-de-jogos-item').each(function () {
                var rodada = {};
                var item = $(this);
                rodada.mandante = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-mandante').find('.placar-jogo-equipes-sigla').attr('title');
                rodada.placarMandante = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-placar').find('.placar-jogo-equipes-placar-mandante').text();
                rodada.visitante = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-visitante').find('.placar-jogo-equipes-sigla').attr('title');
                rodada.placarVisitante = item.find('.placar-jogo-equipes').find('.placar-jogo-equipes-placar').find('.placar-jogo-equipes-placar-visitante').text();
                if (!(rodada.placarMandante === '')) rodada.placarMandante = Number(rodada.placarMandante);
                if (!(rodada.placarVisitante === '')) rodada.placarVisitante = Number(rodada.placarVisitante);
                lista.push(rodada);
            });
            throw res.send(lista);
        } else {
            error({ error: "Was not possible return the informations!" });
        }
    });
});