const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), (req, res) => {
    try {
      console.log('File uploaded:', req.file);
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file' });
    }
  });
  

router.get('/', festivalController.getAllFestivals);
router.get('/:id', festivalController.getFestivalById);
router.put('/:id', upload.single('image'), festivalController.updateFestival);
router.delete('/:id', festivalController.deleteFestival);

module.exports = router;
