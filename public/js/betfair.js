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
            data[2].result.forEach(element => {
                $('#betters').append(
                    `<span id="${element.eventType.id}" class="mdl-chip mdl-chip--contact">
                        <span style="background-color: #0091ea"class="mdl-chip__contact   mdl-color-text--white">${element.eventType.name.substring(0, 2)}</span>
                        <span class="mdl-chip__text">${element.eventType.name.split(" ")[0]}</span>
                    </span>
                    <div id="${element.eventType.id}-tooltip"class="mdl-tooltip" for="${element.eventType.id}">
                    ${element.eventType.name}
                    </div>`
                )
            });
            componentHandler.upgradeAllRegistered();
            $(".mdl-chip--contact").off().click(function (e) {
                e.stopImmediatePropagation();
                $('#betters .mdl-chip__contact').css("background-color", "#0091ea");
                $('#' + this.id + ' .mdl-chip__contact').css("background-color", "#00c853");
                $('#games').hide();
                $('#tchanTiped').show();
                receiveGames(this.id)
            });
            $("#betters #1").click();
            resolve("I'm done!")
        }).catch(error => {
            console.log("Error receiveBetters().", error);
            receiveBetters();
        });
    });
};

function receiveGames(game) {
    getReadable({
        funcRead: "listEvents",
        filter: { "eventTypeIds": [game.toString()] },
        locale: "en"
    }).then(data => {
        $('#games').find('table tbody').html("");
        $('#tchanTiped').hide();
        $('#games').show();
        data[2].result.forEach(element => {
            var newId = `${element.event.id}`
            $('#games').find('table tbody').append(
                `<tr id="${newId}-event">
                        <td>
                            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="${newId}-checkbox">
                                <input type="checkbox" id="${newId}-checkbox" class="mdl-checkbox__input">    
                            </label>
                        </td>
                        <td class="mdl-data-table__cell--non-numeric">${element.event.name}</td>                    
                        <td>${element.event.countryCode || ""}</td>   
                        <td>${element.event.openDate || ""}</td>
                        <td>${element.event.timezone || ""}</td>
                        <td>${element.event.venue || ""}</td>
                        <td>${element.marketCount || ""}</td>
                    </tr>`
            )
        });
        componentHandler.upgradeAllRegistered();
        fireAllChecks();
        defineCheck();
    }).catch(error => {
        console.log(`Error receiveGames(${game}).`, error);
        receiveGames(game);
    });
}

function fireAllChecks() {
    $('#games').find('th:first label').off().click(function (e) {
        e.stopImmediatePropagation();
        if ($('#games').find('th:first label').hasClass("is-checked") === true) {
            $('#games label').addClass("is-checked");
        } else {
            $('#games label').removeClass("is-checked");
        }
        var checkedIds = Array();
        $('#games .mdl-checkbox__input').each(function (i, v) {
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
            "country": $(`#${id}-event`).find('td:eq(2)').html(),
            "openGame": $(`#${id}-event`).find('td:eq(3)').html(),
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
function defineCheck() {
    $('input[type="checkbox"]').off().click(function (e) {
        e.stopImmediatePropagation();
        var id = $(this).attr('id').split("-checkbox")[0]
        fireCheck(id);
    });
}

function getMoney() {
    getReadable({
        funcRead: "getAccountFunds",
        filter: {},
        locale: "en"
    }).then(data => {
        $("#valueBudget").html(`${data[2].result.availableToBetBalance}`)
    }).catch(error => {
        console.log("Error getMoney().", error);
        getMoney();
    });
}

function cheboxes() {
    var checkedIds = Array();
    $('#games .mdl-data-table__cell--non-numeric').each(function (i, v) {
        checkedIds.push($(this).attr('id'));
    });
    checkedIds.shift();

    Array.apply(0, new Array(localStorage.length)).map(function (o, i) {
        return localStorage.key(i);
    })
}

$("#valueBudget").off().click(function (e) {
    e.stopImmediatePropagation();
    getMoney();
});

$("btnDelete").off().click(function (e) {
    e.stopImmediatePropagation();
    var views = Array();
    views.push(localStorage.getItem("view"))
    if (views = "home") {
        views = ["game", "robot"]
    }
    var keys = Array.apply(0, new Array(localStorage.length)).map(function (o, i) {
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
});

function setViewHome() {
    localStorage.setItem("view", "home");
}
function setViewRobots() {
    localStorage.setItem("view", "robot");
}
function setViewGames() {
    localStorage.setItem("view", "game");
}

// Main.
(() => {
    getMoney();
    receiveBetters();
    setViewHome();
}).call()






