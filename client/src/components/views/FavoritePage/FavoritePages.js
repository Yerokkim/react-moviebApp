import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./favorite.css";

const FavoritePages = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  useEffect(() => {
    Axios.post("/api/favorite/getFavoredMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((res) => {
      if (res.data.success) {
        console.log(res.data.favorite);
        setFavoriteMovies(res.data.favorite);
      } else {
        alert("can not get the movie info");
      }
    });
  }, []);
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from Favorite</th>
          </tr>
        </thead>
        <tbody>
          {favoriteMovies.map((x, i) => (
            <tr key={i}>
              <td>{x.movieTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoritePages;
