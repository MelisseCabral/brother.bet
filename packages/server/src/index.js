const Api = require('@brother.bet/Api');
const RobotFifaArena = require('./Class/RobotFifaArena');
const UpdateFifaArena = require('./Class/UpdateFifaArena');

// eslint-disable-next-line no-new
new UpdateFifaArena(Api, RobotFifaArena);
