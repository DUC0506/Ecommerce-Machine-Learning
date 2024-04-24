/* eslint-disable import/prefer-default-export */
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

// Models
import { Comment, News } from '../models/index';

/**
 * @desc    Create New Review
 * @param   { Object } body - Body object data
 * @param   { String } product - Product ID
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|review> }
 */
export const createComment = catchAsync(async (news, user, body) => {
  const { comments } = body;

  // 1) Check if user entered all fields
  if (!comments) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  // 2) Check if the user make a review before on that product

  // 3) Create review
  const newComment = await Comment.create({
    comments,
    news,
    user
  });

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulCommentCreate',
    statusCode: 201,
    newComment
  };
});

/**
 * @desc    Query All Reviews
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|reviews> }
 */
export const queryComments = catchAsync(async (req) => {
  const news = await News.findById(req.query.newsId);

  // 1) Check if product doesn't exist
  if (!news) {
    return {
      type: 'Error',
      message: 'noNewsFound',
      statusCode: 404
    };
  }

  let comments = await APIFeatures(req, Comment, 'user');

  // 2) Check if reviews doesn't exist
  if (comments.length === 0) {
    return {
      type: 'Error',
      message: 'noCommentFound',
      statusCode: 404
    };
  }
  // 3) Filter review to select only reviews of the product only
  comments = comments.filter(
    (comment) => comment.news.toString() === req.query.newsId.toString()
  );

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulCommentFound',
    statusCode: 200,
    comments
  };
});
/**
 * @desc    Update Review Using It's ID
 * @param   { String } userId - userId
 * @param   { String } prodcutId - Product ID
 * @param   { String } reviewId - Review ID
 * @param   { Object } body - Body object data
 * @returns { Object<type|message|statusCode|review> }
 */
export const updateComments = catchAsync(
  async (userId, newsId, commentId, body) => {
    const news = await News.findById(newsId);

    // 1) Check if product doesn't exist
    if (!news) {
      return {
        type: 'Error',
        message: 'noNewsFound',
        statusCode: 404
      };
    }

    const comment = await Comment.findById(commentId);

    // 2) Check if review doesn't exist
    if (!comment) {
      return {
        type: 'Error',
        message: 'noCommentFound',
        statusCode: 404
      };
    }

    // 3) Check if the one who want to update review is the review creator
    if (userId.toString() !== comment.user.toString()) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'notReviewCreator'
      };
    }

    // 4) Update comment
    const result = await Comment.findByIdAndUpdate(commentId, body, {
      new: true,
      runValidators: true
    });

    // 5) If everything is OK, send data
    return {
      type: 'Success',
      message: 'successfulReviewUpdate',
      statusCode: 200,
      result
    };
  }
);

/**
 * @desc    Delete Review Using It's ID
 * @param   { String } productId - Product ID
 * @param   { String } reviewId - Review ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteComments = catchAsync(async (newsId, commentId, userId) => {
  const news = await News.findById(newsId);

  // 1) Check if product doesn't exist
  if (!news) {
    return {
      type: 'Error',
      message: 'noNewsFound',
      statusCode: 404
    };
  }

  const comment = await Comment.findById(commentId);

  // 2) Check if review doesn't exist
  if (!comment) {
    return {
      type: 'Error',
      message: 'noCommentFound',
      statusCode: 404
    };
  }

  // 3) Check if the user is the creator of the review to delete it
  if (userId.toString() !== comment.user.toString()) {
    return {
      type: 'Error',
      statusCode: 400,
      message: 'notCommentCreator'
    };
  }

  // 4) Delete review
  await Comment.findByIdAndDelete(commentId);

  // 5) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulCommentDelete',
    statusCode: 200
  };
});
