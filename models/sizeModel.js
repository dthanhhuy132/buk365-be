import mongoose, { Schema } from 'mongoose';

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Size = mongoose.model('size', sizeSchema);
export default Size;
