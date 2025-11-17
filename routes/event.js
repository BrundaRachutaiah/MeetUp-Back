const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  seedEvents
} = require('../controllers/eventController');

const router = express.Router();

// Seed database with initial events from the images
router.post('/seed', seedEvents);

// Get all events with filtering options
router.get('/', getEvents);

// Get a single event by ID
router.get('/:id', getEvent);

// Create a new event
router.post('/', createEvent);

// Update an event
router.put('/:id', updateEvent);

// Delete an event
router.delete('/:id', deleteEvent);

module.exports = router;