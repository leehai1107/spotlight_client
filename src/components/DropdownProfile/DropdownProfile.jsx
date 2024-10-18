import React from "react";
import { useNavigate } from "react-router-dom";

export default function DropdownProfile() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const username = JSON.parse(atob(token.split(".")[1])).username;
  const firstname = JSON.parse(atob(token.split(".")[1])).firstname;
  const lastname = JSON.parse(atob(token.split(".")[1])).lastname;
  const email = JSON.parse(atob(token.split(".")[1])).email;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <li className="dropdown account-dropdown">
      <a
        href="#"
        className="account-link"
        role="button"
        id="accountClick"
        data-bs-auto-close="outside"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src="./assets/images/profile-imgs/img-13.jpg" alt="" />
        <i className="fas fa-caret-down arrow-icon" />
      </a>
      <ul
        className="dropdown-menu dropdown-menu-account dropdown-menu-end"
        aria-labelledby="accountClick"
      >
        <li>
          <div className="dropdown-account-header">
            <div className="account-holder-avatar">
              <img src="./assets/images/profile-imgs/img-13.jpg" alt="" />
            </div>
            <h5>
              {firstname} {lastname}
            </h5>
            <p>{email}</p>
          </div>
        </li>
        <li className="profile-link">
          <a href="organiser_profile_view.html" className="link-item">
            Hồ Sơ
          </a>
          <a href={() => navigate("/view_orders")} className="link-item">
            Lịch Sử Mua Hàng
          </a>
          <a href="#" className="link-item" onClick={logout}>
            Đăng Xuất
          </a>
        </li>
      </ul>
    </li>
  );
}
