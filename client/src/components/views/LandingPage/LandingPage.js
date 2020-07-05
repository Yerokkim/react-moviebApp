import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../Commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [PMovies, setPMovies] = useState([]);
  const [PMainMovieImg, setpMainMovieImg] = useState(null);
  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endPoint);
  }, []);

  const fetchMovies = (endPoint) => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        setPMovies([...response.results]);
        setpMainMovieImg(response.results[0]);
      });
  };

  console.log(PMainMovieImg, "pmovies");
  return (
    <div style={{ width: "100%", margin: "0" }}>
      {PMainMovieImg && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${PMainMovieImg.backdrop_path}`}
          title={PMainMovieImg.original_title}
          text={PMainMovieImg.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movie by lates</h2>

        <button>Read More</button>

        <Row gutter={[16, 16]}>
          {PMovies &&
            PMovies.map((movies, index) => (
              <React.Fragment key={index}>
                <GridCards
                  image={
                    movies.poster_path
                      ? `${IMAGE_BASE_URL}w500${movies.poster_path}`
                      : null
                  }
                  movieId={movies.id}
                  movieName={movies.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default LandingPage;
