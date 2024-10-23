import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { clearCartPayment } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrderAPI } from "../../apis/order";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const token = localStorage.getItem("token");
  let userId = null;
  userId = parsedToken.user_id;

  // Use useEffect to handle setting user details on component mount
  useEffect(() => {
    if (token) {
      const parsedToken = JSON.parse(atob(token.split(".")[1]));
      setFirstName(parsedToken.firstname);
      setAddress(parsedToken.address);
      setLastName(parsedToken.lastname);
      setPhoneNumber(parsedToken.phone);
    }
  }, [token]); // The empty array ensures this runs once after the initial render

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Không có sản phẩm trong giỏ hàng");
      return;
    }

    if (cartItems.length > 0 && token === null) {
      navigate("/signin");
      return;
    }

    // Validate required fields
    if (!firstName || !lastName || !phoneNumber || !address) {
      toast.error("Vui lòng điền đầy đủ thông tin nhận hàng");
      return;
    }

    const orderData = {
      customer_id: userId,
      total_price: cartItems.reduce(
        (sum, item) => sum + item.price * item.selectedQuantity,
        0
      ),
      customer_address: address,
      customer_name: `${firstName} ${lastName}`,
      customer_phone: phoneNumber,
      items: cartItems.map((item) => ({
        item_id: item.item_id,
        item_name: item.name,
        item_price: item.price,
        item_quantity: item.selectedQuantity,
        color_id: item.selectedColor.color_id,
        size_id: item.selectedSize.size_id,
      })),
      image_url: cartItems[0].image_url,
    };

    try {
      const response = await createOrderAPI(orderData);
      dispatch(clearCartPayment());
      window.location.href = response.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="hero-banner">
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="main-title checkout-title">
                  <h3>Giỏ Hàng 🛒</h3>
                </div>
              </div>
              <div className="col-xl-8 col-lg-12 col-md-12">
                <div className="main-card mt-5">
                  <div className="bp-title">
                    <h4>Danh sách sản phẩm</h4>
                    <div className="bp-content bp-form">
                      <div className="row">
                        {cartItems.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="checkout-block">
                  <div className="main-card">
                    <div className="bp-title">
                      <h4>Thông tin đơn hàng</h4>
                    </div>
                    <div className="bp-content bp-form">
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <div className="form-group mt-4">
                            <label className="form-label">Họ*</label>
                            <input
                              className="form-control h_50"
                              type="text"
                              placeholder=""
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <div className="form-group mt-4">
                            <label className="form-label">Tên*</label>
                            <input
                              className="form-control h_50"
                              type="text"
                              placeholder=""
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <div className="form-group mt-4">
                            <label className="form-label">Số Điện Thoại*</label>
                            <input
                              className="form-control h_50"
                              type="text"
                              placeholder="Nhập SĐT nhận hàng"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <div className="form-group mt-4">
                            <label className="form-label">Địa Chỉ*</label>
                            <input
                              className="form-control h_50"
                              type="text"
                              placeholder="Nhập Địa Chỉ nhận hàng"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12">
                {/* Order Summary and Checkout */}
                <div className="main-card order-summary">
                  <div className="bp-title">
                    <h4>Thông tin thanh toán</h4>
                  </div>
                  <div className="order-summary-content p_30">
                    {/* Rendered Cart Items and Order Total */}
                    <div className="order-total-dt">
                      <div className="order-text">Số Lượng</div>
                      <div className="order-number">
                        {cartItems.reduce(
                          (sum, item) => sum + item.selectedQuantity,
                          0
                        )}
                      </div>
                    </div>
                    <div className="order-total-dt2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="order-text2">
                          <div className="row col-12">
                            <div className="col-4">
                              <p>{item.name}</p>
                            </div>
                            <div className="col-4">
                              <p>
                                <strong>
                                  {item.price.toLocaleString("vi-VN")} VNĐ
                                </strong>
                              </p>
                            </div>
                            <div className="col-4">
                              <p> x{item.selectedQuantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-total-dt">
                      <div className="order-text">Tạm Tính</div>
                      <div className="order-number">
                        {cartItems
                          .reduce(
                            (sum, item) =>
                              sum + item.price * item.selectedQuantity,
                            0
                          )
                          .toLocaleString("vi-VN")}{" "}
                        VNĐ
                      </div>
                    </div>
                    <div className="divider-line" />
                    <div className="order-total-dt">
                      <div className="order-text">Tổng</div>
                      <div className="order-number ttl-clr">
                        {cartItems
                          .reduce(
                            (sum, item) =>
                              sum + item.price * item.selectedQuantity,
                            0
                          )
                          .toLocaleString("vi-VN")}{" "}
                        VNĐ
                      </div>
                    </div>
                    <div className="confirmation-btn">
                      <button
                        className="main-btn btn-hover h_50 w-100 mt-5"
                        type="button"
                        onClick={handleCheckout}
                      >
                        Thanh Toán
                      </button>
                      <span>Kiểm tra kỹ thông tin trước khi thanh toán!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
