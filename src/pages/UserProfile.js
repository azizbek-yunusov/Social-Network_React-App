import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
      headers: {
        Authorization: "Aziz " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, []);

  // const followUser = () => {
  //   fetch("http://localhost:5000/follow", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Aziz " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       followId: userId,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatch({
  //         type: "UPDATE",
  //         payload: { following: data.following, followers: data.followers },
  //       });
  //       localStorage.setItem("user", JSON.stringify(data));
  //       setProfile((prevState) => {
  //         return {
  //           ...prevState,
  //           user: {
  //             ...prevState.user,
  //             followers: [...prevState.user.followers, data._id],
  //           },
  //         };
  //       });
  //       setShowFollow(false);
  //     });
  // };
  const followUser = () => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Aziz " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unFollowUser = () => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Aziz " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (s) => s !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  console.log(profile);
  return (
    <>
      {profile ? (
        <div className="profile">
          <div className="profileMain">
            <div>
              <img
                className="profileImg"
                // src={profile.user.pic}
                alt="profile"
              />
            </div>
            <div>
              <h4>{profile.user.name}</h4>
              <div className="infoProfile">
                <p>{profile.posts.length} posts</p>
                <p>{profile.user.followers.length} followers</p>
                <p>{profile.user.following.length} following</p>
              </div>
              <div>
                {/* <button
                  style={{ marginTop: 10 }}
                  className="btn #0d47a1 blue darken-4"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
                <button
                  style={{ marginTop: 10 }}
                  className="btn #0d47a1 blue darken-4"
                  onClick={() => unFollowUser()}
                >
                  Un Follow
                </button> */}
                {showFollow ? (
                  <button
                    style={{ marginTop: 10 }}
                    className="btn #0d47a1 blue darken-4"
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    style={{ marginTop: 10 }}
                    className="btn #0d47a1 blue darken-4"
                    onClick={() => unFollowUser()}
                  >
                    Un Follow
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="gallery">
            {profile.posts.map((item) => {
              return (
                <div key={item._id} className="img-item">
                  <img src={item.picture} alt={item._id} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
};

export default UserProfile;
