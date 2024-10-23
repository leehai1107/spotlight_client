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
import CartPage from "../pages/CartPage/CartPage.jsx";
import ViewOrderPage from "../pages/ViewOrderPage/ViewOrderPage.jsx";
import ItemDetailPage from "../pages/ItemDetailPage/ItemDetailPage.jsx";
import PaymentSuccessPage from "../pages/PaymentResultPage/PaymentSuccessPage.jsx";
import PaymentFailurePage from "../pages/PaymentResultPage/PaymentFailurePage.jsx";
import BuyNowPage from "../pages/BuyNowPage/BuyNowPage.jsx";
import CustomizeCheckoutPage from "../pages/CustomizeCheckoutPage/CustomizeCheckoutPage.jsx";
import ViewOrderShopPage from "../pages/ViewOrderShopPage/ViewOrderShopPage";
import ManagerDashboardPage from "../pages/ManagerDashboardPage/ManagerDashboardPage";
import ShopOwnerDashboardPage from "../pages/ShopOwnerDashboardPage/ShopOwnerDashboardPage";
import ItemsPage from "../pages/ItemsPage/ItemsPage";

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
                <Route path="cart" element={<CartPage />} />
                <Route path="items" element={<ItemsPage />} />
                <Route path="items/:itemId" element={<ItemDetailPage />} />
              </Route>
              {/* <BlankLayout /> for signup and signin because no need header or footer */}
              <Route path="/" element={<BlankLayout />}>
                <Route path="signup" element={<SignUpPage />} />
                <Route path="signin" element={<SignInPage />} />
              </Route>
            </>
          ) : auth?.role_id === 1 ? (
            // Admin
            <>
              <Route path="/" element={<ManagerLayout />}>
                <Route index element={<ManagerDashboardPage />} />
                <Route
                  path="account_manager"
                  element={<AccountManagerPage />}
                />
              </Route>
            </>
          ) : auth?.role_id === 2 ? (
            // Shop Owner
            <>
              <Route path="/" element={<ManagerLayout />}>
                <Route index element={<ShopOwnerDashboardPage />} />
                <Route path="create" element={<ShopOwnerCreatePage />} />
                <Route path="view_orders" element={<ViewOrderShopPage />} />
              </Route>
            </>
          ) : auth?.role_id === 3 ? (
            // Customer
            <>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about_us" element={<AboutUsPage />} />
                <Route path="customize" element={<ProductCustomizePage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="buy_now" element={<BuyNowPage />} />
                <Route path="view_orders" element={<ViewOrderPage />} />
                <Route path="paymentSuccess" element={<PaymentSuccessPage />} />
                <Route path="paymentFail" element={<PaymentFailurePage />} />
                <Route path="items" element={<ItemsPage />} />
                <Route path="items/:itemId" element={<ItemDetailPage />} />
                <Route
                  path="customizeCheckout"
                  element={<CustomizeCheckoutPage />}
                />
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
