const db = require('../connect');
const bcrypt = require('bcrypt');

const register = (req, res) =>{
    //check if the user already exists
    const q = 'SELECT FROM users WHERE username = ?';
    db.query(q,[req.body.username],(err, data)=>{
        if(err) return res.status(500).send(err);
        if(data.length) return res.status(409).json({message: "User already exists"});
        //if not, create a new user
        const salt = bcrypt.genSaltSync(10);
        const hPass = bcrypt.hashSync(req.body.password, salt);
        const q2 = 'INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?, ?, ?, ?)';

        db.query(q2, [req.body.username, req.body.email, hPass, req.body.name], (err, data)=>{
            if(err) return res.status(500).json(err);

            res.status(201).json({message: "User created successfully"});
        })
    })
}

const login = (req, res) =>{
    res.send("login method");
} 

const logout = (req, res) =>{
    res.send("logout method");
}

module.exports ={
    login,
    register,
    logout
}