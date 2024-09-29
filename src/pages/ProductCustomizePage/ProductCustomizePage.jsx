import React from "react";
import CanvasArea from "../../components/CanvasArea/CanvasArea";

export default function ProductCustomizePage() {
  return (
    <>
      <div className="wrapper">
        <div className="hero-banner">
          <div className="row p-4">
            {/* This will take up 4 columns on medium screens and full width on smaller screens */}
            <div className="col-md-4 col-12 mb-3">ProductCustomizePage</div>

            {/* This will take up 8 columns on medium screens and full width on smaller screens */}
            <div className="col-md-8 col-12">
              <div className="container border border-warning">
                <CanvasArea />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
