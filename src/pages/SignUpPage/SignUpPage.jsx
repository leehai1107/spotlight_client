import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSeller, setIsSeller] = useState(false); // State to track whether the user is a seller
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    shopAddress: "",
    shopPhone: "",
    shopDescription: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsSeller(e.target.checked);
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)/;

    if (!formData.firstName) {
      newErrors.firstName = "Họ là bắt buộc";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Tên là bắt buộc";
    }

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.username) {
      newErrors.username = "Tên đăng nhập là bắt buộc";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 1 chữ cái viết hoa, 1 ký tự đặc biệt và 1 số";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không giống nhau";
    }

    if (isSeller) {
      // Additional validation for shop-related fields
      if (!formData.shopName) {
        newErrors.shopName = "Tên shop là bắt buộc";
      }
      if (!formData.shopAddress) {
        newErrors.shopAddress = "Địa chỉ shop là bắt buộc";
      }
      if (!formData.shopPhone) {
        newErrors.shopPhone = "Số điện thoại shop là bắt buộc";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    // Handle form submission logic here
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="form-wrapper">
      <div className="app-form">
        <div className="app-form-sidebar">
          <div className="sidebar-sign-logo">
            <img src="./assets/images/logo.svg" alt="Logo" />
          </div>
          <div className="sign_sidebar_text">
            <h1>
              Tự Tin Tỏa Sáng <br />
              Trong Ngày Tốt Nghiệp Cùng
              <br /> Spotlight🎓
            </h1>
          </div>
        </div>
        <div className="app-form-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-10">
                <div className="app-top-items">
                  <a href="/">
                    <div className="sign-logo" id="logo">
                      <img src="./assets/images/logo.svg" alt="Logo" />
                      <img
                        className="logo-inverse"
                        src="images/dark-logo.svg"
                        alt="Logo Inverse"
                      />
                    </div>
                  </a>
                  <div className="app-top-right-link">
                    Đã có tài khoản?
                    <a className="sidebar-register-link" href="/signin">
                      Đăng nhập
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-7">
                <div className="registration">
                  <form onSubmit={handleSubmit}>
                    <h2 className="registration-title">
                      <strong>ĐĂNG KÍ SPOTLIGHT</strong>
                    </h2>
                    <div className="row mt-3">
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <label class="switch">
                            <input
                              type="checkbox"
                              checked={isSeller}
                              onChange={handleCheckboxChange}
                            />
                            <span class="slider round ">
                              <span class="option-left">Người Mua</span>
                              <span class="option-right">Người Bán</span>
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Họ*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            name="firstName"
                            placeholder="Nhập Họ"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                          {errors.firstName && (
                            <small className="text-danger">
                              {errors.firstName}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Tên*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            name="lastName"
                            placeholder="Nhập Tên"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                          {errors.lastName && (
                            <small className="text-danger">
                              {errors.lastName}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Email*</label>
                          <input
                            className="form-control h_50"
                            type="email"
                            name="email"
                            placeholder="Nhập Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <small className="text-danger">
                              {errors.email}
                            </small>
                          )}
                        </div>
                        <div className="form-group mt-4">
                          <label className="form-label">Số điện thoại*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            name="phone"
                            placeholder="Nhập Số Điện Thoại"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && (
                            <small className="text-danger">
                              {errors.phone}
                            </small>
                          )}
                        </div>
                        <div className="form-group mt-4">
                          <label className="form-label">Tên Đăng Nhập*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            name="username"
                            placeholder="Nhập Tên Đăng Nhập"
                            value={formData.username}
                            onChange={handleChange}
                          />
                          {errors.username && (
                            <small className="text-danger">
                              {errors.username}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <div className="field-password">
                            <label className="form-label">Mật Khẩu*</label>
                          </div>
                          <div className="loc-group position-relative">
                            <input
                              className="form-control h_50"
                              type={passwordVisible ? "text" : "password"}
                              name="password"
                              placeholder="Nhập Mật Khẩu"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <span
                              className="pass-show-eye"
                              onClick={togglePasswordVisibility}
                            >
                              <i
                                className={
                                  passwordVisible
                                    ? "fas fa-eye"
                                    : "fas fa-eye-slash"
                                }
                              ></i>
                            </span>
                          </div>
                          {errors.password && (
                            <small className="text-danger">
                              {errors.password}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">
                            Xác Nhận Mật Khẩu*
                          </label>
                          <div className="loc-group position-relative">
                            <input
                              className="form-control h_50"
                              type={
                                confirmPasswordVisible ? "text" : "password"
                              }
                              name="confirmPassword"
                              placeholder="Xác Nhận Mật Khẩu"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                            <span
                              className="pass-show-eye"
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              <i
                                className={
                                  confirmPasswordVisible
                                    ? "fas fa-eye"
                                    : "fas fa-eye-slash"
                                }
                              ></i>
                            </span>
                          </div>

                          {errors.confirmPassword && (
                            <small className="text-danger">
                              {errors.confirmPassword}
                            </small>
                          )}
                        </div>
                      </div>
                      {isSeller && (
                        <>
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group mt-4">
                              <label className="form-label">Tên Shop*</label>
                              <input
                                className="form-control h_50"
                                type="text"
                                name="shopName"
                                placeholder="Nhập Tên Shop"
                                value={formData.shopName}
                                onChange={handleChange}
                              />
                              {errors.shopName && (
                                <small className="text-danger">
                                  {errors.shopName}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group mt-4">
                              <label className="form-label">
                                Địa Chỉ Shop*
                              </label>
                              <input
                                className="form-control h_50"
                                type="text"
                                name="shopAddress"
                                placeholder="Nhập Địa Chỉ Shop"
                                value={formData.shopAddress}
                                onChange={handleChange}
                              />
                              {errors.shopAddress && (
                                <small className="text-danger">
                                  {errors.shopAddress}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group mt-4">
                              <label className="form-label">
                                Số Điện Thoại Shop*
                              </label>
                              <input
                                className="form-control h_50"
                                type="text"
                                name="shopPhone"
                                placeholder="Nhập Số Điện Thoại Shop"
                                value={formData.shopPhone}
                                onChange={handleChange}
                              />
                              {errors.shopPhone && (
                                <small className="text-danger">
                                  {errors.shopPhone}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group mt-4">
                              <label className="form-label">Mô Tả Shop</label>
                              <textarea
                                className="form-control"
                                name="shopDescription"
                                placeholder="Nhập Mô Tả Shop"
                                value={formData.shopDescription}
                                onChange={handleChange}
                                rows={4}
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="col-lg-12 col-md-12">
                        <button
                          className="main-btn btn-hover w-100 mt-4"
                          type="submit"
                        >
                          <strong>ĐĂNG KÍ</strong>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="text-center">
                    <div className="agree-text">
                      Bằng việc <strong>"Đăng Kí"</strong>, bạn đồng ý với
                      <strong> Spotlight</strong>
                      <br /> <a href="#">Điều khoản &amp; Dịch vụ</a> và{" "}
                      <a href="#">Chính sách Bảo mật</a>.
                    </div>
                  </div>
                  <div className="new-sign-link">
                    Đã có tài khoản?
                    <a className="signup-link" href="/signin">
                      Đăng nhập
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-footer">
            © {new Date().getFullYear()}, <strong>Spotlight</strong>. All rights
            reserved. Powered by FPT University.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
