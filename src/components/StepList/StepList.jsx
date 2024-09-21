import React from "react";

// Define step content as an array of objects
const steps = [
  {
    id: "step-01",
    title: "Bước 01",
    subtitle: "Lựa Chọn Sản Phẩm",
    description:
      "Đăng kí miễn phí và số lượng sản phẩm đa dạng cho bạn lựa chọn.",
    details: [
      {
        icon: "./assets/images/icons/step-icon-1.png",
        title: "Đăng ký miễn phí",
        text: "Đăng ký dễ dàng chỉ kí với vài thông tin cơ bản.",
      },
      {
        icon: "./assets/images/icons/step-icon-2.png",
        title: "Giao diện đơn giản và sản phẩm đa dạng",
        text: "Dễ dàng tìm và lựa chọn sản phẩm phù hợp với nhu cầu của bạn.",
      },
      {
        icon: "./assets/images/icons/step-icon-3.png",
        title: "Tùy chỉnh ngoại hình",
        text: "Cung cấp nhiều mẫu mã cho phép bạn lựa chọn theo ý thích của bản thân.",
      },
    ],
  },
  {
    id: "step-02",
    title: "Bước 02",
    subtitle: "Thanh Toán",
    description: "Tiến hành thanh toán trực tuyến.",
    details: [
      //   {
      //     icon: "./assets/images/icons/step-icon-4.png",
      //     title: "Promote your events on social media & email",
      //     text: "Use our intuitive event promotion tools to reach your target audience and sell tickets.",
      //   },
      {
        icon: "./assets/images/icons/step-icon-5.png",
        title: "Mức giá và chiết khấu hợp lý",
        text: "Chúng tôi đem lại những sản phẩm với mức giá phù hợp với túi tiền và nhu cầu của bạn.",
      },
      {
        icon: "./assets/images/icons/step-icon-6.png",
        title: "Thanh toán nhanh chóng",
        text: "Sử dụng hình thức thanh toán online để thanh toán nhanh chóng.",
      },
    ],
  },
  {
    id: "step-03",
    title: "Bước 03",
    subtitle: "Nhận Hàng",
    description: "Chờ đợi và nhận hàng từ chúng tôi.",
    details: [
      {
        icon: "./assets/images/icons/step-icon-9.png",
        title: "Giao hàng nhanh",
        text: "Đơn hàng sẽ được giao nhanh chóng và tận tay.",
      },
    ],
  },
  {
    id: "step-04",
    title: "Bước 04",
    subtitle: "Đánh Giá Và Chia Sẻ",
    description: "Đánh giá và chia sẻ với mọi người.",
    details: [
      {
        icon: "./assets/images/icons/step-icon-10.png",
        title: "Đánh giá dịch vụ",
        text: "Đánh giá công tâm về dịch vụ của chúng tôi.",
      },
      {
        icon: "./assets/images/icons/step-icon-11.png",
        title: "Chia sẻ",
        text: "Chia sẻ dịch vụ của chúng tôi với mọi người.",
      },
    ],
  },
];

export default function StepList() {
  return (
    <div className="host-step-block p-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="main-title">
              <h3>Trở Nên Nổi Bật Chỉ Với 4 Bước</h3>
              <p>
                Use early-bird discounts, coupons and group ticketing to double
                your ticket sale. Get paid quickly and securely.
              </p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="easy-steps-tab">
              {/* Step navigation */}
              <div className="nav step-tabs" role="tablist">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    className={`step-link ${index === 0 ? "active" : ""}`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${step.id}`}
                    type="button"
                    role="tab"
                    aria-controls={step.id}
                    aria-selected={index === 0}
                  >
                    {step.title}
                    <span>{step.subtitle}</span>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="tab-content">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`tab-pane fade ${
                      index === 0 ? "show active" : ""
                    }`}
                    id={step.id}
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="step-text">{step.description}</div>
                      </div>
                      {step.details.map((detail, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                          <div className="step-item">
                            <div className="step-icon">
                              <img src={detail.icon} alt="" />
                            </div>
                            <h4>{detail.title}</h4>
                            <p>{detail.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
