// routes/festivalRoutes.js

const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');


const upload = require('../middleware/uploadMiddleware');

// POST /events - Create a new event
router.post('/events', upload.single('image'), eventController.createEvent); // Added middleware for file handling

// Create a new festival
router.post('/', festivalController.createFestival);

// Get all festivals
router.get('/', festivalController.getAllFestivals);

// Get festival by ID
router.get('/:id', festivalController.getFestivalById);

// Update festival by ID
router.put('/:id', festivalController.updateFestival);

// Delete festival by ID
router.delete('/:id', festivalController.deleteFestival);

module.exports = router;
