import { Router } from 'express';
import controller from '../controllers/dateAndTime';
const router = Router();

router.post('/date/:id', controller.addActivityDate);
router.post('/time/:id', controller.addTime);

router.get('/:id', controller.getDatesAndTimes);
export default router;
