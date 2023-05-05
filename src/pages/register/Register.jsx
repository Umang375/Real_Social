import { Link } from "react-router-dom"
import "./register.scss"
import { useState} from "react"
import { useNavigate } from "react-router-dom" 
import axios from "axios"

const Register = () => {

  const [inputs, setInputs] = useState({
    username : "",
    email : "",
    password : "",
    name:""
  })

  const [error, setErr] = useState(null)
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}))
  };

  const handleClick = async (e)=>{
    e.preventDefault();

    try{
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      navigate("/login");
    } catch(error){
      setErr(error.response.data);
      setTimeout(() => {
        setErr(null);
      }, 2000);
    }
  };
console.log(error);
  return (
    <div className='register'>
      <div className="card">
        <div className="left">
            <h1>Real Social.</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint vero natus dolor nam sunt nostrum dolorem voluptate reprehenderit iste corrupti.
            </p>
            <span>Have a Account? Login Right away</span>
            <Link to = "/login">
              <button>Login</button>
            </Link>
        </div>
        <div className="right">
            <h1>Register</h1>
            <form>
                <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                {error && <p>{error.message}</p>}
                <button onClick={handleClick}>Register</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
