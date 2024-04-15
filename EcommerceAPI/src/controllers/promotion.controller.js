// Utils
import catchAsync from '../utils/catchAsync';
import { promotionService } from '../services/index';

/**
 * @desc      Create New Product Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body object data
 * @property  { Object } req.files - Product images
 * @property  { String } req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type, message and the product
 */
export const addPromotion = catchAsync(async (req, res) => {
  const { body, files } = req;
  // 1) Create product
  const { type, message, statusCode, promotion } =
    await promotionService.createPromotion(body, files);
  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    promotion
  });
});
/**
 * @desc      Get All Products Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - Maximum number of products
 * @returns   { JSON } - A JSON object representing the type, message and the products
 */
export const getAllPromotion = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) req.query.page = 1;
  if (!sort) req.query.sort = '';
  if (!limit) req.query.limit = 30;
  if (!select) req.query.select = '';

  // 1) Get all products
  const { type, message, statusCode, promotions } =
    await promotionService.queryPromotion(req);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    promotions
  });
});
/**
 * @desc      Update Product Details Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.user.id - Seller ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the product
 */
export const updatePromotionDetails = catchAsync(async (req, res) => {
  // 1) Update product details using it's ID
  const { type, message, statusCode, result } =
    await promotionService.updatePromotionDetails(
      req.params.promotionId,
      req.body
    );

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send product
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    result
  });
});

/**
 * @desc      Delete Product Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.user.id - Seller ID
 * @return    { JSON } - A JSON object representing the type and message
 */
export const removePromotion = catchAsync(async (req, res) => {
  // 1) Delete product using it's ID
  const { type, message, statusCode } = await promotionService.deletePromotion(
    req.params.promotionId
  );

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message)
  });
});
export const getPromotion = catchAsync(async (req, res) => {
  // 1) Get product using it's ID
  const { type, message, statusCode, promotion } =
    await promotionService.queryPromotionById(req.params.promotionId);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    promotion
  });
});
