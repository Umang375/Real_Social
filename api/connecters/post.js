const moment = require('moment/moment');
const db = require('../connect');
const jwt = require('jsonwebtoken');

const getPosts = (req, res) => {

    const userId = req.query.userId;
    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,"keyyyyyyyyyyyyyy",(err, userInfo)=>{
        if(err) return res.status(401).json({error: 'Unauthorized'});

        //get all posts of the user with when veiwing his profile
        const q =( userId !== "undefined") ? 'SELECT p.*, u.id AS user_id, name, ProfilePic FROM post AS p JOIN users AS u ON (p.user_id = u.id) WHERE p.user_id =?  ORDER BY p.dateTime DESC': 'SELECT p.*, u.id AS user_id, name, ProfilePic FROM post AS p JOIN users AS u ON (p.user_id = u.id) LEFT JOIN relationships AS r ON (p.user_id = r.followedUserId) WHERE r.followerUserId=? OR p.user_id=? ORDER BY p.dateTime DESC';

        const values = (userId !== "undefined") ? [userId]: [userInfo.id, userInfo.id]

        db.query(q, values , (err, result)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json(result);
        })

    })  
}

const addPost = (req, res) => {

    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,"keyyyyyyyyyyyyyy",(err, userInfo)=>{
        if(err) return res.status(401).json({error: 'Unauthorized'});

        //get all the posts from the users that the user follows
        const q = "INSERT INTO post (`desc`, `img`, `user_id`, `dateTime`) VALUES (?)";
        
        const values = [
            req.body.desc, 
            req.body.img, 
            userInfo.id,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')];
        db.query(q, [values], (err, result)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json({message: 'Post added successfully'});
        })

    })  
}

module.exports ={
    getPosts,
    addPost
}