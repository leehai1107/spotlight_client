import React from "react";

export default function PaymentFailurePage() {
  return (
    <>
      <div className="breadcrumb-block"></div>
      <div className="event-dt-block p-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-7 col-md-10">
              <div className="booking-confirmed-content">
                <div className="main-card">
                  <div className="booking-confirmed-top text-center p_30">
                    <div className="booking-confirmed-img mt-4">
                      <img src="./assets/images/canceled.png" alt="" />
                    </div>
                    <h4>Thanh Toán Thất Bại</h4>
                    <p className="ps-lg-4 pe-lg-4">
                      Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                      <br /> Hãy theo dõi <strong>Spotlight</strong> trên các
                      nền tảng khác nữa nhé!
                    </p>
                    <div className="add-calender-booking">
                      <a
                        href="https://www.facebook.com/share/DZqEPzHyTcfHTt4W/"
                        className="cb-icon"
                      >
                        <i className="fa-brands fa-facebook" />
                      </a>
                      <a
                        href="https://www.instagram.com/spotlight.graduation?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        className="cb-icon"
                      >
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="booking-confirmed-bottom">
                    <div className="booking-confirmed-bottom-bg p_30">
                      <a
                        href="/"
                        className="main-btn btn-hover h_50 w-100 mt-5"
                      >
                        <i className="fa-solid fa-house rotate-icon me-3" />
                        Trở Về Trang Chủ
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
