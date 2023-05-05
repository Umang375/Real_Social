const db = require('../connect');
const jwt = require('jsonwebtoken');

const getPosts = (req, res) => {

    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,"keyyyyyyyyyyyyyy",(err, userInfo)=>{
        if(err) return res.status(401).json({error: 'Unauthorized'});

        //get all the posts from the users that the user follows
        const q = 'SELECT p.*, u.id AS user_id, name, ProfilePic FROM post AS p JOIN users AS u ON (p.user_id = u.id) LEFT JOIN relationships AS r ON (p.user_id = r.followedUserId) WHERE r.followerUserId=? OR p.user_id=? ORDER BY p.dateTime DESC';
    
        db.query(q, [userInfo.id, userInfo.id], (err, result)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json(result);
    })

    })  
}

module.exports ={
    getPosts
}