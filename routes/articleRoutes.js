const express = require('express');
const router = express.Router();
const { upload, createArticle, updateArticle, deleteArticle, getArticle, getAllArticles } = require('../controllers/articleController');

const upload = require('../middleware/uploadMiddleware');


router.post('/', upload.single('image'), createArticle);
router.put('/:id', upload.single('image'), updateArticle);
router.delete('/:id', deleteArticle);
router.get('/:id', getArticle);
router.get('/', getAllArticles);

module.exports = router;
