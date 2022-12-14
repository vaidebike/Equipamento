/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  listLocks,
  registerLock,
  listLock,
  updateLock,
  excludeLock,
  changeLockStatus
} from '../controllers/lock.controller';

const router = Router();

router.route('/').post(registerLock).get(listLocks);

router.route('/:id').get(listLock).put(updateLock).delete(excludeLock);

router.route('/:id/status/:acao').post(changeLockStatus);

const lockRouter = router;
export default lockRouter;
