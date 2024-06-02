import mongoose from 'mongoose';
import toJSON from './plugins/index';

const expenseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    typeExpense: {
      type: String
    },
    amount: {
      type: Number,
      required: true,
      default: 0.0
    },
    description: {
      type: String
    }
    // Thêm thông tin ngày tạo và cập nhật
  },
  { timestamps: true }
);
expenseSchema.plugin(toJSON);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
