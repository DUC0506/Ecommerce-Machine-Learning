import catchAsync from '../utils/catchAsync';

import { apartmentService } from '../services';

// eslint-disable-next-line import/prefer-default-export
export const addApartment = catchAsync(async (req, res) => {
  const { type, message, statusCode, apartment } =
    await apartmentService.createApartment(req.body);
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
    apartment
  });
});
export const getAllApartments = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  const { type, message, statusCode, apartments } =
    await apartmentService.queryApartments(req);
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 4) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    apartments
  });
});
export const getApartment = catchAsync(async (req, res) => {
  // 1) Get Apartment using it's ID
  const { type, message, statusCode, apartment } =
    await apartmentService.queryApartment(req.params.id);

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
    apartment
  });
});

export const deleteApartment = catchAsync(async (req, res) => {
  // 1) Find category using it's ID & delete it
  const { type, message, statusCode } =
    await apartmentService.deleteApartmentById(req.params.id);

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
/**
 * @desc      Update Category Details Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Category ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message, and the category
 */
export const updateApartmentDetails = catchAsync(async (req, res) => {
  // 1) Update apartment details using it's ID
  const { type, message, statusCode, apartment } =
    await apartmentService.updateApartmentDetails(req.params.id, req.body);

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
    apartment
  });
});
