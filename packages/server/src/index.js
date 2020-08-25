const Api = require('@brother.bet/Api');
const RobotFifaArena = require('./Class/RobotFifaArena');
const UpdateFifaArena = require('./Class/UpdateFifaArena');

// fifaArena.loop('2020-01-01', 60);
const measure = async () => {
  console.time('Main');
  const fifaArena = new UpdateFifaArena(Api, RobotFifaArena);
  await fifaArena.loop('2020-08-20', 600);
  console.timeEnd('Main');
};

measure();
