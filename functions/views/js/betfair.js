function getReadable(dataIn) {
    betfair = JSON.parse(localStorage.getItem("betfair:"));
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
                'email':betfair.email,
                'password':betfair.password,
                'apiKey':betfair.apiKey,
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
            $("#betters #4").click();
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
        removeListeners();
        fillEvents(data);
        fireAllChecks();
        return ("I'm done.")
    }).catch(error => {
        console.log(`Error receiveGames(${game}).`, error);
        receiveGames(game);
    });
}

function fireAllChecks() {
    var checkboxes = $('table').find('tbody .mdl-data-table__select');
    $('table').find('thead .mdl-data-table__select input').bind('change', ((e) => {
        if (event.target.checked) {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].MaterialCheckbox.check();
                addCheck(checkboxes[i].children[0].id);
            }
        } else {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].MaterialCheckbox.uncheck();
                removeCheck(checkboxes[i].children[0].id)
            }
        }
    }));
}

function removeListeners() {
    $('table').find('tbody .mdl-data-table__select').unbind('click');
    var checkIds = Object.values($('#games tr'));
    checkIds.shift(1);
    checkIds.forEach(element => {
        $(`#${element.id}`).unbind('click')
    });
}

function toggleCheck(addId) {
    $(`#${addId}-event`).bind('click', (e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        if (id) {
            id = id.split("-checkbox")[0]
            if ($(`#${id}-event`).find('td:first label').hasClass("is-checked") === false) {
                addCheck(id);
            } else {
                removeCheck(id);
            }
        }
    });
}

function addCheck(id) {
    var key = `game:${id}`
    localStorage.setItem(key, JSON.stringify({
        "id": id,
        "name": $(`#${id}-event`).find('td:eq(1)').html(),
        "countryCode": $(`#${id}-event`).find('td:eq(2)').html(),
        "openDate": $(`#${id}-event`).find('td:eq(3)').html(),
        "timezone": $(`#${id}-event`).find('td:eq(4)').html(),
        "venue": $(`#${id}-event`).find('td:eq(5)').html(),
        "marketCount": $(`#${id} - event`).find('td:eq(6)').html(),
    }));
}
function addBetfair(email,password,apiKey) {
    var key = `betfair:`
    localStorage.setItem(key, JSON.stringify({
        "email": email,
        "password": password,
        "apiKey": apiKey,
    }));
}

function removeCheck(id) {
    var key = `game:${id}`
    localStorage.removeItem(key);
}

function getMoney() {
    getReadable({
        funcRead: "getAccountFunds",
        filter: {},
        locale: "en"
    }).then(data => {
        $("#valueBudget").html(`${data[2].result.availableToBetBalance}`)
        return true
    }).catch(error => {
        console.log("Error getMoney().", error);
        setTimeout(()=>{ getMoney() }, 3000);
    });
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
function main() {
    // if(getMoney()){
    //     receiveBetters();
    // }
}
