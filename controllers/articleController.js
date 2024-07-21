const Article = require('../models/Article');
const multer = require('multer');
const path = require('path');

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
    const { title, content, author } = req.body;
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

    const updatedArticle = await Article.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
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
