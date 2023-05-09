const express = require('express');
const router = express.Router();
const {getComments, addComment} = require("../connecters/comment");

router.get("/", getComments);
router.post("/", addComment);

module.exports = router;