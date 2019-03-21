function getReadable(dataIn) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://brotherbet.ga/getReadable',
            dataType: "json",
            method: 'POST',
            cache: false,
            crossDomain: true,
            headers: {
                'Accept': 'application/json'
            },
            data: {
                'funcRead': dataIn.funcRead,
                'filter': JSON.stringify(dataIn.filter),
                'locale': dataIn.locale
            }
        }).done((response) => {
            resolve(response);
        }).fail((error) => {
            console.log(`Error getReadable(${JSON.stringify(dataIn)}).`, error);
            reject(error);
        });
    });
}

function receiveBetters() {
    return new Promise((resolve, reject) => {
        getReadable({
            funcRead: "listEventTypes",
            filter: {},
            locale: "en"
        }).then(data => {
            fillBetters(data)
            $("#betters #1").click();
            return resolve("I'm done!")
        }).catch(error => {
            console.log("Error receiveBetters().", error);
            receiveBetters();
        });
    });
}

function receiveGames(game) {
    getReadable({
        funcRead: "listEvents",
        filter: { "eventTypeIds": [game.toString()] },
        locale: "en"
    }).then(data => {
        fillEvents(data)
        fireAllChecks();
        defineCheck();
        return "I'm done!"
    }).catch(error => {
        console.log(`Error receiveGames(${game}).`, error);
        receiveGames(game);
    });
}

function fireAllChecks() {
    $('#games').find('th:first label').off().click((e) => {
        e.stopImmediatePropagation();
        if ($('#games').find('th:first label').hasClass("is-checked") === false) {
            $('#games label').addClass("is-checked");
        } else {
            $('#games label').removeClass("is-checked");
        }
        var checkedIds = Array();
        $('#games .mdl-checkbox__input').each((i, v) => {
            checkedIds.push($(this).attr('id'));
        });
        checkedIds.shift();
        checkedIds.forEach(element => {
            id = element.split("-checkbox")[0]
            fireCheck(id)
        })
    });
}

function fireCheck(id) {
    var key = `game:${id}`
    if ($(`#${id}-event`).find('td:first label').hasClass("is-checked") === false) {
        $(`#${id}-event`).find('td:first label').addClass("is-checked");
        var value = {
            "id": id,
            "name": $(`#${id}-event`).find('td:eq(1)').html(),
            "countryCode": $(`#${id}-event`).find('td:eq(2)').html(),
            "openDate": $(`#${id}-event`).find('td:eq(3)').html(),
            "timezone": $(`#${id}-event`).find('td:eq(4)').html(),
            "venue": $(`#${id}-event`).find('td:eq(5)').html(),
            "marketCount": $(`#${id - event}`).find('td:eq(6)').html(),
        }
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        $(`#${id}-event`).find('td:first label').removeClass("is-checked");
        localStorage.removeItem(key);
    }
}

function getMoney() {
    getReadable({
        funcRead: "getAccountFunds",
        filter: {},
        locale: "en"
    }).then(data => {
        $("#valueBudget").html(`${data[2].result.availableToBetBalance}`)
        return "I'm done!"
    }).catch(error => {
        console.log("Error getMoney().", error);
        getMoney();
    });
}

function cheboxes() {
    var checkedIds = Array();
    $('#games .mdl-data-table__cell--non-numeric').each((i, v) => {
        checkedIds.push($(this).attr('id'));
    });
    checkedIds.shift();
    stored = Array.apply(0, new Array(localStorage.length)).map((o, i) => {
        return localStorage.key(i);
    })
    var data = Array();
    stored.forEach(element => {
        if (element.search("game:") > -1) {
            data.push(element)
        }
    });
    fillGames(data)
}

function getGames() {
    stored = Array.apply(0, new Array(localStorage.length)).map((o, i) => {
        return localStorage.key(i);
    })
    var data = Array();
    stored.forEach(element => {
        if (element.search("game:") > -1) {
            eventContent = localStorage.getItem(element)
            data.push(eventContent)
        }
    });
    fillGames(data);
}

function deleteAll() {
    var views = [];
    views.push(localStorage.getItem("view"));
    // if (views = "home") {
    //     views = ["game", "robot"]
    // }
    var keys = Array.apply(0, new Array(localStorage.length)).map((o, i) => {
        return localStorage.key(i);
    })
    views.forEach(view => {
        keys.forEach(key => {
            if (key.str.search(`${view}:`)) {
                localStorage.removeItem(key);
            }
        });
        $(`#${view}`).click();
    });
    $("#home").click();
}

//Timers
function updateMoney() {
    console.log("test")
        ;
    setInterval(() => {
        //budgetValue.value = readableBetfair('getAccountFunds')
        //console.log(readableBetfair('getAccountFunds'))
    }, 60000);
}

// Main.
(() => {
    getMoney();
    receiveBetters();
}).call()






