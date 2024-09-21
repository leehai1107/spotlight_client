import React, { useState } from "react";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    // Handle sign-in logic here, perhaps calling an API
    console.log("Signing in with:", email, password);
  };

  return (
    <div className="form-wrapper">
      <div className="app-form">
        <div className="app-form-sidebar">
          <div className="sidebar-sign-logo">
            <img src="images/sign-logo.svg" alt="" />
          </div>
          <div className="sign_sidebar_text">
            <h1>
              The Easiest Way to Create Events and Sell More Tickets Online
            </h1>
          </div>
        </div>
        <div className="app-form-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-10">
                <div className="app-top-items">
                  <a href="index.html">
                    <div className="sign-logo" id="logo">
                      <img src="images/logo.svg" alt="" />
                      <img
                        className="logo-inverse"
                        src="images/dark-logo.svg"
                        alt=""
                      />
                    </div>
                  </a>
                  <div className="app-top-right-link">
                    New to Barren?
                    <a className="sidebar-register-link" href="sign_up.html">
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-7">
                <div className="registration">
                  <form>
                    <h2 className="registration-title">Sign in to Barren</h2>
                    <div className="form-group mt-5">
                      <label className="form-label">Your Email*</label>
                      <input
                        className="form-control h_50"
                        type="email"
                        placeholder="Enter your email"
                        defaultValue=""
                      />
                    </div>
                    <div className="form-group mt-4">
                      <div className="field-password">
                        <label className="form-label">Password*</label>
                        <a
                          className="forgot-pass-link"
                          href="forgot_password.html"
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <div className="loc-group position-relative">
                        <input
                          className="form-control h_50"
                          type="password"
                          placeholder="Enter your password"
                        />
                        <span className="pass-show-eye">
                          <i className="fas fa-eye-slash" />
                        </span>
                      </div>
                    </div>
                    <button
                      className="main-btn btn-hover w-100 mt-4"
                      type="button"
                      onclick="window.location.href='index.html'"
                    >
                      Sign In <i className="fas fa-sign-in-alt ms-2" />
                    </button>
                  </form>
                  <div className="divider">
                    <span>or</span>
                  </div>
                  <div className="social-btns-list">
                    <button className="social-login-btn">
                      <svg
                        className="me-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 26.488 27.029"
                      >
                        <g transform="translate(-0.126)">
                          <path
                            d="M1258.806,1021.475a11.578,11.578,0,0,0-.285-2.763h-12.688v5.015h7.448a6.605,6.605,0,0,1-2.763,4.384l-.025.168,4.012,3.108.278.028a13.214,13.214,0,0,0,4.024-9.941"
                            transform="translate(-1232.192 -1007.66)"
                            fill="#4285f4"
                          />
                          <path
                            d="M145.071,1502.921a12.881,12.881,0,0,0,8.949-3.273l-4.265-3.3a8,8,0,0,1-4.685,1.352,8.136,8.136,0,0,1-7.688-5.616l-.158.013-4.172,3.229-.055.152a13.5,13.5,0,0,0,12.073,7.448"
                            transform="translate(-131.431 -1475.893)"
                            fill="#34a853"
                          />
                          <path
                            d="M5.952,689.263a8.32,8.32,0,0,1-.45-2.673,8.744,8.744,0,0,1,.435-2.673l-.008-.179-4.224-3.28-.138.066a13.486,13.486,0,0,0,0,12.133l4.385-3.393"
                            transform="translate(0 -673.076)"
                            fill="#fbbc05"
                          />
                          <path
                            d="M145.071,5.225A7.49,7.49,0,0,1,150.3,7.238l3.814-3.724A12.984,12.984,0,0,0,145.071,0,13.5,13.5,0,0,0,133,7.448l4.37,3.394a8.169,8.169,0,0,1,7.7-5.616"
                            transform="translate(-131.431)"
                            fill="#eb4335"
                          />
                        </g>
                      </svg>
                      Sign in with Google
                    </button>
                    <button className="social-login-btn">
                      <svg
                        className="me-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 27 27"
                      >
                        <g transform="translate(0)">
                          <circle
                            cx="13.5"
                            cy="13.5"
                            r="13.5"
                            transform="translate(0 0)"
                            fill="#3b5998"
                          />
                          <path
                            d="M851.461,383.684h-3.1c-1.841,0-3.889.735-3.889,3.266.009.882,0,1.727,0,2.678h-2.13v3.215h2.2V402.1h4.035v-9.316h2.663l.241-3.163H848.5s.007-1.407,0-1.816c0-1,1.1-.943,1.164-.943.522,0,1.538,0,1.8,0v-3.176Z"
                            transform="translate(-833.401 -379.385)"
                            fill="#fff"
                          />
                        </g>
                      </svg>
                      Sign in with Facebook
                    </button>
                  </div>
                  <div className="new-sign-link">
                    New to Barren?
                    <a className="signup-link" href="sign_up.html">
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-footer">
            © 2022, Barren. All rights reserved. Powered by Gambolthemes
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
