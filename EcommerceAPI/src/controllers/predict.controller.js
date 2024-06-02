import catchAsync from '../utils/catchAsync';

// Services
import { predictService } from '../services/index';

/**
 * @desc      Create New Review Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.user.id - User ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the review
 */
export const addPredict = catchAsync(async (req, res) => {
  // 1) Create new review

  const { type, message, statusCode, predict } =
    await predictService.createPredict(req.user.id, req.body);

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
    predict
  });
});
export const analysisPredict = catchAsync(async (req, res) => {
  // 1) Create new review

  const { type, message, statusCode, queryAnalysis } =
    await predictService.queryAnalysisAI(req.body);

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
    queryAnalysis
  });
});
/**
 * @desc      Get All Reviews Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - Maximum number of reviews on page
 * @return    { JSON } - A JSON object representing the type, message and the reviews
 */
export const getAllPredicts = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 1) Get all reviews
  const { type, message, statusCode, predicts } =
    await predictService.queryPredicts(req);

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
    predicts
  });
});

/**
 * @desc      Get Review Using It's ID Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.params.reviewId - Review ID
 * @return    { JSON } - A JSON object representing the type, message and the review
 */
export const getPredict = catchAsync(async (req, res) => {
  const { idPredict } = req.params;

  // 1) Get review using it's ID
  const { type, message, statusCode, predict } =
    await predictService.queryPredictById(idPredict);

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
    predict
  });
});
