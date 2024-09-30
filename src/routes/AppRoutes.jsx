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
import AccountManagerPage from "../pages/AccountManagerPage/AccountManagerPage";
import ShopOwnerCreatePage from "../pages/ShopOwnerCreatePage/ShopOwnerCreatePage";
import ProductCustomizePage from "../pages/ProductCustomizePage/ProductCustomizePage.jsx";

export default function AppRoutes() {
  const { auth } = useAuth();

  return (
    <>
      <ScrollToTop>
        <Routes>
          {!auth?.role_id ? (
            <>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about_us" element={<AboutUsPage />} />
                <Route path="customize" element={<ProductCustomizePage />} />
              </Route>
              {/* <BlankLayout /> for signup and signin because no need header or footer */}
              <Route path="/" element={<BlankLayout />}>
                <Route path="signup" element={<SignUpPage />} />
                <Route path="signin" element={<SignInPage />} />
              </Route>
              <Route path="/" element={<ManagerLayout />}>
                <Route path="shop_owner_product" element={<ShopOwnerCreatePage />} />
              </Route>
            </>
          ) : auth?.role_id === 1 ? (
            // Admin
            <>
              <Route path="/" element={<ManagerLayout />}>
                <Route index element={<AccountManagerPage />} />
              </Route>
            </>
          ) : auth?.role_id === 2 ? (
            // Shop Owner
            <>
              <Route path="/" element={<ManagerLayout />}>
                <Route index element={<ShopOwnerCreatePage />} />
              </Route>
            </>
          ) : auth?.role_id === 3 ? (
            // Customer
            <>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about_us" element={<AboutUsPage />} />
              </Route>
            </>
          ) : (
            <></>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}
