export default class DashStatistics {
  constructor({ getStructure, developerMode }) {
    // Variables
    this.developerMode = developerMode;

    // DOM Elements
    this.elTabStatistics = $('#tabStatistics');
    this.elContentSection = $('.page-content');

    // Functions
    this.getStructure = getStructure;
  }

  async initStatistics(users, teams) {
    const table = await this.getStructure('components/tableRanking.html');

    this.elTabStatistics.html(table);
    if (!this.developerMode) this.elContentSection.parent(this.elTabStatistics).addClass('restrict-area');

    DashStatistics.fillComboboxes(users, teams);
  }

  static fillComboboxes(usersSet, teamsSet) {
    const users = Object.keys(usersSet);
    const teams = Object.keys(teamsSet);

    const arrUsers = ['cmbUserA', 'cmbUserB'];
    const arrTeams = ['cmbTeamA', 'cmbTeamB'];

    users.forEach((each) => arrUsers.forEach((eachSel) => $(`#${eachSel}`).append(`<option value="${each}">${each}</option>`)));
    teams.forEach((each) => arrTeams.forEach((eachSel) => $(`#${eachSel}`).append(`<option value="${each}">${each}</option>`)));
  }
}
