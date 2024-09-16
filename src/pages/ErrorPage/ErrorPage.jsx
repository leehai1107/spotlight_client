import React from "react";

export default function ErrorPage() {
  return (
    <div>
      <div className="wrapper">
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="error-404-content text-center">
                  <h2>404</h2>
                  <h4>Opps! Không tìm thấy trang!!!</h4>
                  <p>
                    Có vẻ như bạn đang tìm trang không tồn tại trên hệ thống.
                    <br />
                    Nếu không đúng vui lòng liên hệ cho{" "}
                    <b>
                      <a href="#">Spotlight</a>
                    </b>
                  </p>
                  <a href="/" className="main-btn btn-hover h_50">
                    <i className="fa-solid fa-house me-3" />
                    Trở về Trang chủ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
