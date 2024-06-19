import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  deviceInfo: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  isUsed: { type: Boolean, default: false },
});

export const SessionModel = mongoose.model('Session', SessionSchema);
