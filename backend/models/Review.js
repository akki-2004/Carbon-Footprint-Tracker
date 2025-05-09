const mongoose = require('mongoose');
const userModel = require('./userModel');  // Import the existing User model

const reviewSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',  // Correctly reference the 'user' model
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;