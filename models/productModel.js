import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    idCategory: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      require: true
    },
    name: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    quantity: {
      type: Number,
      require: true,
      min: 0
    },
    size: {
      type: String,
      default: ''
    },
    colorList: {
      type: Array,
      default: []
    },
    productType: {
      type: String
    },
    pictures: {
      type: Array,
      default: []
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: Boolean,
      require: true,
      default: true
    }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true
  }
);

const Product = mongoose.model('products', productSchema);
export default Product;
