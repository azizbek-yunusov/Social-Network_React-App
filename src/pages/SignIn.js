import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

const SignIn = () => {
  const {state, dispatch} = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInHandler = (e) => {
    e.preventDefault();
    if (
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    ) {
      return toast.error("Emailiningizni notog'ri kiritilgan!!!");
    }
    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({type: "USER", payload: data.user})
          toast.success("Register Successfully!");
          navigate("/");
        }
      });
  };
  return (
    <div className="mycard">
      <form onSubmit={signInHandler} className="card card__auth ">
        <h2>MernGram</h2>
        <div className="input-field col s6">
          <i className="material-icons prefix">email</i>
          <input
            id="icon_prefix"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
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
          Kirish
        </button>

        <p>
          <Link to="/signup">Do not have an accaunt?</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
