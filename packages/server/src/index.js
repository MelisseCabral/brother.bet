const Api = require('../../shared/axios/Api');
const RobotFifaArena = require('./Class/RobotFifaArena');
const UpdateFifaArena = require('./Class/UpdateFifaArena');
let counter = 1;

counter++;

new UpdateFifaArena(Api, RobotFifaArena);
