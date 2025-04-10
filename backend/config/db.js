const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/carbon-footprint";

    console.log(`🚀 Connecting to MongoDB at: ${mongoURI}`);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds
      socketTimeoutMS: 45000, 
    });

    console.log('✅ MongoDB connected successfully');

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    if (error.name === 'MongoNetworkError') {
      console.error('🚨 Possible Causes: MongoDB server is not running, wrong URI, firewall issues.');
    } else if (error.name === 'MongooseServerSelectionError') {
      console.error('🚨 Possible Causes: Incorrect database URI, MongoDB instance not found.');
    }

    process.exit(1); // Stop the server if connection fails
  }
};

module.exports = connectDB;
