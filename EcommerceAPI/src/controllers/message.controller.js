/* eslint-disable import/prefer-default-export */
import catchAsync from '../utils/catchAsync';
import { messageService } from '../services/index';

export const addMessage = catchAsync(async (req, res) => {
  const { body, user } = req;
  // 1) Create product
  const { type, message, statusCode, newMessage } =
    await messageService.createMessage(body, user.id);
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
    newMessage
  });
});
export const getMessages = catchAsync(async (req, res) => {
  const { user } = req;
  const to = req.params.toId;

  const { type, message, statusCode, projectedMessages } =
    await messageService.queryMessages(to, user.id);

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
    projectedMessages
  });
});
