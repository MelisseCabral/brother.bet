/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const tableCheckGid = async (year) => {
  const registeredIds = await getRegisteredDays();
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
    $('#statusCloud').css('color', '#757575');
    await setDatabaseConsistency();
    await initEffect();
  }
};

const addTableRankTeams = async () => {
  const teams = await getTable('teamsSet');
  const nameTeams = Object.keys(teams);

  $('#tabRankTeams').find('table').find('tbody').html('');
  nameTeams.forEach((each) => {
    const team = teams[each];
    const fixed = 0;
    $('#tabRankTeams').find('table').find('tbody').append(
      `
      <tr>
        <th>${each}</th>
        <th>${team.gamesCount}</th>
        <th>${team.goalsPro.toFixed(2)}</th>
        <th>${team.goalsCon.toFixed(2)}</th>
        <th >${team.wins}</th>
        <th >${team.draws}</th>
        <th >${team.losses}</th>
        <th >${(team.bothScore * 100).toFixed(fixed)}%</th>
        <th >${(team.underHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underOneAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underTwoAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underThreeAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underFourAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underFiveAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.underSixAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overOneAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overTwoAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overThreeAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overFourAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overFiveAndHalf * 100).toFixed(fixed)}%</th>
        <th >${(team.overSixAndHalf * 100).toFixed(fixed)}%</th>
      </tr>
    `,
    );
  });
};
