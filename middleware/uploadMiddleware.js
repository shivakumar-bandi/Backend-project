const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Saving file to:', uploadDir);  // Log the destination directory
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}${path.extname(file.originalname)}`;
    console.log('Generated filename:', filename);  // Log the filename
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
