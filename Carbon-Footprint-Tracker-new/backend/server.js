const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config(); // Load environment variables

const connectDB = require("./config/db");
connectDB();


const app = express();
app.use(cookieParser());

// ✅ Enable CORS for all origins
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true,              // Allow cookies / credentials
}));

const carbonRoutes = require('./routes/carbonRoutes');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const leaderboardRouter = require('./routes/leaderboardRoutes');
const reviewRouter = require('./routes/reviewRoutes');



// ✅ Middleware
app.use(express.json());

// ✅ Middleware to check for valid userId in requests
app.use((req, res, next) => {
  if (req.body.userId && !mongoose.Types.ObjectId.isValid(req.body.userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }
  next();
});

// ✅ Use Routes
app.use('/api', carbonRoutes);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/reviews', reviewRouter);


// ✅ Catch-all handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
