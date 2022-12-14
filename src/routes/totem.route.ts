import { Router } from 'express';

const router = Router();

router.route('/').get();

const totemRouter = router;
export default totemRouter;
