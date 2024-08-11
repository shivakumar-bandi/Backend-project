// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directory where files will be uploaded
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);  // Create the directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Saving image to uploads directory');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    console.log('Generated filename:', filename);
    cb(null, filename);  // Use timestamp for unique filenames
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
