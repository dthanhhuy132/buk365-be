import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentInforSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    totalMoney: {
      type: Number,
      min: 0,
      required: true,
    },
    totalShip: {
      type: Number,
      min: 0,
    },
    discountCode: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: ""
    },
    paymentMethods: {
      type: String,
      enum: ["COD", "MOMO", "ZALO", "BANK"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Wait for payment", "Payment success"],
      default: "Wait for payment",
    },
    listProduct: {
      type: Array,
      default: [],
    },
    orderStatus: {
      type: String,
      enum: ["await", "success", "cancel"],
      default: "await",
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
paymentInforSchema.virtual("promotion_detail", {
  ref: "Promotion",
  localField: "code",
  foreignField: "discountCode",
  justOne: true,
});
paymentInforSchema.set("toObject", { virtuals: true });
paymentInforSchema.set("toJSON", { virtuals: true });
const Payment = mongoose.model("payment", paymentInforSchema);
export default Payment;
