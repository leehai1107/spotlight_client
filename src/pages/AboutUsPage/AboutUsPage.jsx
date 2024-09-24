import React from "react";
import FeatureList from "../../components/FeatureList/FeatureList";
import AchievementList from "../../components/AchievementList/AchievementList";
import TeamMemberList from "../../components/TeamMemberList/TeamMemberList";

export default function AboutUsPage() {
  return (
    <div className="wrapper">
      <div className="hero-banner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-9 col-md-10">
              <div className="hero-banner-content text-center">
                <h2 className="mb-0"></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="explore-events p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="main-title checkout-title">
                <h1>
                  <strong>
                    {" "}
                    GIỚI THIỆU VỀ <a href="#">SPOTLIGHT</a>
                  </strong>
                </h1>
              </div>
              <div className="about--description">
                <p>
                  <strong>Spotlight - Custom Phụ Kiện Tốt Nghiệp</strong>, là
                  một trang web có thể biến những khoảnh khắc quan trọng thành
                  những kỉ niệm đáng nhớ! Là nơi kết nối các bạn sinh viên đáng
                  yêu và những bên cung cấp các phụ kiện tốt nghiệp được làm
                  riêng theo yêu cầu, sở thích cá nhân, từ mũ tốt nghiệp, dây
                  đeo, đến các phụ kiện đi kèm độc đáo.
                </p>
                <p>
                  Spotlight được thành lập vào năm 2024 bởi những sinh viên đam
                  mê khởi nghiệp , dự án bắt nguồn từ những ước mơ lưu giữ những
                  khoảnh khắc quan trọng của cuộc đời, mang đến sự hạnh phúc và
                  hài lòng cho tất cả mọi người.
                </p>
                <p>
                  Đến với Spotlight, bạn sẽ thỏa sức sáng tạo, được trực tiếp
                  tham gia vào quá trình cá nhân hoá từng phụ kiện để tạo nên
                  thông điệp riêng biệt cho bản thân. Chúng mình tin rằng, mỗi
                  cá tính đều xứng đáng được tôn vinh và tỏa sáng.
                </p>
                <p>
                  Spotlight luôn chú trọng vào việc làm thế nào để tạo ra một
                  môi trường thoải mái nhất, đáp ứng kịp thời về nhu cầu cũng
                  như thị hiếu của khách hàng. Spotlight sẽ luôn làm mới mình để
                  mang đến cho khách hàng sự đầy đủ và đa dạng trong từng sản
                  phẩm, mẫu mã. Một tiện ích nữa mà Spotlight mong muốn mang đến
                  cho khách hàng đó là sự tiện nghi và tiết kiệm tối đa thời
                  gian mua sắm để tìm được những món đồ ưng ý nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="host-engaging-event-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="main-title checkout-title text-center">
                <h3>We are all about enriching communities​</h3>
              </div>
              <div className="communities-steps">
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <a
                      href="#"
                      className="main-card communities-item"
                      data-bs-toggle="modal"
                      data-bs-target="#communitieModal"
                    >
                      <div className="communities-img">
                        <img src="./assets/images/about/img-1.jpg" alt="" />
                      </div>
                      <div className="communities-content">
                        <p>
                          We work with several industry leaders and community
                          groups around Australia and want all of our event
                          organisers to succeed in everything they do. Events
                          are not always easy, but selling tickets online should
                          be.
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <a
                      href="#"
                      className="main-card communities-item"
                      data-bs-toggle="modal"
                      data-bs-target="#communitieModal"
                    >
                      <div className="communities-img">
                        <img src="./assets/images/about/img-2.jpg" alt="" />
                      </div>
                      <div className="communities-content">
                        <p>
                          We are committed to making a positive impact on the
                          community. That's why our pricing structure is set so
                          that everyone can afford to use Barren, and it's why
                          we offer our system free of charge for any free events
                          or registrations.
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <a
                      href="#"
                      className="main-card communities-item"
                      data-bs-toggle="modal"
                      data-bs-target="#communitieModal"
                    >
                      <div className="communities-img">
                        <img src="./assets/images/about/img-3.jpg" alt="" />
                      </div>
                      <div className="communities-content">
                        <p>
                          This provides an additional revenue stream for your
                          charity and allows us to positively contribute to the
                          causes that are important to you and your community.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeatureList />
      <TeamMemberList />
      <AchievementList />
    </div>
  );
}
