// import userRoute from './routes/users.js';
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const likeRoute = require('./routes/likes');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/likes', likeRoute);

app.listen(PORT,()=>{
    console.log("Server Online");
})