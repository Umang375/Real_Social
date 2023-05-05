const express = require('express');
const router = express.Router();
const {getPosts} = require("../connecters/post");

router.get('/', getPosts )

module.exports = router;