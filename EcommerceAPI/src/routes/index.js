import express from 'express';

import authRoute from './auth.route';
import userRoute from './user.route';
import productRoute from './product.route';
import categoryRoute from './category.route';
import cartRoute from './cart.route';
import orderRoute from './order.route';
import discountRoute from './discount.route';
import favoriteRoute from './favorite.route';
import apartmentRoute from './apartment.route';
import reviewRoute from './review.route';
import newsRoute from './news.route';
import commentRoute from './comment.route';
import promotionRoute from './promotion.route';
import campaignRoute from './campaign.route';
import messageRoute from './message.route';
import predictRoute from './predict.route';
import expenseRoute from './expense.route';
import statusRoute from './status.route';
import transaction from './transaction.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/product', productRoute);
router.use('/category', categoryRoute);
router.use('/cart', cartRoute);
router.use('/order', orderRoute);
router.use('/discount', discountRoute);
router.use('/favorite', favoriteRoute);
router.use('/apartment', apartmentRoute);
router.use('/review', reviewRoute);
router.use('/news', newsRoute);
router.use('/comment', commentRoute);
router.use('/promotion', promotionRoute);
router.use('/campaign', campaignRoute);
router.use('/message', messageRoute);
router.use('/predict', predictRoute);
router.use('/expense', expenseRoute);
router.use('/status', statusRoute);
router.use('/transaction', transaction);

export default router;
