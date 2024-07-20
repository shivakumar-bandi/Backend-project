const Article = require('../models/Article');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
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

const createArticle = async (req, res) => {
  try {
    console.log('Uploaded file:', req.file);
    const { title, content, author } = req.body;
    const image = req.file ? req.file.filename : '';

    const newArticle = new Article({
      title,
      content,
      author,
      image
    });

    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { upload, createArticle };
