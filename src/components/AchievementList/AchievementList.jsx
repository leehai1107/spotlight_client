import React from "react";
import { universityItems } from ".";
import Slider from "../Slider/Slider";

export default function AchievementList() {
  return (
    <div className="our-organisations-block p-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-title text-center">
              <h3>SẴN SÀNG GIAO HÀNG CHO NHỮNG ĐƠN VỊ TRONG THÀNH PHỐ HCM</h3>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="organisations-area">
              <Slider
                items={universityItems}
                autoplayTimeout={3000}
                loop={true}
                margin={25}
                smartSpeed={700}
                isAchievements={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
