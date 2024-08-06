const Festival = require('../models/Festival');
const fs = require('fs');
const path = require('path');

exports.createFestival = async (req, res) => {
  try {
    console.log('Uploaded file:', req.file);
    console.log('Request body:', req.body);

    const { title, description, date, location } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const newFestival = new Festival({
      title,
      description,
      date: parsedDate,
      location,
      image: req.file ? req.file.filename : null
    });

    await newFestival.save();
    res.status(201).json(newFestival);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find();
    res.json(festivals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.updateFestival = async (req, res) => {
  try {
    console.log('Uploaded file:', req.file);
    console.log(req.body); 
    
    const { title, description, date, location } = req.body;
    const updateData = {
      title,
      description,
      date,
      location
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedFestival = await Festival.findByIdAndUpdate(
      req.params.id,
      updateData,
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
