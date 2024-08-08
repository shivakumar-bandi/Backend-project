const Article = require('../models/Article');

const createArticle = async (req, res) => {
  const { title, content, author } = req.body;
  const image = req.file ? `${req.file.filename}` : '';

  console.log('Creating article with image:', image); // Add this line

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
  const image = req.file ? `${req.file.filename}` : '';

  console.log('Updating article with image:', image); // Add this line

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
    const result = await Article.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

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
