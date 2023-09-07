import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Link } from 'react-router-dom';
import './Navbar.scss'
import { DarkModeContext } from '../../context/DarkModeContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';


const Navbar = () => {

  const {toggleDarkMode, darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);
  
  return (
    <div className='navBar'>
        <div className="left">
          <Link to = "/" style={{textDecoration : "none"}}>
          <span>
          Real Social
          </span>
          </Link>
          <HomeOutlinedIcon/>
          {darkMode ? <LightModeOutlinedIcon onClick = {toggleDarkMode}/> : <DarkModeOutlinedIcon onClick = {toggleDarkMode}/> }
          <GridViewOutlinedIcon/>
          <div className="search">
            <SearchOutlinedIcon/>
            <input type="text" placeholder='Search' />
          </div>
        </div>
        <div className="right">
          <PersonOutlineOutlinedIcon/>
          <NotificationsOutlinedIcon/>
          <EmailOutlinedIcon/>
          <div className='user'>
            
            <img src={"/uploads/" + currentUser.ProfilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
        </div>
    </div>
  )
}

export default Navbar
