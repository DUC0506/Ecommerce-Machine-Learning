import mongoose from 'mongoose';
import toJSON from './plugins/index';

const messageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true }
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
messageSchema.plugin(toJSON);
const Message = mongoose.model('Message', messageSchema);
export default Message;
