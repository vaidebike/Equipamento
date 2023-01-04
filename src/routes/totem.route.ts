/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

const totemController = require('../controllers/totem.controller');

const totemRouter = Router();

totemRouter
  .route('/')
  .post(function (req, res) {
    totemController.registerTotem(req, res);
  })
  .get(function (req, res) {
    totemController.listTotens(req, res);
  });

totemRouter
  .route('/:id')
  .put(function (req, res) {
    totemController.updateTotem(req, res);
  })
  .delete(function (req, res) {
    totemController.excludeTotem(req, res);
  });

totemRouter.route('/:id/trancas').get(function (req, res) {
  totemController.listLocks(req, res);
});

totemRouter.route('/:id/bicicletas').get(function (req, res) {
  totemController.listBikes(req, res);
});

export default totemRouter;
