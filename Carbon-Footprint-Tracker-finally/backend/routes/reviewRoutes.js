// routes/reviewRoutes.js
const express = require('express');
const Review = require('../models/Review');
const User = require('../models/userModel');  // if you want to grab the user’s name
const router = express.Router();

// ─── POST /api/reviews ───────────────────────────────────────────────────────────
// Save a new review
router.post('/', async (req, res) => {
  const { userId, reviewText } = req.body;
  if (!userId || !reviewText?.trim()) {
    return res
      .status(400)
      .json({ message: 'userId and non-empty reviewText are required' });
  }

  try {
    // optional: fetch user name
    let userName = 'Anonymous';
    const user = await User.findById(userId).select('name');
    if (user?.name) userName = user.name;

    const review = new Review({
      userId,
      userName,
      reviewText: reviewText.trim(),
    });

    const saved = await review.save();
    console.log('Review saved:', saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

// ─── GET /api/reviews ────────────────────────────────────────────────────────────
// Fetch all reviews (you already have this)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    if (!reviews.length) {
      return res.status(200).json([]);
    }
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

module.exports = router;