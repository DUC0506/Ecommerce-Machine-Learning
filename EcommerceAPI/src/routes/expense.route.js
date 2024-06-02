// Packages
import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Controllers
import { expenseController } from '../controllers/index';
import { getDistance } from '../controllers/expense.controller';

const {
  addExpense,
  getAllExpenses,
  getExpense,
  deleteExpense,
  getTotalExpense
} = expenseController;

// Router Initialization
const router = express.Router({ mergeParams: true });
router.post('/distance', getDistance);
router.use(protect);
// Get All Reviews Route
router.get('/', getAllExpenses);
router.get('/total/totalExpense', getTotalExpense);
// Get Review Route
router.get('/:idExpense', getExpense);

router.post('/', addExpense);
router.delete('/:expenseId', deleteExpense);

export default router;
