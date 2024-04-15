// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/index';

const promotionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      require: true
    },
    mainImage: {
      type: String,
      required: [true, 'A product must have a main image']
    },
    mainImageId: String,
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
promotionSchema.plugin(toJSON);
const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion;
