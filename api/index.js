const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const likeRoute = require('./routes/likes');
const relationshipRoute = require('./routes/relationships');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();
const app = express();
const PORT = 5000;
          
cloudinary.config({ 
    cloud_name:  process.env.CLOUD_NAME,
    api_key:  process.env.API_KEY,
    api_secret:  process.env.API_SECRET
});

app.use(express.json());
app.use(cors(
    {origin : ["https://real-social.onrender.com", "http://localhost:3000"], credentials: true}
));
app.use(cookieParser());

  
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "social_media_app",
        format: async (req, file) => file.mimetype.split("/")[1],
        public_id: (req, file) => 'file-' + Date.now()
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single('file'),(req,res)=>{
    const file = req.file;
    console.log(file);
    res.status(200).json(file.path);
})
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/likes', likeRoute);
app.use('/api/relationships', relationshipRoute);

app.listen(PORT,()=>{
    console.log("Server Online");
})