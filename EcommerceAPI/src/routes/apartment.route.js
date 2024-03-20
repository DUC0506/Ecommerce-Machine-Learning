import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

import { apartmentsController } from '../controllers/index';

const {
  addApartment,
  getAllApartments,
  getApartment,
  deleteApartment,
  updateApartmentDetails
} = apartmentsController;

const router = express.Router();
router.get('/', getAllApartments);
router.get('/:id', getApartment);
router.post('/', addApartment);
router.route('/:id').patch(updateApartmentDetails).delete(deleteApartment);
export default router;
