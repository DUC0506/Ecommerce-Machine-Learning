/* eslint-disable import/prefer-default-export */
import { Promotion } from '../models';
import apiFeatures from '../utils/apiFeatures';
import catchAsync from '../utils/catchAsync';
import { uploadFile } from '../utils/cloudinary';
import dataUri from '../utils/datauri';

export const createPromotion = catchAsync(async (body, files) => {
  const { name, description, startDate, endDate } = body;

  const mainImage = files.filter((image) => image.fieldname === 'mainImage');

  if (!name || !description || !startDate || !endDate) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  const folderName = `Promotion/${name.trim().split(' ').join('')}`;

  const imageResult = await uploadFile(
    dataUri(mainImage[0]).content,
    folderName
  );

  const promotion = await Promotion.create({
    name,
    description,
    startDate,
    endDate,
    mainImage: imageResult.secure_url,
    mainImageId: imageResult.public_id
  });

  return {
    type: 'Success',
    message: 'successfulCreatedNews',
    statusCode: 201,
    promotion
  };
});

export const queryPromotion = catchAsync(async (req) => {
  const promotions = await apiFeatures(req, Promotion, null, null);
  // 1) Check if porducts doesn't exist
  if (!promotions) {
    return {
      type: 'Error',
      message: 'noNewsFound',
      statusCode: 404
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulNewsFound',
    statusCode: 200,
    promotions
  };
});

export const queryPromotionById = catchAsync(async (promotionId) => {
  const promotion = await Promotion.findById(promotionId).lean();

  // 1) Check if product doesn't exist
  if (!promotion) {
    return {
      type: 'Error',
      message: 'noPromotionFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send product
  return {
    type: 'Success',
    message: 'successfulPromotionFound',
    statusCode: 200,
    promotion
  };
});

export const updatePromotionDetails = catchAsync(async (promotionId, body) => {
  const promotion = await Promotion.findById(promotionId);
  const infoPromotion = body;
  // 1) Check if product doesn't exist
  if (!promotion) {
    return {
      type: 'Error',
      message: 'noPromotionFound',
      statusCode: 404
    };
  }

  // 3) Update product by it's ID
  const result = await Promotion.findByIdAndUpdate(promotionId, infoPromotion, {
    new: true
  });
  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulPromotionDetails',
    statusCode: 200,
    result
  };
});

/**
 * @desc    Delete Product Using It's ID
 * @param   { String } promotionId - Product ID
 * @returns { Object<type|message|statusCode> }
 */
export const deletePromotion = catchAsync(async (promotionId) => {
  const promotion = await Promotion.findById(promotionId);

  // 1) Check if product doesn't exist
  if (!promotion) {
    return {
      type: 'Error',
      message: `noPromotionFound`,
      statusCode: 404
    };
  }

  // 3) Delete product using it's ID
  await Promotion.findByIdAndDelete(promotionId);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulPromotionDelete',
    statusCode: 200
  };
});
