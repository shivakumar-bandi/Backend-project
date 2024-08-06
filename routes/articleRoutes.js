const express = require('express');
const router = express.Router();
const { createArticle, updateArticle, deleteArticle, getArticle, getAllArticles } = require('../controllers/articleController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('file'), createArticle);
router.put('/:id', upload.single('file'), updateArticle);
router.delete('/:id', deleteArticle);
router.get('/:id', getArticle);
router.get('/', getAllArticles);

module.exports = router;
