const express = require('express');
const router = express.Router();
const { createArticle, updateArticle, deleteArticle, getArticle, getAllArticles } = require('../controllers/articleController');
const upload = require('../middleware/uploadMiddleware');

// Route for creating an article
router.post('/', upload.single('image'), (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    createArticle(req, res);
  });
  
  router.put('/:id', upload.single('image'), (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    updateArticle(req, res);
  });
router.delete('/:id', deleteArticle);
router.get('/:id', getArticle);
router.get('/', getAllArticles);

module.exports = router;
