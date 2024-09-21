import React from "react";

export default function MainFooter() {
  return (
    <footer className="footer mt-auto">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-content">
                <h4>
                  <strong>SPOTLIGHT🎓</strong>
                </h4>
                <ul className="footer-link-list">
                  <li>
                    <a href="about_us" className="footer-link">
                      Về Chúng Tôi
                    </a>
                  </li>
                  <li>
                    <a href="help_center.html" className="footer-link">
                      Trung Tâm Hỗ Trợ
                    </a>
                  </li>
                  <li>
                    <a href="faq.html" className="footer-link">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=61566215480958"
                      className="footer-link"
                      target="_blank"
                    >
                      Liên Hệ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-content">
                <h4>
                  <strong>DỊCH VỤ</strong>
                </h4>
                <ul className="footer-link-list">
                  <li>
                    <a href="create.html" className="footer-link">
                      Sản Phẩm Nổi Bật
                    </a>
                  </li>
                  <li>
                    <a href="sell_tickets_online.html" className="footer-link">
                      Cửa Hàng Nổi Bật
                    </a>
                  </li>
                  <li>
                    <a href="privacy_policy.html" className="footer-link">
                      Chính Sách Bảo Mật
                    </a>
                  </li>
                  <li>
                    <a href="term_and_conditions.html" className="footer-link">
                      Điều Khoản &amp; Dịch Vụ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-content">
                <h4>
                  <strong>TRƯỜNG ĐẠI HỌC FPT</strong>
                </h4>
                <ul className="footer-link-list">
                  <li>
                    <a
                      href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+FPT+TP.+HCM/@10.8410472,106.8073398,17.41z/data=!4m14!1m7!3m6!1s0x31752731176b07b1:0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_!3m5!1s0x31752731176b07b1:0xb752b24b379bae5e!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_?hl=vi-VN&entry=ttu"
                      className="footer-link"
                      target="_blank"
                    >
                      Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ,
                      Tp. Thủ Đức, TP.HCM.
                    </a>
                  </li>
                  <li>
                    <a className="phone" href="tel:(028)73005588">
                      (028) 7300 5588
                    </a>
                  </li>
                  <li>
                    <a className="mail" href="mailto:daihoc.hcm@fpt.edu.vn">
                      daihoc.hcm@fpt.edu.vn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-content">
                <h4>
                  <strong>THEO DÕI MẠNG XÃ HỘI</strong>
                </h4>
                <ul className="social-links">
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=61566215480958"
                      className="social-link"
                      target="_blank"
                    >
                      <i className="fab fa-facebook-square" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-copyright-text">
                <p className="mb-0">
                  © {new Date().getFullYear()}, <strong>Spotlight</strong>. All
                  rights reserved. Powered by FPT University.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
