function takeRobot() {
    var robot = {
        "game": $('#txtGame').val(),
        "position": $('#position').val(),
        "stake": $('#sliderStake').val(),
        "market": {
            "name": $('#market').val(),
            "options": ""
        }
    }



    robot.market.options = (() => {
        var opt;
        switch (robot.market.name) {
            case "under_over":
                opt = {
                    "position": $('#chipUnderOver').val(),
                    "operator": $('#operator').val(),
                    "odd": $('#odd').val(),
                    "close_min": $('#closeMinute').val()
                }
                break;
            case "match_odds":
                opt = $('#chipCorrectScore').val()
                break;
            case "correct_score":
                opt = {
                    "home": $('#homeScore').val(),
                    "away": $('#awayScore').val()
                }
                break;
        }
        return opt
    }).call();
    return robot;
}

function takeRobotModel() {
    var robot = {
        "game": $('#txtGame').val(),
        "position": $('#position').val(),
        "stake": $('#sliderStake').val(),
        "market": {
            "under_over": {
                "position": $('#chipUnderOver').val(),
                "operator": $('#operator').val(),
                "odd": $('#odd').val(),
                "close_min": $('#closeMinute').val()
            },
            "match_odds": $('#chipCorrectScore').val(),
            "correct_score": {
                "home": $('#homeScore').val(),
                "away": $('#awayScore').val()
            }
        }
    }
    return robot;
}

$('#btnBuild').click(() => {
    var robot = takeRobot();
});

function saveRobotModel() {
    robot = takeRobotModel();
    delete robot.game;
    localStorage.setItem("model:", JSON.stringify(robot));
}

function openRobotModel() {
    if (localStorage.getItem("model:") !== undefined) {
        var robot = JSON.parse(localStorage.getItem("model:"));
        $('#position').val(robot.position);
        $('#sliderStake').val(robot.stake);
        $('#market').val(robot.name);
        $('#chipUnderOver').val(robot.market.under_over.position)
        $('#operator').val(robot.market.under_over.operator)
        $('#odd').val(robot.market.under_over.odd)
        $('#closeMinute').val(robot.market.under_over.close_min)
        $('#chipCorrectScore').val(robot.market.match_odds)
        $('#homeScore').val(robot.market.home)
        $('#awayScore').val(robot.market.away)
    }
}