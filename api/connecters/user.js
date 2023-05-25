const db = require("../connect")
const jwt = require('jsonwebtoken')

const getUser = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const q = `SELECT * FROM users WHERE id = ?`;
    db.query(q, [userId],(err, data)=>{
        if(err) return res.status(500).json({error: err.message, sql: err.sql});
        const {password, ...rest} = data[0];
        console.log(rest);
        return res.status(200).json(rest);
    })
}

const updateUser = (req, res) => {

    const token  = req.cookies.access_token;
    if(!token) return res.status(403).json({error: 'Not Logged in'});

    jwt.verify(token,"keyyyyyyyyyyyyyy",(err, userInfo)=>{
        if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE users SET `name`=?,`city`=?,`website`=?,`cover_pic`=?, `ProfilePic`=? WHERE id=? ";
      const values = [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.cover_pic,
        req.body.ProfilePic,
        userInfo.id,
      ]
      console.log(values);
    db.query(
      q,
      values,
      (err, data) => {
        if (err) res.status(500).json(err);
        console.log(data);
       if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
    })  
}

module.exports = {
    getUser,
    updateUser 
};