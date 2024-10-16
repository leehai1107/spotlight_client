import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CanvasArea from "../../components/CanvasArea/CanvasArea";
import ChooseProductArea from "../../components/ChooseProductArea/ChooseProductArea";

export default function ProductCustomizePage() {
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    userId = JSON.parse(atob(token.split(".")[1])).user_id;
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/signin");
    }
  });
  return (
    <>
      <div className="wrapper">
        <div className="hero-banner">
          <div className="row p-4">
            <div className="col-md-8 col-12 ">
              <ChooseProductArea />
            </div>

            <div className="col-md-4 col-12 pt-5">
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
