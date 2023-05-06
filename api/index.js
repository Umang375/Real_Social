// import userRoute from './routes/users.js';
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const likeRoute = require('./routes/likes');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();
const PORT = 5000;

// app.use((res,req,next)=>{
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// })
app.use(express.json());
app.use(cors(
    {origin : "http://localhost:3000", credentials: true}
));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../social_media_app/public/uploads')
    },

    // also to avoid name conflicts
    filename: function (req, file, cb) {
        //we can use the below to generate a complex name for the file
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)

    //for simple and original names i am gonna use the below
    // cb(null, Date.now() + file.originalname);
    cb(null,  new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage })

app.post("/api/upload", upload.single('file'),(req,res)=>{
    const file = req.file;
    res.status(200).json(file.filename);
})
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/likes', likeRoute);

app.listen(PORT,()=>{
    console.log("Server Online");
})