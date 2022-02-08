import { Avatar, Button } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { useStateValue } from "./StateProvider";
import "./Header.css";
import logo from "./Movie.jpg";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import { useNavigate } from "react-router-dom";
function Header() {
  const [dispatch] = useStateValue();
  const navigate = useNavigate();
  const user = sessionStorage.getItem("userDetails")?JSON.parse(sessionStorage.getItem("userDetails")):null;
  const signout = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        dispatch({
          type: actionTypes.SET_MOVIES,
          movieslist: null,
        });
        sessionStorage.clear();
        navigate(`/`);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="header">
      <div onClick={() => navigate(`/movies`)} className="header__left">
        <Avatar src={logo} />
      </div>
      <div className="header__right">
        <div className="header__info">
          <PersonIcon />
          <h4>{user.displayName}</h4>
        </div>
        {/* making clickable icon using Material UI */}
        <Button
          // className="disabled"
          onClick={() => navigate(`/wishlist`)}
          style={{ backgroundColor: "white", marginRight: "5px" }}
        >
          <Favorite style={{ color: "red" }} />
        </Button>
        <Button
          onClick={signout}
          type="submit"
          style={{ color: "white", backgroundColor: "red" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Header;
