import mongoose from 'mongoose';
// Plugins
import toJSON from './plugins/index';

const predictSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment'
    },
    startDate: {
      type: String,
      required: [true, 'Start date must be a valid']
    },
    endDate: {
      type: String,
      required: [true, 'End date must be a valid']
    },
    holidays: [String],
    dataPredict: [
      {
        type: Number,
        required: [true, 'Data Predict must be a valid']
      }
    ],
    labels: [
      {
        type: String,
        required: [true, 'Labels Predict must be a valid']
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// add plugin that converts mongoose to json
predictSchema.plugin(toJSON);

const Predict = mongoose.model('Predict', predictSchema);

export default Predict;
