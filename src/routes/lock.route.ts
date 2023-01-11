/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

const lockController = require('../controllers/lock.controller');

const router = Router();

router
  .route('/')
  .post(function (req, res) {
    lockController.registerLock(req, res);
  })
  .get(function (req, res) {
    lockController.listLocks(req, res);
  });

router.route('/integrarNaRede').post(function (req, res) {
  lockController.addLockToVaDeBike(req, res);
});

router.route('/retirarDaRede').post(function (req, res) {
  lockController.removeFromVaDeBike(req, res);
});

router.route('/:id/trancar').post(function (req, res) {
  lockController.lockLock(req, res);
});

router.route('/:id/destrancar').post(function (req, res) {
  lockController.unlockLock(req, res);
});

router.route('/:id/bicicleta').get(function (req, res) {
  lockController.getBikeAtLock(req, res);
});

router
  .route('/:id')
  .get(function (req, res) {
    lockController.listLock(req, res);
  })
  .put(function (req, res) {
    lockController.updateLock(req, res);
  })
  .delete(function (req, res) {
    lockController.excludeLock(req, res);
  });

router.route('/:id/status/:acao').post(function (req, res) {
  lockController.changeLockStatus(req, res);
});

const lockRouter = router;
export default lockRouter;
module.exports = lockRouter;
