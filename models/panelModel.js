import mongoose, { Schema } from 'mongoose';

const panelSchema = mongoose.Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    pictures: {
      type: Array,
      default: []
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'cancel'],
      default: 'active'
    }
  },
  { timestamps: true }
);

const Panel = mongoose.model('panel', panelSchema);
export default Panel;
