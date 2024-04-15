/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import { Campaign, Product, Promotion } from '../models';
import catchAsync from '../utils/catchAsync';
import apiFeatures from '../utils/apiFeatures';

const scheduleDiscount = async (
  productArray,
  campaignStartDate,
  campaignEndDate,
  discountRate
) => {
  const currentDate = new Date();
  // Nếu currentDate trùng khớp với campaignStartDate, giảm giá sản phẩm
  console.log(currentDate.getTime(), campaignStartDate.getTime());
  if (currentDate.getTime() > campaignStartDate.getTime()) {
    setTimeout(async () => {
      const products = await Product.find({ _id: { $in: productArray } });
      products.forEach(async (product) => {
        const priceAfterDiscount = product.price * (1 - discountRate / 100);
        await Product.updateOne(
          { _id: product._id },
          {
            $set: {
              priceDiscount: mongoose.Types.Decimal128(discountRate.toString()),
              priceAfterDiscount: mongoose.Types.Decimal128(
                priceAfterDiscount.toString()
              )
            }
          }
        );
      });
      setTimeout(async () => {
        await Product.updateMany(
          { _id: { $in: productArray } },
          {
            $set: {
              priceDiscount: mongoose.Types.Decimal128.fromString('0'), // Đặt giá giảm giá thành 0
              priceAfterDiscount: '$price' // Đặt giá sau giảm giá thành giá gốc của sản phẩm
            }
          }
        );
      }, campaignEndDate.getTime() - currentDate.getTime());
    }, 0);
  } else if (currentDate.getTime() < campaignStartDate.getTime()) {
    // Nếu currentDate nằm trong khoảng thời gian của chiến dịch, tạo công việc lên lịch để giảm giá sản phẩm
    setTimeout(async () => {
      const products = await Product.find({ _id: { $in: productArray } });
      products.forEach(async (product) => {
        const priceAfterDiscount = product.price * (1 - discountRate / 100);
        await Product.updateOne(
          { _id: product._id },
          {
            $set: {
              priceDiscount: mongoose.Types.Decimal128(discountRate.toString()),
              priceAfterDiscount: mongoose.Types.Decimal128(
                priceAfterDiscount.toString()
              )
            }
          }
        );
      });
      setTimeout(async () => {
        await Product.updateMany(
          { _id: productArray[0] }, // Giả sử productArray chỉ chứa một ID sản phẩm
          [
            {
              $set: {
                priceDiscount: mongoose.Types.Decimal128.fromString('0') // Đặt giá giảm giá thành 0
              }
            },
            {
              $set: {
                priceAfterDiscount: { $toDouble: '$price' } // Sử dụng giá trị của trường price trong cùng một tài liệu
              }
            }
          ]
        );
      }, campaignEndDate.getTime() - campaignStartDate.getTime()); //5000
    }, campaignStartDate.getTime() - currentDate.getTime());//10000
  }
  // campaignEndDate.getTime() - campaignStartDate.getTime()
  // campaignStartDate.getTime() - currentDate.getTime()
};
export const createCampaign = catchAsync(async (body, seller) => {
  const { promotion, discountRate, products } = body; // Thêm startDate và endDate
  if (!promotion || !discountRate || !products) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }
  if (products.length === 0) {
    return {
      type: 'Error',
      message: 'productNotFound',
      statusCode: 400
    };
  }
  if (discountRate <= 0) {
    return {
      type: 'Error',
      message: 'discountRateMustThanBeZero',
      statusCode: 400
    };
  }
  const promotionDetails = await Promotion.findById(promotion);
  const productArray = products.split(',').map((product) => product.trim());

  const campaign = await Campaign.create({
    promotion,
    discountRate,
    products: productArray,
    seller
  });

  await scheduleDiscount(
    productArray,
    promotionDetails.startDate,
    promotionDetails.endDate,
    discountRate
  );
  return {
    type: 'Success',
    message: 'successfulCampaignCreate',
    statusCode: 201,
    campaign
  };
});

export const queryCampaigns = catchAsync(async (req) => {
  const populateQuery = [{ path: 'products' }];

  const campaigns = await apiFeatures(req, Campaign, populateQuery);

  // 1) Check if porducts doesn't exist
  if (!campaigns) {
    return {
      type: 'Error',
      message: 'noCampaignsFound',
      statusCode: 404
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulProductsFound',
    statusCode: 200,
    campaigns
  };
});

export const updateCampaignDetails = catchAsync(async (campaignId, body) => {
  const campaign = await Campaign.findById(campaignId);
  const infoCampaign = body;
  // 1) Check if product doesn't exist
  if (!campaign) {
    return {
      type: 'Error',
      message: 'noCampaignFound',
      statusCode: 404
    };
  }

  // 3) Update product by it's ID
  const result = await Campaign.findByIdAndUpdate(campaignId, infoCampaign, {
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

export const deleteCampaign = catchAsync(async (campaignId) => {
  const campaign = await Campaign.findById(campaignId);

  // 1) Check if product doesn't exist
  if (!campaign) {
    return {
      type: 'Error',
      message: `noCampaignFound`,
      statusCode: 404
    };
  }

  // 3) Delete product using it's ID
  await Campaign.findByIdAndDelete(campaignId);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulCampaignDelete',
    statusCode: 200
  };
});
export const queryCampaignById = catchAsync(async (campaignId) => {
  const populateQuery = [{ path: 'products' }];

  const campaign = await Campaign.findById(campaignId)
    .populate(populateQuery)
    .lean();

  // 1) Check if product doesn't exist
  if (!campaign) {
    return {
      type: 'Error',
      message: 'noCampaignFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send product
  return {
    type: 'Success',
    message: 'successfulCampaignFound',
    statusCode: 200,
    campaign
  };
});
