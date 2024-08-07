const express = require('express');
const { upload, uploadToS3 } = require('../middleware/uploadMiddleware'); // Use destructuring for named exports
const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.post('/', upload.single('image'), uploadToS3, createArticle); // Use uploadToS3 if you need to upload to S3
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.put('/:id', upload.single('image'), uploadToS3, updateArticle); // Use uploadToS3 if you need to upload to S3
router.delete('/:id', deleteArticle);

module.exports = router;
