const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
    calculateCarbonFootprint,
    getCarbonFootprint,
    updateCarbonFootprint,
    deleteCarbonFootprint,
    addGreenPoints
} = require('../controllers/carbonController');

const CarbonFootprint = require('../models/CarbonFootprint');

// ✅ Middleware to validate userId
router.use('/carbon-footprint/:userId', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ success: false, message: 'Invalid userId format.' });
    }
    next();
});

// ✅ New route for adding green points
router.post('/carbon-footprint/:userId/add-green-points', addGreenPoints);

router.post('/carbon-footprint', calculateCarbonFootprint);
router.get('/carbon-footprint/:userId', getCarbonFootprint);
router.put('/carbon-footprint/:userId', updateCarbonFootprint);
router.delete('/carbon-footprint/:userId', deleteCarbonFootprint);

module.exports = router;
