import {
  signin,
  signup,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  changePassword
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
  updateUserToSeller
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
  queryProductsBySeller
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
  totalSalesBySeller
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
  deleteNews
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

import { createMessage, queryMessages } from './message.service';

const authService = {
  signin,
  signup,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  changePassword
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
  updateUserToSeller
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
  queryProductsBySeller
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
  totalSalesBySeller
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
  deleteNews
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
  queryMessages
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
  messageService
};
