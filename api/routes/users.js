const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();

router.get('/test',(req,res) =>{
    res.send("Hello World");
})

module.exports = router;

// export default router;
// use this when you are using ES6/ type is module