import axios from 'axios';
import catchAsync from '../utils/catchAsync';

// Services
import { expenseService } from '../services/index';

/**
 * @desc      Create New Review Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.user.id - User ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the review
 */
export const addExpense = catchAsync(async (req, res) => {
  // 1) Create new review

  const { type, message, statusCode, expense } =
    await expenseService.createExpense(req.user.id, req.body);

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
    expense
  });
});

/**
 * @desc      Get All Reviews Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - Maximum number of reviews on page
 * @return    { JSON } - A JSON object representing the type, message and the reviews
 */
export const getAllExpenses = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) req.query.page = 1;
  if (!sort) req.query.sort = '';
  if (!limit) req.query.limit = 10;
  if (!select) req.query.select = '';

  // 1) Get all reviews
  const { type, message, statusCode, expenses } =
    await expenseService.queryExpenses(req);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }
  const expensesWithTimestamps = expenses.map((expense) => ({
    ...expense.toObject(),
    createdAt: expense.createdAt,
    updatedAt: expense.updatedAt
  }));

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    expenses: expensesWithTimestamps
  });
});

/**
 * @desc      Get Review Using It's ID Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.productId - Product ID
 * @property  { String } req.params.reviewId - Review ID
 * @return    { JSON } - A JSON object representing the type, message and the review
 */
export const getExpense = catchAsync(async (req, res) => {
  const { idExpense } = req.params;

  // 1) Get review using it's ID
  const { type, message, statusCode, expense } =
    await expenseService.queryExpenseById(idExpense);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }
  const expensesWithTimestamps = {
    ...expense.toObject(),
    createdAt: expense.createdAt,
    updatedAt: expense.updatedAt
  };

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    expense: expensesWithTimestamps
  });
});

