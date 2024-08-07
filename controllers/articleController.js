const Article = require('../models/Article');

const createArticle = async (req, res) => {
  const { title, content, author } = req.body;
  const image = req.file ? req.file.location : ''; // S3 URL

  console.log('Image URL:', image);  // Log the image URL

  try {
    const article = new Article({
      title,
      content,
      author,
      image
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const image = req.file ? req.file.location : ''; // S3 URL

  try {
    const article = await Article.findById(id);

    if (!article) {
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
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    await article.remove();
    res.json({ message: 'Article removed' });
  } catch (error) {
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
