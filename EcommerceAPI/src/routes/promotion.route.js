import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Utils
import { anyMulter } from '../utils/multer';
import {
  addPromotion,
  getAllPromotion,
  getPromotion,
  removePromotion,
  updatePromotionDetails
} from '../controllers/promotion.controller';

// Routes

const router = express.Router();
router.use(protect);
router.post('/', anyMulter(), addPromotion);
router.get('/', getAllPromotion);
router.patch('/:promotionId/details', anyMulter(), updatePromotionDetails);

// router.patch('/:newsId/main-video', anyMulter(), updateNewsMainImage);

// router.patch('/:newsId/images', anyMulter(), updateNewsImages);

router.delete('/:promotionId', removePromotion);
router.get('/:promotionId', getPromotion);

export default router;
