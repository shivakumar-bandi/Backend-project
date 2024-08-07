const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

// Initialize the S3 client with credentials from .env
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Define storage for multer to use S3
const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const filename = `${Date.now()}${path.extname(file.originalname)}`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
