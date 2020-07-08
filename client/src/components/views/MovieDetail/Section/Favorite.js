import React, { useEffect, useState } from "react";
import Axios from "axios";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  let variable = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRuntime,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variable).then((res) => {
      let num = res.data.favoriteNumber;
      setFavoriteNumber(num);
      if (res.data.success) {
      } else {
        alert("no likes data");
      }
    });

    Axios.post("/api/favorite/favorited", variable).then((res) => {
      console.log(res.data.favorited, "favorited");
      if (res.data.success) {
        setFavorited(res.data.favorited);
      } else {
        alert("no likes data");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (favorited) {
      console.log(favorited, "favorited");
      Axios.post("/api/favorite/removeFavorite", variable).then((res, err) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!favorited);
        } else {
          alert("data load fail", err);
        }
      });
    } else {
      Axios.post("/api/favorite/addFavorite", variable).then((res, err) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!favorited);
        } else {
          alert(err);
        }
      });
    }
  };
  return (
    <div>
      <button onClick={onClickFavorite}>
        {favorited ? "Not favorite" : "Favorite"} {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
