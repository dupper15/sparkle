const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'image_Sparkle',
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  },
});

const Multer = multer({ storage });

module.exports = Multer;
