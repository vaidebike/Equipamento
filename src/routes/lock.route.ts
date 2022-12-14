import { Router } from 'express';

const router = Router();

router.route('/').get();

const lockRouter = router;
export default lockRouter;
