/* eslint-disable import/prefer-default-export */
import { Status, User } from '../models';
import apiFeatures from '../utils/apiFeatures';
import catchAsync from '../utils/catchAsync';

export const createStatus = catchAsync(async (req) => {
  const userId = req.user.id;
  const {
    typeOfViolation,
    violationTime,
    executionType,
    reason,
    appealStatus,
    seller
  } = req.body;

  if (
    !typeOfViolation ||
    !violationTime ||
    !executionType ||
    !reason ||
    !appealStatus
  ) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  const status = await Status.create({
    typeOfViolation,
    violationTime,
    executionType,
    reason,
    appealStatus,
    seller,
    createdBy: userId
  });
  if (executionType === 'suspension') {
    await User.findByIdAndUpdate(
      seller,
      { isGlobalBan: true },
      {
        new: true
      }
    );
  }

  return {
    type: 'Success',
    message: 'successfulCreatedStatus',
    statusCode: 201,
    status
  };
});

export const queryStatuses = catchAsync(async (req) => {
  if (req.user.role === 'seller') {
    req.query = { ...req.query, seller: req.user._id };
  }
  const populateQuery = [
    { path: 'seller', populate: { path: 'apartment', select: 'name address' } }
  ];

  const statuses = await apiFeatures(req, Status, populateQuery, null);
  if (!statuses) {
    return {
      type: 'Error',
      message: 'noStatusesFound',
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'successfulStatusesFound',
    statusCode: 200,
    statuses
  };
});

export const queryStatusById = catchAsync(async (statusId) => {
  const populateQuery = [
    {
      path: 'seller',
      select: 'name email username address', // Chọn các trường của seller
      populate: {
        path: 'apartment',
        select: 'name address' // Chọn các trường của apartment
      }
    }
  ];
  const status = await Status.findById(statusId).populate(populateQuery).lean();

  if (!status) {
    return {
      type: 'Error',
      message: 'noStatusFound',
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'successfulStatusFound',
    statusCode: 200,
    status
  };
});

export const updateStatusDetails = catchAsync(async (statusId, body) => {
  const status = await Status.findById(statusId);
  if (!status) {
    return {
      type: 'Error',
      message: 'noStatusFound',
      statusCode: 404
    };
  }

  const updatedStatus = await Status.findByIdAndUpdate(statusId, body, {
    new: true
  });
  if (body.executionType === 'suspension') {
    await User.findByIdAndUpdate(
      body.seller._id,
      { isGlobalBan: true },
      {
        new: true
      }
    );
  } else {
    await User.findByIdAndUpdate(
      body.seller._id,
      { isGlobalBan: false },
      {
        new: true
      }
    );
  }
  return {
    type: 'Success',
    message: 'successfulStatusUpdate',
    statusCode: 200,
    updatedStatus
  };
});

export const deleteStatus = catchAsync(async (statusId) => {
  const status = await Status.findById(statusId);
  if (!status) {
    return {
      type: 'Error',
      message: 'noStatusFound',
      statusCode: 404
    };
  }

  await Status.findByIdAndDelete(statusId);
  return {
    type: 'Success',
    message: 'successfulStatusDelete',
    statusCode: 200
  };
});
