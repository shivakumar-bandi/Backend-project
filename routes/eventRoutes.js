const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', upload.single('image'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
