// db/db.connect.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // No need for useNewUrlParser or useUnifiedTopology (deprecated in Mongoose 7+)
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;