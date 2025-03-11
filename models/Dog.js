const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      // User who registered the dog
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    adoptedBy: {
      // User who adopted the dog, if exists
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    adoptedAt: {
      // Date and time when dog was adopted
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dog', DogSchema);
