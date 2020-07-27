import Typed from 'typed.js';
import $ from 'jquery';

import { origin, developerMode } from './environment';
import debugTime from './debugTime';
import { filterRankByTarget } from './fifa';
import localDb from './localDb';

window.jQuery = $;
window.$ = $;
window.developerMode = developerMode;

class Dashboard {
  constructor() {
    // Constants
    this.origin = origin;
    this.developerMode = developerMode;

    // Variables

    // DOM Objects
    this.document = $(document);
    this.elNeuralFactory = $('#neuralFactory');
    this.elPredictFactory = $('#predictFactory');
    this.elBtnOpenNeural = $('#btnNeural');
    this.elBtnOpenPredict = $('#btnPredict');
    this.elBtnCloseTrain = $('#btnCloseTrain');
    this.elBtnClosePredict = $('#btnClosePredict');
    this.elBtnSaveTrain = $('#btnSaveTrain');
    this.elBtnCookTrain = $('#btnCookTrain');
    this.elBtnCookTrainReal = $('#btnCookTrainReal');
    this.elBtnCookPredict = $('#btnCookPredict');
    this.elBtnLogout = $('#btnLogout');
    this.elBtnFilter = $('.page-content thead:nth-child(2) i');
    this.elBtnHistory = $('.page-content tbody th:first-child');

    // Functions
    this.debugTime = debugTime;
    this.filterRankByTarget = filterRankByTarget;
    // Objects
    this.window = window;
  }

  registerHandlers() {
    this.elBtnOpenNeural.off().click((e) => this.openNeuralFactory(e));
    this.elBtnOpenPredict.off().click((e) => this.openPredictFactory(e));
    this.elBtnCloseTrain.off().click((e) => this.closeNeuralFactory(e));
    this.elBtnClosePredict.off().click((e) => this.closePredictFactory(e));
    this.elBtnSaveTrain.off().click((e) => this.saveTrain(e));
    this.elBtnCookTrain.off().click((e) => this.cookTrain(e));
    this.elBtnCookTrainReal.off().click((e) => this.cookTrainReal(e));
    this.elBtnCookPredict.off().click((e) => this.cookPredict(e));
    this.elBtnLogout.off().click((e) => this.logout(e));
    this.elBtnFilter.off().click().click((e) => this.doRankFiltering(e));
    this.elBtnHistory.off().click((e) => this.openHistory(e));
    this.document.ready((e) => this.initEffect(e));
  }

  async initEffect(e) {
    e.stopImmediatePropagation();
    this.processing(!developerMode);
    this.debugTime('initEffect');
    this.cloudDone(false);
    const {
      aggregated, users, teams, data,
    } = await this.fifa.initLocalDatabase();
    this.processing(false);
    this.filterRank('users', 'name', '0', users, 'filter_alt');
    this.filterRank('teams', 'name', '0', teams, 'filter_alt');
    this.tableResultGamesCheck(2020, data);
    this.initStatistics(users, teams);
    this.initStorage();
    this.initTrain();
    this.setConsistency(aggregated);
    this.cloudDone();
    this.views();
    this.market();
    this.typedTchan();
    this.stake();
    this.actions();
    this.preloader();
    this.debugTime('end');
  }

  openNeuralFactory(e) {
    e.stopImmediatePropagation();
    this.elNeuralFactory.show();
  }

  openPredictFactory(e) {
    e.stopImmediatePropagation();
    this.elPredictFactory.show();
  }

  closeNeuralFactory(e) {
    e.stopImmediatePropagation();
    this.elNeuralFactory.hide();
  }

  closePredictFactory(e) {
    e.stopImmediatePropagation();
    this.elPredictFactory.hide();
  }

  saveTrain(e) {
    e.stopImmediatePropagation();
    this.setCache(this.getConfig());
  }

  cookTrain(e) {
    e.stopImmediatePropagation();
    this.getTrainIsTogether(this.getTrain);
  }

  cookTrainReal(e) {
    e.stopImmediatePropagation();
    this.getTrainIsTogether(this.getNeuralNetwork);
  }

  cookPredict(e) {
    e.stopImmediatePropagation();
    this.saveConfig();
  }

  logout(e) {
    e.stopImmediatePropagation();
    return this.document;
  }

  setCache(name, value) {
    this.window.localStorage.setItem(name, JSON.stringify(value));
  }

  getCache(name) {
    return this.window.localStorage.getItem(name);
  }

