import React from 'react'
import Post from '../Post/Post';
import './posts.scss';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = ({userId}) => {

    const {isLoading, error, data} = useQuery(['posts'],()=>
      makeRequest.get('/posts?userId='+userId).then((res)=>{
        return res.data;
      }) 
    ) 

  return (
    <div className='posts'>
      {/* add a spinner here instead of loading... */}
      {error ? "Something is wrong we'll right back!!" : isLoading ? "Loading..." :
        data.map(post=>(
          <Post post={post} key={post.id}/>
        ))
      }
    </div>
  )
}
 
export default Posts
