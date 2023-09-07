import React from 'react'
import './comments.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { useState } from 'react';

const Comments = ({post_id}) => {

  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const { isLoading, error, data } = useQuery(['comments'], () =>
    makeRequest.get('/comments?post_id=' + post_id).then((res) => {
      return res.data
    })
  )

  const queryClient = useQueryClient();

  const mutation = useMutation((newComment) => {
    return makeRequest.post("/comments", newComment);
  },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate({ desc, post_id });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/uploads/"+currentUser.ProfilePic} alt="" />
        <input type="text" placeholder='Say Something'
          value={desc} onChange={e => setDesc(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {error ? "Something is wrong we'll right back!!" : isLoading ? "Loading..." : 
      // Array.isArray(data) && data.length > 0 ? 
      (data.map((comment) => (
        <div className="comment">
          <img src={comment.ProfilePic} alt="" />
          <div className="comment_details">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className='comment_date'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
      ))
      ) 
      // : "No Comments Yet"
    }
    </div>
  )
}

export default Comments
