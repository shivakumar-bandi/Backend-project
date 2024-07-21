// routes/festivalRoutes.js

const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');
const upload = require('../middleware/uploadMiddleware');


router.post('/festival',upload.single('image'), festivalController.createFestival);
router.get('/festival', festivalController.getAllFestivals);
router.get('/festival/:id', festivalController.getFestivalById);
router.put('/festival/:id',upload.single('image'), festivalController.updateFestival);
router.delete('/festival/:id', festivalController.deleteFestival);

module.exports = router;
