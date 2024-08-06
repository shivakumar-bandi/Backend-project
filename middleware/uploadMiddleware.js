const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append file extension
  }
});

const upload = multer({ storage: storage });

module.exports =upload;
