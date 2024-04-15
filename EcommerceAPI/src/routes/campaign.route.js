import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Utils
import { anyMulter } from '../utils/multer';
import {
  addCampaign,
  getAllCampaign,
  getCampaign,
  removeCampaign,
  updateCampaignDetails
} from '../controllers/campaign.controller';

// Routes

const router = express.Router();
router.use(protect);
router.post('/', anyMulter(), addCampaign);
router.get('/', getAllCampaign);
router.patch('/:campaignId/details', anyMulter(), updateCampaignDetails);

// router.patch('/:newsId/main-video', anyMulter(), updateNewsMainImage);

// router.patch('/:newsId/images', anyMulter(), updateNewsImages);
router.get('/:campaignId', getCampaign);
router.delete('/:campaignId', removeCampaign);
export default router;
