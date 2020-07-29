export default class Dashboard {
  constructor({
    document,
    Typed,
    developerMode,
    debugTime,
    filterRankByTarget,
    hash,
    localDB,
    fifa,
    dashTables,
    dashStatistics,
  }) {
    // Constants

    this.developerMode = developerMode;
    this.marketingText = [
      'Hey BRO, lets bet!!',
      'odds are going up',
      'or down, so go by LAY',
      'goaaaaaaaaal!!!!',
      'improve your profit',
    ];
    this.viewsList = [
      'home',
      'account',
      'method',
      'profit',
      'contact',
      'game',
      'robot',
      'admin',
    ];

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
    this.elBtnHome = $('#btnHome');
    this.elBarProgress = $('#progress');
    this.elImgLogo = $('#loaderLogo');
    this.elLoader = $('#loader');
    this.elPreloader = $('#preloader');
    this.elIconStatusCloud = $('#statusCloud');
    this.elContentSection = $('.page-content');
    this.elCmbUserA = $('#cmbUserA');
    this.elCmbUserB = $('#cmbUserB');
    this.elCmbTeamB = $('#cmbTeamB');
    this.elCmbTeamA = $('#cmbTeamA');
    this.elSldBatches = $('#sldBatches');
    this.elSldLearningRate = $('#sldLearningRate');
    this.elSldStart = $('#sldStart');
    this.elSldEnd = $('#sldEnd');
    this.elSldPercentValidation = $('#sldPercentValidation');
    this.elSldStep = $('#sldStep');
    this.elSldPlotPercent = $('#sldPlotPercent');
    this.elSldSaveEvery = $('#sldSaveEvery');
    this.elSliders = $('.slider');
    this.elChip = $('.mdl-chip');
    this.elObfuscator = $('.mdl-layout__obfuscator');
    this.elLayoutDrawer = $('.mdl-layout__drawer');
    this.elExtBudget = $('#txtBudget');
    this.MsgSnackbar = $('#demo-snackbar-example');

    // Functions
    this.debugTime = debugTime;
    this.filterRankByTarget = filterRankByTarget;
    this.hash = hash;

    // Objects
    this.window = window;
    this.localDB = localDB;
    this.dashTables = dashTables;
    this.dashStatistics = dashStatistics;
    this.fifa = fifa;
    this.Typed = Typed;

    // Initialization
    this.registerHandlers();
    this.initEffect();
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
  }

  async initEffect() {
    this.processing();
    //this.processing(!this.developerMode);
    this.debugTime('initEffect');
    this.cloudDone(false);
    const {
      aggregated, users, teams, data,
    } = await this.fifa.initLocalDatabase();
    this.localDB.setConsistency(aggregated);
    // this.filterRank('users', 'name', '0', users, 'filter_alt');
    // this.filterRank('teams', 'name', '0', teams, 'filter_alt');
    // this.dashTables.tableResultGamesCheck(2020, data);
    // this.dashStatistics.initStatistics(users, teams);
    this.initStorage();
    this.initTrain();
    this.cloudDone();
    this.views();
    this.typed();
    // this.processing(false);
    // this.preloader();
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
    this.localDB.setCache(this.getConfig());
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

  async filterRank(context, target, index, inTeams, inBtn, nameScope, history) {
    let teams = inTeams;
    let btn = inBtn;
    const nameSet = `${context}Set`;
    let inverse = false;
    if (!teams) {
      teams = await this.localDB.getTable(nameSet);
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
      $(`#btnTabRank${context[0].toUpperCase() + context.slice(1)}History`)[0].click();
    }

    const filteredTable = this.filterRankByTarget(all, target, inverse);
    await this.dashTables.addTableRank(context, filteredTable, index, btn, history);
    this.registerHandlers();
  }

  processing(status = true) {
    if (status) return this.elBarProgress.addClass('mdl-progress__indeterminate');
    this.elBarProgress.removeClass('mdl-progress__indeterminate');
    return this.preloader();
  }

  async preloader() {
    await this.elImgLogo.css('filter', 'none');
    this.elLoader.delay(2000).fadeOut('slow', () => this.elPreloader.fadeOut('slow'));
  }

  cloudDone(status = true) {
    if (!status) return this.elIconStatusCloud.css('color', 'var(--contrast_primary_color_3)');
    return this.elIconStatusCloud.css('color', 'var(--tertiary_color_1)');
  }

  getGameIsFilled() {
    const game = {
      teamA: { user: this.elCmbUserA.val(), team: this.elCmbTeamA.val() },
      teamB: { user: this.elCmbUserB.val(), team: this.elCmbTeamB.val() },
    };
    if (game.teamA.user && game.teamA.team && game.teamB.user && game.teamB.team) return game;
    return this.snackbar('You need fill all fields to predict.');
  }

  async fillPrediction(game) {
    if (game) {
      const prediction = await this.getPredictionIsTogether(game);
      const fixed = 7;
      $('#tablesPrediction').show();
      $('#teamAWin').html(prediction[0].toFixed(fixed));
      $('#draw').html(prediction[1].toFixed(fixed));
      $('#teamBWin').html(prediction[2].toFixed(fixed));
      $('#goalsTeamA').html(prediction[3].toFixed(fixed));
      $('#goalsTeamB').html(prediction[4].toFixed(fixed));
    }
  }

  getTrainIsTogether(callback) {
    const assets = this.getConfig();
    const assetsResult = JSON.parse(JSON.stringify(assets));
    assetsResult.nameDataSet = 'trainResultSet';
    callback(assetsResult);

    const assetsGoals = JSON.parse(JSON.stringify(assets));
    assetsGoals.nameDataSet = 'trainGoalsSet';
    callback(assetsGoals);
  }

  snackbar(string) {
    this.MsgSnackbar[0].MaterialSnackbar.showSnackbar({
      message: string,
    });
  }

  setBtnsState(propName, option) {
    let pos = 1;
    if (option === true) pos = 0;
    this.elChip.closest(propName).children().eq(1)
      .children()[pos].click();
  }

  getBtnsState(propName) {
    const chip = this.elChip.closest(propName).children().eq(1).children();
    if (chip.css('backgroundColor') === 'rgb(250, 250, 250)') return true;
    return false;
  }

  getConfig() {
    const obj = JSON.parse(JSON.stringify(this.fifa.defaultML));
    obj.batches = this.elSldBatches.val();
    obj.learningRate = this.elSldLearningRate.val();
    obj.start = this.elSldStart.val();
    obj.end = this.elSldEnd.val();
    obj.validationPercent = this.elSldPercentValidation.val();
    obj.step = this.elSldStep.val();
    obj.plotPercent = this.elSldPlotPercent.val();
    obj.saveEvery = this.elSldSaveEvery.val();
    obj.randomize = this.getBtnsState('#btnsShuffle');
    obj.normalization = this.getBtnsState('#btnsNormalization');

    return obj;
  }

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
    } = JSON.parse(this.localDB.getCache('machineLearning'));

    this.elSldStart.attr('max', max);
    this.elSldEnd.attr('max', max);
    this.elSldStep.attr('max', max);

    this.elSldBatches.val(batches);
    this.elSldLearningRate.val(learningRate);
    this.elSldStart.val(start);
    this.elSldEnd.val(end);
    this.elSldPercentValidation.val(validationPercent);
    this.elSldStep.val(step);
    this.elSldPlotPercent.val(plotPercent);

    this.updateLabel();

    this.setBtnsState('#btnsNormalization', normalization);
    this.setBtnsState('#btnsShuffle', randomize);
  }

  initStorage() {
    if (!this.localDB.getCache('machineLearning')) {
      this.localDB.setCache('machineLearning', JSON.stringify(this.fifa.defaultML));
    }
  }

  autoUpdateLabel() {
    this.elSliders.each((i, wrap) => {
      const range = $(wrap).find('.mdl-slider');
      $(wrap).off().click((e) => this.openHistory(e));
      wrap.addEventListener('input', () => {
        const values = $(wrap).find('.values');
        values.html(range.val());
      });
    });
  }

  updateLabel() {
    this.elSliders.each((i, wrap) => {
      const range = $(wrap).find('.mdl-slider');
      const values = $(wrap).find('.values');
      values.html(range.val());
    });
  }

  typed() {
    return new this.Typed('.typed', {
      strings: this.marketingText,
      typeSpeed: 100,
      backDelay: 0,
    });
  }

  views() {
    this.viewsList.forEach((showElement) => {
      const key = `#btn${showElement[0].toUpperCase()}${showElement.slice(1)}s`;
      $(key).click((e) => {
        e.stopImmediatePropagation();
        this.viewsList.forEach((hideElement) => {
          $(`#${hideElement}`).hide();
        });
        this.elObfuscator.removeClass('is-visible');
        this.elLayoutDrawer.removeClass('is-visible');
        this.localDB.setCache('view:', showElement);
        $(`#${showElement}`).toggle();
        if (showElement === 'home') {
          this.elExtBudget.html('BROTHER.BET');
        } else {
          this.elExtBudget.html(showElement);
        }
      });
    });
    this.elBtnHome.click();
  }
}
