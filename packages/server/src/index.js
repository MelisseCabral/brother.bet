const Api = require('@brother.bet/Api');
const RobotFifaArena = require('./Class/RobotFifaArena');
const UpdateFifaArena = require('./Class/UpdateFifaArena');

async function main() {
  const fifaArena = new UpdateFifaArena(Api, RobotFifaArena);
  await fifaArena.updateLastWeek({ daysAgo: 0 });
  return fifaArena.loop({ secondsOfDelay: 30 });
}

const measure = async () => {
  console.time('Update Fifa Arena');
  await main();
  console.timeEnd('Update Fifa Arena');
};

measure();
