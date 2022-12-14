/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  listBikes,
  registerBike,
  listBike,
  excludeBike,
  updateBike,
  changeStatus
} from '../controllers/bike.controller';

const bikeRouter = Router();

bikeRouter.get('/', listBikes).post('/', registerBike);

bikeRouter
  .get('/:id', listBike)
  .delete('/:id', excludeBike)
  .put('/:id', updateBike);

bikeRouter.post('/:id/status/:acao', changeStatus);

export default bikeRouter;
