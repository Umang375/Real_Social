// import userRoute from './routes/users.js';
const userRoute = require('./routes/users');
const express = require('express');
// const router = express.Router();
const app = express();
const mysql = require('mysql');
const PORT = 5000;

mysql.createConnection({
    host: 'localhost',
    name: 'root',
    password: 'Ujain7315@',
    database: 'test'
})
app.use(express.json());

app.use('/api/users', userRoute);

app.listen(PORT,()=>{
    console.log("Server Online");
})