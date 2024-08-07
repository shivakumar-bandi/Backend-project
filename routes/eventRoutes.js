// routes/eventRoutes.js
const express = require('express');
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const upload = require('../middleware/uploadMiddleware'); // Ensure this path is correct

const router = express.Router();

router.post('/', upload.single('image'), createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
