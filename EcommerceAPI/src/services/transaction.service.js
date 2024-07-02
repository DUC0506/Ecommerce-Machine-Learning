import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import { Transaction, User } from '../models/index';

// Tạo giao dịch rút tiền
export const createWithdrawal = catchAsync(async (user, body) => {
  const { amount } = body;

  // 1) Kiểm tra các trường hợp bắt buộc
  if (!amount) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  // 2) Kiểm tra số dư của người dùng
  const currentUser = await User.findById(user._id);
  if (currentUser.balance < amount) {
    return {
      type: 'Error',
      message: 'insufficientBalance',
      statusCode: 400
    };
  }

  // 3) Tạo giao dịch rút tiền
  const transaction = await Transaction.create({
    user: user._id,
    amount,
    status: 'pending',
    type: 'withdrawal',
    date: Date.now()
  });

  // 4) Cập nhật số dư của người dùng
  currentUser.balance -= amount;
  await currentUser.save();

  // 5) Trả về kết quả
  return {
    type: 'Success',
    message: 'successfulWithdrawalCreate',
    statusCode: 201,
    transaction
  };
});

// Xóa giao dịch rút tiền
export const deleteTransaction = catchAsync(async (transactionId) => {
  const transaction = await Transaction.findById(transactionId);

  // 1) Kiểm tra nếu giao dịch không tồn tại
  if (!transaction) {
    return {
      type: 'Error',
      message: 'noWithdrawalFound',
      statusCode: 404
    };
  }

  // 4) Xóa giao dịch
  await transaction.findByIdAndDelete(transactionId);

  // 5) Trả về kết quả
  return {
    type: 'Success',
    message: 'successfulTransactionDelete',
    statusCode: 200
  };
});

// Truy vấn giao dịch rút tiền
export const queryTransactions = catchAsync(async (req) => {
  // req.query.user = req.user.id;
  const populateQuery = [
    {
      path: 'user',
      populate: {
        path: 'apartment',
        select: 'name' // chỉ lấy trường name từ apartment
      }
    }
  ];
  const transactions = await APIFeatures(req, Transaction, populateQuery);

  if (!transactions) {
    return {
      type: 'Error',
      message: 'noWithdrawalsFound',
      statusCode: 404
    };
  }

  return {
    type: 'Success',
    message: 'successfulWithdrawalsFound',
    statusCode: 200,
    transactions
  };
});

export const updateTransaction = catchAsync(async (transactionId, body) => {
  const { status } = body;

  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    return {
      type: 'Error',
      message: 'noTransactionFound',
      statusCode: 404
    };
  }
  if (!['pending', 'completed', 'failed'].includes(status)) {
    return {
      type: 'Error',
      message: 'invalidStatus',
      statusCode: 400
    };
  }
  transaction.status = status;
  await transaction.save();
  return {
    type: 'Success',
    message: 'successfulTransactionUpdate',
    statusCode: 200,
    transaction
  };
});