export const getTotalExpense = catchAsync(async (req, res) => {
  // 1) Get review using it's ID
  const { type, message, statusCode, totalExpense } =
    await expenseService.queryTotalAmountExpenses(req);

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
    totalExpense
  });
});
export const deleteExpense = catchAsync(async (req, res) => {
  // 1) Delete product using it's ID
  const { type, message, statusCode } = await expenseService.deleteExpense(
    req.params.expenseId,
    req.user.id
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
export const getDistance = catchAsync(async (req, res) => {
  const { origins, destinations, weightProduct } = req.body;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=AIzaSyCc20JP_uFNUvAH4sDei_w5QgS6j54wkR4`;

  const { data } = await axios.get(url);
  const distance1 = data.rows[0].elements[0].distance.value;
  const duration = data.rows[0].elements[0].duration.text;
  const expensesDistance = (distance1 / 1000).toFixed(1);
  function getWeightRange(weight) {
    if (weight <= 0.5) {
      return 'Đến 0.5 kg';
    }
    if (weight <= 1) {
      return 'Trên 0.5 kg – 1 kg';
    }
    if (weight <= 2) {
      return 'Trên 1 kg - 2 kg';
    }
    if (weight <= 3) {
      return 'Trên 2 kg - 3 kg';
    }
    return `Trên ${Math.floor(weight / 0.5) * 0.5} kg thêm 0.5 kg`;
  }

  function getDistanceRange(distance) {
    if (distance <= 100) {
      return 'Dưới 100 km';
    }
    if (distance <= 200) {
      return '100-200 km';
    }
    if (distance <= 300) {
      return '200-300 km';
    }
    if (distance <= 350) {
      return '300-350 km';
    }
    if (distance <= 500) {
      return '350-500 km';
    }
    if (distance <= 600) {
      return '500-600 km';
    }
    if (distance <= 700) {
      return '600-700 km';
    }
    if (distance <= 750) {
      return '700-750 km';
    }
    if (distance <= 850) {
      return '750-850 km';
    }
    if (distance <= 1000) {
      return '850-1000 km';
    }
    if (distance <= 1100) {
      return '1000-1100 km';
    }

    return 'Lớn hơn 1,100 km';
  }
  function calculateShippingPrice(weight, distance) {
    const priceTable = {
      'Dưới 100 km': {
        'Đến 0.5 kg': 25000,
        'Trên 0.5 kg – 1 kg': 30000,
        'Trên 1 kg - 2 kg': 35000,
        'Trên 2 kg - 3 kg': 40000,
        'Trên 03 kg thêm 0.5 kg': 1000,
        'Trên 05 kg thêm 0.5 kg': 1000,
        'Trên 10 kg thêm 0.5 kg': 1000,
        'Trên 15 kg thêm 0.5 kg': 1000,
        'Trên 20 kg thêm 0.5 kg': 1000,
        'Trên 40 kg thêm 0.5 kg': 1000
      },
      '100-200 km': {
        'Đến 0.5 kg': 30000,
        'Trên 0.5 kg – 1 kg': 35000,
        'Trên 1 kg - 2 kg': 40000,
        'Trên 2 kg - 3 kg': 45000,
        'Trên 03 kg thêm 0.5 kg': 1000,
        'Trên 05 kg thêm 0.5 kg': 1000,
        'Trên 10 kg thêm 0.5 kg': 1500,
        'Trên 15 kg thêm 0.5 kg': 1500,
        'Trên 20 kg thêm 0.5 kg': 1500,
        'Trên 40 kg thêm 0.5 kg': 2000
      },
      '200-300 km': {
        'Đến 0.5 kg': 30000,
        'Trên 0.5 kg – 1 kg': 35000,
        'Trên 1 kg - 2 kg': 40000,
        'Trên 2 kg - 3 kg': 45000,
        'Trên 03 kg thêm 0.5 kg': 1500,
        'Trên 05 kg thêm 0.5 kg': 1500,
        'Trên 10 kg thêm 0.5 kg': 1500,
        'Trên 15 kg thêm 0.5 kg': 1500,
        'Trên 20 kg thêm 0.5 kg': 1500,
        'Trên 40 kg thêm 0.5 kg': 2300
      },
      '300-350 km': {
        'Đến 0.5 kg': 30000,
        'Trên 0.5 kg – 1 kg': 35000,
        'Trên 1 kg - 2 kg': 40000,
        'Trên 2 kg - 3 kg': 45000,
        'Trên 03 kg thêm 0.5 kg': 1600,
        'Trên 05 kg thêm 0.5 kg': 1600,
        'Trên 10 kg thêm 0.5 kg': 1600,
        'Trên 15 kg thêm 0.5 kg': 1600,
        'Trên 20 kg thêm 0.5 kg': 1600,
        'Trên 40 kg thêm 0.5 kg': 2400
      },
      '350-500 km': {
        'Đến 0.5 kg': 35000,
        'Trên 0.5 kg – 1 kg': 40000,
        'Trên 1 kg - 2 kg': 45000,
        'Trên 2 kg - 3 kg': 50000,
        'Trên 03 kg thêm 0.5 kg': 1600,
        'Trên 05 kg thêm 0.5 kg': 1600,
        'Trên 10 kg thêm 0.5 kg': 1950,
        'Trên 15 kg thêm 0.5 kg': 1950,
        'Trên 20 kg thêm 0.5 kg': 1950,
        'Trên 40 kg thêm 0.5 kg': 2600
      },
      '500-600 km': {
        'Đến 0.5 kg': 35000,
        'Trên 0.5 kg – 1 kg': 40000,
        'Trên 1 kg - 2 kg': 45000,
        'Trên 2 kg - 3 kg': 50000,
        'Trên 03 kg thêm 0.5 kg': 1800,
        'Trên 05 kg thêm 0.5 kg': 1800,
        'Trên 10 kg thêm 0.5 kg': 2100,
        'Trên 15 kg thêm 0.5 kg': 2100,
        'Trên 20 kg thêm 0.5 kg': 2100,
        'Trên 40 kg thêm 0.5 kg': 2800
      },
      '600-700 km': {
        'Đến 0.5 kg': 40000,
        'Trên 0.5 kg – 1 kg': 55000,
        'Trên 1 kg - 2 kg': 60000,
        'Trên 2 kg - 3 kg': 65000,
        'Trên 03 kg thêm 0.5 kg': 2000,
        'Trên 05 kg thêm 0.5 kg': 2000,
        'Trên 10 kg thêm 0.5 kg': 2250,
        'Trên 15 kg thêm 0.5 kg': 2250,
        'Trên 20 kg thêm 0.5 kg': 2250,
        'Trên 40 kg thêm 0.5 kg': 3000
      },
      '700-750 km': {
        'Đến 0.5 kg': 40000,
        'Trên 0.5 kg – 1 kg': 55000,
        'Trên 1 kg - 2 kg': 60000,
        'Trên 2 kg - 3 kg': 65000,
        'Trên 03 kg thêm 0.5 kg': 2200,
        'Trên 05 kg thêm 0.5 kg': 2200,
        'Trên 10 kg thêm 0.5 kg': 2400,
        'Trên 15 kg thêm 0.5 kg': 2400,
        'Trên 20 kg thêm 0.5 kg': 2400,
        'Trên 40 kg thêm 0.5 kg': 3200
      },
      '750-850 km': {
        'Đến 0.5 kg': 40000,
        'Trên 0.5 kg – 1 kg': 55000,
        'Trên 1 kg - 2 kg': 60000,
        'Trên 2 kg - 3 kg': 65000,
        'Trên 03 kg thêm 0.5 kg': 2400,
        'Trên 05 kg thêm 0.5 kg': 2400,
        'Trên 10 kg thêm 0.5 kg': 2550,
        'Trên 15 kg thêm 0.5 kg': 2550,
        'Trên 20 kg thêm 0.5 kg': 2550,
        'Trên 40 kg thêm 0.5 kg': 3400
      },
      '850-1000 km': {
        'Đến 0.5 kg': 40000,
        'Trên 0.5 kg – 1 kg': 55000,
        'Trên 1 kg - 2 kg': 60000,
        'Trên 2 kg - 3 kg': 65000,
        'Trên 03 kg thêm 0.5 kg': 2600,
        'Trên 05 kg thêm 0.5 kg': 2600,
        'Trên 10 kg thêm 0.5 kg': 2700,
        'Trên 15 kg thêm 0.5 kg': 2700,
        'Trên 20 kg thêm 0.5 kg': 2700,
        'Trên 40 kg thêm 0.5 kg': 3600
      },
      '1000-1100 km': {
        'Đến 0.5 kg': 40000,
        'Trên 0.5 kg – 1 kg': 55000,
        'Trên 1 kg - 2 kg': 60000,
        'Trên 2 kg - 3 kg': 65000,
        'Trên 03 kg thêm 0.5 kg': 2800,
        'Trên 05 kg thêm 0.5 kg': 2800,
        'Trên 10 kg thêm 0.5 kg': 2850,
        'Trên 15 kg thêm 0.5 kg': 2850,
        'Trên 20 kg thêm 0.5 kg': 2850,
        'Trên 40 kg thêm 0.5 kg': 3800
      },
      'Lớn hơn 1,100 km': {
        'Đến 0.5 kg': 40000,
        'Trên 0.5 kg – 1 kg': 55000,
        'Trên 1 kg - 2 kg': 60000,
        'Trên 2 kg - 3 kg': 65000,
        'Trên 03 kg thêm 0.5 kg': 3000,
        'Trên 05 kg thêm 0.5 kg': 3000,
        'Trên 10 kg thêm 0.5 kg': 3000,
        'Trên 15 kg thêm 0.5 kg': 3000,
        'Trên 20 kg thêm 0.5 kg': 3000,
        'Trên 40 kg thêm 0.5 kg': 4000
      }
    };

    let price = 0;
    const weightRange = getWeightRange(weight);
    const distanceRange = getDistanceRange(distance);

    if (
      priceTable[distanceRange] &&
      priceTable[distanceRange][weightRange] !== undefined
    ) {
      if (weight <= 0.5) {
        price = priceTable[distanceRange]['Đến 0.5 kg'];
      }
      if (weight > 0.5 && weight <= 1) {
        price = priceTable[distanceRange]['Trên 0.5 kg – 1 kg'];
      }
      if (weight > 0.5 && weight <= 2) {
        price = priceTable[distanceRange]['Trên 1 kg - 2 kg'];
      }
      if (weight > 2 && weight <= 3) {
        price = priceTable[distanceRange]['Trên 2 kg - 3 kg'];
      }
      if (weight > 3) {
        price = priceTable[distanceRange]['Trên 2 kg - 3 kg'];
        const additionalWeight = weight - 3;
        const additionalCharges =
          additionalWeight * priceTable[distanceRange][weightRange];
        price += additionalCharges;
      }
    } else {
      return 0;
    }
    // if (weight > 3) {
    //   const additionalWeight = weight - 3;
    //   const additionalCharges =
    //     additionalWeight * priceTable[distanceRange][weightRange];
    //   price += additionalCharges;
    // }
    return price;
  }

  const price = calculateShippingPrice(weightProduct, expensesDistance);

  const dataResponse = {
    price,
    duration
  };

  return res.status(200).json({
    type: 'Success',
    data: dataResponse
  });
});
