import React, { useEffect, useState } from "react";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import { useDispatch } from "react-redux";
import { collapseMenu, toggleMenu } from "../../redux/slice/menuSlice";
import { menuItems } from ".";
import DropdownProfileManager from "../DropdownProfileManager/DropdownProfileManager";

export default function ManagerHeader() {
  const [isNightMode, setIsNightMode] = useState(false);

  const dispatch = useDispatch();

  // Minify menu

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

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <nav className="navbar navbar-expand-lg bg-barren barren-head navbar fixed-top justify-content-sm-start pt-0 pb-0 ps-lg-0 pe-2">
            <div className="container-fluid ps-0">
              {/* Trigger Redux actions */}
              <button
                onClick={() => dispatch(toggleMenu())}
                className="toggle_menu"
              >
                <i className="fa-solid fa-bars-staggered"></i>
              </button>
              <button
                onClick={() => dispatch(collapseMenu())}
                className="collapse_menu"
              >
                <i className="fa-solid fa-bars collapse_menu--icon"></i>
                <span className="collapse_menu--label"></span>
              </button>
              <button
                className="navbar-toggler order-3 ms-2 pe-0"
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
              <a
                className="navbar-brand order-1 order-lg-0 ml-lg-0 ml-2 me-auto"
                href="index.html"
              >
                <div className="res-main-logo">
                  <img src="images/logo-icon.svg" alt="" />
                </div>
                <div className="main-logo" id="logo">
                  <img src="images/logo.svg" alt="" />
                  <img
                    className="logo-inverse"
                    src="images/dark-logo.svg"
                    alt=""
                  />
                </div>
              </a>
              <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header">
                  <div className="offcanvas-logo" id="offcanvasNavbarLabel">
                    <img src="images/logo-icon.svg" alt="" />
                  </div>
                  <button
                    type="button"
                    className="close-btn"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
                <div className="offcanvas-body">
                  <div className="offcanvas-top-area">
                    <div className="create-bg">
                      <a href="create.html" className="offcanvas-create-btn">
                        <i className="fa-solid fa-calendar-days" />
                        <span>Thêm Sản Phẩm</span>
                      </a>
                    </div>
                  </div>
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe_5">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="organiser_profile_view.html"
                      >
                        <i className="fa-solid fa-right-left me-2" />
                        Trang Chủ
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="explore_events.html">
                        <i className="fa-solid fa-compass me-2" />
                        Explore Events
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="offcanvas-footer">
                  <div className="offcanvas-social">
                    <h5>Follow Us</h5>
                    <ul className="social-links">
                      <li>
                        <a href="#" className="social-link">
                          <i className="fab fa-facebook-square" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-link">
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-link">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-link">
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-link">
                          <i className="fab fa-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="right-header order-2">
                <ul className="align-self-stretch">
                  <li>
                    <a href="create.html" className="create-btn btn-hover">
                      <i className="fa-solid fa-calendar-days" />
                      <span>Thêm Sản Phẩm</span>
                    </a>
                  </li>
                  <DropdownProfileManager />
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
          <div className="overlay" />
        </div>
      </header>
      <LeftSidebar menuItems={menuItems} />
    </>
  );
}
