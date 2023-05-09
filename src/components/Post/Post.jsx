import React, { useState } from "react";
import "./post.scss";
import { FavoriteOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { TextsmsOutlined } from "@mui/icons-material";
import { ShareOutlined } from "@mui/icons-material";
import { MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment";

const Post = ({ post }) => {
  const [commentsBox, setCommentsBox] = useState(false);
  //temp
  const liked = false;
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.ProfilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="post_name">{post.name}</span>
              </Link>
              <span className="post_date">{moment(post.dateTime).fromNow()}</span>
            </div>
          </div>
          <MoreHoriz />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./uploads/"+post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />} 12 likes
          </div>
          <div className="item" onClick={() => setCommentsBox(!commentsBox)}>
            <TextsmsOutlined /> 2 comments
          </div>
          <div className="item">
            <ShareOutlined /> 1 share
          </div>
        </div>
        {commentsBox && <Comments post_id = {post.id} />}
      </div>
    </div>
  );
}

export default Post;
