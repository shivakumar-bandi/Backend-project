// controllers/festivalController.js

const Festival = require('../models/Festival');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
exports.createFestival = async (req, res) => {
    try {
        console.log('Uploaded file:', req.file);
        console.log(req.body); // Add this line to inspect req.body
        const { title, description, date, location, image } = req.body;
        const newFestival = new Festival({
            title,
            description,
            date,
            location,
            image,
        });
        await newFestival.save();
        res.status(201).json(newFestival);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all festivals
exports.getAllFestivals = async (req, res) => {
    try {
        const festivals = await Festival.find();
        res.json(festivals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get festival by ID
exports.getFestivalById = async (req, res) => {
    try {
        const festival = await Festival.findById(req.params.id);
        if (!festival) {
            return res.status(404).json({ error: 'Festival not found' });
        }
        res.json(festival);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update festival by ID
exports.updateFestival = async (req, res) => {
    try {
        const { title, description, date, location, image } = req.body;
        const updatedFestival = await Festival.findByIdAndUpdate(
            req.params.id,
            { title, description, date, location, image },
            { new: true }
        );
        if (!updatedFestival) {
            return res.status(404).json({ error: 'Festival not found' });
        }
        res.json(updatedFestival);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete festival by ID
exports.deleteFestival = async (req, res) => {
    try {
        const deletedFestival = await Festival.findByIdAndDelete(req.params.id);
        if (!deletedFestival) {
            return res.status(404).json({ error: 'Festival not found' });
        }
        res.json({ message: 'Festival deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