  async doRankFiltering(e) {
    e.stopImmediatePropagation();
    await this.filterRank(
      $(e.target).parents()[5].id.split('tabRank')[1].slice(0, 5).toLowerCase(),
      $(e.target).prev().attr('class'),
      $($(e.target).parents()[0]).index(),
      '',
      $(e.target).html(),
      $(`#${$(e.target).parents()[5].id} .page-content tbody th:first-child`).html(),
      $(e.target).parents()[5].id.split('tabRank')[1].slice(5, 15),
    );
  }

  async openHistory(e) {
    e.stopImmediatePropagation();
    await this.filterRank(
      $(e.target).parents()[4].id.split('tabRank')[1].split('History')[0].toLowerCase(),
      'games',
      '1',
      '',
      'filter_alt',
      $($(e.target).get(0)).html(),
      'History',
    );
  }

  async filterRank(context, target, index, teams, btn, nameScope, history) {
    const nameSet = `${context}Set`;
    let inverse = false;
    if (!teams) {
      teams = await this.localDb.getTable(nameSet);
    }

    if (btn === 'filter_alt' || btn === 'arrow_downward') btn = 'arrow_upward';
    else if (btn === 'arrow_upward') btn = 'arrow_downward';

    if (btn === 'arrow_downward') inverse = true;

    const all = [];

    if (!history) {
      const nameTeams = Object.keys(teams);
      nameTeams.forEach((nameTeam) => {
        const team = teams[nameTeam][teams[nameTeam].length - 1];
        team.name = nameTeam;
        all.push(team);
      });
    } else {
      const team = teams[nameScope];
      team.forEach((turn) => {
        const newTurn = turn;
        newTurn.name = nameScope;
        all.push(newTurn);
      });
      document.getElementById(`btnTabRank${context[0].toUpperCase() + context.slice(1)}History`).click();
    }

    const filteredTable = filterRankByTarget(all, target, inverse);
    await this.addTableRank(context, filteredTable, index, btn, history);
  }

  processing(status) {
    if (status) return $('#progress').addClass('mdl-progress__indeterminate');
    $('#progress').removeClass('mdl-progress__indeterminate');
    return preloader();
  }

  cloudDone(status = true) {
    if (!status) return $('#statusCloud').css('color', 'var(--contrast_primary_color_3)');
    return $('#statusCloud').css('color', 'var(--tertiary_color_1)');
  }

  restrictedArea(id) {
    $(`${id} .page-content`).addClass('restrict-area');
  }

  async preloader() {
    await $('.loader-logo').css('filter', 'none');
    $('#loader').delay(2000).fadeOut('slow', () => $('#preloader').fadeOut('slow'));
  }

  getStructure(page) {
    return new Promise((resolve) => {
      $.when($.get(page)).done((data) => resolve(data));
    });
  }

  registerFactoryClose() {
    $('#registerFactory').hide();
    $('#registerFactory').find('table').show();
  }

  increaseBrotherBonus() {
    $('#brotherBonus').html(Number(Number($('#brotherBonus').html()) || 0) + 1);
  }

  increaseMoney() {
    $('#money').html(Number(Number($('#money').html()) || 0) + 1);
  }

  getGameIsFilled() {
    const game = {
      teamA: { user: $('#cmbUserA').val(), team: $('#cmbTeamA').val() },
      teamB: { user: $('#cmbUserB').val(), team: $('#cmbTeamB').val() },
    };
    if (game.teamA.user && game.teamA.team && game.teamB.user && game.teamB.team) return game;
    return alert('You need fill all fields to predict.');
  }

