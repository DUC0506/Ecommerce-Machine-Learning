// Packages
import express from 'express';

// Controllers
import { orderController } from '../controllers/index';

// Middlewares
import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';
import { totalAllOrder, totalOrderAll } from '../controllers/order.controller';

const { createOrder, orderStatus, getAllOrders, getOrder, cancelOrder } =
  orderController;

// Router Initialization
const router = express.Router();

// Protect All Routes
router.use(protect);

// Get All Orders Route
// Create Order Route
router.route('/').get(getAllOrders).post(createOrder);
router.route('/totalSales').get(totalAllOrder);
router.route('/totalOrders').get(totalOrderAll);
// Get Order Route
// Cancel Order Route
router.route('/:id').get(getOrder).delete(cancelOrder);

// Update Order Status
router.patch('/:id', restrictedTo('admin'), orderStatus);

export default router;
