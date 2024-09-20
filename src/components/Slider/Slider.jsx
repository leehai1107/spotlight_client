// Slider.js
import React from "react";
import PropTypes from "prop-types";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const responsive = {
  0: {
    items: 1,
  },
  464: {
    items: 3,
  },
  1024: {
    items: 5,
  },
};

const Slider = ({
  items = [],
  autoplayTimeout = 3000,
  loop = true,
  margin = 10,
  smartSpeed = 700,
  isBanner,
  isAchievements,
  isFeatures,
}) => {
  return (
    <div>
      <OwlCarousel
        className="owl-theme"
        loop={loop}
        margin={margin}
        responsive={responsive}
        autoplay
        autoplayTimeout={autoplayTimeout}
        smartSpeed={smartSpeed}
        nav={false} // Disable navigation arrows
        dots={false} // Disable dots navigation
        mouseDrag={false} // Disable mouse drag
        touchDrag={false} // Disable touch drag
        pullDrag={false} // Disable pull drag
        freeDrag={false}
      >
        {isFeatures &&
          items.map((item, index) => (
            <div className="item" key={index}>
              <div className="main-card">
                <div className="host-item">
                  <div className="host-img">
                    <img src={item.image} alt={item.altText} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        {isAchievements &&
          items.map((item, index) => (
            <div className="item" key={index}>
              <div className="sponsor">
                <a href={item.link}>
                  <img src={item.image} alt={item.altText} />
                </a>
              </div>
            </div>
          ))}
        {isBanner &&
          items.map((item, index) => (
            <div className="item" key={index}>
              <div className="slider-container">
                <a href={item.link}>
                  <img src={item.image} alt={item.altText} />
                </a>
              </div>
            </div>
          ))}
      </OwlCarousel>
    </div>
  );
};

export default Slider;
