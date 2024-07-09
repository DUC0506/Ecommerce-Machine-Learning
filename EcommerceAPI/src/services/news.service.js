import catchAsync from '../utils/catchAsync';
import dataUri from '../utils/datauri';

import { uploadFile, destroyFile, uploadFileVideo } from '../utils/cloudinary';

// Model
import { News } from '../models/index';
import apiFeatures from '../utils/apiFeatures';

/**
 * @docs    Create New User
 * @param   { Object } body - Body object data
 * @param   { Object } profileImage - User profile image
 * @returns { Object<type|message|statusCode|user> }
 */
export const createNews = catchAsync(async (body, files, userId) => {
  // 1) Check if profile image provided
  const { title, content, apartment } = body;

  const mainVideo = files.filter((video) => video.fieldname === 'mainVideo');
  const images = files.filter((image) => image.fieldname === 'images');

  let { tags, products } = body;
  let productsArray;
  if (typeof products === 'string') {
    productsArray = products.split(',').map((productId) => productId.trim());
  } else {
    productsArray = products;
  }
  if (!tags) tags = [];
  // 2) Check required fields
  if (!title || !content || !apartment || !userId) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  // 4) Specifiy folder name where the images are going to be uploaded in cloudinary
  const folderName = `News/${title.trim().split(' ').join('')}`;
  let videoResult; // Đảm bảo rằng biến videoResultUrl đã được khai báo
  let videoResultId;

  if (mainVideo[0]) {
    const b64 = Buffer.from(mainVideo[0].buffer).toString('base64');
    const dataURI = `data:${mainVideo[0].mimetype};base64,${b64}`;

    // Thực hiện tải lên video và gán kết quả vào videoResultUrl
    try {
      const videoResultUrl = await uploadFileVideo(dataURI, folderName);
      videoResult = videoResultUrl.secure_url;
      videoResultId = videoResultUrl.public_id;
    } catch (error) {
      return error;
      // Xử lý lỗi nếu cần
    }
  } else {
    videoResult = '';
    videoResultId = '';
  }

  const imagesPromises = images.map((image) =>
    uploadFile(dataUri(image).content, folderName)
  );

  const imagesResult = await Promise.all(imagesPromises);

  // 5) Upload image to cloudinary
  const imagesId = [];
  const imagesLink = [];

  // 3) Push images links & images IDs to the arrays
  imagesResult.forEach((image) => {
    imagesLink.push(image.secure_url);
    imagesId.push(image.public_id);
  });

  // 6) Create new user
  const news = await News.create({
    title,
    content,
    apartment,
    images: imagesLink,
    imagesId,
    author: userId,
    video: videoResult,
    videoId: videoResultId,
    products: productsArray,
    tags
  });

  // 7) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulCreatedNews',
    statusCode: 201,
    news
  };
});
export const queryNewsByApartment = catchAsync(async (req) => {
  const populateQuery = [
    {
      path: 'author',
      select: 'name username email address phone profileImage'
    },
    { path: 'apartment', select: 'name   address ' },
    { path: 'products', select: 'name   mainImage ' }
  ];

  const news = await apiFeatures(req, News, populateQuery);

  // 1) Check if porducts doesn't exist
  if (!news) {
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
    news
  };
});
export const queryNews = catchAsync(async (req) => {
  const populateQuery = [
    { path: 'author' },
    { path: 'apartment' },
    { path: 'products' }
  ];

  const news = await apiFeatures(req, News, populateQuery);

  // 1) Check if porducts doesn't exist
  if (!news) {
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
    news
  };
});

/**
 * @desc    Update Product Details
 * @param   { Object } body - Body object data
 * @param   { String } productId - Product ID
 * @param   { String } sellerId - Seller ID
 * @returns { Object<type|message|statusCode|product> }
 */
export const updateNewsDetails = catchAsync(async (newsId, userId, body) => {
  const news = await News.findById(newsId);
  const infoNews = body;

  // 1) Check if product doesn't exist
  if (!news) {
    return {
      type: 'Error',
      message: 'noNewsFound',
      statusCode: 404
    };
  }

  // 2) Check if user isn't the owner of product
  if (userId.toString() !== news.author.toString()) {
    return {
      type: 'Error',
      message: 'notUserCreator',
      statusCode: 403
    };
  }

  // 3) Update product by it's ID
  const result = await News.findByIdAndUpdate(newsId, infoNews, {
    new: true
  });
  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulNewsDetails',
    statusCode: 200,
    result
  };
});

