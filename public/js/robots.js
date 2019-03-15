$('#btnBuild').click(() => {

    robot = {
        "game": $('#txtGame').val(),
        "position": $('#position').val(),
        "stake": $('#sliderStake').val(),
        "market": {
            "name": $('#market').val(),
            "options": ""
        }
    }

    robot.market.options = (() => {
        switch (robot.market.name) {
            case "under_or_over":
                return {
                    "position": $('#chipUnderOver').val(),
                    "operator": $('#operator').val(),
                    "odd": $('#odd').val(),
                    "close_min": $('#closeMinute').val()
                }
            case "match_odds":
                return $('#chipCorrectScore').val()
            case "correct_score":
                return {
                    "home": $('#homeScore').val(),
                    "away": $('#awayScore').val()
                }
        }
    }).call();

    console.log(JSON.stringify(robot));
});