import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import "./App.css";
import logo from "./Movie.jpg";
import { auth, provider } from "./firebase";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import icon from './google.png';

function Login() {
  const [{ user, movieslist }, dispatch] = useStateValue();
  useEffect(() => {
    console.log(user);
    console.log(movieslist);
  }, []);

  const signIn = () => {
    if(sessionStorage.getItem("userDetails")){window.location.href=`/movies`;}
    else{
      auth
      .signInWithPopup(provider)
      .then((result) => {
        db.collection("users").doc(auth.currentUser.uid).set({
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
        });

        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        sessionStorage.setItem("userDetails",JSON.stringify(result.user));
        window.location.href=`/movies`;
      })
      .catch((error) => alert(error.message));
    }
  };

  return (
    <div>
      <div className="Login">
        <h1 style={{marginTop: '20px'}}>Movies Room</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        
        <Button onClick={signIn} type="submit" style={{backgroundColor: '#117945',color: 'white', marginTop: '20px'}}> <img src={icon} alt="GoogleIcon" style={{Color: 'white'}}/> <p>&nbsp;</p>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
