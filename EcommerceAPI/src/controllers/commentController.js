/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import catchAsync from '../utils/catchAsync';

// Services
import { commentService } from '../services/index';

/**
 * @desc      Create New Review Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.user.id - User ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the review
 */
export const addComment = catchAsync(async (req, res) => {
  // 1) Create new review

  const { type, message, statusCode, newReview } =
    await commentService.createComment(
      req.query.newsId,
      req.user.id,
      req.body
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
    message: req.polyglot.t(message),
    newReview
  });
// eslint-disable-next-line prettier/prettier
});

export const getAllCommentsByNews = catchAsync(async (req, res) => {
    let { page, sort, limit, select } = req.query;
  
    // 1) Setting default params
    if (!page) req.query.page = 1;
    if (!sort) req.query.sort = '';
    if (!limit) req.query.limit = 10;
    if (!select) req.query.select = '';
  
    // 1) Get all products
    const { type, message, statusCode, comments } =
      await commentService.queryComments(req);
  
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
      comments
    });
  });
  export const updateComment = catchAsync(async (req, res) => {
    const { newsId, commentId } = req.params;
  
    // 1) Update review using it's ID
    const { type, message, statusCode, result } =
      await commentService.updateComments(
        req.user.id,
        newsId,
        commentId,
        req.body
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
      message: req.polyglot.t(message),
      result
    });
  });
  
  /**
   * @desc    Delete Review Controller
   * @param     { Object } req - Request object
   * @param     { Object } res - Response object
   * @property  { String } req.params.productId - Product ID
   * @property  { String } req.params.reviewId - Review ID
   * @property  { String } req.user.id - User ID
   * @return    { JSON } - A JSON object representing the type and message
   */
  export const deleteComment = catchAsync(async (req, res) => {
    const { newsId, commentId } = req.params;
  
    // 1) Delete review using it's ID
    const { type, message, statusCode } = await commentService.deleteComments(
        newsId,
        commentId,
      req.user.id
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