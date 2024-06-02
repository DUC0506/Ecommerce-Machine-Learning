import mongoose, { Schema } from 'mongoose';

// Plugins
import toJSON from './plugins/index';

const commentSchema = mongoose.Schema(
  {
    comments: {
      type: String,
      required: [true, 'Review cannot be empty!']
    },
    news: {
      type: mongoose.Types.ObjectId,
      ref: 'News',
      required: [true, 'Review must belong to a news']
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    },
    replies: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
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
commentSchema.plugin(toJSON);
commentSchema.index({ news: 1 });
// Không cần index unique cho cặp (news, user) nữa

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
