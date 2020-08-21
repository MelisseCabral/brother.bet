const Api = require('../../shared/axios/Api');
const RobotFifaArena = require('./Class/RobotFifaArena');
const UpdateFifaArena = require('./Class/UpdateFifaArena');

new UpdateFifaArena(Api, RobotFifaArena);
