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
    console.log('Saving file to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log('Generated filename:', filename);
    cb(null, Date.now() + path.extname(file.originalname)); // Append file extension
  }
});

const upload = multer({ storage: storage });

module.exports =upload;
