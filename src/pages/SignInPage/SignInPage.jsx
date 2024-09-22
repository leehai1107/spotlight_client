import React, { useState } from "react";
import { loginAPI } from "../../apis/user";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    Username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Username) {
      newErrors.Username = "Tên đăng nhập là bắt buộc";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
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
    const res = await loginAPI(formData.Username, formData.password);
    // save {res} to local storage
    if (res) {
      localStorage.setItem("token", JSON.stringify(res));
      window.location.href = "/";
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="form-wrapper">
      <div className="app-form">
        <div className="app-form-sidebar">
          <div className="sidebar-sign-logo">
            <a href={"/"}>
              <img src="./assets/images/logo.svg" alt="Logo" />
            </a>
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
                  <a href={"/"}>
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
                    Chưa có tài khoản?
                    <a className="sidebar-register-link" href="/signup">
                      Đăng kí
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-7">
                <div className="registration">
                  <form onSubmit={handleSubmit}>
                    <h2 className="registration-title">
                      <strong>ĐĂNG NHẬP SPOTLIGHT</strong>
                    </h2>
                    <div className="row mt-3">
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Tên Đăng Nhập*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            name="Username"
                            placeholder="Nhập Tên Đăng Nhập"
                            value={formData.Username}
                            onChange={handleChange}
                          />
                          {errors.Username && (
                            <small className="text-danger">
                              {errors.Username}
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
                        <button
                          className="main-btn btn-hover w-100 mt-4"
                          type="submit"
                        >
                          <strong>ĐĂNG NHẬP</strong>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="text-center">
                    <div className="agree-text">
                      Bằng việc <strong>"Đăng Nhập"</strong>, bạn đồng ý với
                      <strong> Spotlight</strong>
                      <br /> <a href="#">Điều khoản &amp; Dịch vụ</a> và{" "}
                      <a href="#">Chính sách Bảo mật</a>.
                    </div>
                  </div>
                  <div className="new-sign-link">
                    Chưa có tài khoản?
                    <a className="signup-link" href="/signup">
                      Đăng kí
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

export default SignInPage;
