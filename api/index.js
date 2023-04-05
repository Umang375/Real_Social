// import userRoute from './routes/users.js';
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const likeRoute = require('./routes/likes');

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

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/likes', likeRoute);

app.listen(PORT,()=>{
    console.log("Server Online");
})