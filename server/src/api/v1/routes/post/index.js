const express = require('express');
const router = express.Router();

const { uploadImage, uploadVideo, upload } = require('../../configs/cloudinary.config')

const PostController = require('../../controllers/post.controller');

router.get('/', PostController.getPosts)

router.post('/create', upload, PostController.create);
  
module.exports = router