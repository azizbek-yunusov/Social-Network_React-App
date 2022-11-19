import { useContext } from "react";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const renderNav = () => {
    if (state) {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>
            <Link to="/createpost">Create Post</Link>
          </li>
          <li>
            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                navigate("/signin");
              }}
            >
              Sign Out
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
      );
    }
  };
  return (
    <nav className="">
      <div className="nav-wrapper container">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          MernGram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down ">
          {renderNav()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
