import catchAsync from '../utils/catchAsync';

import { Message } from '../models';

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
  console.log(to);
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
