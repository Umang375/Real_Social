const login = (req, res) =>{
    res.send("login method");
} 

const register = (req, res) =>{
    res.send("register method");
}

const logout = (req, res) =>{
    res.send("logout method");
}

module.exports ={
    login,
    register,
    logout
}