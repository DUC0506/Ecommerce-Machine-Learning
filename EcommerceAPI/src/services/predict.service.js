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
  const { startDate, endDate, dataPredict, labels, product, apartment } = body;

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
  let predict;
  if (!product && apartment) {
    predict = await Predict.create({
      user,
      startDate,
      endDate,
      holidays,
      dataPredict,
      labels,
      apartment
    });
  } else {
    predict = await Predict.create({
      user,
      startDate,
      endDate,
      holidays,
      dataPredict,
      labels,
      product
    });
  }

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

export const queryAnalysisAI = catchAsync(async (user, body) => {
  const { startDate, endDate, dataPredict } = body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({
    model: process.env.MODEL_NAME
  });
  const generationConfig = {
    temperature: 0.9,
    topK: 0,
    topP: 1,
    maxOutputTokens: 1024
  };

  let parts;
  if (user.role === 'admin') {
    parts = [
      {
        text: `input: đây là số liệu ${dataPredict} doanh thu  của cửa hàng theo từng  tuần  từ ${startDate} đến ${endDate} hãy phân tích ngắn gọn số liệu và đưa ra lời khuyên và kế hoạch hay chiến dịch cho nhà quản lý nền tảng buôn bán thực phẩm trong khu chung cư này   `
      },
      { text: 'output: ' }
    ];
  } else {
    parts = [
      {
        text: `input: đây là số liệu ${dataPredict} số lượng  đã được bán  theo từng  tuần của một sản phẩm tính theo tuần từ ${startDate} đến ${endDate} hãy phân tích ngắn gọn số liệu và đưa ra lời khuyên và kế hoạch cho nhà bán hàng trong khu chung cư này   `
      },
      { text: 'output: ' }
    ];
  }

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
