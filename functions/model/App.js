const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');

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
