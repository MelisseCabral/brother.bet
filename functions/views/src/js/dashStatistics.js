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

    this.fillComboboxes(users, teams);
  }
}
