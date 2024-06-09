import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import { Expense } from '../models/index';

// eslint-disable-next-line import/prefer-default-export
export const createExpense = catchAsync(async (user, body) => {
  const { name, typeExpense, amount, description } = body;

  // 1) Check if user entered all fields
  if (!name || !typeExpense || !amount || !description) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  // 3) Create review
  const expense = await Expense.create({
    name,
    user,
    typeExpense,
    amount,
    description
  });

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulExpenseCreate',
    statusCode: 201,
    expense
  };
});

export const queryExpenses = catchAsync(async (req) => {
  req.query.user = req.user.id;
  const populateQuery = [{ path: 'user' }];
  let expenses = await APIFeatures(req, Expense, populateQuery);

  // 2) Check if reviews doesn't exist
  if (!expenses) {
    return {
      type: 'Error',
      message: 'noExpensesFound',
      statusCode: 404
    };
  }

  // 3) Filter review to select only reviews of the product only
  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulExpensesFound',
    statusCode: 200,
    expenses
  };
});
export const queryTotalAmountExpenses = catchAsync(async (req) => {
  const sellerId = req.user.id;
  const expenses = await Expense.find({
    user: sellerId
  });

  // 2) Check if reviews doesn't exist
  if (expenses.length === 0) {
    return {
      type: 'Error',
      message: 'noExpensesFound',
      statusCode: 404
    };
  }
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // 3) Filter review to select only reviews of the product only
  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulExpensesFound',
    statusCode: 200,
    totalExpense
  };
});

/**
 * @desc    Query Review Using It's ID
 * @param   { String } prodcutId - Product ID
 * @param   { String } reviewId - Review ID
 * @returns { Object<type|message|statusCode|review> }
 */
export const queryExpenseById = catchAsync(async (idExpense) => {
  const expense = await Expense.findById(idExpense);

  // 2) Check if review doesn't exist
  if (!expense) {
    return {
      type: 'Error',
      message: 'noExpenseFound',
      statusCode: 404
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulExpenseFound',
    statusCode: 200,
    expense
  };
});
export const deleteExpense = catchAsync(async (expenseId, userId) => {
  const expense = await Expense.findById(expenseId);

  // 1) Check if product doesn't exist
  if (!expense) {
    return {
      type: 'Error',
      message: `noExpenseFound`,
      statusCode: 404
    };
  }

  // 2) Check if user isn't the owner of the product
  if (userId.toString() !== expense.user.toString()) {
    return {
      type: 'Error',
      message: 'notSeller',
      statusCode: 403
    };
  }

  // 3) Delete product using it's ID
  await Expense.findByIdAndDelete(expenseId);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulExpenseDelete',
    statusCode: 200
  };
});
