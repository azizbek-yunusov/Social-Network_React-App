import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUpHandler = async (e) => {
    e.preventDefault();
    if (
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    ) {
      return toast.error("Emailiningizni notog'ri kiritilgan!!!");
    }
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Register Successfully!");
          navigate("/signin");
        }
      });
  };
  return (
    <div className="mycard">
      <form onSubmit={signUpHandler} className="card card__auth ">
        <h2>MErnGram</h2>
        <div className="input-field col s6">
          <i className="material-icons prefix">verified_user</i>
          <input
            id="icon_prefix"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="validate"
          />
          <label htmlFor="icon_prefix">Ismingiz</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">email</i>
          <input
            id="icon_prefix"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix">Pochta manzilingiz</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">password</i>
          <input
            id="icon_prefix"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix">Parolingiz</label>
        </div>
        <button
          type="submit"
          className="waves-effect waves-light btn #0d47a1 blue darken-4"
        >
          Ro'yhatdan o'tish
        </button>

        <p>
          <Link to="/signin">Already have an accaunt?</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
