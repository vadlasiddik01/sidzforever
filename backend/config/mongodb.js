import mongoose from 'mongoose';

const dbURL = process.env.MONGODB_URI;
if (!dbURL) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env<dev/prod>.local'
  );
}

// connect to mongodb

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL + "/forever");

    console.log(`Connected to mongodb database`);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
