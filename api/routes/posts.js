const express = require('express');
const router = express.Router();
const {getPosts, addPost} = require("../connecters/post");

router.get('/', getPosts );
router.post('/', addPost);

module.exports = router;