const express = require('express');
const router = express.Router();
const {getRelationship, addRelationship, deleteRelationship} = require("../connecters/relationship");

router.get('/', getRelationship)
router.post('/', addRelationship)
router.delete('/', deleteRelationship)

module.exports = router;