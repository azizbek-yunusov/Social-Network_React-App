import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const SubscrUserPost = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/getsubspost", {
      headers: {
        Authorization: "Aziz " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Aziz " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const unLikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Aziz " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const commentPost = (text, postId) => {
    fetch("http://localhost:5000/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Aziz " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        // console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`http://localhost:5000/deletepost/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Aziz " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((s) => s._id !== result._id);
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home">
      <div className="post__items">
        <div className="container">
          {data
            .map((item) => {
              return (
                <div className="row" key={item._id}>
                  <div className="col s12 m6">
                    <div className="card">
                      <Link to={item.postedBy._id !== state._id ? `/user/${item.postedBy._id}` : "/profile"}>
                        <div className="profileNames">
                          {/* <img src={item.postedBy.pic} alt={item.postedBy.name} /> */}
                          <p
                            style={{ display: "inline-block" }}
                            className="card-title postedBy"
                          >
                            {item.postedBy.name}
                          </p>
                        </div>
                      </Link>
                      <div className="card-image">
                        <img src={item.picture} alt="" />
                        <span className="card-title">{item.title}</span>
                      </div>
                      <div className="card-content">
                        {item.likes.includes(state._id) ? (
                          <button
                            className="btn white"
                            style={{ color: "#0d47a1 " }}
                          >
                            <i
                              className="material-icons"
                              onClick={() => unLikePost(item._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-heart-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                />
                              </svg>
                            </i>
                          </button>
                        ) : (
                          <button
                            className="btn white"
                            style={{ color: "#0d47a1 " }}
                          >
                            <i
                              className="material-icons"
                              onClick={() => likePost(item._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-heart"
                                viewBox="0 0 16 16"
                              >
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                              </svg>
                            </i>
                          </button>
                        )}
                        <button
                          className="btn white"
                          style={{ color: "#0d47a1", marginLeft: "10px" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chat-left-dots"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                          </svg>
                        </button>
                        {item.postedBy._id === state._id && (
                          <button
                            onClick={() => deletePost(item._id)}
                            className="btn white"
                            style={{ color: "#0d47a1", marginLeft: "10px" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                          </button>
                        )}

                        <p className="">{item.likes.length} likes</p>
                        <p>{item.body}</p>
                        <div className="">
                          {item.comments.map((s, index) => (
                            <Link
                              key={index}
                              to={
                                item.postedBy._id !== state._id
                                  ? "/profile/" + item.postedBy._id
                                  : "/profile"
                              }
                            >
                              <div className="commentPost">
                                <h6>{s.text}</h6>
                                <p>
                                  <b>{s.commentBy.name}</b>
                                </p>
                                <span>
                                  {moment(s.createdAt).format("MMM DD, YYYY")}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            // commentPost(e.target[0].value, item._id);
                          }}
                        >
                          <input type="text" placeholder="Add a comment" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>
        <div className="right__side">
          <h4 style={{ color: "#000", fontFamily: "'Grand Hotel', cursive" }}>
            All Users
          </h4>
          {/* <HomeSideBar /> */}
        </div>
      </div>
    </div>
  )
}

export default SubscrUserPost