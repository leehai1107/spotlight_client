import React from "react";
import { Route, Routes } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import useAuth from "../services/context/useAuth";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import BlankLayout from "../layouts/BlankLayout/BlankLayout";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export default function AppRoutes() {
  const { auth } = useAuth();

  return (
    <>
      <ScrollToTop>
        <Routes>
          {!auth?.role ? (
            <>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
              </Route>
              {/* <BlankLayout /> for signup and signin because no need header or footer */}
              <Route path="/" element={<BlankLayout />}>
                <Route path="signup" element={<SignUpPage />} />
              </Route>
            </>
          ) : !auth?.role === "Admin" ? (
            <></>
          ) : !auth?.role === "User" ? (
            <></>
          ) : !auth?.role === "Provider" ? (
            <></>
          ) : (
            <></>
          )}
            {/* 123345 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );

}
