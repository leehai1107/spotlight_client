import React from "react";
import { Route, Routes } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import useAuth from "../services/context/useAuth";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MainLayout from "../layouts/MainLayout/MainLayout";

export default function AppRoutes() {
  const { auth } = useAuth();

  return (
    <>
      <ScrollToTop>
        <Routes>
          {!auth?.role ? (
            <>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<div>Not thing here!</div>} />
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
