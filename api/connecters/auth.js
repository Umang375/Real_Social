const db = require('../connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) =>{
    //check if the user already exists
    const q = 'SELECT * FROM users WHERE username = ?';
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
    const q = 'SELECT * FROM users WHERE username = ?';
    db.query(q,[req.body.username], (err, data)=>{
        if(err) return res.status(500).json(err);
        if(!data.length) return res.status(404).json({message: "User not found"});
        //check if the password is correct
        const validPass = bcrypt.compareSync(req.body.password, data[0].password);
        if(!validPass) return res.status(401).json({message: "Invalid password"});

        const token = jwt.sign({id:data[0].id}, process.env.SECERT_KEY);

        const {password, ...user} = data[0];
        //direct json the user will also send the hashed password so here i will try to sep th password and send the rest of the data

        res.cookie("access_token", token, {httpOnly: true, sameSite: 'none', secure: true})
        .status(200)
        .json(user);
        //might break test necessary
    })
} 

const logout = (req, res) =>{
    res.clearCookie("access_token", {
        secure: true,
        sameSite: "none"
    }).status(200).json({message: "Logout successful"});
}

module.exports ={
    login,
    register,
    logout
}