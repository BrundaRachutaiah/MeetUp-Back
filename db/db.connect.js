// db/db.connect.js
const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // stop app if DB fails
  }
}

module.exports = connectDB;
