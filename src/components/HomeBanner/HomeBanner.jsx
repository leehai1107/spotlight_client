import React from "react";
import Slider from "../Slider/Slider";
import { bannerItems } from ".";

export default function HomeBanner() {
  return (
    <div className="slider-container">
      <Slider isBanner={true} items={bannerItems} />
    </div>
  );
}
