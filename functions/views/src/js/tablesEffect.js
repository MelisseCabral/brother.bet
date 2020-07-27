/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const tableResultGamesCheck = async (year, dataSet) => {
  const registeredIds = await getRegisteredDays(dataSet);
  const allDaysOfYear = generateDaysofYear(year);

  const addCheckGid = (day, idsByDay) => {
    let color = '#e82f38';
    let icon = 'close';
    let gid = '';

    if (idsByDay[day]) {
      color = '#2fe82f';
      icon = 'check';
      gid = idsByDay[day];
    }

    $('#admin').find('table').find('tbody').append(`
      <tr>
        <th class="mdl-data-table__cell--non-numeric">${day}</th>
        <th class="mdl-data-table__cell--non-numeric">${gid}</th>
        <th class="mdl-data-table__cell--non-numeric">
          <i style="color: ${color};" class=" material-icons">${icon}</i>
        </th>
      </tr>
    `);
  };

  allDaysOfYear.forEach((each) => {
    addCheckGid(each, registeredIds);
  });
};

const getGidsInTable = () => {
  const gids = [];
  $('#registerFactory table > tbody > tr').each((index, value) => gids.push($(value).find('th').first().text()));
  return gids;
};

const addGidToTable = async (gid, status) => {
  let setStatus = '<i style="color: #2fe82f;" class=" material-icons">check</i>';
  if (status !== true) setStatus = status;
  const hashTimedId = hash(new Date());

  $('#registerFactory').find('table').find('tbody').append(`
      <tr>
        <th class="mdl-data-table__cell--non-numeric">${gid}</th>
        <th class="mdl-data-table__cell--non-numeric">${setStatus}</th>
        <th id="${hashTimedId}">
          <i class="deleteListGid material-icons">delete</i>
        </th>      
      </tr>
    `);

  $(`#${hashTimedId}`).off().click((e) => {
    e.stopImmediatePropagation();
    $(e.target).parents()[1].remove();
  });
};

const clearListOfGids = () => {
  $('#registerFactory').find('table').find('tbody').html('');
};

const registerGids = async () => {
  const gids = getGidsInTable();
  clearListOfGids();
  const error = [];
  for (const gid of gids) {
    let response = await registerGid(gid);
    if (Array.isArray(response)) {
      const msgError = response;
      response = 'Error: Not pass in validation.';
      console.log(response, msgError);
    }
    error.push(response);
    addGidToTable(gid, response);
  }
  if (error.includes(true)) {
    await setDatabaseConsistency();
  }
};

const addTableRank = async (nameScope, teams, index, btn, history) => {
  const id = `#tabRank${nameScope[0].toUpperCase() + nameScope.slice(1) + (history || '')}`;
  const fixed = 1;

  const table = $(await getStructure('components/tableRanking.html'));
  $(id).html(table);
  $(`${id} thead:nth-child(2) tr`).find('i').html('filter_alt');
  $(`${id} thead:nth-child(2) tr`).children().eq(index).find('i')
    .html(btn);

  teams.forEach((team, indexof) => {
    const idTh = `${team.name + hash(team)}`;

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
  actions();
};
