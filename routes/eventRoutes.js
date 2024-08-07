const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { upload } = require('../middleware/uploadMiddleware'); // Destructure import

router.post('/', upload.single('image'), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', upload.single('image'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
