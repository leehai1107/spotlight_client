import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrderAPI } from "../../apis/order";
import CustomizeItemCheckout from "../../components/CustomizeItemCheckout/CustomizeItemCheckout";
import { clearCustomizeItem } from "../../redux/slice/customizeSlice";
import { deleteImage } from "../../services/firebase/UploadImageSvc";

export default function CustomizeCheckoutPage() {
  const dispatch = useDispatch();
  const customizeItem = useSelector((state) => state.customize.selectedItem);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    userId = JSON.parse(atob(token.split(".")[1])).user_id;
  }
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
    if (token === null) {
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
      total_price:
        customizeItem.price * customizeItem.selectedQuantity +
        (customizeItem?.customizations.reduce(
          (sum, item) => sum + item.price_adjustment,
          0
        ) || 0),
      customer_address: address,
      customer_name: `${firstName} ${lastName}`,
      customer_phone: phoneNumber,
      items: [
        {
          item_id: customizeItem.item_id,
          item_name: customizeItem.name,
          item_price: customizeItem.price,
          item_quantity: customizeItem.selectedQuantity,
          color_id: customizeItem.selectedColorId,
          size_id: customizeItem.selectedSizeId,
        },
      ],
      image_url: customizeItem.image_final,
      customizations: customizeItem.customizations,
    };

    try {
      const response = await createOrderAPI(orderData);
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
                  <h3>Đơn Hàng 📃</h3>
                </div>
              </div>
              <div className="col-xl-8 col-lg-12 col-md-12">
                <div className="main-card mt-5">
                  <div className="bp-title">
                    <h4>Thông tin sản phẩm</h4>
                    <div className="bp-content bp-form">
                      <div className="row">
                        <CustomizeItemCheckout item={customizeItem} />
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
                <div className="">
                  <img src={customizeItem.image_final} alt="" />
                </div>
                {/* Order Summary and Checkout */}
                <div className="main-card order-summary">
                  <div className="bp-title">
                    <h4>Thông tin thanh toán</h4>
                  </div>
                  <div className="order-summary-content p_30">
                    {/* Rendered Cart Items and Order Total */}
                    <div className="order-total-dt">
                      <div className="order-text">Sản Phẩm</div>
                      <div className="order-number">
                        {customizeItem.selectedQuantity +
                          customizeItem?.customizations.length}
                      </div>
                    </div>
                    <div className="order-total-dt2">
                      {
                        <div
                          key={customizeItem.item_id}
                          className="order-text2"
                        >
                          <div className="row col-12">
                            <div className="col-4">
                              <p>{customizeItem.name}</p>
                            </div>
                            <div className="col-4">
                              <p>
                                <strong>
                                  {customizeItem.price.toLocaleString("vi-VN")}{" "}
                                  VNĐ
                                </strong>
                              </p>
                            </div>
                            <div className="col-4">
                              <p> x{customizeItem.selectedQuantity}</p>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                    {customizeItem?.customizations.map((item) => (
                      <div className="order-total-dt2">
                        {
                          <div className="order-text2">
                            <div className="row col-12">
                              <div className="col-4">
                                <p>{item.description}</p>
                              </div>
                              <div className="col-4">
                                <p>
                                  <strong>
                                    {item.price_adjustment.toLocaleString(
                                      "vi-VN"
                                    )}{" "}
                                    VNĐ
                                  </strong>
                                </p>
                              </div>
                              <div className="col-4"></div>
                            </div>
                          </div>
                        }
                      </div>
                    ))}
                    <div className="order-total-dt">
                      <div className="order-text">Tạm Tính</div>
                      <div className="order-number">
                        {(
                          customizeItem.price * customizeItem.selectedQuantity +
                          (customizeItem?.customizations.reduce(
                            (sum, item) => sum + item.price_adjustment,
                            0
                          ) || 0)
                        ).toLocaleString("vi-VN")}{" "}
                        VNĐ
                      </div>
                    </div>
                    <div className="divider-line" />
                    <div className="order-total-dt">
                      <div className="order-text">Tổng</div>
                      <div className="order-number ttl-clr">
                        {(
                          customizeItem.price * customizeItem.selectedQuantity +
                          (customizeItem?.customizations.reduce(
                            (sum, item) => sum + item.price_adjustment,
                            0
                          ) || 0)
                        ).toLocaleString("vi-VN")}{" "}
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
