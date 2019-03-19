// Shared constants.
const overlayView = document.querySelector(".overlay");
const homeView = document.querySelector("#home");
const accountView = document.querySelector("#account");
const methodsView = document.querySelector("#methods");
const profitsView = document.querySelector("#profits");
const contactView = document.querySelector("#contact");
const gamesView = document.querySelector("#game");
const robotsView = document.querySelector("#robot");
const homeButton = document.querySelector("#btnHome");
const accountButton = document.querySelector("#btnAccount");
const methodsButton = document.querySelector("#btnMethods");
const profitsButton = document.querySelector("#btnProfits");
const contactButton = document.querySelector("#btnContact");
const closeButton = document.querySelector(".btn-close");
const robotButton = document.querySelector("#btnRobot");
const sendButton = document.querySelector("#btnSend");
const budgetText = document.querySelector("#txtBudget");
const typeMarketLocus = document.querySelector("#mrktType");
const correctScoreChip = document.querySelector("#chipCorrectScore");
const matchOddsChip = document.querySelector("#chipMatchOdds");
const underOverChip = document.querySelector("#chipUnderOver");
const backChip = document.querySelector("#chipBack");
const layChip = document.querySelector("#chipLay");
var homeChip = document.querySelector("chipHome");
var awayChip = document.querySelector("#chipAway");
var drawChip = document.querySelector("#chipDraw");
var underChip = document.querySelector("#chipUnder");
var overChip = document.querySelector("#chipOver");
var stakeSlider = document.querySelector("#sliderStake");
var budgetValue = document.querySelector("#valueBudget");
var stakeValue = document.querySelector("#valueStake");
var percStakeValue = document.querySelector("#valuePercStake");
var tchanTiped = document.querySelector("#tchanTiped")


// Actions functions.
if (homeButton) {
    homeButton.addEventListener("click", function () {
        // Display components.
        homeView.style.display = "inline-block";
        accountView.style.display = "none";
        methodsView.style.display = "none";
        profitsView.style.display = "none";
        contactView.style.display = "none";
        gamesView.style.display = "none";
        robotsView.style.display = "none";
        budgetText.innerHTML = "brother.bet";
    });
    setViewHome();
    drawerHide();
}

if (gamesView) {
    gamesView.addEventListener("click", function () {
        // Display components.
        homeView.style.display = "none";
        accountView.style.display = "none";
        methodsView.style.display = "none";
        profitsView.style.display = "none";
        contactView.style.display = "none";
        gamesView.style.display = "inline-block";
        robotsView.style.display = "none";
        budgetText.innerHTML = "brother.bet";
        setViewGames();
    });
    drawerHide();
}

if (robotsView) {
    robotsView.addEventListener("click", function () {
        // Display components.
        homeView.style.display = "none";
        accountView.style.display = "none";
        methodsView.style.display = "none";
        profitsView.style.display = "none";
        contactView.style.display = "none";
        gamesView.style.display = "none";
        robotsView.style.display = "inline-block";
        budgetText.innerHTML = "brother.bet";
        setViewRobots();
    });
    drawerHide();
}

if (accountButton) {
    accountButton.addEventListener("click", function () {
        // Display components.
        homeView.style.display = "none";
        accountView.style.display = "inline-block";
        methodsView.style.display = "none";
        profitsView.style.display = "none";
        contactView.style.display = "none";
        budgetText.innerHTML = "account";
    });
    drawerHide();

}

if (methodsButton) {
    methodsButton.addEventListener("click", function () {
        // Display components.
        homeView.style.display = "none";
        accountView.style.display = "none";
        methodsView.style.display = "inline-block";
        profitsView.style.display = "none";
        contactView.style.display = "none";
        budgetText.innerHTML = "methods";
    });
    drawerHide();
}

if (profitsButton) {
    profitsButton.addEventListener("click", function () {
        // Display components.
        homeView.style.display = "none";
        accountView.style.display = "none";
        methodsView.style.display = "none";
        profitsView.display = "inline-block";
        contactView.style.display = "none";
        budgetText.innerHTML = "profits";
    });
    drawerHide();
}

if (contactButton) {
    contactButton.addEventListener("click", function () {
        // Display components.
        homeView.style.display = "none";
        accountView.style.display = "none";
        methodsView.style.display = "none";
        profitsView.style.display = "none";
        contactView.style.display = "inline-block";
        budgetText.innerHTML = "contact";
    });
    drawerHide();
}

if (robotButton) {
    robotButton.addEventListener("click", function () {
        document.querySelector("#robot").style.display = "block";
    })
}

if (sendButton) {
    sendButton.addEventListener("click", function () {
        insertFirebase();
    });
}

if (closeButton) {
    closeButton.addEventListener("click", function () {
        document.querySelector('#robot').style.display = "none";
    });
}

if (overlayView) {
    overlayView.addEventListener("click", function () {
        closeButton.click();
    });
}

if (backChip) {
    backChip.addEventListener("click", function () {
        $('#position').val('back');
        // Display components.
        backChip.style.backgroundColor = '#FAFAFA';
        layChip.style.backgroundColor = '#dedede';
    });
}

if (layChip) {
    layChip.addEventListener("click", function () {
        $('#position').val('lay');
        // Display components.
        backChip.style.backgroundColor = '#dedede';
        layChip.style.backgroundColor = '#FAFAFA';
    });
}

