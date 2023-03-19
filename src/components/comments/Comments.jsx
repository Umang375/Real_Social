import React from 'react'
import './comments.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const Comments = () => {

    const{currentUser} = useContext(AuthContext)
    const comments = [
        {
          id: 1,
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
          name: "John Doe",
          userId: 1,
          profilePicture:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          id: 2,
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
          name: "Jane Doe",
          userId: 2,
          profilePicture:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
      ];

  return (
    <div>
      <div className="comments">
        <div className="write">
            <img src={currentUser.ProfilePic} alt="" />
            <input type="text" placeholder='Say Something' />
            <button>Send</button>
        </div>
        {comments.map(comment=>(
            <div className="comment">
                <img src={comment.profilePicture} alt="" />
                <div className="comment_details">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className='comment_date'>
                    1 min ago
                </span>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
