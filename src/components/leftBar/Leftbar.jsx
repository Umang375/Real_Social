import React from "react";
import "./Leftbar.scss";
import Gallery from "../../assets/8.png";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Leftbar = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src= {currentUser.ProfilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="items">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="items">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="items">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="items">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="items">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="items">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="items">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="items">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="items">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="items">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span>Learning</span>
          <div className="items">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="items">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="items">
            <img src={Fund} alt="" />
            <span>Fund</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
