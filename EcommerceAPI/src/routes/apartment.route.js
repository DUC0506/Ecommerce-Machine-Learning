import express from 'express';

// Middlewares
import protect from '../middlewares/protect';
import { anyMulter } from '../utils/multer';
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
router.post('/', anyMulter(), addApartment);
router.route('/:id').patch(updateApartmentDetails).delete(deleteApartment);
export default router;
