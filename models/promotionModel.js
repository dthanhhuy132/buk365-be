import mongoose from "mongoose";

const promotionModel = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    percent: {
      type: Number,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
    code: {
      type: String,
      require: true,
      unique: true
    },
    amount: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model("promotion", promotionModel);
export default Promotion;
