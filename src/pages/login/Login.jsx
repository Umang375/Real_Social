import { Link } from "react-router-dom"
import "./login.scss"

const Login = () => {
  return (
    <div className='login'>
      <div className="card">
        <div className="left">
            <h1>Hello User !!</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint vero natus dolor nam sunt nostrum dolorem voluptate reprehenderit iste corrupti.
            </p>
            <span>No account? Connect with your friends right away</span>
            <Link to = "/register">
            <button>Register</button>
            </Link>
        </div>
        <div className="right">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
