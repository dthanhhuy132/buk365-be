import mongoose from 'mongoose';
import { URL, PASSWORD } from '../common/mongoUrl.js';

const connectDB = async () => {
  try {
    const db = URL.replace('<password>', PASSWORD);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connect data success');
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
