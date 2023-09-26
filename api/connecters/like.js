const db = require('../connect')
const jwt = require('jsonwebtoken')

const getLikes=(req, res) =>{
        //get all the likes from the post that the user follows or post
        const q = "SELECT user_id FROM likes WHERE post_id=?";
        db.query(q, [req.query.post_id], (err, data)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json(data.map((like=>like.user_id)));
        })
}

const addLike = (req, res)=>{
    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,process.env.SECERT_KEY,(err, userInfo)=>{
        if(err) return res.status(401).json({error: 'Unauthorized'});

        //get all the posts from the users that the user follows
        const q = "INSERT INTO likes (`user_id`, `post_id`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.post_id
        ];
        db.query(q, [values], (err, result)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json({message: 'Post liked successfully'});
        })

    })
}

const deleteLike = (req, res)=>{
    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,process.env.SECERT_KEY,(err, userInfo)=>{
        if(err) return res.status(401).json({error: 'Unauthorized'});

        //get all the posts from the users that the user follows
        const q = "DELETE FROM likes wHERE `user_id` =? AND `post_id`=?";
        db.query(q, [userInfo.id,req.query.post_id], (err, result)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json({message: 'Like Removed'});
        })

    })
}

module.exports = {getLikes, addLike, deleteLike}