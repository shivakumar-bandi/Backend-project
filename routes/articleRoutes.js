// routes/articleRoutes.js
const express = require('express');
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController');
const upload = require('../middleware/uploadMiddleware'); // Ensure this path is correct

const router = express.Router();

router.post('/', upload.single('image'), createArticle);
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.put('/:id', upload.single('image'), updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
