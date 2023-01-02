import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  cartItems: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      productSelectColor: {
        type: String,
        default: ""
      }
    }
  ],
  createAtDate: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('carts', cartSchema);
export default Cart;
