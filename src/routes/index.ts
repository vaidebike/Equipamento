import { Router } from 'express';

import lockRouter from './lock.route';
import bikeRouter from './bike.route';
import totemRouter from './totem.route';

const router = Router();

router.use('/tranca', lockRouter);
router.use('/bicicleta', bikeRouter);
router.use('/totem', totemRouter);

export { router };
