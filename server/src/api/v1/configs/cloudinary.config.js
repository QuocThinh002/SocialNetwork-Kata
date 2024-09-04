const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
// require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Storage cho ảnh
const imageStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'Kata/images',
    resource_type: 'image', // Chỉ định là image
  }
});

// Storage cho video
const videoStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['mp4', 'mkv', 'avi'],
  params: {
    folder: 'Kata/videos',
    resource_type: 'video',  // Chỉ định là video
  }
});

const uploadToCloudinary = async (imageBuffer) => {
  try {
    const base64String = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`; // Convert Buffer to base64 string
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'Kata/images'
    });
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};


const uploadImage = multer({ storage: imageStorage });
const uploadVideo = multer({ storage: videoStorage });

module.exports = { uploadImage, uploadVideo, uploadToCloudinary };

