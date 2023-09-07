import React from "react";
import "./Rightbar.scss";

const Rightbar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>People you may know</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg"
                alt=""
              />
              <span>Emery Farley</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Alice Wells</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>See What your Friends are doing </span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <p>
                <span>Drew Williamson</span> changed his profile picture.
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/16977372/pexels-photo-16977372/free-photo-of-fashion-man-vacation-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <p>
                <span>Audera</span> liked a post.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/16922807/pexels-photo-16922807/free-photo-of-red-dress.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <p>
                <span>Ivory Landry </span> posted a new photo.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Leland Walker </span> liked a comment.
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/3628700/pexels-photo-3628700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="online"/>
              <span>Collins Fischer </span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4006576/pexels-photo-4006576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="online"/>
              <span>Christena Mills </span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/3732667/pexels-photo-3732667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="online"/>
              <span>Lindsey Davidson </span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/1181579/pexels-photo-1181579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="online"/>
              <span>Leena Frazier </span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4148984/pexels-photo-4148984.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div className="online"/>
              <span>Walker Curry </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
