const express = require('express');
const router = express.Router();

const {uploadImage} = require('../../configs/cloudinary.config')

const PostController = require('../../controllers/post.controller');

router.get('/', PostController.getPosts)

router.post('/create', [uploadImage.array('images', 10)], PostController.create)

module.exports = router