import {
  signin,
  signup,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  changePassword,
  isVerifyPassword
} from './auth.service';

import {
  createReview,
  queryReviews,
  queryReviewById,
  updateReview,
  deleteReview
} from './review.service';

import {
  createUser,
  queryUsers,
  queryUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser,
  deleteMyAccount,
  querySellers,
  updateUserToSeller,
  addBankToUser
} from './user.service';

import {
  createCategory,
  queryCategories,
  queryCategory,
  updateCategoryDetails,
  updateCategoryImage,
  deleteCategoryById
} from './category.service';

import {
  queryProducts,
  queryProductById,
  createProduct,
  updateProductDetails,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize,
  updateProductMainImage,
  updateProductImages,
  deleteProduct,
  getProductStats,
  queryProductsByApartment,
  queryProductsBySeller,
  queryProductsByKeyword,
  queryProductsSoldBySeller,
  updateProductApproved
} from './product.service';

import {
  addProductToCart,
  reduceByOne,
  increaseByOne,
  queryCart,
  deleteCart,
  deleteItem
} from './cart.service';

import {
  createOrder,
  orderStatus,
  queryOrders,
  queryOrder,
  cancelOrder,
  totalSales,
  totalOrders,
  createOrderBySeller,
  queryOrdersBySeller,
  totalSalesBySeller,
  queryOrdersBySellerNotification
} from './order.service';

import {
  getAllDiscountCodes,
  getDiscount,
  verifyDiscountCode,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
} from './discount.service';

import {
  addFavoriteProduct,
  getFavoriteList,
  deleteProductFromFavorite,
  checkProductInFavoriteList
} from './favorite.service';

import {
  createApartment,
  queryApartments,
  queryApartment,
  deleteApartmentById,
  updateApartmentDetails
} from './apartment.service';
import {
  createNews,
  queryNewsByApartment,
  updateNewsDetails,
  updateNewsMainVideo,
  updateNewsImages,
  deleteNews,
  queryNews,
  updateNewsApproved
} from './news.service';
import {
  createComment,
  queryComments,
  updateComments,
  deleteComments
} from './comment.service';

import {
  createPromotion,
  updatePromotionDetails,
  queryPromotion,
  deletePromotion,
  queryPromotionById
} from './promotion.service';

import {
  createCampaign,
  queryCampaigns,
  updateCampaignDetails,
  deleteCampaign,
  queryCampaignById
} from './campaign.service';

import {
  createMessage,
  queryMessages,
  queryGenerativeAI
} from './message.service';
import {
  createPredict,
  queryPredicts,
  queryPredictById,
  queryAnalysisAI
} from './predict.service';
import {
  createExpense,
  queryExpenses,
  queryExpenseById,
  deleteExpense,
  queryTotalAmountExpenses
} from './expense.service';
import {
  createStatus,
  queryStatuses,
  queryStatusById,
  updateStatusDetails,
  deleteStatus
} from './status.service';

import {
  createWithdrawal,
  deleteTransaction,
  queryTransactions,
  updateTransaction
} from './transaction.service';

const authService = {
  signin,
  signup,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  changePassword,
  isVerifyPassword
};

const reviewService = {
  createReview,
  queryReviews,
  queryReviewById,
  updateReview,
  deleteReview
};

const userService = {
  createUser,
  queryUsers,
  queryUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser,
  deleteMyAccount,
  querySellers,
  updateUserToSeller,
  addBankToUser
};

const categoryService = {
  createCategory,
  queryCategories,
  queryCategory,
  updateCategoryDetails,
  updateCategoryImage,
  deleteCategoryById
};

const productService = {
  queryProducts,
  queryProductById,
  createProduct,
  updateProductDetails,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize,
  updateProductMainImage,
  updateProductImages,
  deleteProduct,
  getProductStats,
  queryProductsByApartment,
  queryProductsBySeller,
  queryProductsByKeyword,
  queryProductsSoldBySeller,
  updateProductApproved
};

const cartService = {
  addProductToCart,
  reduceByOne,
  increaseByOne,
  queryCart,
  deleteCart,
  deleteItem
};

const orderService = {
  createOrder,
  orderStatus,
  queryOrders,
  queryOrder,
  cancelOrder,
  totalSales,
  totalOrders,
  createOrderBySeller,
  queryOrdersBySeller,
  totalSalesBySeller,
  queryOrdersBySellerNotification
};

const discountService = {
  getAllDiscountCodes,
  getDiscount,
  verifyDiscountCode,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
};

const favoriteService = {
  addFavoriteProduct,
  getFavoriteList,
  deleteProductFromFavorite,
  checkProductInFavoriteList
};
const apartmentService = {
  createApartment,
  queryApartments,
  queryApartment,
  deleteApartmentById,
  updateApartmentDetails
};
const newsService = {
  createNews,
  queryNewsByApartment,
  updateNewsDetails,
  updateNewsMainVideo,
  updateNewsImages,
  deleteNews,
  queryNews,
  updateNewsApproved
};
const commentService = {
  createComment,
  queryComments,
  updateComments,
  deleteComments
};
const promotionService = {
  createPromotion,
  updatePromotionDetails,
  queryPromotion,
  deletePromotion,
  queryPromotionById
};
const campaignService = {
  createCampaign,
  queryCampaigns,
  updateCampaignDetails,
  deleteCampaign,
  queryCampaignById
};
const messageService = {
  createMessage,
  queryMessages,
  queryGenerativeAI
};
const predictService = {
  createPredict,
  queryPredicts,
  queryPredictById,
  queryAnalysisAI
};
const expenseService = {
  createExpense,
  queryExpenses,
  queryExpenseById,
  deleteExpense,
  queryTotalAmountExpenses
};
const statusService = {
  createStatus,
  queryStatuses,
  queryStatusById,
  updateStatusDetails,
  deleteStatus
};
const transactionService = {
  createWithdrawal,
  deleteTransaction,
  queryTransactions,
  updateTransaction
};
export {
  authService,
  userService,
  categoryService,
  productService,
  reviewService,
  cartService,
  orderService,
  discountService,
  favoriteService,
  apartmentService,
  newsService,
  commentService,
  promotionService,
  campaignService,
  messageService,
  predictService,
  expenseService,
  statusService,
  transactionService
};
