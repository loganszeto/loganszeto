import mongoose from 'mongoose';

const healthDataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  activeEnergy: [{
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  }],
  sleepAnalysis: [{
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    value: {
      type: String,
      enum: ['INBED', 'ASLEEP', 'AWAKE'],
      required: true,
    },
  }],
});

export default mongoose.models.HealthData || mongoose.model('HealthData', healthDataSchema); 