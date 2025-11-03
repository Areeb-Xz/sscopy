import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Group name is required'],
    minlength: [1, 'Group name must be at least 1 character'],
    maxlength: [50, 'Group name cannot exceed 50 characters'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    trim: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Group must have an admin'],
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      joinedDate: {
        type: Date,
        default: Date.now,
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member',
      },
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
groupSchema.index({ admin: 1 });
groupSchema.index({ 'members.userId': 1 });

export default mongoose.model('Group', groupSchema);