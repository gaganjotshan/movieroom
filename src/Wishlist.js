import { Button, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

function Wishlist() {
  const user = sessionStorage.getItem("userDetails")?JSON.parse(sessionStorage.getItem("userDetails")):null;
  const [wishload, setWishload] = useState(true);

  const [wishlistmovies, setWishlistmovies] = useState([]);

  // var [load, setLoad] = useState(0);
  useEffect(()=>{
    db.collection("wishlist")
    .doc(user.uid)
    .collection("userWishlist")
    .orderBy("Year", "asc")
    .onSnapshot((snapshot) => {
      let movie = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        console.log(data);
        return { id, ...data };
      });
      console.log(movie);
      setWishlistmovies(movie);
      setWishload(false);
    });
  },[])
  const colNames = ["Title", "Year", "Genre", "Add to Wishlist"];

  const navigate = useNavigate();

  const removefromWishlist = ({ id }) => {
    console.log(id);

    db.collection("wishlist")
      .doc(user.uid)
      .collection("userWishlist")
      .doc(id)
      .delete();

    console.log("Deleted", id);
  };

  return (
    <div className="wishlist">
      {wishload ? (
        <div>
          <h1>Loading your Wishlist Movies...</h1>
        </div>
      ) : (
        <div>
          {wishlistmovies?.length > 0 ? (
            <div>
              {" "}
              <div>
                <table
                  cellSpacing={5}
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
                    {console.log(wishlistmovies?.length)}
                    {console.log(wishlistmovies[0])}
                    {/* {() => {
                      console.log("ABC");
                      for (let i = 0; i < wishlistmovies.length; i++) {
                        return (
                          <tr key={wishlistmovies[i].id}>
                            <td style={{ color: "black" }}>
                              {console.log(wishlistmovies[i].title)}
                              {wishlistmovies[i].title}
                            </td>
                            <td>{wishlistmovies[i].year}</td>
                            <td>{wishlistmovies[i].genre}</td>
                          </tr>
                        );
                      }
                    }} */}

                    {/* {wishlistmovies.map((item) => (
                      <tr key={item.id}>
                        {console.log(item)}
                        {console.log(item.Title)}
                        <td>{item.Title}</td>
                        <td>{item.Year}</td>
                        <td>{item.Genre}</td>
                      </tr>
                    ))} */}

                    {Object.values(wishlistmovies).map((obj, index) => (
                      <tr key={index} onClick={() => removefromWishlist(obj)}>
                        <td>{obj.Title}</td>
                        <td>{obj.Year}</td>
                        <td>{obj.Genre}</td>
                        <td>
                          <IconButton>
                            <HeartBrokenIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>{" "}
            </div>
          ) : (
            <div>
              {" "}
              <h1>You did not add any movie to wishlist!</h1>
              <Button
                onClick={() => navigate(`/movies`)}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  marginTop: "10px",
                }}
              >
                Movies List
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
