import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

import { Apartment } from '../models';

// eslint-disable-next-line import/prefer-default-export
export const createApartment = catchAsync(async (body) => {
  const {
    name,
    address,
    numberOfCourt,
    numberOfHouse,
    condition,
    description
  } = body;

  if (
    !name ||
    !address ||
    !numberOfCourt ||
    !numberOfHouse ||
    !condition ||
    !description
  ) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }
  const object = {
    name,
    address,
    numberOfCourt,
    numberOfHouse,
    condition,
    description
  };
  const apartment = await Apartment.create(object);

  return {
    type: 'Success',
    message: 'successfulCategoryCreate',
    statusCode: 201,
    apartment
  };
});

export const queryApartments = catchAsync(async (req) => {
  // 1) Get all Apartment
  const apartments = await APIFeatures(req, Apartment);

  // 2) Check if there are no Apartment
  if (apartments.length === 0) {
    return {
      type: 'Error',
      message: 'noApartment',
      statusCode: 404
    };
  }
  // 3) If everything is OK, send categories
  return {
    type: 'Success',
    message: 'successfulApartmentFound',
    statusCode: 200,
    apartments
  };
});
/**
 * @desc    Query Category Using It's ID
 * @param   { String } id - Category ID
 * @returns { Object<type|message|statusCode|category> }
 */
export const queryApartment = catchAsync(async (id) => {
  const apartment = await Apartment.findById(id);

  // 1) Check if Apartment doesn't exist
  if (!apartment) {
    return {
      type: 'Error',
      message: 'noCategoryFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulApartmentFound',
    statusCode: 200,
    apartment
  };
});

/**
 * @desc    Delete Category
 * @param   { String } id - Category ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteApartmentById = catchAsync(async (id) => {
  const apartment = await Apartment.findById(id);

  // 1) Check if category doesn't exist
  if (!apartment) {
    return {
      type: 'Error',
      message: 'noApartmentFound',
      statusCode: 404
    };
  }

  // 3) Delete Apartment
  await Apartment.findByIdAndDelete(id);

  // 4) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulApartmentDelete',
    statusCode: 200
  };
});
/**
 * @desc    Update Category Details
 * @param   { String } id - Category ID
 * @param   { Object } body - Category details
 * @returns { Object<type|message|statusCode|category> }
 */
export const updateApartmentDetails = catchAsync(async (id, body) => {
  let apartment = await Apartment.findById(id);

  // 1) Check if category doesn't exist
  if (!apartment) {
    return {
      type: 'Error',
      message: 'noCategoryFound',
      statusCode: 404
    };
  }
  // 2) Update category
  apartment = await Apartment.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });

  // 3) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulApartmentDetails',
    statusCode: 200,
    apartment
  };
});
