import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "../MovieDetail/Section/MovieInfo";
import GridCards from "../Commons/GridCards";
import Favorite from "../MovieDetail/Section/Favorite";
import { Row } from "antd";
function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US&page=1`;
    const enPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(enPointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endPointCrew)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setCrews(response.cast.slice(0, 10));
      });
  }, []);

  const actorsView = () => {
    setActorToggle(!ActorToggle);
  };
  return (
    <div>
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/*BODY */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>
        <MovieInfo movie={Movie} />
        <br />

        {/*actours*/}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={actorsView}>See Actors</button>
        </div>
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Crews &&
              Crews.map((crew, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      crew.profile_path
                        ? `${IMAGE_BASE_URL}w500${crew.profile_path}`
                        : null
                    }
                    name={crew.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

{
  /* <GridCard
image={
  Crews.profile_path
    ? `${IMAGE_BASE_URL}w500${Crews.profile_path}`
    : null
}
/> */
}

export default MovieDetail;
