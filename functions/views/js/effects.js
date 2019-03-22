// Actions functions.
function actions() {
    $("#btnRobot").off().click((e) => {
        e.stopImmediatePropagation();
        $("#robotFactory").show();
        $(".overlay").show();
        openRobotModel();
    })

    $("#btnHome").off().click((e) => {
        e.stopImmediatePropagation();
        $("#btnHomes").click()
    })

    $("btnDelete").off().click((e) => {
        e.stopImmediatePropagation();
        deleteAll();
    });

    // $("#btnGames").off().click((e) => {
    //     e.stopImmediatePropagation();
    //     getGames();
    //     //alert("founded")
    // });

    $("#valueBudget").off().click((e) => {
        e.stopImmediatePropagation();
        getMoney();
    });

    $("#btnBetfairAccount").off().click((e) => {
        e.stopImmediatePropagation();
        $("#btnAccounts").click();
    });

    $("#btnCloseRobot").off().click((e) => {
        e.stopImmediatePropagation();
        $('#robotFactory').hide();
    });

    $("#btnSaveRobot").off().click((e) => {
        e.stopImmediatePropagation();
        $(this).animate({ bottom: '1000px' }, "slow");
        $(this).animate({ opacity: '0' }, "slow");
        $(this).animate({ bottom: '0px' }, "slow");
        $(this).animate({ opacity: '1' }, "slow");
        saveRobotModel();
    });

    $("#btnLogout").off().click((e) => {
        e.stopImmediatePropagation();
        logout()
    });

    $("#btnLogout").off().click((e) => {
        e.stopImmediatePropagation();
        logout()
    });

    $("#btnLogoutFun").off().click((e) => {
        e.stopImmediatePropagation();
        logout()
    });
}

//Stake
function stake() {
    var stakeSlider = document.querySelector("#sliderStake");
    stakeSlider.addEventListener("change", () => {
        var budgetFloat = parseFloat($("#valueBudget").html());
        var partBudget = budgetFloat * parseFloat(stakeSlider.value / stakeSlider.max);
        var percBudget = (partBudget / budgetFloat) * 100;
        partBudget = partBudget.toFixed(2);
        percBudget = percBudget.toFixed(2);
        $("#valueStake").html(partBudget);
        $("#valuePercStake").html(percBudget);
    }, false);
}

// Views
function views() {
    var viewsList = ["home", "account", "method", "profit", "contact", "game", "robot"]

    viewsList.forEach(showElement => {
        var key = `#btn${showElement[0].toUpperCase()}${showElement.slice(1)}s`;
        $(key).off().click((e) => {
            e.stopImmediatePropagation();
            viewsList.forEach(hideElement => {
                $(`#${hideElement}`).hide();
            });
            $('.mdl-layout__obfuscator').removeClass('is-visible');
            $('.mdl-layout__drawer').removeClass('is-visible');
            localStorage.setItem("view:", showElement);
            $(`#${showElement}`).toggle();
            showElement === "home" ? $('#txtBudget').html(`brother.bet`) : $('#txtBudget').html(showElement);
            if(showElement === "game") getGames(); 
        });
    });
}

//Market
function market() {
    var marketWinList = ["chipCorrectScore", "chipMatchOdds", "chipUnderOver"]

    marketWinList.forEach(showElement => {
        $(`#${showElement}`).off().click((e) => {
            e.stopImmediatePropagation();
            var key = showElement.split("chip")[1].split(/(?=[A-Z])/).join("_").toLowerCase();
            $('#market').val(key);
            marketWinList.forEach(hideElement => {
                var hiden = hideElement.split("chip")[1].split(/(?=[A-Z])/).join("_").toLowerCase();
                $(`.${hiden}`).css("display", 'none');
                $(`#${hideElement}`).css("background-color", '#dedede');
            });
            $(`.${key}`).show();
            $(`#${showElement}`).css("background-color", '#FAFAFA');
            initMarket();
            $(".overlay").css("height", $(".init-box-robot").outerHeight() * 1.13 + 'px')
        });

    });

    var marketPositionList = ["chipBack", "chipLay"]

    marketPositionList.forEach(showElement => {
        $(`#${showElement}`).off().click((e) => {
            e.stopImmediatePropagation();
            var key = showElement.split("chip")[1].toLowerCase();
            $('#position').val('back');
            marketPositionList.forEach(hideElement => {
                $(`#${hideElement}`).css("background-color", '#dedede');
            });
            $(`#${showElement}`).css("background-color", '#FAFAFA');
        });
    });
}

function initMarket() {
    var marketWinList = ["chipHome", "chipAway", "chipDraw"]

    marketWinList.forEach(showElement => {
        $(`#${showElement}`).off().click((e) => {
            e.stopImmediatePropagation();
            marketWinList.forEach(hideElement => {
                $(`#${hideElement}`).css("background-color", '#dedede');
            });
            $(`#${showElement}`).css("background-color", '#FAFAFA');
        });
    });

    var marketTypeList = ["chipUnder", "chipOver"]

    marketTypeList.forEach(showElement => {
        $(`#${showElement}`).off().click((e) => {
            e.stopImmediatePropagation();
            marketTypeList.forEach(hideElement => {
                $(`#${hideElement}`).css("background-color", '#dedede');
            });
            $(`#${showElement}`).css("background-color", '#FAFAFA');
        });
    });
}

//Typed
function typedTchan() {
    Typed.new('.typed', {
        strings: ["Hey BRO, lets bet!!",
            "odds are going up",
            "or down, so go by LAY",
            "goaaaaaaaaal!!!!",
            "improve your assets",],
        typeSpeed: 100,
        backDelay: 0,
    });
}

//Main.
$(document).ready(() => {
    views();
    market();
    typedTchan();
    stake();
    actions()
    $("#btnHomes").click();
});