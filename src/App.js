import "./App.css";
import Login from "./Login";
import Header from "./Header";
import Loading from "./Loding";
import { useStateValue } from "./StateProvider";
import { useEffect, useState } from "react";
import { firedb } from "./firebase";
import db from "./firebase";
import { actionTypes } from "./reducer";
import MovieList from "./MovieList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Wishlist from "./Wishlist";

function App() {
  const [{movieslist }, dispatch] = useStateValue();
  const user = sessionStorage.getItem("userDetails")?JSON.parse(sessionStorage.getItem("userDetails")):null;
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const colNames = ["Title", "Year", "Genre", "Add to Wishlist"];

  useEffect(() => {
    // fetching data from realtime database
    firedb.on("value", (snapshot) => {
      dispatch({
        type: actionTypes.SET_MOVIES,
        movieslist: snapshot.val(),
      });

      if (snapshot.val() !== null) {
        setMovies({ ...snapshot.val() });
        setOriginalMovies({...snapshot.val() });
      } else {
        setMovies({});
      }
    });

    return () => {
      setMovies({});
    };
  }, []);

  const addToWishlist = (obj, index) => {
    db.collection("wishlist").doc(user.uid).collection("userWishlist").add({
      Title: obj.title,
      Year: obj.year,
      Genre: obj.genre,
    });

    // delete movies[index];
    // {()=>{
    //   Object.values(movies).map((obj1, index) => {
    //      if(obj1.id === obj.id) {
    //        continue;
    //      }
    //   }
    // }}
  };

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Router>
            <div className="app__body">
              <Header />
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {/* {loading ? (
                <Loading />
              ) : (
                <MovieList
                  colNames={colNames}
                  movies={movies}
                  addToWishlist={addToWishlist}
                />
              )} */}

              <Routes>
                <Route
                  path="/movies"
                  element={
                    <MovieList
                      colNames={colNames}
                      movies={movies}
                      setMovies={setMovies}
                      originalMovies={originalMovies}
                      addToWishlist={addToWishlist}
                    />
                  }
                ></Route>
                <Route path="/wishlist" element={<Wishlist />}></Route>
              </Routes>
            </div>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
