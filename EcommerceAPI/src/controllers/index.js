import {
  signin,
  signup,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  changePassword
} from './auth.controller';

import {
  getAllProducts,
  getProduct,
  addProduct,
  updateProductDetails,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize,
  updateProductMainImage,
  updateProductImages,
  deleteProduct,
  top5Cheap,
  productStats,
  getAllProductsByApartment,
  getAllProductsBySeller
} from './product.controller';

import {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser,
  deleteMyAccount,
  getSellers
} from './user.controller';

import {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategoryDetails,
  updateCategoryImage,
  deleteCategory
} from './category.controller';

import {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} from './review.controller';

import {
  addItemToCart,
  reduceByOne,
  increaseByOne,
  getCart,
  deleteCart,
  deleteItem
} from './cart.controller';

import {
  createOrder,
  orderStatus,
  getAllOrders,
  getOrder,
  cancelOrder,
  createOrderEachSeller,
  getAllOrdersBySeller,
  totalAllOrderBySeller
} from './order.controller';

import {
  getAllDiscountCodes,
  getDiscount,
  verifyDiscountCode,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
} from './discount.controller';

import {
  addFavoriteProduct,
  getFavoriteList,
  deleteProductFromFavorite,
  checkProductInFavoriteList
} from './favorite.controller';

import {
  addApartment,
  getAllApartments,
  getApartment,
  deleteApartment,
  updateApartmentDetails
} from './apartment.controller';
import {
  addNews,
  getAllNewsByApartment,
  updateNewsDetails,
  updateNewsMainImage,
  updateNewsImages,
  deleteNews
} from './news.controller';
import {
  addComment,
  getAllCommentsByNews,
  updateComment,
  deleteComment
} from './commentController';
import {
  addPromotion,
  getAllPromotion,
  updatePromotionDetails,
  removePromotion,
  getPromotion
} from './promotion.controller';
import {
  addCampaign,
  getAllCampaign,
  updateCampaignDetails,
  removeCampaign,
  getCampaign
} from './campaign.controller';

const authController = {
  signin,
  signup,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  changePassword
};

const userController = {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser,
  deleteMyAccount,
  getSellers
};

const categoryController = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategoryDetails,
  updateCategoryImage,
  deleteCategory
};

const productController = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProductDetails,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize,
  updateProductMainImage,
  updateProductImages,
  deleteProduct,
  top5Cheap,
  productStats,
  getAllProductsByApartment,
  getAllProductsBySeller
};

const reviewController = {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
};

const cartController = {
  addItemToCart,
  reduceByOne,
  increaseByOne,
  getCart,
  deleteCart,
  deleteItem
};

const orderController = {
  createOrder,
  orderStatus,
  getAllOrders,
  getOrder,
  cancelOrder,
  createOrderEachSeller,
  getAllOrdersBySeller,
  totalAllOrderBySeller
};

const discountController = {
  getAllDiscountCodes,
  getDiscount,
  verifyDiscountCode,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
};

const favoriteController = {
  addFavoriteProduct,
  getFavoriteList,
  deleteProductFromFavorite,
  checkProductInFavoriteList
};

const apartmentsController = {
  addApartment,
  getAllApartments,
  getApartment,
  deleteApartment,
  updateApartmentDetails
};
const newsController = {
  addNews,
  getAllNewsByApartment,
  updateNewsDetails,
  updateNewsMainImage,
  updateNewsImages,
  deleteNews
};
const commentController = {
  addComment,
  getAllCommentsByNews,
  updateComment,
  deleteComment
};
const promotionController = {
  addPromotion,
  getAllPromotion,
  updatePromotionDetails,
  removePromotion,
  getPromotion
};
const campaignController = {
  addCampaign,
  getAllCampaign,
  updateCampaignDetails,
  removeCampaign,
  getCampaign
};
export {
  authController,
  userController,
  productController,
  categoryController,
  reviewController,
  cartController,
  orderController,
  discountController,
  favoriteController,
  apartmentsController,
  newsController,
  commentController,
  promotionController,
  campaignController
};
