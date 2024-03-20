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
  deleteMyAccount
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
  queryProductsByApartment
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
  totalOrders
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
  deleteMyAccount
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
  queryProductsByApartment
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
  totalOrders
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
  apartmentService
};
