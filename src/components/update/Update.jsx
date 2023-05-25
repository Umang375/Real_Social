import React from './Update.scss'
import { useState } from 'react'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Update = ({setOpenUpdate, user}) => {

    const [cover, setCover] = useState("");
    const [profile, setProfile] = useState("");

    const[text, setText] = useState({
      email: user.email,
      password: user.password,
      name: user.name,
      city: user.city,
      website: user.website,
    });

    const upload = async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      }; 

    const handleChange  =(e)=>{
        setText((prev)=>({...prev, [e.target.name]: e.target.value}));
    }

    const queryClient = useQueryClient();

    const mutation = useMutation((user) => {
        return makeRequest.put("/users", user);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["user"]);
        },
      }
    );
  
    const handleClick = async (e) => {
      e.preventDefault();
      let coverUrl 
      let profileUrl 

        coverUrl = cover? await upload(cover): user.cover_pic;
        profileUrl = profile? await upload(profile): user.ProfilePic;

      mutation.mutate({...text, cover_pic: coverUrl, ProfilePic: profileUrl });
      setOpenUpdate(false);
      setCover(null);
    setProfile(null);
    };

  return (
    <div className='update'> 
    <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={text.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={text.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={text.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={text.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={text.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}

export default Update
