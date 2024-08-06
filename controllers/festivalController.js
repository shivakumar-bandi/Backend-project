const Festival = require('../models/Festival');
const path = require('path');
const fs = require('fs');

exports.createFestival = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const newFestival = new Festival({
      title,
      description,
      date,
      location,
      image: req.file ? req.file.filename : null
    });

    await newFestival.save();
    res.status(201).json(newFestival);
  } catch (err) {
    console.error('Error creating festival:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find();
    res.json(festivals);
  } catch (err) {
    console.error('Error fetching festivals:', err);
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
    console.error('Error fetching festival:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateFestival = async (req, res) => {
  try {
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
    console.error('Error updating festival:', err);
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
    console.error('Error deleting festival:', err);
    res.status(500).json({ error: err.message });
  }
};
