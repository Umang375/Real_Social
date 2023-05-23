const db = require("../connect")

const getUser = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const q = `SELECT * FROM users WHERE id = ?`;
    db.query(q, [userId],(err, data)=>{
        if(err) return res.status(500).json({error: err.message, sql: err.sql});
        const {password, ...rest} = data[0];
        return res.status(200).json(rest);
    })
}

module.exports = {
    getUser 
};