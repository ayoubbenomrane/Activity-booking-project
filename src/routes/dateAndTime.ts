import { Router } from 'express';
import controller from '../controllers/dateAndTime';
const router = Router();

router.post('/:id', controller.addDatesAndTimes);
router.get('/:id', controller.getDatesAndTimes);
export default router;
