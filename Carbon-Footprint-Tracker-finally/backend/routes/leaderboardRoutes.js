const express = require('express');
const router = express.Router();
const User = require('../models/userModel');  // Reference to the User model
const CarbonFootprint = require('../models/CarbonFootprint');  // Reference to the CarbonFootprint model

// Get top 10 users by green points
router.get('/', async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();

    // Create an array to store user scores with their green points
    let leaderboard = [];

    for (let user of users) {
      const carbonData = await CarbonFootprint.findOne({ userId: user._id });  // Assuming `userId` is used to link with carbonfootprints
      const totalGreenPoints = carbonData ? carbonData.totalGreenPoints : 0;  // Get the total green points, defaulting to 0 if no data exists

      // Clean up user data (exclude sensitive information)
      const cleanedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      leaderboard.push({ user: cleanedUser, totalGreenPoints });
    }

    // Sort leaderboard by total green points in descending order and get top 10
    leaderboard.sort((a, b) => b.totalGreenPoints - a.totalGreenPoints);

    res.json(leaderboard.slice(0, 10));  // Return the top 10 users
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch leaderboard', details: err.message });
  }
});

module.exports = router;