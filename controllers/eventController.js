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
        title: 'Tech Conference 2023',
        type: 'Offline',
        date: new Date('2023-07-13'),
        time: '09:00 AM - 05:00 PM',
        image: 'https://picsum.photos/seed/techconf/400/300.jpg',
        hostedBy: 'Tech Innovators Inc.',
        venue: 'Convention Center',
        address: '123 Main St, Tech City',
        ticketPrice: 150,
        speakers: [
          { 
            name: 'Alice Future', 
            title: 'CEO of Tomorrow',
            image: 'https://picsum.photos/seed/alice/200/200.jpg'
          },
          { 
            name: 'Bob Tech', 
            title: 'CTO of InnovateTech',
            image: 'https://picsum.photos/seed/bob/200/200.jpg'
          }
        ],
        description:
          'Join us for a full-day conference on the latest in technology, featuring keynotes from industry leaders. This event will cover emerging technologies including AI, blockchain, quantum computing, and more. Network with professionals from around the world and gain insights into the future of technology. The conference includes keynote speeches, panel discussions, workshops, and networking sessions. Lunch and refreshments will be provided.',
        tags: ['Technology', 'Networking', 'Innovation'],
        dressCode: 'Business Formal',
        ageRestriction: '18+',
      },
      {
        title: 'Design Workshop',
        type: 'Offline',
        date: new Date('2023-07-10'),
        time: '10:00 AM - 04:00 PM',
        image: 'https://picsum.photos/seed/designwork/400/300.jpg',
        hostedBy: 'Creative Minds',
        venue: 'Art Studio',
        address: '456 Creative Lane, Design City',
        ticketPrice: 75,
        speakers: [
          { 
            name: 'Bob Palette', 
            title: 'UI/UX Master',
            image: 'https://picsum.photos/seed/bobdesign/200/200.jpg'
          }
        ],
        description:
          'Hands-on workshop covering modern design principles and tools. Learn from industry experts as they share their experiences and techniques for creating stunning designs. This workshop will cover topics such as color theory, typography, layout design, user experience principles, and design thinking methodology. Participants will work on real-world projects and receive personalized feedback from instructors. All materials will be provided.',
        tags: ['Design', 'UI/UX', 'Workshop'],
        dressCode: 'Smart Casual',
        ageRestriction: '16+',
      },
      {
        title: 'Marketing Seminar',
        type: 'Offline',
        date: new Date('2023-08-15'),
        time: '10:00 AM - 12:00 PM',
        image: 'https://picsum.photos/seed/marketsem/400/300.jpg',
        hostedBy: 'Marketing Experts',
        venue: 'Marketing City',
        address: '789 Marketing Avenue, City',
        ticketPrice: 3000,
        speakers: [
          { 
            name: 'Sarah Johnson', 
            title: 'Market Manager',
            image: 'https://picsum.photos/seed/sarah/200/200.jpg'
          },
          { 
            name: 'Michael Brown', 
            title: 'SEO Expert',
            image: 'https://picsum.photos/seed/michael/200/200.jpg'
          },
        ],
        description:
          'An insightful seminar on modern marketing strategies, SEO, and brand growth. This seminar will cover the latest trends in digital marketing, including social media marketing, content marketing, email marketing, and search engine optimization. Learn from industry experts as they share their strategies for building successful marketing campaigns. Participants will receive a certificate of completion and access to exclusive marketing resources.',
        tags: ['Marketing', 'SEO', 'Branding'],
        dressCode: 'Smart Casual',
        ageRestriction: '18 years and above',
      },
      {
        title: 'React Online Summit',
        type: 'Online',
        date: new Date('2023-09-20'),
        time: '02:00 PM - 06:00 PM GMT',
        image: 'https://picsum.photos/seed/reactsummit/400/300.jpg',
        hostedBy: 'React Community',
        ticketPrice: 0,
        speakers: [
          { 
            name: 'Dan Abramov', 
            title: 'Core React Team',
            image: 'https://picsum.photos/seed/dan/200/200.jpg'
          }
        ],
        description:
          'A free online summit covering the latest features and best practices in React. This virtual event will bring together React developers from around the world to learn about the latest developments in the React ecosystem. Topics include React hooks, context API, performance optimization, testing, and more. Join live Q&A sessions with React experts and connect with other developers in the community.',
        tags: ['React', 'JavaScript', 'Frontend', 'Online'],
        dressCode: 'Casual',
        ageRestriction: 'None',
      },
      {
        title: 'AI & Machine Learning Expo',
        type: 'Offline',
        date: new Date('2023-10-05'),
        time: '09:30 AM - 06:30 PM',
        image: 'https://picsum.photos/seed/aiexpo/400/300.jpg',
        hostedBy: 'AI Innovations Lab',
        venue: 'Tech Hub Convention Center',
        address: '321 Innovation Boulevard, Silicon Valley',
        ticketPrice: 250,
        speakers: [
          { 
            name: 'Dr. Emily Chen', 
            title: 'AI Research Director',
            image: 'https://picsum.photos/seed/emily/200/200.jpg'
          },
          { 
            name: 'Prof. James Wilson', 
            title: 'Machine Learning Expert',
            image: 'https://picsum.photos/seed/james/200/200.jpg'
          },
          { 
            name: 'Alex Kumar', 
            title: 'Deep Learning Engineer',
            image: 'https://picsum.photos/seed/alex/200/200.jpg'
          }
        ],
        description:
          'Explore the cutting-edge developments in artificial intelligence and machine learning at this comprehensive expo. Featuring keynote presentations, hands-on workshops, and an exhibition of the latest AI technologies. Learn about neural networks, natural language processing, computer vision, and ethical AI implementation. Network with leading researchers, developers, and business leaders in the AI field. This event is perfect for developers, data scientists, researchers, and business professionals interested in leveraging AI technology.',
        tags: ['AI', 'Machine Learning', 'Technology', 'Innovation'],
        dressCode: 'Business Casual',
        ageRestriction: '18+',
      },
      {
        title: 'Startup Pitch Night',
        type: 'Offline',
        date: new Date('2023-11-12'),
        time: '06:00 PM - 09:00 PM',
        image: 'https://picsum.photos/seed/startupnight/400/300.jpg',
        hostedBy: 'Entrepreneurship Hub',
        venue: 'Innovation Center',
        address: '567 Business Park Drive, Startup City',
        ticketPrice: 25,
        speakers: [
          { 
            name: 'Jessica Martinez', 
            title: 'Venture Capitalist',
            image: 'https://picsum.photos/seed/jessica/200/200.jpg'
          },
          { 
            name: 'David Lee', 
            title: 'Serial Entrepreneur',
            image: 'https://picsum.photos/seed/david/200/200.jpg'
          }
        ],
        description:
          'An exciting evening where innovative startups pitch their ideas to a panel of investors and industry experts. Watch as entrepreneurs showcase their groundbreaking business concepts and compete for funding opportunities. This event includes networking sessions where attendees can connect with founders, investors, and business mentors. Whether you\'re an aspiring entrepreneur, investor, or simply interested in the startup ecosystem, this event offers valuable insights into the world of innovation and business development.',
        tags: ['Startup', 'Entrepreneurship', 'Pitching', 'Networking'],
        dressCode: 'Business Casual',
        ageRestriction: '21+',
      }
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