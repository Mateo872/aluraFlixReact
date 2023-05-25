import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ videosData }) => {
  const frontendVideo = videosData.find(
    (video) => video.category === "Frontend"
  );

  const bannerStyle = {
    backgroundImage: `url(${frontendVideo?.thumbnail})`,
  };

  return (
    <>
      <div className="banner_overlay">
        <Link
          to={frontendVideo?.link}
          target="_blank"
          className="banner_video"
          style={bannerStyle}
        ></Link>
        <div className="banner_desc">
          <h2 className="title_category">Front End</h2>
          <h4 className="title_desc">{frontendVideo?.title}</h4>
          <p className="desc">{frontendVideo?.description}</p>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default Banner;
