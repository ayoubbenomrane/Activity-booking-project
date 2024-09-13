import controllers from '../controllers/get_controllers';
import { Router } from 'express';
const router = Router();
router.get('/getbylocation/:id', controllers.getByLocation);
router.get('/getbycountry/:id', controllers.getByCountry);
router.get('/getbyinterest/:id', controllers.getByInterest);
router.get('/getbycategory/:id', controllers.getByCategory);
router.get('/getbyprice/:min_price/:max_price', controllers.getByPrice)
// router.get('/getbycountry/:id', controllers.getByLocation);




export default router;