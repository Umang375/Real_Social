const db = require('../connect')
const jwt = require('jsonwebtoken')

const getRelationship=(req, res) =>{
        const q = "SELECT followerUserId FROM relationships WHERE followedUserId=?";
        db.query(q, [req.query.followedUserId], (err, data)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            console.log(data)
            return res.status(200).json(data.map((relationship=>relationship.followerUserId)));
        })
}

const addRelationship = (req, res)=>{
    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,process.env.SECERT_KEY,(err, userInfo)=>{
        if(err) return res.status(401).json({error: 'Unauthorized'});

        //get all the posts from the users that the user follows
        const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.userId
        ];
        db.query(q, [values], (err, result)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json({message: 'Relationship Added'});
        })

    })
}

const deleteRelationship = (req, res)=>{
    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,process.env.SECERT_KEY,(err, userInfo)=>{
        if(err) return res.status(401).json({error: 'Unauthorized'});
        
        const q = "DELETE FROM relationships WHERE `followerUserId` =? AND `followedUserId`=?";
        db.query(q, [userInfo.id,req.query.userId], (err, result)=>{
            if(err) return res.status(500).json({error: err.message, sql: err.sql});
            return res.status(200).json({message: 'Unfollowed'});
        })

    })
}

module.exports = {getRelationship, addRelationship, deleteRelationship}