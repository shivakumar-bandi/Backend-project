const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), createArticle);
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.put('/:id', upload.single('image'), updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
