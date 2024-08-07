const express = require('express');
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController');

const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Import the upload middleware correctly

router.post('/', upload.single('image'), createArticle);
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.put('/:id', upload.single('image'), updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
