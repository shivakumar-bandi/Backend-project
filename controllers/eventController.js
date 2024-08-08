const Event = require('../models/Event');

const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  const image = req.file ? `${req.file.filename}` : '';

  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      image
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  const image = req.file ? `${req.file.filename}` : req.body.image;

  try {
    const event = await Event.findById(id);

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
   if(image){
    event.image = image;
   }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Event.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
