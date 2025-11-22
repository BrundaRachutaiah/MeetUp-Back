// routes/event.js
const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  seedEvents,
} = require('../controllers/eventController');

const router = express.Router();

// Seed events
router.post('/seed', seedEvents);

// Get all events
router.get('/', getEvents);

// Get one event by id
router.get('/:id', getEvent);

// Create event
router.post('/', createEvent);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;
