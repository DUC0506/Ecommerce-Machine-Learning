import express from 'express';

// Controllers
import { messageController } from '../controllers/index';

// Middlewares
import protect from '../middlewares/protect';
import { anyMulter } from '../utils/multer';

const { addMessage, getMessages } = messageController;

const router = express.Router();

router.use(protect);

router.post('/', anyMulter(), addMessage);
router.get('/:toId', anyMulter(), getMessages);
export default router;
