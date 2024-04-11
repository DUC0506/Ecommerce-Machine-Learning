// Packages
import express from 'express';

// Middlewares
import protect from '../middlewares/protect';
import {
  addComment,
  deleteComment,
  getAllCommentsByNews,
  updateComment
} from '../controllers/commentController';
import { anyMulter } from '../utils/multer';

const router = express.Router({ mergeParams: true });

router.use(protect);

// Add Review Route
router.post('/', anyMulter(), addComment);
router.get('/', getAllCommentsByNews);
router.route('/:newsId/:commentId').patch(updateComment).delete(deleteComment);

export default router;