export const updateNewsApproved = catchAsync(async (newsId, body) => {
  const news = await News.findById(newsId);
  const infoNews = body;

  // 1) Check if product doesn't exist
  if (!news) {
    return {
      type: 'Error',
      message: 'noNewsFound',
      statusCode: 404
    };
  }

  // 2) Check if user isn't the owner of product

  // 3) Update product by it's ID
  const result = await News.findByIdAndUpdate(newsId, infoNews, {
    new: true
  });
  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulNewsDetails',
    statusCode: 200,
    result
  };
});
export const updateNewsMainVideo = catchAsync(async (newsId, userId, video) => {
  // 1) Check if image provided
  if (video.length === 0) {
    return {
      type: 'Error',
      message: 'selectVideo',
      statusCode: 400
    };
  }

  const news = await News.findById(newsId);

  // 2) Check if product doesn't exist
  if (!news) {
    return {
      type: 'Error',
      message: 'noNewsFound',
      statusCode: 404
    };
  }

  // 3) Check if the user isn't the owner of the product
  if (userId.toString() !== news.author.toString()) {
    return {
      type: 'Error',
      message: 'notUserCreator',
      statusCode: 403
    };
  }

  let mainVideo = video.filter((vid) => vid.fieldname === 'mainVideo');

  const folderName = `News/${news.title.trim().split(' ').join('')}`;

  const productMainImageID = news.videoId;

  // 4) Destroy Video
  destroyFile(productMainImageID);
  const b64 = Buffer.from(mainVideo[0].buffer).toString('base64');
  const dataURI = `data:${mainVideo[0].mimetype};base64,${b64}`;
  // 5) Upload image to cloudinary
  const mainVideoResult = await uploadFileVideo(dataURI, folderName);

  const productBody = {
    video: mainVideoResult.secure_url,
    videoId: mainVideoResult.public_id
  };

  // 6) Update product using it's ID
  const result = await News.findByIdAndUpdate(newsId, productBody, {
    new: true,
    runValidators: true
  });

  // 7) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulNewsMainVideo',
    statusCode: 200,
    result
  };
});

/**
 * @desc    Update Product Images
 * @param   { String } productId - Product ID
 * @param   { String } sellerId - Seller ID
 * @param   { Object } images - Product images
 * @returns { Object<type|message|statusCode|product> }
 */
export const updateNewsImages = catchAsync(async (newsId, userId, images) => {
  // 1) Check if images provided
  if (images.length === 0) {
    return {
      type: 'Error',
      message: 'selectImages',
      statusCode: 400
    };
  }

  const news = await News.findById(newsId);

  // 2) Check if product doesn't exist
  if (!news) {
    return {
      type: 'Error',
      message: 'noNewsFound',
      statusCode: 404
    };
  }

  // 3) Check if user isn't the owner of the product
  if (userId.toString() !== news.author.toString()) {
    return {
      type: 'Error',
      message: 'notSeller',
      statusCode: 403
    };
  }

  images = images.filter((image) => image.fieldname === 'images');

  const folderName = `News/${news.title.trim().split(' ').join('')}`;
  const imagesLinks = [];
  const imagesIDs = [];
  const NewsImagesID = news.imagesId;

  // 4) Destroy Image
  NewsImagesID.forEach((image) => destroyFile(image));

  // 5) Upload images to cloudinary
  const imagesPromises = images.map((image) =>
    uploadFile(dataUri(image).content, folderName, 600)
  );

  const imagesResult = await Promise.all(imagesPromises);

  // 6) Push images links & IDs to the arrays
  imagesResult.forEach((image) => {
    imagesLinks.push(image.secure_url);
    imagesIDs.push(image.public_id);
  });

  const productBody = {
    images: imagesLinks,
    imagesId: imagesIDs
  };

  // 7) Update product using it's ID
  const result = await News.findByIdAndUpdate(newsId, productBody, {
    new: true,
    runValidators: true
  });

  // 8) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulNewsSubImages',
    statusCode: 200,
    result
  };
});

/**
 * @desc    Delete Product Using It's ID
 * @param   { String } productId - Product ID
 * @param   { String } sellerId - Seller ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteNews = catchAsync(async (newsId, userId) => {
  const news = await News.findById(newsId);

  // 1) Check if product doesn't exist
  if (!news) {
    return {
      type: 'Error',
      message: `noNewsFound`,
      statusCode: 404
    };
  }

  // 2) Check if user isn't the owner of the product
  if (userId.toString() !== news.author.toString()) {
    return {
      type: 'Error',
      message: 'notSeller',
      statusCode: 403
    };
  }

  // 3) Delete product using it's ID
  await News.findByIdAndDelete(newsId);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulNewsDelete',
    statusCode: 200
  };
});
export const addLikeNews = catchAsync(async (newsId, userId) => {
  const news = await News.findById(newsId);

  // 1) Check if product doesn't exist
  if (!news) {
    return {
      type: 'Error',
      message: `noNewsFound`,
      statusCode: 404
    };
  }

  // 2) Check if user isn't the owner of the product
  if (userId.toString() !== news.author.toString()) {
    return {
      type: 'Error',
      message: 'notSeller',
      statusCode: 403
    };
  }

  // 3) Delete product using it's ID
  await News.findByIdAndDelete(newsId);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulNewsDelete',
    statusCode: 200
  };
});
