import catchAsync from '../utils/catchAsync';

// Services
import { transactionService } from '../services/index';

/**
 * @desc      Create New Review Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.user.id - User ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the review
 */
export const createWithdrawal = catchAsync(async (req, res) => {
  // 1) Create new review
  console.log(req.body);
  const { type, message, statusCode, transaction } =
    await transactionService.createWithdrawal(req.user, req.body);

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
    transaction
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
export const getAllTransaction = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) req.query.page = 1;
  if (!sort) req.query.sort = '';
  if (!limit) req.query.limit = 10;
  if (!select) req.query.select = '';

  // 1) Get all reviews
  const { type, message, statusCode, transactions } =
    await transactionService.queryTransactions(req);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }
  const transactionsWithTimestamps = transactions.map((expense) => ({
    ...expense.toObject(),
    createdAt: expense.createdAt,
    updatedAt: expense.updatedAt
  }));

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    transactions: transactionsWithTimestamps
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
export const removeTransaction = catchAsync(async (req, res) => {
  const { transactionId } = req.params;

  // 1) Get review using it's ID
  const { type, message, statusCode } =
    await transactionService.deleteTransaction(transactionId);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message)
  });
});

export const updateTransaction = catchAsync(async (req, res) => {
  const { transactionId } = req.params;

  // 1) Get review using it's ID
  const { type, message, statusCode, transaction } =
    await transactionService.updateTransaction(transactionId, req.body);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    transaction
  });
});
