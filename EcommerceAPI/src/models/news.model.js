import mongoose from 'mongoose';
import slugify from 'slugify';

// Plugins
import toJSON from './plugins/index';

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A news must have a title'],
      trim: true
    },
    slug: String,
    content: {
      type: String,
      required: [true, 'A news must have content']
    },
    video: String,
    videoId: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment'
    },
    images: {
      type: [String]
    },
    imagesId: Array,
    tags: [String],
    views: {
      type: Number,
      default: 0
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
      }
    ],
    likes: {
      type: Number,
      default: 0
    }
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    //   }
    // ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// add plugin that converts mongoose to json
newsSchema.plugin(toJSON);

newsSchema.index({ title: 1, apartment: 1 });

// Virtual populate
newsSchema.virtual('relatedNews', {
  ref: 'News',
  foreignField: 'apartment',
  localField: 'apartment'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() !.update()
newsSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const News = mongoose.model('News', newsSchema);

export default News;
