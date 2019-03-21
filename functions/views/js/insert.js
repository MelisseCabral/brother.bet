function fillBetters(data){
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
    $("#betters .mdl-chip--contact").off().click(function (e) {
        e.stopImmediatePropagation();
        $('#betters .mdl-chip__contact').css("background-color", "#0091ea");
        $('#' + this.id + ' .mdl-chip__contact').css("background-color", "#00c853");
        $('#games').hide();
        $('#tchanTiped').show();
        receiveGames(this.id)
    });
}

function fillEvents(data){
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
}

function fillGames(data){
    $('#game').find('table tbody').html("");
    $('#tchanTiped').hide();
    $('#game').show();
    data.forEach(element => {
        var newId = `${element.id}`
        $('#game').find('table tbody').append(
            `<tr id="${newId}-game">
                    <td>
                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="${newId}-game-checkbox">
                            <input type="checkbox" id="${newId}-game-checkbox" class="mdl-checkbox__input">    
                        </label>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric">${element.name}</td>                    
                    <td>${element.countryCode || ""}</td>   
                    <td>${element.openDate || ""}</td>
                    <td>${element.timezone || ""}</td>
                    <td>${element.venue || ""}</td>
                    <td>${element.marketCount || ""}</td>
                </tr>`
        )
    });
    componentHandler.upgradeAllRegistered();
}

function fillRobots(){
    
}