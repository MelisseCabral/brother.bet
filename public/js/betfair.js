function getReadable(dataIn) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://us-central1-brother-bet.cloudfunctions.net/getReadable',
            dataType: "json",
            method: 'POST',
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
function receiveGames() {
    getReadable({
        funcRead: "listEvents",
        filter: { "eventTypeIds": ["1"] },
        locale: "en"
    }).then(data => {
        data[2].result.forEach(element => {
            $('#games').find('table tr:last').after(
                `<tr>
                    <td>
                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select mdl-js-ripple-effect--ignore-events is-upgraded"
                        data-upgraded=",MaterialCheckbox,MaterialRipple">
                            <input type="checkbox" class="mdl-checkbox__input">
                            <span class="mdl-checkbox__focus-helper"></span><span class="mdl-checkbox__box-outline">
                            <span class="mdl-checkbox__tick-outline"></span></span>
                            <span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center" data-upgraded=",MaterialRipple">
                            <span class="mdl-ripple"></span></span>
                        </label>
                    </td>
                    <td id="${element.event.id}" class="mdl-data-table__cell--non-numeric">${element.event.name}</td>                    
                    <td>${element.event.countryCode || ""}</td>   
                    <td>${element.event.openDate || ""}</td>
                    <td>${element.event.timezone || ""}</td>
                    <td>${element.event.venue || ""}</td>
                    <td>${element.marketCount || ""}</td>
                </tr>`
            );
            $('#tchanTiped').hide();
            $('#games').show();
        });
    });
}

// Main.
(() => {
    //Get betters.
    getReadable({
        funcRead: "listEventTypes",
        filter: {},
        locale: "en"
    }).then(data => {
        data[2].result.forEach(element => {
            $('#betters').append(
                `<span id="${element.eventType.id}" class="mdl-chip mdl-chip--contact">
                    <span class="mdl-chip__contact  mdl-color--purple-500 mdl-color-text--white">${element.eventType.name.substring(0, 2)}</span>
                    <span class="mdl-chip__text">${element.eventType.name.split(" ")[0]}</span>
                </span>
                <div id="${element.eventType.id}-tooltip"class="mdl-tooltip" for="${element.eventType.id}">
                ${element.eventType.name}
                </div>`
            )
            componentHandler.upgradeElement(document.getElementById(`${element.eventType.id}-tooltip`));
            componentHandler.upgradeElement(document.getElementById(`${element.eventType.id}`));
            $(" ").click(function () {
                console.log(this.id);
                $('#' + this.id + ' .mdl-chip--contact').css("background-color", "green")
            });
        });
    });
}).call()





