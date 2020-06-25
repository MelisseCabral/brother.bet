/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */

// Actions functions.
function actions() {
  $('#btnCloud').off().click((e) => {
    e.stopImmediatePropagation();
    if (confirm('The whole database gonna be deleted to be updated! Do you wanna proceed?')) getFifaCloud();
  });

  $('#btnNeural').off().click((e) => {
    e.stopImmediatePropagation();
  });

  $('#btnDownload').off().click(async (e) => {
    e.stopImmediatePropagation();
    await downloadDb();
  });

  $('#btnPredict').off().click(async (e) => {
    e.stopImmediatePropagation();
    await getNeuralNetwork();
  });

  $('#btnDelete').off().click((e) => {
    e.stopImmediatePropagation();
    if (confirm('The whole database gonna be deleted! Do you wanna proceed?')) deleteAllDB();
  });

  $('#valueBudget').off().click((e) => {
    e.stopImmediatePropagation();
  });

  $('#btnLAccount').off().click((e) => {
    e.stopImmediatePropagation();
    $('#btnAccounts').click();
  });

  $('#btnBetfairAccount').off().click((e) => {
    e.stopImmediatePropagation();
    $('#btnAccounts').click();
  });

  $('#btnCloseRobot').off().click((e) => {
    e.stopImmediatePropagation();
    $('#robotFactory').hide();
  });

  $('#btnSaveRobot').off().click((e) => {
    e.stopImmediatePropagation();
    $(this).animate({ bottom: '1000px' }, 'slow');
    $(this).animate({ opacity: '0' }, 'slow');
    $(this).animate({ bottom: '0px' }, 'slow');
    $(this).animate({ opacity: '1' }, 'slow');
    saveRobotModel();
  });

  $('#btnLogout').off().click((e) => {
    e.stopImmediatePropagation();
    logout();
  });

  $('#btnLogout').off().click((e) => {
    e.stopImmediatePropagation();
    logout();
  });

  $('#btnLogoutFun').off().click((e) => {
    e.stopImmediatePropagation();
    logout();
  });
}

// Stake
function stake() {
  const stakeSlider = document.querySelector('#sliderStake');
  stakeSlider.addEventListener('change', () => {
    const budgetFloat = parseFloat($('#valueBudget').html());
    let partBudget = budgetFloat * parseFloat(stakeSlider.value / stakeSlider.max);
    let percBudget = (partBudget / budgetFloat) * 100;
    partBudget = partBudget.toFixed(2);
    percBudget = percBudget.toFixed(2);
    $('#valueStake').html(partBudget);
    $('#valuePercStake').html(percBudget);
  }, false);
}

// Views
function views() {
  const viewsList = ['home', 'account', 'method', 'profit', 'contact', 'game', 'robot'];

  viewsList.forEach((showElement) => {
    removeListeners();
    const key = `#btn${showElement[0].toUpperCase()}${showElement.slice(1)}s`;
    $(key).click((e) => {
      e.stopImmediatePropagation();
      viewsList.forEach((hideElement) => {
        $(`#${hideElement}`).hide();
      });
      $('.mdl-layout__obfuscator').removeClass('is-visible');
      $('.mdl-layout__drawer').removeClass('is-visible');
      localStorage.setItem('view:', showElement);
      $(`#${showElement}`).toggle();
      if (showElement === 'home') {
        $('#txtBudget').html('brother.bet');
      } else {
        $('#txtBudget').html(showElement);
      }
      if (showElement === 'game') getGames();
    });
  });
  $('#btnHome').click();
}

// Market
function market() {
  const marketWinList = ['chipCorrectScore', 'chipMatchOdds', 'chipUnderOver'];

  marketWinList.forEach((showElement) => {
    $(`#${showElement}`).off().click((e) => {
      e.stopImmediatePropagation();
      const key = showElement.split('chip')[1].split(/(?=[A-Z])/).join('_').toLowerCase();
      $('#market').val(key);
      marketWinList.forEach((hideElement) => {
        const hiden = hideElement.split('chip')[1].split(/(?=[A-Z])/).join('_').toLowerCase();
        $(`.${hiden}`).css('display', 'none');
        $(`#${hideElement}`).css('background-color', '#dedede');
      });
      $(`.${key}`).show();
      $(`#${showElement}`).css('background-color', '#FAFAFA');
      initMarket();
      $('.overlay').css('height', `${$('.init-box-robot').outerHeight() * 1.13}px`);
    });
  });

  const marketPositionList = ['chipBack', 'chipLay'];

  marketPositionList.forEach((showElement) => {
    $(`#${showElement}`).off().click((e) => {
      e.stopImmediatePropagation();
      showElement.split('chip')[1].toLowerCase();
      $('#position').val('back');
      marketPositionList.forEach((hideElement) => {
        $(`#${hideElement}`).css('background-color', '#dedede');
      });
      $(`#${showElement}`).css('background-color', '#FAFAFA');
    });
  });
}

function initMarket() {
  const marketWinList = ['chipHome', 'chipAway', 'chipDraw'];

  marketWinList.forEach((showElement) => {
    $(`#${showElement}`).off().click((e) => {
      e.stopImmediatePropagation();
      marketWinList.forEach((hideElement) => {
        $(`#${hideElement}`).css('background-color', '#dedede');
      });
      $(`#${showElement}`).css('background-color', '#FAFAFA');
    });
  });

  const marketTypeList = ['chipUnder', 'chipOver'];

  marketTypeList.forEach((showElement) => {
    $(`#${showElement}`).off().click((e) => {
      e.stopImmediatePropagation();
      marketTypeList.forEach((hideElement) => {
        $(`#${hideElement}`).css('background-color', '#dedede');
      });
      $(`#${showElement}`).css('background-color', '#FAFAFA');
    });
  });
}

// Typed
function typedTchan() {
  Typed.new('.typed', {
    strings: ['Hey BRO, lets bet!!',
      'odds are going up',
      'or down, so go by LAY',
      'goaaaaaaaaal!!!!',
      'improve your assets'],
    typeSpeed: 100,
    backDelay: 0,
  });
}

// Main.
$(document).ready(() => {
  views();
  market();
  typedTchan();
  stake();
  actions();
  $('#btnHomes').click();
});
