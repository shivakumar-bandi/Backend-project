const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');
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

router.post('/', upload.single('image'), festivalController.createFestival);
router.get('/', festivalController.getAllFestivals);
router.get('/:id', festivalController.getFestivalById);
router.put('/:id', upload.single('image'), festivalController.updateFestival);
router.delete('/:id', festivalController.deleteFestival);

module.exports = router;
