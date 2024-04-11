import express from 'express';

// Controllers
import { newsController } from '../controllers/index';

// Middlewares
import protect from '../middlewares/protect';

// Utils
import { anyMulter } from '../utils/multer';
import {
  deleteNews,
  getAllNewsByApartment,
  updateNewsDetails,
  updateNewsImages,
  updateNewsMainImage
} from '../controllers/news.controller';

// Routes

const { addNews } = newsController;

const router = express.Router();
router.use(protect);
router.post('/', anyMulter(), addNews);
router.get('/', getAllNewsByApartment);
router.patch('/:newsId/details', anyMulter(), updateNewsDetails);

router.patch('/:newsId/main-video', anyMulter(), updateNewsMainImage);

router.patch('/:newsId/images', anyMulter(), updateNewsImages);

router.delete('/:newsId', deleteNews);
export default router;
