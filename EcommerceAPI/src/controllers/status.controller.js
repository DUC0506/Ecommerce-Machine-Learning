// Utils
import catchAsync from '../utils/catchAsync';
import { statusService } from '../services/index';

/**
 * @desc      Create New Status Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message, and the status
 */
export const addStatus = catchAsync(async (req, res) => {
  // 1) Create status
  const { type, message, statusCode, status } =
    await statusService.createStatus(req);
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
    status
  });
});

/**
 * @desc      Get All Statuses Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - Maximum number of statuses
 * @returns   { JSON } - A JSON object representing the type, message, and the statuses
 */
export const getAllStatuses = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) req.query.page = 1;
  if (!sort) req.query.sort = '';
  if (!limit) req.query.limit = 30;
  if (!select) req.query.select = '';

  // 1) Get all statuses
  const { type, message, statusCode, statuses } =
    await statusService.queryStatuses(req);

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
    statuses
  });
});

/**
 * @desc      Get Status By ID Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.statusId - Status ID
 * @returns   { JSON } - A JSON object representing the type, message, and the status
 */
export const getStatus = catchAsync(async (req, res) => {
  // 1) Get status using its ID

  const { type, message, statusCode, status } =
    await statusService.queryStatusById(req.params.idStatus);

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
    status
  });
});

/**
 * @desc      Update Status Details Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.statusId - Status ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message, and the status
 */
export const updateStatusDetails = catchAsync(async (req, res) => {
  // 1) Update status details using its ID
  const { type, message, statusCode, updatedStatus } =
    await statusService.updateStatusDetails(req.params.idStatus, req.body);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send status
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    updatedStatus
  });
});

/**
 * @desc      Delete Status Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.statusId - Status ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const removeStatus = catchAsync(async (req, res) => {
  // 1) Delete status using its ID
  const { type, message, statusCode } = await statusService.deleteStatus(
    req.params.idStatus
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
