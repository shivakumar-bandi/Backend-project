const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    required: false
  }
});

// Adding an index on the title for faster searches
ArticleSchema.index({ title: 1 });

module.exports = mongoose.model('Article', ArticleSchema);
