const Api = require('@brother.bet/Api');
const RobotFifaArena = require('./Class/RobotFifaArena');
const UpdateFifaArena = require('./Class/UpdateFifaArena');

const fifaArena = new UpdateFifaArena(Api, RobotFifaArena);
// fifaArena.loop('2020-01-01', 60);
fifaArena.clean(2020);
