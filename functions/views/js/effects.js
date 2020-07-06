/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */

// Actions functions.

let statusCloud = false;

$(document).ready(async () => {
  statusCloud = await setMachineLearning();
  if (statusCloud) {
    return $('#statusCloud').css('color', '#ffb80c');
  }
  return $('#statusCloud').css('color', '#767777');
});

function actions() {
  autoUpdateLabel();

  $('#btnCloud').off().click(async (e) => {
    e.stopImmediatePropagation();
    if (confirm('The whole database gonna be deleted to be updated! Do you wanna proceed?')) {
      await getFifaCloud();
      console.log('done');
    }
  });

  $('#btnNeural').off().click((e) => {
    e.stopImmediatePropagation();
    if (statusCloud) {
      $('#trainFactory').show();
      prepareTrain();
    } else {
      alert('Wait for it...');
    }
  });

  $('#btnDownload').off().click(async (e) => {
    e.stopImmediatePropagation();
    if (statusCloud) {
      await downloadDb();
    } else {
      alert('Wait for it...');
    }
  });

  $('#btnPredict').off().click(async (e) => {
    e.stopImmediatePropagation();
    alert('Predict MotherFocker');
  });

  $('#btnTrain').off().click((e) => {
    e.stopImmediatePropagation();
    if (statusCloud) {
      $('#trainFactory').show();
      prepareTrain();
    } else {
      alert('Wait for it...');
    }
  });

  $('#btnLogoutFun').off().click((e) => {
    e.stopImmediatePropagation();
    logout();
  });

  $('#btnCloseTrain').off().click((e) => {
    e.stopImmediatePropagation();
    $('#trainFactory').hide();
  });

  $('#btnSaveTrain').off().click((e) => {
    e.stopImmediatePropagation();
    saveConfig();
  });

  $('#btnCookTrain').off().click((e) => {
    e.stopImmediatePropagation();
    getNeuralNetwork(getConfig());
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
    saveRobotModel();
  });

  $('#btnLogout').off().click((e) => {
    e.stopImmediatePropagation();
    logout();
  });
}

// Snackbar function.
function snackbar(string) {
  const snackbarContainer = document.querySelector('#demo-snackbar-example');
  const data = {
    message: string,
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function setBtnsState(propName, option) {
  let pos = 1;
  if (option === true) pos = 0;
  document.getElementById(propName).querySelectorAll('.mdl-chip')[pos].click();
}

function getBtnsState(propName) {
  truly = document.getElementById(propName).querySelector('.mdl-chip');
  if (truly.style.backgroundColor === 'rgb(250, 250, 250)') return true;
  return false;
}

function saveConfig() {
  localStorage.setItem('machineLearning', JSON.stringify(getConfig()));
}

function getConfig() {
  const { max } = JSON.parse(localStorage.getItem('machineLearning'));
  return {
    max,
    nameDataSet: 'trainSet',
    validationSet: '',
    batches: $('#sldBatches').val(),
    learningRate: $('#sldLearningRate').val(),
    start: $('#sldStart').val(),
    end: $('#sldEnd').val(),
    randomize: getBtnsState('btnsShuffle'),
    normalization: getBtnsState('btnsNormalization'),
    validationPercent: $('#sldPercentValidation').val(),
    step: $('#sldStep').val(),
    plotPercent: $('#sldPlotPercent').val(),
  };
}

// Cook Train
function prepareTrain() {
  const {
    batches,
    learningRate,
    start,
    end,
    max,
    randomize,
    normalization,
    validationPercent,
    step,
    plotPercent,
  } = JSON.parse(localStorage.getItem('machineLearning'));

  document.getElementById('sldStart').max = max;
  document.getElementById('sldEnd').max = max;
  document.getElementById('sldStep').max = max;

  $('#sldBatches').val(batches);
  $('#sldLearningRate').val(learningRate);
  $('#sldStart').val(start);
  $('#sldEnd').val(end);
  $('#sldPercentValidation').val(validationPercent);
  $('#sldStep').val(step);
  $('#sldPlotPercent').val(plotPercent);

  updateLabel();

  setBtnsState('btnsNormalization', normalization);
  setBtnsState('btnsShuffle', randomize);
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

// Slider
function autoUpdateLabel() {
  document.querySelectorAll('.slider').forEach((wrap) => {
    const range = wrap.querySelector('.mdl-slider');
    wrap.addEventListener('input', () => {
      const values = wrap.querySelector('.values');
      values.innerHTML = range.value;
    });
  });
}

function updateLabel() {
  document.querySelectorAll('.slider').forEach((wrap) => {
    const range = wrap.querySelector('.mdl-slider');
    const values = wrap.querySelector('.values');
    values.innerHTML = range.value;
  });
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
