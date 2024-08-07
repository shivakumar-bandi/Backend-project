const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.post('/', upload.single('image'), createArticle);
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.put('/:id', upload.single('image'), updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
