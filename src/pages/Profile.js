import React from "react";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profileMain">
        <div className="imgavatar">
          <img
          className="profileImg"
            src="https://www.slashfilm.com/img/gallery/how-avatar-became-the-most-popular-movie-no-one-remembers/l-intro-1658431618.jpg"
            alt=""
          />
        </div>
        <div className="">
          <h4 className="">Azizbek Yunusov</h4>
          <div className="infoProfile">
            <p className="">
              99 posts
            </p>
            <p className="">
              99 followers
            </p>
            <p className="">
              99 folowing
            </p>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img src="https://www.slashfilm.com/img/gallery/how-avatar-became-the-most-popular-movie-no-one-remembers/l-intro-1658431618.jpg" alt="" className="imgItem" />
        <img src="https://www.slashfilm.com/img/gallery/how-avatar-became-the-most-popular-movie-no-one-remembers/l-intro-1658431618.jpg" alt="" className="imgItem" />

      </div>
    </div>
  );
};

export default Profile;
