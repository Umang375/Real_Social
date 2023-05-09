const db = require("../connect");
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");

const getComments = (req,res)=>{
        const q = 'SELECT c.*, u.id AS user_id, name, ProfilePic FROM comments AS c JOIN users AS u ON (u.id=c.user_id)  WHERE c.post_id=? ORDER BY c.createdAt DESC';

    db.query(q, [req.query.post_id], (err, data)=>{
        if(err){
            return res.status(500).json({message: "Error retrieving comments", error: err});
        }
        // console.log the req.query.post_id
        // console.log(JSON.stringify(req.query.post_id))
        console.log(data);
        return res.status(200).json(data);
    })
}

const addComment = (req, res) => {

    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,"keyyyyyyyyyyyyyy",(err, userInfo)=>{
        if(err) return res.status(401).json({error: 'Unauthorized'});

        //get all the posts from the users that the user follows
        const q = "INSERT INTO comments (`desc`, `createdAt`, `user_id`, `post_id`) VALUES (?)";
        // const post_id = parseInt(req.body.post_id.post_id);
        const values = [
            req.body.desc, 
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id,
            req.body.post_id
        ];

        console.log(values);
        db.query(q, [values], (err, result)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json({message: 'Comment added successfully'});
        })

    })  
}

module.exports = {
    getComments,
    addComment
}