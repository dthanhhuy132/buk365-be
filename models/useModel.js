import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'feMale']
  },
  userNumber: {
    type: String,
    unique: true
  },
  userImage: {
    type: Array,
    default: []
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  address1: {
    type: String
  },
  address2: {
    type: String
  },
  address3: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

const User = mongoose.model('users', UserSchema);
export default User;
