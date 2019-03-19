function takeRobot() {
    robot = {
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
};

function castRobot() {
    robot = {
        "game": "",
        "position": "",
        "stake": "",
        "market": {
            "under_over": {
                "position": "",
                "operator": "",
                "odd": "",
                "close_min": ""
            },
            "match_odds": "",
            "correct_score": {
                "home": "",
                "away": ""
            }
        }
    }
    return robot;
};

$('#btnBuild').click(() => {
    var robot = takeRobotModel();
})

function saveRobotModel() {
    robot = delete takeRobotModel().game;
    localStorage.setItem("model:", robot);
}

function openRobotModel() {
    var robot = localStorage.getItem("model:");
    $('#position').val(robot.position || "");
    $('#sliderStake').val(robot.stake || "");
    $('#market').val(robot.name || "");
}