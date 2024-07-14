import catchAsync from '../utils/catchAsync';

import { Message } from '../models';

const { GoogleGenerativeAI } = require('@google/generative-ai');
// eslint-disable-next-line import/prefer-default-export
export const createMessage = catchAsync(async (body, userId) => {
  const { to, message } = body;

  if (!to) {
    return {
      type: 'Error',
      message: 'noToFound',
      statusCode: 404
    };
  }

  if (!message) {
    return {
      type: 'Error',
      message: 'noMessFound',
      statusCode: 404
    };
  }

  // 3) Create message
  const newMessage = await Message.create({
    message: { text: message },
    users: [userId, to],
    sender: userId
  });

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulMessageCreate',
    statusCode: 201,
    newMessage
  };
});

export const queryMessages = catchAsync(async (to, userId) => {
  // 1) Check if product doesn't exist

  if (!to) {
    return {
      type: 'Error',
      message: 'noToFound',
      statusCode: 404
    };
  }
  const messages = await Message.find({
    users: {
      $all: [userId, to]
    }
  }).sort({ updatedAt: 1 });

  // if (messages.length === 0) {
  //   return {
  //     type: 'Error',
  //     message: 'noMessFound',
  //     statusCode: 404
  //   };
  // }

  const projectedMessages = messages.map((msg) => ({
    fromSelf: msg.sender.toString() === userId,
    message: msg.message.text
  }));

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulCommentFound',
    statusCode: 200,
    projectedMessages
  };
});

export const queryGenerativeAI = catchAsync(async (body, userId) => {
  const { question } = body;
  const adminId = process.env.ADMIN_ID;
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
  const questionFood = `Nếu câu hỏi không về chủ đề thực phẩm thì yêu cầu chỉ hỏi về thực phẩm nếu câu hỏi về thực phẩm thì trả lời . Đây là câu hỏi "${question}"`;
  const parts = [{ text: `input: ${questionFood}` }, { text: 'output: ' }];

  const result = await model.generateContent({
    contents: [{ role: 'user', parts }],
    generationConfig
  });

  await Message.create({
    message: { text: question },
    users: [userId, 'model'],
    sender: userId
  });
  const newMessage = await Message.create({
    message: { text: result.response.text() },
    users: ['model', userId],
    sender: adminId
  });

  if (!result) {
    return {
      type: 'Error',
      message: 'noPredictFound',
      statusCode: 404
    };
  }
  return {
    type: 'Success',
    message: 'successfulPredictFound',
    statusCode: 200,
    newMessage
  };
});
