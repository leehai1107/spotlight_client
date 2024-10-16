import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemByIdAPI } from "../../apis/items";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { selectBuyNowItem } from "../../redux/slice/buynowSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const fetchItemDetail = async () => {
    try {
      const data = await getItemByIdAPI(itemId);
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItemDetail();
  }, [itemId]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.warning("Hãy lựa chọn màu sắc và kích thước cho sản phẩm!");
      return;
    }

    dispatch(
      addToCart({
        ...item,
        selectedColor,
        selectedSize,
        selectedQuantity,
        stockQuantity: item.quantity,
      })
    );
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      toast.warning("Hãy lựa chọn màu sắc và kích thước cho sản phẩm!");
      return;
    }
    if (token === null) {
      navigate("/signin");
      return;
    } else {
      navigate("/buy_now");
    }

    dispatch(
      selectBuyNowItem({
        ...item,
        selectedColor,
        selectedSize,
        selectedQuantity,
        stockQuantity: item.quantity,
      })
    );
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && selectedQuantity < item.quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    } else if (type === "decrease" && selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  return (
    <>
      <div className="breadcrumb-block"></div>
      <div className="event-dt-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="event-top-dts">
                <div className="event-top-dt">
                  <h3 className="event-main-title">{item.name}</h3>
                  <div className="event-top-info-status">
                    <span className="event-type-name">
                      <i className="fa-solid fa-location-dot" />
                      {item?.shop?.shop_name || "Chưa xác định"}
                    </span>
                    <span className="event-type-name details-hr">
                      Địa chỉ{": "}
                      <span className="ev-event-date">
                        {item?.shop?.address || "Đang tải dữ liệu"}
                      </span>
                    </span>
                    <span className="event-type-name details-hr">
                      SĐT: {item?.shop?.phone || "Đang tải dữ liệu"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-12">
              <div className="main-event-dt">
                <div className="event-img">
                  <img src={item.image_url} alt="" />
                </div>
                <div className="main-event-content">
                  <h4>Mô Tả Về Sản Phẩm</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-12">
              <div className="main-card event-right-dt">
                <div className="bp-title">
                  <h4>Thông Tin Cửa Hàng</h4>
                </div>
                <div className="event-dt-right-group mt-5">
                  <div className="event-dt-right-icon">
                    <i className="fa-solid fa-circle-user" />
                  </div>
                  <div className="event-dt-right-content">
                    <h4>Tên Cửa Hàng</h4>
                    <h5>{item?.shop?.shop_name || "Đang tải dữ liệu"}</h5>
                  </div>
                </div>
                <div className="event-dt-right-group">
                  <div className="event-dt-right-icon">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div className="event-dt-right-content">
                    <h4>Số Điện Thoại</h4>
                    <h5>{item?.shop?.phone || "Đang tải dữ liệu"}</h5>
                  </div>
                </div>
                <div className="event-dt-right-group">
                  <div className="event-dt-right-icon">
                    <i className="fa-solid fa-location-dot" />
                  </div>
                  <div className="event-dt-right-content">
                    <h4>Địa Chỉ</h4>
                    <h5 className="mb-0">
                      {item?.shop?.address || "Đang tải dữ liệu"}
                    </h5>
                  </div>
                </div>
                <div className="event-dt-right-group">
                  <div className="event-dt-right-icon">
                    <i className="fa-solid fa-list" />
                  </div>
                  <div className="event-dt-right-content">
                    <h4>Về Cửa Hàng</h4>
                    <h5>{item?.shop?.description || "Đang tải dữ liệu"}</h5>
                  </div>
                </div>
                <div className="select-tickets-block">
                  <div>
                    <h5>Màu Sắc</h5>
                    <div className="select-ticket-action">
                      <div className="controls">
                        {item.colors?.map((color) => (
                          <button
                            key={color.color_id}
                            className={`control ${
                              selectedColor?.color_id === color.color_id
                                ? "active"
                                : ""
                            }`}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color.color_label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5>Kích Thước</h5>
                    <div className="select-ticket-action">
                      <div className="controls">
                        {item.sizes?.map((size) => (
                          <button
                            key={size.size_id}
                            className={`control ${
                              selectedSize?.size_id === size.size_id
                                ? "active"
                                : ""
                            }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size.size_label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="select-tickets-block">
                  <div className="select-ticket-action">
                    <div className="ticket-price">
                      {item.price?.toLocaleString("vi-VN")} VND
                    </div>
                    <div className="quantity">
                      <div className="counter">
                        <span
                          className="down"
                          onClick={() => handleQuantityChange("decrease")}
                        >
                          -
                        </span>
                        <input type="text" value={selectedQuantity} readOnly />
                        <span
                          className="up"
                          onClick={() => handleQuantityChange("increase")}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                  <p>Số lượng còn lại trong kho: {item.quantity} sản phẩm</p>
                </div>
                <div className="select-tickets-block">
                  <div className="select-ticket-action">
                    <div className="booking-btn">
                      <a
                        href="#"
                        className="main-btn btn-hover w-100"
                        onClick={() => handleBuyNow(item)}
                      >
                        Mua Ngay
                      </a>
                    </div>
                    <div className="booking-btn quantity">
                      <a
                        href="#"
                        className="main-btn-secondary btn-hover w-100"
                        onClick={() => {
                          handleAddToCart(item);
                        }}
                      >
                        Thêm Vào Giỏ Hàng
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="more-events">
                <div className="main-title position-relative">
                  <h3>Gợi Ý Cho Bạn</h3>
                  <a href="explore_events.html" className="view-all-link">
                    Xem Tất Cả
                    <i className="fa-solid fa-right-long ms-2" />
                  </a>
                </div>
                {/* Implement slider later */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
