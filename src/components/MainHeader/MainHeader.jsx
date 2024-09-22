import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownProfile from "../DropdownProfile/DropdownProfile";

export default function MainHeader() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isNightMode, setIsNightMode] = useState(false);

  // Load the night mode state from localStorage on mount
  useEffect(() => {
    const nightMode = localStorage.getItem("gmtNightMode");
    if (nightMode) {
      setIsNightMode(true);
      document.documentElement.classList.add("night-mode");
    }
  }, []);

  // Handle night mode toggle
  const handleToggleNightMode = () => {
    const newNightMode = !isNightMode;
    setIsNightMode(newNightMode);
    if (newNightMode) {
      document.documentElement.classList.add("night-mode");
      localStorage.setItem("gmtNightMode", "true");
    } else {
      document.documentElement.classList.remove("night-mode");
      localStorage.removeItem("gmtNightMode");
    }
  };

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-inner">
        <nav className="navbar navbar-expand-lg bg-barren barren-head navbar fixed-top pt-0 pb-0">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon">
                <i
                  className={`fa-${isNightMode ? "solid fa-bars" : "solid"}`}
                />
              </span>
            </button>

            <div
              className="offcanvas offcanvas-start"
              tabIndex={-1}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="close-btn"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={handleClickLogo}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <div className="offcanvas-body">
                {!token ? (
                  <div className="offcanvas-top-area">
                    <div className="create-bg">
                      <a href={"/signin"} className="offcanvas-create-btn">
                        <span>ĐĂNG NHẬP ĐỂ TỎA SÁNG</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <ul className="navbar-nav justify-content-end flex-grow-1 pe_5">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">
                      <strong>TRANG CHỦ</strong>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/explored"
                    >
                      <strong>TÌM KIẾM SẢN PHẨM</strong>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <strong>ĐÁNH GIÁ</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <a className="dropdown-item" href="our_blog.html">
                          SẢN PHẨM THÚ VỊ
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="blog_detail_view.html"
                        >
                          TÌM KIẾM ĐÁNH GIÁ
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <strong>HỖ TRỢ</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <a className="dropdown-item" href="/faq">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/helpCenter">
                          TRUNG TÂM TRỢ GIÚP
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/Contact">
                          LIÊN HỆ SPOTLIGHT
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="offcanvas-footer">
                <div className="offcanvas-social">
                  <h5>
                    <strong>THEO DÕI MẠNG XÃ HỘI</strong>
                  </h5>
                  <ul className="social-links">
                    <li>
                      <a
                        href="https://www.facebook.com/profile.php?id=61566215480958"
                        className="social-link"
                      >
                        <i className="fab fa-facebook-square" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="right-header order-2">
              <ul className="align-self-stretch">
                <li>
                  <a href="/explored" className="create-btn btn-hover">
                    <i className="fa-solid fa-calendar-days" />
                    <span>
                      <strong>MUA NGAY</strong>
                    </span>
                  </a>
                </li>
                {!token ? (
                  <li>
                    <Link to="/signin" className="create-btn btn-hover">
                      <strong>ĐĂNG NHẬP ĐỂ TỎA SÁNG</strong>
                    </Link>
                  </li>
                ) : (
                  <DropdownProfile />
                )}
                <li>
                  <div className="night_mode_switch__btn">
                    <div
                      id="night-mode"
                      className={`fas ${isNightMode ? "fa-moon" : "fa-sun"}`}
                      onClick={handleToggleNightMode}
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
