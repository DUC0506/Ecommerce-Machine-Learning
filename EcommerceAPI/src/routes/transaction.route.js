import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Utils
import { anyMulter } from '../utils/multer';

import restrictedTo from '../middlewares/restrictedTo';

import {
  getAllTransaction,
  removeTransaction,
  createWithdrawal,
  updateTransaction
} from '../controllers/transaction.controller';

// Routes

const router = express.Router();
router.use(protect);

router.post('/', createWithdrawal);
router.get('/', getAllTransaction);
router.patch(
  '/:transactionId/details',
  restrictedTo('admin'),
  anyMulter(),
  updateTransaction
);

router.delete('/:transactionId', restrictedTo('admin'), removeTransaction);

export default router;
