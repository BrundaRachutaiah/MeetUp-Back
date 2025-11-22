// controllers/eventController.js
const Event = require('../models/event.model');

// GET /api/events
// Get all events with optional filters and search
async function getEvents(req, res) {
  try {
    const { type, search } = req.query;
    const query = {};

    // Filter by type if provided (Online / Offline / Both)
    if (type && type !== 'Both') {
      query.type = type;
    }

    // Search by title, tags, or hostedBy
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { hostedBy: { $regex: search, $options: 'i' } },
      ];
    }

    const events = await Event.find(query).sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET /api/events/:id
// Get a single event by ID
async function getEvent(req, res) {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// POST /api/events
// Create a new event
async function createEvent(req, res) {
  try {
    const eventData = req.body; // body should contain event fields
    const event = await Event.create(eventData);

    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// PUT /api/events/:id
// Update an existing event
async function updateEvent(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const event = await Event.findByIdAndUpdate(id, updateData, {
      new: true,          // return updated document
      runValidators: true // run schema validation
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// DELETE /api/events/:id
// Delete an event
async function deleteEvent(req, res) {
  try {
    const id = req.params.id;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// POST /api/events/seed
// Seed database with sample events
async function seedEvents(req, res) {
  try {
    // Clear old events
    await Event.deleteMany({});

    // Insert sample events
    const events = await Event.create([
      {
        title: 'Tech Conference',
        type: 'Offline',
        date: new Date('2023-07-13'),
        time: '09:00 - 17:00',
        image: 'https://picsum.photos/seed/techconf/400/300.jpg',
        hostedBy: 'Tech Innovators Inc.',
        venue: 'Convention Center',
        address: '123 Main St, Tech City',
        ticketPrice: 150,
        speakers: [{ name: 'Alice Future', title: 'CEO of Tomorrow' }],
        description:
          'A full-day conference on the latest in technology, featuring keynotes from industry leaders.',
        tags: ['Technology', 'Networking', 'Innovation'],
        dressCode: 'Business Formal',
        ageRestriction: '18+',
      },
      {
        title: 'Design Workshop',
        type: 'Offline',
        date: new Date('2023-07-10'),
        time: '10:00 - 16:00',
        image: 'https://picsum.photos/seed/designwork/400/300.jpg',
        hostedBy: 'Creative Minds',
        venue: 'Art Studio',
        address: '456 Creative Lane, Design City',
        ticketPrice: 75,
        speakers: [{ name: 'Bob Palette', title: 'UI/UX Master' }],
        description:
          'Hands-on workshop covering modern design principles and tools.',
        tags: ['Design', 'UI/UX', 'Workshop'],
        dressCode: 'Smart Casual',
        ageRestriction: '16+',
      },
      {
        title: 'Marketing Seminar',
        type: 'Offline',
        date: new Date('2023-08-15'),
        time: '10:00 - 12:00',
        image: 'https://picsum.photos/seed/marketsem/400/300.jpg',
        hostedBy: 'Marketing Experts',
        venue: 'Marketing City',
        address: '789 Marketing Avenue, City',
        ticketPrice: 3000,
        speakers: [
          { name: 'Sarah Johnson', title: 'Market Manager' },
          { name: 'Michael Brown', title: 'SEO Expert' },
        ],
        description:
          'An insightful seminar on modern marketing strategies, SEO, and brand growth.',
        tags: ['Marketing', 'SEO', 'Branding'],
        dressCode: 'Smart Casual',
        ageRestriction: '18 years and above',
      },
      {
        title: 'React Online Summit',
        type: 'Online',
        date: new Date('2023-09-20'),
        time: '14:00 - 18:00 GMT',
        image: 'https://picsum.photos/seed/reactsummit/400/300.jpg',
        hostedBy: 'React Community',
        ticketPrice: 0,
        speakers: [{ name: 'Dan Abramov', title: 'Core React Team' }],
        description:
          'A free online summit covering the latest features and best practices in React.',
        tags: ['React', 'JavaScript', 'Frontend', 'Online'],
        dressCode: 'Casual',
        ageRestriction: 'None',
      },
    ]);

    res.status(201).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Export all controller functions in one object
module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  seedEvents,
};
