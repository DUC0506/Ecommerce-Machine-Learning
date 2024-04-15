// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/index';

const campaignSchema = mongoose.Schema(
  {
    promotion: {
      type: mongoose.Types.ObjectId,
      ref: 'Promotion'
    },
    discountRate: {
      type: Number
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
campaignSchema.plugin(toJSON);
const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
