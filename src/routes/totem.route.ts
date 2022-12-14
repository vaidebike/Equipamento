/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  listTotens,
  registerTotem,
  excludeTotem,
  updateTotem
} from '../controllers/totem.controller';

const totemRouter = Router();

totemRouter.get('/', listTotens).post('/', registerTotem);

totemRouter.delete('/:id', excludeTotem).put('/:id', updateTotem);

export default totemRouter;
