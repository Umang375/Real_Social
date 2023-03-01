import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Link } from 'react-router-dom';
import './Navbar.scss'


const Navbar = () => {
  return (
    <div className='navBar'>
        <div className="left">
          <Link to = "/" style={{textDecoration : "none"}}>
          <span>
          Real Social
          </span>
          </Link>
          <HomeOutlinedIcon/>
          <DarkModeOutlinedIcon/>
          <GridViewOutlinedIcon/>
          <div className="search">
            <input type="text" placeholder='search' />
            <SearchOutlinedIcon/>
          </div>
        </div>
        <div className="right">
          <PersonOutlineOutlinedIcon/>
          <NotificationsOutlinedIcon/>
          <EmailOutlinedIcon/>
          <div className='user'>
            <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
            <span>John Doe</span>
          </div>
        </div>
    </div>
  )
}

export default Navbar
