// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/index';

const statusSchema = mongoose.Schema(
  {
    typeOfViolation: {
      type: String,
      required: true
    },
    violationTime: {
      type: Date,
      required: true
    },
    executionType: {
      type: String,
      enum: ['warning', 'fine', 'suspension'],
      required: true
    },
    reason: {
      type: String,
      required: [true, 'A violation must have a reason']
    },
    appealStatus: {
      type: String,
      required: true,
      enum: ['not_appealed', 'under_review', 'resolved']
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

statusSchema.plugin(toJSON);
const Status = mongoose.model('Status', statusSchema);

export default Status;
