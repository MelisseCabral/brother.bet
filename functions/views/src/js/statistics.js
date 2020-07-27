/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const initStatistics = async (users, teams) => {
  const id = '#tabStatistics';
  const table = $(await getStructure('components/tableRanking.html'));

  $(id).html(table);
  if (!developerMode) restrictedArea(id);

  fillComboboxes(users, teams);
};
