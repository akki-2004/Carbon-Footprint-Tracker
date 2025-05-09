import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbUri = `${process.env.MONGO_URI}?retryWrites=true&w=majority`;
    await mongoose.connect(dbUri, {
      dbName: 'mern-auth', 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); 
  }
};

export default connectDB;
