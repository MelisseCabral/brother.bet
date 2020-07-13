/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */

// Actions functions.

$(document).ready(async () => {
  await setMachineLearning();
  $('#statusCloud').css('color', '#ffb80c');
  fillComboboxes();
  initTrain();
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
    if (statusCloud) {
      $('#predictFactory').show();
    } else {
      alert('Wait for it...');
    }
  });

  $('#btnLogoutFun').off().click((e) => {
    e.stopImmediatePropagation();
    logout();
  });

  $('.btn-close').off().click((e) => {
    e.stopImmediatePropagation();
    $('#trainFactory').hide();
    $('#predictFactory').hide();
  });

  $('#btnSaveTrain').off().click((e) => {
    e.stopImmediatePropagation();
    saveConfig();
  });

  $('#btnCookPredict').off().click(async (e) => {
    e.stopImmediatePropagation();
    $('#tables').hide();
    fillPrediction(getGameIsFilled());
  });

  $('#btnCookTrainReal').off().click(async (e) => {
    e.stopImmediatePropagation();
    if (statusCloud) {
      increaseBrotherBonus();
      getTrainIsTogether(getTrain);
    } else {
      alert('Wait for it...');
    }
  });

  $('#btnCookTrain').off().click((e) => {
    e.stopImmediatePropagation();
    increaseMoney();
    getTrainIsTogether(getNeuralNetwork);
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

function increaseBrotherBonus() {
  $('#brotherBonus').html(Number(Number($('#brotherBonus').html()) || 0) + 1);
}

function increaseMoney() {
  $('#money').html(Number(Number($('#money').html()) || 0) + 1);
}

function getGameIsFilled() {
  const game = {
    teamA: { user: $('#cmbUserA').val(), team: $('#cmbTeamA').val() },
    teamB: { user: $('#cmbUserB').val(), team: $('#cmbTeamB').val() },
  };
  if (game.teamA.user && game.teamA.team && game.teamB.user && game.teamB.team) return game;
  return alert('You need fill all fields to predict.');
}

async function fillPrediction(game) {
  if (game) {
    const prediction = await getPredictionIsTogether(game);
    const fixed = 7;
    $('#tables').show();
    $('#teamAWin').html(prediction[0].toFixed(fixed));
    $('#draw').html(prediction[1].toFixed(fixed));
    $('#teamBWin').html(prediction[2].toFixed(fixed));
    $('#goalsTeamA').html(prediction[3].toFixed(fixed));
    $('#goalsTeamB').html(prediction[4].toFixed(fixed));
  }
}

async function getPredictionIsTogether(game) {
  if ($('#together').prop('checked')) {
    const predictionResult = await predict('trainGoalsSet', game);
    const predictionGoals = await predict('trainResultSet', game);
    return [...predictionResult, ...predictionGoals];
  }
  return predict('trainSet', game);
}

async function getTrainIsTogether(callback) {
  const assets = getConfig();
  if ($('#togetherTrain').prop('checked')) {
    const assetsResult = JSON.parse(JSON.stringify(assets));
    assetsResult.nameDataSet = 'trainResultSet';
    callback(assetsResult);

    const assetsGoals = JSON.parse(JSON.stringify(assets));
    assetsGoals.nameDataSet = 'trainGoalsSet';
    callback(assetsGoals);
  } else {
    const assetsDefault = JSON.parse(JSON.stringify(assets));
    assetsDefault.nameDataSet = 'trainSet';
    callback(assetsDefault);
  }
}

async function fillComboboxes() {
  const { users, teams } = await getUsersTeams();
  const arrUsers = ['cmbUserA', 'cmbUserB'];
  const arrTeams = ['cmbTeamA', 'cmbTeamB'];

  users.forEach((each) => arrUsers.forEach((eachSel) => $(`#${eachSel}`).append(`<option value="${each}">${each}</option>`)));
  teams.forEach((each) => arrTeams.forEach((eachSel) => $(`#${eachSel}`).append(`<option value="${each}">${each}</option>`)));
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
  const obj = JSON.parse(JSON.stringify(defaultML));
  obj.batches = $('#sldBatches').val();
  obj.learningRate = $('#sldLearningRate').val();
  obj.start = $('#sldStart').val();
  obj.end = $('#sldEnd').val();
  obj.randomize = getBtnsState('btnsShuffle');
  obj.normalization = getBtnsState('btnsNormalization');
  obj.validationPercent = $('#sldPercentValidation').val();
  obj.step = $('#sldStep').val();
  obj.plotPercent = $('#sldPlotPercent').val();
  obj.saveEvery = $('#sldSaveEvery').val();
  return obj;
}

// Cook Train
function initTrain() {
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
  // market();
  typedTchan();
  stake();
  actions();
  $('#btnHomes').click();
});
