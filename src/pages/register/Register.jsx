import { Link } from "react-router-dom"
import "./register.scss"

const Register = () => {
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
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Name" />
                <button>Register</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
