import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="card home__card">
        <h4 className="">Azizbek</h4>
        <div className="card-image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZVdX8nnLNE3Z_72Xzn633x3EZsM_sJWm2SeBZ2er82yQgzS1O2EMSmOBd6_liHYS72QU&usqp=CAU"
            alt=""
          />
        </div>
        <div className="card-content">
          <h6>Title</h6>
          <p className="">It is my first post </p>
          <input type="text" placeholder="add a commet" />
        </div>
      </div>
    </div>
  );
};

export default Home;
