import React from "react";
import { Link } from "react-router-dom";

const Video = ({ video, categoryColor }) => {
  const videoStyle = {
    backgroundImage: `url(${video.thumbnail})`,
    border: `4px solid ${categoryColor}`,
  };

  return (
    <Link to={video.link} target="_blank" rel="noopener noreferrer">
      <div className="video" style={videoStyle}></div>
    </Link>
  );
};

export default Video;
