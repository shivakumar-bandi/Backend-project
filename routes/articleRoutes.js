const express = require('express');
const router = express.Router();
const { upload, createArticle, updateArticle, deleteArticle, getArticle, getAllArticles } = require('../controllers/articleController');

router.post('/articles', upload.single('image'), createArticle);
router.put('/articles/:id', upload.single('image'), updateArticle);
router.delete('/articles/:id', deleteArticle);
router.get('/articles/:id', getArticle);
router.get('/articles', getAllArticles);

module.exports = router;
