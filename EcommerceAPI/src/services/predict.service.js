/* eslint-disable import/prefer-default-export */
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
// Models
import { Predict } from '../models/index';

const { GoogleGenerativeAI } = require('@google/generative-ai');
/**
 * @desc    Create New Review
 * @param   { Object } body - Body object data
 * @param   { String } product - Product ID
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|review> }
 */
export const createPredict = catchAsync(async (user, body) => {
  const { startDate, endDate, dataPredict, labels, product } = body;

  let { holidays } = body;
  // 1) Check if user entered all fields
  if (!startDate || !endDate) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }
  if (dataPredict.length === 0 || labels.length === 0) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  if (!holidays) {
    holidays = [];
  }
  // 3) Create review
  const predict = await Predict.create({
    user,
    startDate,
    endDate,
    holidays,
    dataPredict,
    labels,
    product
  });

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulReviewCreate',
    statusCode: 201,
    predict
  };
});

export const queryPredicts = catchAsync(async (req) => {
  req.query.user = req.user.id;
  const populateQuery = [{ path: 'product', select: 'name' }];
  let predicts = await APIFeatures(req, Predict, populateQuery);

  // 2) Check if reviews doesn't exist
  if (predicts.length === 0) {
    return {
      type: 'Error',
      message: 'noPredictsFound',
      statusCode: 404
    };
  }

  // 3) Filter review to select only reviews of the product only
  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulReviewsFound',
    statusCode: 200,
    predicts
  };
});

/**
 * @desc    Query Review Using It's ID
 * @param   { String } prodcutId - Product ID
 * @param   { String } reviewId - Review ID
 * @returns { Object<type|message|statusCode|review> }
 */
export const queryPredictById = catchAsync(async (idPredict) => {
  const predict = await Predict.findById(idPredict);

  // 2) Check if review doesn't exist
  if (!predict) {
    return {
      type: 'Error',
      message: 'noPredictFound',
      statusCode: 404
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulPredictFound',
    statusCode: 200,
    predict
  };
});

export const queryAnalysisAI = catchAsync(async (body) => {
  const { startDate, endDate, dataPredict } = body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.0-pro'
  });
  const generationConfig = {
    temperature: 0.9,
    topK: 0,
    topP: 1,
    maxOutputTokens: 1024
  };

  const parts = [
    {
      text: `input: đây là số liệu ${dataPredict} số lượng  đã được bán  theo từng  tuần của một sản phẩm tính theo tuần từ ${startDate} đến ${endDate} hãy phân tích số liệu và đưa ra lời khuyên cho nhà bán hàng  này   `
    },
    { text: 'output: ' }
  ];

  const result = await model.generateContent({
    contents: [{ role: 'user', parts }],
    generationConfig
  });

  const queryAnalysis = result.response.text();
  if (!result) {
    return {
      type: 'Error',
      message: 'noAnalysisPredictFound',
      statusCode: 404
    };
  }
  return {
    type: 'Success',
    message: 'successfulAnalysisPredictFound',
    statusCode: 200,
    queryAnalysis
  };
});
