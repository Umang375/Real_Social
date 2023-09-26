import React, { useContext, useState } from "react";
import "./post.scss";
import { FavoriteOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { TextsmsOutlined } from "@mui/icons-material";
import { ShareOutlined } from "@mui/icons-material";
import { MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentsBox, setCommentsBox] = useState(false);
  const [menu, setMenu] = useState(false);

  const {currentUser} = useContext(AuthContext);
  
  const {isLoading, error, data} = useQuery(['likes', post.id],()=>
      makeRequest.get('/likes?post_id='+post.id).then((res)=>{
        return res.data
      }) 
    )

    const queryClient = useQueryClient();

  const mutation = useMutation((liked) => {
      if(liked) return makeRequest.delete("/likes?post_id="+ post.id);
      return makeRequest.post("/likes", {post_id:post.id});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

    const handleLike = () =>{
      mutation.mutate(data.includes(currentUser.id))
    }

    const deleteMutation = useMutation((postId) => {
      return makeRequest.delete("/posts/"+postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

    const handleDelete = () =>{
      deleteMutation.mutate(post.id)
    }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.ProfilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="post_name">{post.name}</span>
              </Link>
              <span className="post_date">{moment(post.dateTime).fromNow()}</span>
            </div>
          </div>
          <MoreHoriz onClick = {()=>setMenu(!menu)} />
          {menu && post.user_id===currentUser.id && (<button onClick={handleDelete}>Delete</button>)}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {error? " " : isLoading ? "loading" : data.includes(currentUser.id) ? <FavoriteOutlined style={{color : "red"}} onClick = {handleLike} /> : <FavoriteBorderOutlined onClick={handleLike}/>} 
            {data?.length || 0 } Likes
          </div>
          <div className="item" onClick={() => setCommentsBox(!commentsBox)}>
            <TextsmsOutlined /> 2 comments
          </div>
          <div className="item">
            <ShareOutlined /> Share
          </div>
        </div>
        {commentsBox && <Comments post_id = {post.id} />}
      </div>
    </div>
  );
}

export default Post;