  async fillPrediction(game) {
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

  async getPredictionIsTogether(game) {
    if ($('#together').prop('checked')) {
      const predictionResult = await predict('trainResultSet', game);
      const predictionGoals = await predict('trainGoalsSet', game);
      return [...predictionResult, ...predictionGoals];
    }
    return predict('trainSet', game);
  }

  getTrainIsTogether(callback) {
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

  fillComboboxes(usersSet, teamsSet) {
    const users = Object.keys(usersSet);
    const teams = Object.keys(teamsSet);

    const arrUsers = ['cmbUserA', 'cmbUserB'];
    const arrTeams = ['cmbTeamA', 'cmbTeamB'];

    users.forEach((each) => arrUsers.forEach((eachSel) => $(`#${eachSel}`).append(`<option value="${each}">${each}</option>`)));
    teams.forEach((each) => arrTeams.forEach((eachSel) => $(`#${eachSel}`).append(`<option value="${each}">${each}</option>`)));
  }

  snackbar(string) {
    const snackbarContainer = document.querySelector('#demo-snackbar-example');
    const data = {
      message: string,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

  setBtnsState(propName, option) {
    let pos = 1;
    if (option === true) pos = 0;
    document.getElementById(propName).querySelectorAll('.mdl-chip')[pos].click();
  }

  getBtnsState(propName) {
    truly = document.getElementById(propName).querySelector('.mdl-chip');
    if (truly.style.backgroundColor === 'rgb(250, 250, 250)') return true;
    return false;
  }

  saveConfig() {

  }

  getConfig() {
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
  initTrain() {
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

  stake() {
    const stakeSlider = document.querySelector('#sliderStake');
    stakeSlider.addEventListener(
      'change',
      () => {
        const budgetFloat = parseFloat($('#valueBudget').html());
        let partBudget = budgetFloat * parseFloat(stakeSlider.value / stakeSlider.max);
        let percBudget = (partBudget / budgetFloat) * 100;
        partBudget = partBudget.toFixed(2);
        percBudget = percBudget.toFixed(2);
        $('#valueStake').html(partBudget);
        $('#valuePercStake').html(percBudget);
      },
      false,
    );
  }

  views() {
    const viewsList = [
      'home',
      'account',
      'method',
      'profit',
      'contact',
      'game',
      'robot',
      'admin',
    ];
    viewsList.forEach((showElement) => {
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
  autoUpdateLabel() {
    document.querySelectorAll('.slider').forEach((wrap) => {
      const range = wrap.querySelector('.mdl-slider');
      wrap.addEventListener('input', () => {
        const values = wrap.querySelector('.values');
        values.innerHTML = range.value;
      });
    });
  }

  updateLabel() {
    document.querySelectorAll('.slider').forEach((wrap) => {
      const range = wrap.querySelector('.mdl-slider');
      const values = wrap.querySelector('.values');
      values.innerHTML = range.value;
    });
  }

  market() {
    const marketWinList = ['chipCorrectScore', 'chipMatchOdds', 'chipUnderOver'];

    marketWinList.forEach((showElement) => {
      $(`#${showElement}`)
        .off()
        .click((e) => {
          e.stopImmediatePropagation();
          const key = showElement
            .split('chip')[1]
            .split(/(?=[A-Z])/)
            .join('_')
            .toLowerCase();
          $('#market').val(key);
          marketWinList.forEach((hideElement) => {
            const hiden = hideElement
              .split('chip')[1]
              .split(/(?=[A-Z])/)
              .join('_')
              .toLowerCase();
            $(`.${hiden}`).css('display', 'none');
            $(`#${hideElement}`).css('background-color', '#dedede');
          });
          $(`.${key}`).show();
          $(`#${showElement}`).css('background-color', '#FAFAFA');
          initMarket();
          $('.overlay').css(
            'height',
            `${$('.init-box-robot').outerHeight() * 1.13}px`,
          );
        });
    });

    const marketPositionList = ['chipBack', 'chipLay'];

    marketPositionList.forEach((showElement) => {
      $(`#${showElement}`)
        .off()
        .click((e) => {
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

  initStorage() {
    if (!localStorage.getItem('machineLearning')) {
      localStorage.setItem('machineLearning', JSON.stringify(defaultML));
    }
  }

  setConsistency(consistency) {
    localStorage.setItem('consistency', hash(consistency));
  }

  getConsistency() { JSON.parse(localStorage.getItem('consistency')); }

  initMarket() {
    const marketWinList = ['chipHome', 'chipAway', 'chipDraw'];

    marketWinList.forEach((showElement) => {
      $(`#${showElement}`)
        .off()
        .click((e) => {
          e.stopImmediatePropagation();
          marketWinList.forEach((hideElement) => {
            $(`#${hideElement}`).css('background-color', '#dedede');
          });
          $(`#${showElement}`).css('background-color', '#FAFAFA');
        });
    });

    const marketTypeList = ['chipUnder', 'chipOver'];

    marketTypeList.forEach((showElement) => {
      $(`#${showElement}`)
        .off()
        .click((e) => {
          e.stopImmediatePropagation();
          marketTypeList.forEach((hideElement) => {
            $(`#${hideElement}`).css('background-color', '#dedede');
          });
          $(`#${showElement}`).css('background-color', '#FAFAFA');
        });
    });
  }

  typedTchan() {
    new Typed('.typed', {
      strings: [
        'Hey BRO, lets bet!!',
        'odds are going up',
        'or down, so go by LAY',
        'goaaaaaaaaal!!!!',
        'improve your profit',
      ],
      typeSpeed: 100,
      backDelay: 0,
    });
  }
}

const { dashboard } = new Dashboard();

export default { dashboard };
