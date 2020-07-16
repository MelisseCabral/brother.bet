/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const tableCheckGid = async () => {
  const registeredIds = await getRegisteredDays();

  const allDaysOfYear = generateDaysofYear(2020);

  const addCheckGid = (day, idsByDay) => {
    let color = '#e82f38';
    let icon = 'close';
    let gid = '';

    if (idsByDay[day]) {
      color = '#2fe82f';
      icon = 'check';
      gid = idsByDay[day];
    }
    $('#admin').find('table').find('tbody').append(`<tr>
            <th class="mdl-data-table__cell--non-numeric">${day}</th>
            <th class="mdl-data-table__cell--non-numeric">${gid}</th>
            <th class="mdl-data-table__cell--non-numeric">
              <i style="color: ${color};" class=" material-icons">${icon}</i>
            </th>
          </tr>`);
  };

  allDaysOfYear.forEach((each) => {
    addCheckGid(each, registeredIds);
  });
};