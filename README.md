# MeetUp Events — Backend API

A RESTful backend API for the MeetUp Events app.
Built with **Node.js**, **Express 5**, and **MongoDB (Mongoose)** — deployed on **Vercel**.

---

## 🔗 Live API

**Base URL:** `https://meet-up-back.vercel.app/`

**Health Check:** `GET /api/health` → `{ "status": "OK" }`

---

## ⚡ Quick Start

```bash
git clone https://github.com/BrundaRachutaiah/MeetUp-Back.git
cd MeetUp-Back
npm install
```

Start the server:

```bash
node index.js
```

Server runs at `http://localhost:5000`

---

## 🛠️ Technologies

| Layer      | Tech                        |
|------------|-----------------------------|
| Runtime    | Node.js                     |
| Framework  | Express 5                   |
| Database   | MongoDB + Mongoose 8        |
| Config     | dotenv                      |
| CORS       | cors                        |
| Deployment | Vercel (`@vercel/node`)     |

---

## 📁 Project Structure

```
MeetUp-Back-main/
├── controllers/
│   └── eventController.js   # All business logic (CRUD + seed)
├── db/
│   └── db.connect.js        # MongoDB connection setup
├── models/
│   └── event.model.js       # Mongoose schema & model
├── routes/
│   └── event.js             # Route definitions
├── index.js                 # Entry point — Express app setup
├── vercel.json              # Vercel deployment config
└── package.json
```

---

## 🌐 API Reference

### `GET /api/events`
Returns all events, sorted by date (ascending).

**Query Parameters (optional):**

| Param    | Type   | Description                              |
|----------|--------|------------------------------------------|
| `type`   | String | Filter by `Online`, `Offline`, or `Both` |
| `search` | String | Search by title, tags, or host name      |

**Sample Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "abc123",
      "title": "React Online Summit",
      "type": "Online",
      "date": "2023-09-20T00:00:00.000Z",
      "time": "02:00 PM - 06:00 PM GMT",
      "hostedBy": "React Community",
      "ticketPrice": 0,
      "tags": ["React", "JavaScript", "Frontend"],
      "dressCode": "Casual",
      "ageRestriction": "None"
    }
  ]
}
```

---

### `GET /api/events/:id`
Returns a single event by its MongoDB ID.

**Sample Response:**
```json
{
  "success": true,
  "data": {
    "_id": "abc123",
    "title": "Tech Conference 2023",
    "type": "Offline",
    "venue": "Convention Center",
    "address": "123 Main St, Tech City",
    "speakers": [
      { "name": "Alice Future", "title": "CEO of Tomorrow", "image": "https://..." }
    ],
    "description": "Join us for a full-day conference...",
    "tags": ["Technology", "Networking"],
    "dressCode": "Business Formal",
    "ageRestriction": "18+"
  }
}
```

---

### `POST /api/events`
Creates a new event.

**Request Body:**
```json
{
  "title": "AI Meetup",
  "type": "Online",
  "date": "2025-12-15",
  "time": "6:00 PM - 8:00 PM",
  "image": "https://example.com/image.jpg",
  "hostedBy": "AI Club",
  "ticketPrice": 0,
  "speakers": [
    { "name": "John Smith", "title": "AI Researcher", "image": "https://..." }
  ],
  "description": "An online meetup on AI trends.",
  "tags": ["AI", "Machine Learning"],
  "dressCode": "Casual",
  "ageRestriction": "None"
}
```

> **Note:** `venue` and `address` are **required** when `type` is `"Offline"`.

**Sample Response:**
```json
{
  "success": true,
  "data": {
    "_id": "xyz789",
    "title": "AI Meetup",
    "type": "Online",
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

---

### `PUT /api/events/:id`
Updates an existing event by ID. Pass only the fields you want to update.

**Sample Response:**
```json
{
  "success": true,
  "data": { "_id": "abc123", "title": "Updated Title", "..." }
}
```

---

### `DELETE /api/events/:id`
Deletes an event by ID.

**Sample Response:**
```json
{
  "success": true,
  "data": {}
}
```

---

### `POST /api/events/seed`
Seeds the database with 6 sample events (clears existing data first). Useful for development and testing.

**Sample Response:**
```json
{
  "success": true,
  "data": [ { "..." }, { "..." } ]
}
```

---

## 🗃️ Event Schema

| Field            | Type       | Required             | Notes                                      |
|------------------|------------|----------------------|--------------------------------------------|
| `title`          | String     | ✅ Yes               |                                            |
| `type`           | String     | ✅ Yes               | `"Online"` or `"Offline"`                 |
| `date`           | Date       | ✅ Yes               |                                            |
| `time`           | String     | ✅ Yes               | e.g. `"10:00 AM - 12:00 PM"`              |
| `image`          | String     | ✅ Yes               | URL to event image                         |
| `hostedBy`       | String     | ✅ Yes               |                                            |
| `venue`          | String     | ✅ If Offline        |                                            |
| `address`        | String     | ✅ If Offline        |                                            |
| `ticketPrice`    | Number     | ✅ Yes               | Min: `0` (free events)                    |
| `speakers`       | Array      | —                    | `[{ name, title, image }]`                |
| `description`    | String     | ✅ Yes               |                                            |
| `tags`           | [String]   | ✅ Yes               | At least one tag required                 |
| `dressCode`      | String     | —                    | Default: `"Casual"`                       |
| `ageRestriction` | String     | —                    | Default: `"None"`                         |
| `createdAt`      | Date       | —                    | Auto-set on creation                      |

---

## 🚀 Deployment (Vercel)

This project is configured for Vercel via `vercel.json`. All routes are handled by `index.js`.

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "rewrites": [{ "source": "/(.*)", "destination": "index.js" }]
}
```

To deploy:
```bash
npm install -g vercel
vercel
```

Add `MONGO_URI` as an environment variable in your Vercel project settings.

---

## 📬 Contact

For bugs or feature requests, please open an issue or reach out at: `brundadr315@gmail.com`
