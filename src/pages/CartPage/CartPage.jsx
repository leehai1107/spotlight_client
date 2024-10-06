import React from "react";

export default function CartPage() {
  return (
    <div className="wrapper">
      <div className="hero-banner">
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="main-title checkout-title">
                  <h3>Giỏ Hàng 🛒</h3>
                </div>
              </div>
              <div className="col-xl-8 col-lg-12 col-md-12">
                <div className="checkout-block">
                  <div className="main-card">
                    <div className="bp-title">
                      <h4>Thông tin đơn hàng</h4>
                    </div>
                    <div className="bp-content bp-form">
                      <div className="row"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12">
                <div className="main-card order-summary">
                  <div className="bp-title">
                    <h4>Thông tin thanh toán</h4>
                  </div>
                  <div className="order-summary-content p_30">
                    <div>
                      <div className="order-total-dt">
                        <div className="order-text">Số Lượng</div>
                        <div className="order-number">0</div>
                      </div>
                      <div className="order-total-dt">
                        <div className="order-text">Tạm Tính</div>
                        <div className="order-number">0,000 VNĐ</div>
                      </div>
                      <div className="divider-line" />
                      <div className="order-total-dt">
                        <div className="order-text">Tổng </div>
                        <div className="order-number ttl-clr">0,000 VNĐ</div>
                      </div>
                    </div>
                    <div className="coupon-code-block">
                      <div className="form-group mt-4">
                        <label className="form-label">Mã Giảm Giá</label>
                        <div className="position-relative">
                          <input
                            className="form-control h_50"
                            type="text"
                            placeholder="Mã Voucher"
                            defaultValue=""
                          />
                          <button className="apply-btn btn-hover" type="button">
                            Áp Dụng
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="confirmation-btn">
                      <button
                        className="main-btn btn-hover h_50 w-100 mt-5"
                        type="button"
                      >
                        Thanh Toán
                      </button>
                      <span>Kiểm tra kỹ thông tin trước khi thanh toán!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
