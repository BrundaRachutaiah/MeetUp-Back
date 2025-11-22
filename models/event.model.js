// models/event.model.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Please specify the event type'],
    enum: ['Online', 'Offline'],
  },
  date: {
    type: Date,
    required: [true, 'Please add an event date'],
  },
  time: {
    type: String,
    required: [true, 'Please add an event time'],
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL for the event'],
  },
  hostedBy: {
    type: String,
    required: [true, 'Please add who is hosting the event'],
  },
  venue: {
    type: String,
    required: function () {
      return this.type === 'Offline';
    },
  },
  address: {
    type: String,
    required: function () {
      return this.type === 'Offline';
    },
  },
  ticketPrice: {
    type: Number,
    required: [true, 'Please add a ticket price'],
    min: 0,
  },
  speakers: [
    {
      name: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
  description: {
    type: String,
    required: [true, 'Please add a description for the event'],
  },
  tags: {
    type: [String],
    required: [true, 'Please add at least one tag'],
  },
  dressCode: {
    type: String,
    default: 'Casual',
  },
  ageRestriction: {
    type: String,
    default: 'None',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
