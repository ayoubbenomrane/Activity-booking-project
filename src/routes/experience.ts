import { Router } from 'express';
import controller from '../controllers/experience';
//import { docs } from './documentation/experience.js';
const router = Router();
// const docs = require("../documentation/experience");

router.get('/', controller.getExperiences);
router.get('/:id', controller.getExperienceById);
router.post('/', controller.addExperience);
router.put('/:id', controller.updateExperience);
router.delete('/:id', controller.deleteExperience);

export default router;
