import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Utils
import { anyMulter } from '../utils/multer';
import {
  addStatus,
  getAllStatuses,
  getStatus,
  updateStatusDetails,
  removeStatus
} from '../controllers/status.controller';
import restrictedTo from '../middlewares/restrictedTo';

// Routes

const router = express.Router();
router.use(protect);
router.post('/', restrictedTo('admin'), anyMulter(), addStatus);
router.get('/', getAllStatuses);
router.patch(
  '/:idStatus/details',
  restrictedTo('admin'),
  anyMulter(),
  updateStatusDetails
);

router.delete('/:idStatus', restrictedTo('admin'), removeStatus);
router.get('/:idStatus', getStatus);

export default router;
