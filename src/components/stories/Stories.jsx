import React from 'react'
import './stories.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Stories = () => {

    //Testing Data

    const stories = [
        {
          id: 1,
          name: "Evelive Baker",
          img: "https://images.pexels.com/photos/7004697/pexels-photo-7004697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: 2,
          name: "Jesse George",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
          id: 3,
          name: "Turner Paul",
          img: "https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: 4,
          name: "Marie Riddle",
          img: "https://images.pexels.com/photos/9304725/pexels-photo-9304725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ];

      const {currentUser} = useContext(AuthContext);
  return (
    <div className='stories'>
      <div className="story">
                <img src={currentUser.ProfilePic} alt="" />
                <span>{currentUser?.name}</span>
                <button>+</button>
            </div>
      
      {stories.map(story=>(
            <div className="story" key={story.id}>
                <img src={story.img} alt="" />
                <span>{story.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Stories 
