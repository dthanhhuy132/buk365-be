import mongoose, { Schema } from 'mongoose';

const categoryModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true
    },
    categoryImage: {
      type: Array,
      default: []
    },
    description: {
      type: String,
    },
    event: [
      {
        eventId: {
          type: Schema.Types.ObjectId,
          ref: 'event',
          require: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model('category', categoryModel);
export default Category;
