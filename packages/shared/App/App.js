const express = require('./node_modules/express');
const cors = require('./node_modules/cors');
const { errors } = require('./node_modules/celebrate');

const routes = require('../../firebase/functions/src/routes');

module.exports = class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  middleware() {
    this.server.use(
      cors(),
      // origin: ''
    );
    this.server.use(express.json());
    this.server.use(errors());
  }

  router() {
    this.server.use(routes);
  }
};
