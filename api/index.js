const express = require('express');
const router = express.Router();
const app = express();
const mysql = require('mysql');

mysql.createConnection({
    host: 'localhost',
    
})
app.use(express.json());

app.listen(5000,()=>{
    console.log("Server Online");
})