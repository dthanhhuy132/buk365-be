import mongoose from 'mongoose';

const eventModel = mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    typeEvent: {
      type: String,
    },
    images: {
      type: Array
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    endDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    percent: {
      type: Number,
      require: true
    },
    status: {
      type: Boolean,
      require: true,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model('event', eventModel);
export default Event;
