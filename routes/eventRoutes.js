// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


// POST /events - Create a new event
router.post('/events', eventController.createEvent);

// GET /events - Retrieve all events
router.get('/events', eventController.getAllEvents);

// GET /events/:id - Retrieve a single event by ID
router.get('/events/:id', eventController.getEventById);

// PUT /events/:id - Update an event by ID
router.put('/events/:id', eventController.updateEvent);

// DELETE /events/:id - Delete an event by ID
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
