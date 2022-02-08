import { IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Loading from "./Loding";
import SearchBar from "./SearchBar";
import "./MoviesList.css";
function MovieList({ colNames, movies, originalMovies,  setMovies, addToWishlist }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      console.log("Timeout");
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div>
            <SearchBar originalMovies={originalMovies} setMovies={setMovies}/>
          </div>
          <div >
            <table
              cellSpacing={5}
              className="movies-list-table"
              style={{
                width: "auto",
                height: "auto",
                padding: "5px 10px",
              }}
            >
              <thead>
                <tr>
                  {colNames.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* {() => {
                        for (let i = 0; i < movies.length; i++) {
                          return (
                            <tr key={movies[i].id}>
                              <td>{movies[i].title}</td>
                              <td>{movies[i].year}</td>
                              <td>{movies[i].genre}</td>
                            </tr>
                          );
                        }
                      }} */}
                {Object.values(movies).map((obj, index) => (
                  <tr key={index} onClick={() => addToWishlist(obj, index)}>
                    {/* {Object.values(obj).map((value, index2) => (
                            <td key={index2}>{value}</td>
                          ))} */}
                    {/* {console.log(index)} */}
                    <td>{obj.title}</td>
                    <td>{obj.year}</td>
                    <td>{obj.genre}</td>
                    <td
                    // onClick={addToWishlist(obj)}
                    >
                      <IconButton>
                        <Favorite style={{ color: "red" }} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {console.log(movies)}
      {/* {console.log(movieslist)} */}
      {/* {movies[0]?.title}
                {movieslist[0]?.title} */}
    </div>
  );
}

export default MovieList;
