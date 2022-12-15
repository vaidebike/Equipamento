/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';

const bikeController = require('../controllers/bike.controller');

const router = Router();

router
  .route('/')
  .post(function (req, res) {
    bikeController.registerBike(req, res);
  })
  .get(function (req, res) {
    bikeController.listBikes(req, res);
  });

router
  .route('/:id')
  .get(function (req, res) {
    bikeController.listBike(req, res);
  })
  .put(function (req, res) {
    bikeController.updateBike(req, res);
  })
  .delete(function (req, res) {
    bikeController.excludeBike(req, res);
  });

router.route('/:id/status/:acao').post(function (req, res) {
  bikeController.changeStatus(req, res);
});

const bikeRouter = router;
export default bikeRouter;
module.exports = bikeRouter;
