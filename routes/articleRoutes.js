const express = require('express');
const router = express.Router();
const { upload, createArticle } = require('../controllers/articleController');

router.post('/articles', upload.single('image'), createArticle);

module.exports = router;
