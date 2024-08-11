// controllers/articleController.js
const Article = require('../models/Article');

const createArticle = async (req, res) => {
  const { title, content, author } = req.body;
  const image = req.file ? `${req.file.filename}` : '';

  console.log('Creating article with image:', image);

  try {
    const article = new Article({
      title,
      content,
      author,
      image
    });

    const createdArticle = await article.save();
    console.log('Article created successfully:', createdArticle);
    res.status(201).json(createdArticle);
  } catch (error) {
    console.error('Error creating article:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    console.log('Fetched all articles:', articles);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      console.warn('Article not found with ID:', id);
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    console.log('Fetched article by ID:', article);
    res.json(article);
  } catch (error) {
    console.error('Error fetching article by ID:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const image = req.file ? `${req.file.filename}` : '';

  console.log('Updating article with image:', image);

  try {
    const article = await Article.findById(id);

    if (!article) {
      console.warn('Article not found with ID:', id);
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    article.title = title;
    article.content = content;
    article.author = author;
    if (image) {
      article.image = image;
    }

    const updatedArticle = await article.save();
    console.log('Article updated successfully:', updatedArticle);
    res.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Article.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      console.warn('No article found to delete with ID:', id);
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    console.log('Article deleted successfully with ID:', id);
    res.json({ message: 'Article removed' });
  } catch (error) {
    console.error('Error deleting article:', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
