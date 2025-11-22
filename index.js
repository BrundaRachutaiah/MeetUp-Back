// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db.connect');
const eventRoutes = require('./routes/event');

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());          // Allow all origins (simple)
app.use(express.json());  // Parse JSON body

// Routes
app.use('/api/events', eventRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler (for unknown routes)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
