// Shared constants.
typeMarket
const overlayView = document.querySelector(".overlay");
const homeView = document.querySelector("#home");
const accountView = document.querySelector("#account");
const methodsView = document.querySelector("#methods");
const profitsView = document.querySelector("#profits");
const contactView = document.querySelector("#contact");
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


// Actions functions.
if (homeButton) {
    homeButton.addEventListener("click", function () {
        // Display components.
        homeView.style.display = "inline-block";
        accountView.style.display = "none";
        methodsView.style.display = "none";
        profitsView.style.display = "none";
        contactView.style.display = "none";
        budgetText.innerHTML = "brother.bet";
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
        stakeSlider.change();
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
        // Display components.
        backChip.style.backgroundColor = '#FAFAFA';
        layChip.style.backgroundColor = '#dedede';
    });
}

if (layChip) {
    layChip.addEventListener("click", function () {
        // Display components.
        backChip.style.backgroundColor = '#dedede';
        layChip.style.backgroundColor = '#FAFAFA';
    });
}

if (correctScoreChip) {
    correctScoreChip.addEventListener("click", function () {
        // Display components.
        correctScoreChip.style.backgroundColor = '#FAFAFA';
        matchOddsChip.style.backgroundColor = '#dedede';
        underOverChip.style.backgroundColor = '#dedede';
        // Fill options panel.
        document.querySelector('#typeMarket').innerHTML = '\
        <div class="match_odds">\
            <span class="first-team">Barcelona </span>\
            <div class="mdl-textfield mdl-js-textfield is-upgraded is-focused" data-upgraded=",MaterialTextfield">\
                <input class="mdl-textfield__input" type="number" id="sample2">\
                <label class="mdl-textfield__label" for="sample2"></label>\
            </div>\
            <span class="second-team"> VS </span>\
            <div class="mdl-textfield mdl-js-textfield is-upgraded is-focused" data-upgraded=",MaterialTextfield">\
                <input class="mdl-textfield__input" type="number" id="sample2">\
                <label class="mdl-textfield__label" for="sample2"></label>\
            </div>\
            <span class="second-team"> Fluminence</span>\
        </div>';
        // Add Event Listener;
        initMarket();
    });
}

if (matchOddsChip) {
    matchOddsChip.addEventListener("click", function () {
        // Display components.
        correctScoreChip.style.backgroundColor = '#dedede';
        matchOddsChip.style.backgroundColor = '#FAFAFA';
        underOverChip.style.backgroundColor = '#dedede';
        // Fill options panel.
        document.querySelector('#typeMarket').innerHTML = '\
        <div class="match_odds">\
            <br>\
            <div>\
                <span id="chipHome" class="class-chipHome mdl-chip mdl-chip--contact">\
                    <span class="mdl-chip__contact mdl-color--purple-500 mdl-color-text--white">H</span>\
                    <span class="mdl-chip__text">home</span>\
                </span>\
                <span id="chipAway" class="mdl-chip mdl-chip--contact">\
                    <span class="mdl-chip__contact mdl-color--purple-500 mdl-color-text--white">A</span>\
                    <span class="mdl-chip__text">away</span>\
                </span>\
                <span id="chipDraw" class="mdl-chip mdl-chip--contact">\
                    <span class="mdl-chip__contact mdl-color--purple-500 mdl-color-text--white">D</span>\
                    <span class="mdl-chip__text">draw</span>\
                </span>\
            <div>\
        </div>';
        // Add Event Listener;
        initMarket();
    });
}

if (underOverChip) {
    underOverChip.addEventListener("click", function () {
        // Display components.
        correctScoreChip.style.backgroundColor = '#dedede';
        matchOddsChip.style.backgroundColor = '#dedede';
        underOverChip.style.backgroundColor = '#FAFAFA';
        // Fill options panel.
        document.querySelector('#typeMarket').innerHTML = '\
        <div class="under-over">\
            <br>\
            <div>\
                <span id="chipHome" class="mdl-chip mdl-chip--contact">\
                    <span class="mdl-chip__contact mdl-color--purple-500 mdl-color-text--white">H</span>\
                    <span class="mdl-chip__text">home</span>\
                </span>\
                <span id="chipAway" class="mdl-chip mdl-chip--contact">\
                    <span class="mdl-chip__contact mdl-color--purple-500 mdl-color-text--white">A</span>\
                    <span class="mdl-chip__text">away</span>\
                </span>\
                <span id="chipDraw" class="mdl-chip mdl-chip--contact">\
                    <span class="mdl-chip__contact mdl-color--purple-500 mdl-color-text--white">D</span>\
                    <span class="mdl-chip__text">draw</span>\
                </span>\
            </div>\
            <div>\
                <br>\
                <span id="chipUnder" class="mdl-chip mdl-chip--contact">\
                    <span class="mdl-chip__contact mdl-color--amber-A200 mdl-color-text--white">U</span>\
                    <span class="mdl-chip__text">under</span>\
                </span>\
                <span id="chipOver" class="mdl-chip mdl-chip--contact">\
                    <span class="mdl-chip__contact mdl-color--amber-A200 mdl-color-text--white">O</span>\
                    <span class="mdl-chip__text">over</span>\
                </span>\
            </div>\
            <div class="mdl-textfield mdl-js-textfield is-upgraded is-focused" data-upgraded=",MaterialTextfield">\
                <input class="mdl-textfield__input" type="number" id="sample2">\
                <label class="mdl-textfield__label" for="sample2"></label>\
            </div>\
        </div>';
        // Add Event Listener;
        initMarket();
    });
}

if (stakeSlider) {
    stakeSlider.addEventListener("change", function () {
        var budgetFloat = parseFloat(budgetValue.innerHTML);
        var partBudget = (budgetFloat * stakeSlider.value) / stakeSlider.max;
        var percBudget = (partBudget / budgetFloat) * 100;
        partBudget = partBudget.toFixed(1);
        percBudget = percBudget.toFixed(1);
        stakeValue.innerHTML = partBudget;
        percStakeValue.innerHTML = percBudget;
        console.log(partBudget + "  " + percBudget);

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
            // Display components.
            homeChip.style.backgroundColor = '#FAFAFA';
            awayChip.style.backgroundColor = '#dedede';
            drawChip.style.backgroundColor = '#dedede';
        });
    }

    if (awayChip) {
        awayChip.addEventListener("click", function () {
            // Display components.
            homeChip.style.backgroundColor = '#dedede';
            awayChip.style.backgroundColor = '#FAFAFA';
            drawChip.style.backgroundColor = '#dedede';
        });
    }

    if (drawChip) {
        drawChip.addEventListener("click", function () {
            // Display components.
            homeChip.style.backgroundColor = '#dedede';
            awayChip.style.backgroundColor = '#dedede';
            drawChip.style.backgroundColor = '#FAFAFA';
        });
    }

    if (underChip) {
        underChip.addEventListener("click", function () {
            // Display components.
            underChip.style.backgroundColor = '#FAFAFA';
            overChip.style.backgroundColor = '#dedede';
        });
    }

    if (overChip) {
        overChip.addEventListener("click", function () {
            // Display components.
            underChip.style.backgroundColor = '#dedede';
            overChip.style.backgroundColor = '#FAFAFA';
        });
    }
}

// Snackbar function.
function snackbar(string) {
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var data = {
        message: string,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

function drawerHide() {
    document.querySelector('.mdl-layout__drawer').addEventListener('click', function () {
        document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
        this.classList.remove('is-visible');
    }, false);
}

// Main.