if (correctScoreChip) {
    correctScoreChip.addEventListener("click", function () {
        $('#market').val('correct_score');
        // Display components.
        correctScoreChip.style.backgroundColor = '#FAFAFA';
        matchOddsChip.style.backgroundColor = '#dedede';
        underOverChip.style.backgroundColor = '#dedede';
        // Fill options panel.
        document.querySelector('.correct_score').style.display = 'block';
        document.querySelector('.match_odds').style.display = 'none';
        document.querySelector('.under_or_over').style.display = 'none';
        // Add Event Listener;
        initMarket();
    });
}

if (matchOddsChip) {
    matchOddsChip.addEventListener("click", function () {
        $('#market').val('match_odds');
        // Display components.
        correctScoreChip.style.backgroundColor = '#dedede';
        matchOddsChip.style.backgroundColor = '#FAFAFA';
        underOverChip.style.backgroundColor = '#dedede';
        // Fill options panel.
        document.querySelector('.correct_score').style.display = 'none';
        document.querySelector('.match_odds').style.display = 'block';
        document.querySelector('.under_or_over').style.display = 'none';
        // Add Event Listener;
        initMarket();
    });
}

if (underOverChip) {
    underOverChip.addEventListener("click", function () {
        $('#market').val('under_or_over');
        // Display components.
        correctScoreChip.style.backgroundColor = '#dedede';
        matchOddsChip.style.backgroundColor = '#dedede';
        underOverChip.style.backgroundColor = '#FAFAFA';
        // Fill options panel.
        document.querySelector('.correct_score').style.display = 'none';
        document.querySelector('.match_odds').style.display = 'none';
        document.querySelector('.under_or_over').style.display = 'block';
        // Add Event Listener;
        initMarket();
    });
}

if (stakeSlider) {
    stakeSlider.addEventListener("change", function () {
        var budgetFloat = parseFloat(budgetValue.innerHTML);
        var partBudget = (budgetFloat * stakeSlider.value) / stakeSlider.max;
        var percBudget = (partBudget / budgetFloat) * 100;
        partBudget = partBudget.toFixed(2);
        percBudget = percBudget.toFixed(2);
        stakeValue.innerHTML = partBudget;
        percStakeValue.innerHTML = percBudget;

    }, false);
}


// General functions.
function main() {
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    robotButton.click();
}

function initMarket() {
    // Update chips.
    homeChip = document.querySelector("#chipHome");
    awayChip = document.querySelector("#chipAway");
    drawChip = document.querySelector("#chipDraw");
    underChip = document.querySelector("#chipUnder");
    overChip = document.querySelector("#chipOver");


    if (homeChip) {
        homeChip.addEventListener("click", function () {
            $('#chipCorrectScore').val('home');
            // Display components.
            homeChip.style.backgroundColor = '#FAFAFA';
            awayChip.style.backgroundColor = '#dedede';
            drawChip.style.backgroundColor = '#dedede';
        });
    }

    if (awayChip) {
        awayChip.addEventListener("click", function () {
            $('#chipCorrectScore').val('away');
            // Display components.
            homeChip.style.backgroundColor = '#dedede';
            awayChip.style.backgroundColor = '#FAFAFA';
            drawChip.style.backgroundColor = '#dedede';
        });
    }

    if (drawChip) {
        drawChip.addEventListener("click", function () {
            $('#chipCorrectScore').val('draw');
            // Display components.
            homeChip.style.backgroundColor = '#dedede';
            awayChip.style.backgroundColor = '#dedede';
            drawChip.style.backgroundColor = '#FAFAFA';
        });
    }

    if (underChip) {
        underChip.addEventListener("click", function () {
            $('#chipUnderOver').val('under');
            // Display components.
            underChip.style.backgroundColor = '#FAFAFA';
            overChip.style.backgroundColor = '#dedede';
        });
    }

    if (overChip) {
        overChip.addEventListener("click", function () {
            $('#chipUnderOver').val('over');
            // Display components.
            underChip.style.backgroundColor = '#dedede';
            overChip.style.backgroundColor = '#FAFAFA';
        });
    }
}

function drawerHide() {
    document.querySelector('.mdl-layout__drawer').addEventListener('click', function () {
        document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
        this.classList.remove('is-visible');
    }, false);
}

//Timers
async function updateMoney() {
    setInterval(() => {
        //budgetValue.value = readableBetfair('getAccountFunds')
        //console.log(readableBetfair('getAccountFunds'))
    }, 60000);
}

//Prototype
async function readableBetfair(methodName) {
    let dataReturn;
    await $.ajax({
        url: 'https://us-central1-minevideo-2ceee.cloudfunctions.net/readableBetfair',
        dataType: "json",
        method: 'GET',
        crossDomain: true,
        headers: {
            'Accept': 'application/json'
        },

        data: {
            "method": methodName,
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            dataReturn = data;
        }
    });

    return dataReturn;
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

//Update overlay
document.querySelector('body').click(function () {
    document.querySelector(".overlay").style.height = document.querySelector("body").scrollHeight + 'px'
});

// Main.
document.addEventListener('DOMContentLoaded', async function () {
    await updateMoney();
    typedTchan()
});