import React from "react";
import { FacebookTwoTone } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { Pinterest } from "@mui/icons-material";
import { Place } from "@mui/icons-material";
import { Language } from "@mui/icons-material";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import { MoreVert } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import "./profile.scss";
import Posts from "../../components/posts/Posts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      console.log(data)
      return res.data;
    })
  );

  const {isLoading: isRelLoading, data: relationshipData } = useQuery(["relationship"], () =>
    makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation((following) => {
      if(following) return makeRequest.delete("/relationships?userId="+ userId);
      return makeRequest.post("/relationships", {userId});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

    const handleFollow = () =>{
      mutation.mutate(relationshipData.includes(currentUser.id))
    }

  return (
<div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/uploads/"+data.cover_pic} alt="" className="cover" />
            <img src={"/uploads/"+data.ProfilePic} alt="" className="dp" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoTone fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <Instagram fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <Twitter fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedIn fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <Pinterest fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <Place />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <Language />
                    <span>{data.website}</span>
                  </div>
                </div>
                {isRelLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlined />
                <MoreVert />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
