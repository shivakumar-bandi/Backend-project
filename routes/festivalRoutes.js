const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), festivalController.createFestival);
  
router.get('/', festivalController.getAllFestivals);
router.get('/:id', festivalController.getFestivalById);
router.put('/:id', upload.single('image'), festivalController.updateFestival);
router.delete('/:id', festivalController.deleteFestival);

module.exports = router;
