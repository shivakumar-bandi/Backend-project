const Article = require('../models/Article');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import fs

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
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required.' });
    }

    const image = req.file ? req.file.filename : '';
    const newArticle = new Article({ title, content, author, image });
    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedFields = { title, content, author };
    if (image) updatedFields.image = image;

    const oldArticle = await Article.findById(id);
    if (!oldArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (oldArticle.image && fs.existsSync(path.join('uploads', oldArticle.image)) && image) {
      fs.unlink(path.join('uploads', oldArticle.image), err => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    if (deletedArticle.image) {
      const imagePath = path.join('uploads', deletedArticle.image);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, err => {
          if (err) console.error('Error deleting image:', err);
        });
      }
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { upload, createArticle, updateArticle, deleteArticle, getArticle, getAllArticles };
