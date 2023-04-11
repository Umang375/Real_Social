import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useContext, useState } from "react"
import "./login.scss"

const Login = () => {

  const [inputs, setInputs] = useState({
    username : "",
    password : "",
  })
  
  const [error, setErr] = useState(null)
  const navigate = useNavigate();
  
  const handleChange = (e) =>{
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}))
  };

  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/");
    }catch(error){
      setErr(error.response.data);
      setTimeout(() => {
        setErr(null);
      }, 2000);
    }
  }
  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello User !!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint vero natus dolor nam sunt nostrum dolorem voluptate reprehenderit iste corrupti.
          </p>
          <span>No account? Connect with your friends right away</span>
          <Link to ="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {error && <p>{error.message}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
