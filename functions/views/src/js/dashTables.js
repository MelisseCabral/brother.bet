export default class DashTables {
  constructor({
    hash,
    generateDaysOfYear,
    getRegisteredDays,
    getStructure,
  }) {
    // constants
    this.varClrSec5 = 'var(--secondary_color_5)';
    this.varClrTer5 = 'var(--tertiary_color_5)';

    // DOM Elements
    this.elTableBodyGames = $('#admin table tbody');

    // Functions
    this.hash = hash;
    this.generateDaysOfYear = generateDaysOfYear;
    this.getRegisteredDays = getRegisteredDays;
    this.getStructure = getStructure;
  }

  tableResultGamesCheck(year, dataSet) {
    const registeredIds = this.getRegisteredDays(dataSet);
    const allDaysOfYear = this.generateDaysOfYear(year);

    this.elTableBodyGames.html();
    allDaysOfYear.forEach((day) => {
      let color = this.varClrTer5;
      let icon = 'close';
      let gid = '';

      if (registeredIds[day]) {
        color = this.varClrSec5;
        icon = 'check';
        gid = registeredIds[day];
      }

      this.elTableBodyGames.append(`
      <tr>
        <th class="mdl-data-table__cell--non-numeric">${day}</th>
        <th class="mdl-data-table__cell--non-numeric">${gid}</th>
        <th class="mdl-data-table__cell--non-numeric">
          <i style="color: ${color};" class=" material-icons">${icon}</i>
        </th>
      </tr>
    `);
    });
  }

  async addTableRank(nameScope, teams, index, btn, history) {
    const id = `#tabRank${nameScope[0].toUpperCase() + nameScope.slice(1) + (history || '')}`;
    const fixed = 1;

    const table = $(await this.getStructure('components/tableRanking.html'));
    $(id).html(table);
    $(`${id} thead:nth-child(2) tr`).find('i').html('filter_alt');
    $(`${id} thead:nth-child(2) tr`).children().eq(index).find('i')
      .html(btn);

    teams.forEach((team, indexof) => {
      const idTh = `${team.name + this.hash(team)}`;

      $(id).find('table').find('tbody').append(
        `
      <tr>
        <th class="link" id="${idTh}">${team.name}</th>
        <th class="gold">${indexof + 1}</th>
        <th>${team.games}</th>
        <th>${team.goalsPro.toFixed(2)}</th>
        <th>${team.goalsCon.toFixed(2)}</th>
        <th >${(team.wins * 100).toFixed(fixed)}%</th>
        <th >${(team.draws * 100).toFixed(fixed)}%</th>
        <th >${(team.losses * 100).toFixed(fixed)}%</th>
        <th >${(team.bothScore * 100).toFixed(fixed)}%</th>
        <th >${(team.underHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underOneAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underTwoAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underThreeAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underFourAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overOneAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overTwoAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overThreeAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overFourAndHalf * 100).toFixed(fixed)}%</th>
      </tr>
      `,
      );
    });
  }
}
