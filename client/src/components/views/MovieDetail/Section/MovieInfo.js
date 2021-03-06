import React from "react";
import { Descriptions } from "antd";

const MovieInfo = (props) => {
  let { movie } = props;
  return (
    <Descriptions title="Movie Info" bordered>
      <Descriptions.Item label="Title">
        {props.movie.original_title}
      </Descriptions.Item>
      <Descriptions.Item label="release_date">
        {movie.release_date}
      </Descriptions.Item>
      <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="vote_average" span={2}>
        {movie.vote_average}
      </Descriptions.Item>

      <Descriptions.Item label="vote_count">
        {movie.vote_count}
      </Descriptions.Item>
      <Descriptions.Item label="Title">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="Title">{movie.popularity}</Descriptions.Item>
    </Descriptions>
  );
};

export default MovieInfo;
