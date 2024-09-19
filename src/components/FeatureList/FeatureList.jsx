import React from "react";
import Slider from "../Slider/Slider";
import { featureItems } from "../Slider";

export default function FeatureList() {
  return (
    <div className="host-engaging-event-block p-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="main-title">
              <h3>TỎA SÁNG TỰ TIN CÙNG - SPOTLIGHT🎓</h3>
              <p>Giao diện thân thiện, dễ sử dụng và tối ưu hóa.</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="engaging-block">
              <Slider
                items={featureItems}
                autoplayTimeout={3000}
                loop={true}
                margin={10}
                smartSpeed={700}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
