const express = require('express');
const router = express.Router();
const {getUser : fetchUser, updateUser } = require("../connecters/user");

router.get('/find/:userId', fetchUser)
router.put('/', updateUser)

module.exports = router;

// export default router;
// use this when you are using ES6/ type is module