const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const DaysController = require('./controller/DaysController');
const FifaChamptionshipController = require('./controller/FifaChamptionshipController');
const DatabaseConsistencyController = require('./controller/DatabaseConsistencyController');
const DataController = require('./controller/DataController');
const NeuralNetworkController = require('./controller/NeuralNetworkController');

const routes = express.Router();

// Init firebase.

routes.get('/daysOfYear', celebrate({
  [Segments.QUERY]:
    Joi.object().keys({
      year: Joi.string().required().length(4),
    }),
}), DaysController.index);

routes.get('/source', celebrate({
  [Segments.QUERY]:
    Joi.object().keys({
      key: Joi.string().required(),
      sheetId: Joi.string().required(),
    }),
}), FifaChamptionshipController.index);

routes.post('/databaseConsistency', celebrate({
  [Segments.QUERY]:
    Joi.object().keys({
      type: Joi.string().required(),
    }),
  [Segments.BODY]:
    Joi.object().keys({
      aggregatedTrainSet: Joi.number().integer().required(),
    }),
}), DatabaseConsistencyController.create);

routes.get('/databaseConsistency', celebrate({
  [Segments.QUERY]:
    Joi.object().keys({
      type: Joi.string().required(),
    }),
}), DatabaseConsistencyController.index);

routes.post('/data', celebrate({

  [Segments.BODY]:
    Joi.object().keys({
      id: Joi.string().required(),
      date: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys().min(2)).required(),
    }),
}), DataController.create);

routes.get('/data', celebrate({
  [Segments.QUERY]:
    Joi.object().keys({
      year: Joi.string().required(),
      date: Joi.string().required(),
    }),
}), DataController.index);

routes.get('/bundle', celebrate({
  [Segments.QUERY]:
    Joi.object().keys({
      year: Joi.string().required(),
    }),
}), DataController.bundle);

routes.post('/neuralNetwork', celebrate({
  [Segments.QUERY]:
    Joi.object().keys({
      nameSet: Joi.string().required(),
    }),
}), NeuralNetworkController.create);

routes.get('/neuralNetwork', celebrate({
  [Segments.QUERY]:
    Joi.object().keys({
      nameSet: Joi.string().required(),
    }),
}), NeuralNetworkController.index);

module.exports = routes;
