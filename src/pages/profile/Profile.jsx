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
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
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
        "Loading"
      ) : (
        <>
          <div className="images">
            <img
              src={
                data?.cover_Pic ||
                "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              }
              alt=""
              className="cover"
            />
            <img
              src={
                data?.ProfilePic ||
                "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              }
              alt=""
              className="dp"
            />
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
                {isRelLoading ? "Loading" : userId === currentUser.id ? (
                  <button>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData?.includes(currentUser.id)
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
            <Posts userId = {userId} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
