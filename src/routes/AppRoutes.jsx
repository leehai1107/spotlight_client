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
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import ManagerLayout from "../layouts/ManagerLayout/ManagerLayout";
import ShopOwnerPage from "../pages/ShopOwnerPage/ShopOwnerPage";

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
                <Route path="about_us" element={<AboutUsPage />} />
              </Route>
              {/* <BlankLayout /> for signup and signin because no need header or footer */}
              <Route path="/" element={<BlankLayout />}>
                <Route path="signup" element={<SignUpPage />} />
                <Route path="signin" element={<SignInPage />} />
              </Route>
              <Route path="/" element={<ManagerLayout />}>
                <Route path="manager" element={<ShopOwnerPage />} />
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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}
