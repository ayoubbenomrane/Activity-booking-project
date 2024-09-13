import controller from '../controllers/reservation_controller';
import { Router } from 'express';

const router = Router();

router.post('/:id/', controller.makeReserevation);
router.get('/:id/', controller.getReserevations);
router.get('/cancellation/:id/', controller.cancellationFees,);




export default router;