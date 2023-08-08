import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
 const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGIN_START" });
    navigate("/login");
  }
  const handleNav = (route)=> {
    navigate(`/${route}`);
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link className="link" to="/">
          <span className="logo">StayQuest</span>
        </Link>
        {user ? (
          <div>
            {user.username}
            <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={()=>{handleNav("register");}}>Register</button>
            <button className="navButton" onClick={()=>{handleNav("login");}}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
