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
                ).fadeIn(500).delay(5000);
                componentHandler.upgradeElement(document.getElementById(`${element.eventType.id}-tooltip`));
                componentHandler.upgradeElement(document.getElementById(`${element.eventType.id}`));
            });
            $(".mdl-chip--contact").click(function (e) {
                e.preventDefault();
                $('#betters .mdl-chip__contact').css("background-color", "#0091ea")
                $('#' + this.id + ' .mdl-chip__contact').css("background-color", "#00c853")
                // $('#games').hide();
                $('#tchanTiped').show();
                receiveGames(this.id)
            });
            return resolve("Done Better!");
        })
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
                       
            var newId = element.event.name.split(" ").join("_")
            var newRow =
                `<tr>
                    <td>
                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="${newId}-checkbox">
                            <input type="checkbox" id="${newId}-checkbox" class="mdl-checkbox__input">    
                        </label>
                    </td>
                    <td id="${element.event.id}" class="mdl-data-table__cell--non-numeric">${element.event.name}</td>                    
                    <td>${element.event.countryCode || ""}</td>   
                    <td>${element.event.openDate || ""}</td>
                    <td>${element.event.timezone || ""}</td>
                    <td>${element.event.venue || ""}</td>
                    <td>${element.marketCount || ""}</td>
            </tr>`
            $('#games').find('table tbody').append(newRow).fadeIn(500).delay(5000);
            componentHandler.upgradeAllRegistered();
        });
    });
}

$("#valueBudget").click(function (e) {
    e.preventDefault();
    getReadable({
        funcRead: "getAccountFunds",
        filter: {},
        locale: "en"
    }).then(data => {
        console.log(data[2].result.availableToBetBalance);
        $("#valueBudget").html(`$ ${data[2].result.availableToBetBalance}`)
    });
});

// Main.
(() => {
    //Get money.
    $("#valueBudget").click();
    //Get betters.
    receiveBetters().then(() => {
        $("#betters #1").click()
    });
}).call()





