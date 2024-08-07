// routes/festivalRoutes.js
const express = require('express');
const { createFestival, getAllFestivals, getFestivalById, updateFestival, deleteFestival } = require('../controllers/festivalController');
const upload = require('../middleware/uploadMiddleware'); // Ensure this path is correct

const router = express.Router();

router.post('/', upload.single('image'), createFestival);
router.get('/', getAllFestivals);
router.get('/:id', getFestivalById);
router.put('/:id', upload.single('image'), updateFestival);
router.delete('/:id', deleteFestival);

module.exports = router;
