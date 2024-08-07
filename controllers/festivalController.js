const Festival = require('../models/Festival');

const createFestival = async (req, res) => {
  const { title, description, date, location } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const festival = new Festival({
      title,
      description,
      date,
      location,
      image
    });

    const createdFestival = await festival.save();
    res.status(201).json(createdFestival);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find();
    res.json(festivals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFestivalById = async (req, res) => {
  const { id } = req.params;

  try {
    const festival = await Festival.findById(id);

    if (!festival) {
      res.status(404).json({ message: 'Festival not found' });
      return;
    }

    res.json(festival);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFestival = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  try {
    const festival = await Festival.findById(id);

    if (!festival) {
      res.status(404).json({ message: 'Festival not found' });
      return;
    }

    festival.title = title;
    festival.description = description;
    festival.date = date;
    festival.location = location;
    festival.image = image;

    const updatedFestival = await festival.save();
    res.json(updatedFestival);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFestival = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Festival.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Festival not found' });
      return;
    }

    res.json({ message: 'Festival removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createFestival,
  getAllFestivals,
  getFestivalById,
  updateFestival,
  deleteFestival
};
