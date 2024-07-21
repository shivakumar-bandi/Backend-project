// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Routes for managing events
router.post('/events', eventController.createEvent); // Remove authMiddleware
router.get('/events', eventController.getEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', eventController.updateEvent); // Remove authMiddleware
router.delete('/events/:id', eventController.deleteEvent); // Remove authMiddleware

module.exports = router;
