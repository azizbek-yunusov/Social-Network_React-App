import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Aziz " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          picture: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Postingiz muvaffaqiyat qo'shilidi!!!");
            navigate("/");
          }
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "MernGram");
    data.append("cloud_name", "dztvgxnaj");
    fetch("https://api.cloudinary.com/v1_1/dztvgxnaj/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cardBody">
      <div className="card cardPost">
        <div className="card-image">
          <img
            alt="imgPost"
            src="https://images.unsplash.com/photo-1554314591-dbb9acb3e336?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGFkZCUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
          <span className="card-title">Your Posts</span>
        </div>
        <div className="card-content">
          <div className="input-field col s6">
            <i className="material-icons prefix">subtitles</i>
            <input
              id="icon_prefix"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
            <label htmlFor="icon_prefix">Title</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">content_paste</i>
            <input
              id="icon_prefix"
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <label htmlFor="icon_prefix">Body</label>
          </div>
          <div className="file-field input-field">
            <div className="btn #0d47a1 blue darken-4">
              <span>
                <i className="material-icons">add</i>
              </span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Your Photo"
              />
            </div>
          </div>
          <button
            onClick={() => postDetails()}
            className="btn #0d47a1 blue darken-4"
          >
            Add Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
