import { Image } from "antd";
import React, { useState } from "react";
import { convertUnixToDateTime } from "../../utils/time";

export default function OrderItem({ order }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Helper function to determine order status label and badge class
  const getOrderStatus = (status) => {
    if (status === null) {
      return { label: "Đang xử lý", className: "bg-warning" };
    } else if (status === "1") {
      return { label: "Thành công", className: "bg-success" };
    } else if (status === "0") {
      return { label: "Thất bại", className: "bg-danger" };
    }
    return { label: "Chưa rõ", className: "bg-secondary" }; // fallback for unexpected cases
  };

  const getPaymentStatus = (status) => {
    if (status === null) {
      return { label: "Chưa thanh toán", className: "bg-warning" };
    } else if (status === "1") {
      return { label: "Đã thanh toán", className: "bg-success" };
    } else if (status === "0") {
      return { label: "Hủy thanh toán", className: "bg-danger" };
    }
    return { label: "Chưa rõ", className: "bg-secondary" }; // fallback for unexpected cases
  };

  const getShippingStatus = (status) => {
    if (status === null) {
      return { label: "Đang xử lý", className: "bg-warning" };
    } else if (status === "1") {
      return { label: "Đã giao hàng", className: "bg-success" };
    } else if (status === "0") {
      return { label: "Giao thất bại", className: "bg-danger" };
    }
    return { label: "Chưa rõ", className: "bg-secondary" }; // fallback for unexpected cases
  };

  const orderStatus = getOrderStatus(order.order_status);
  const paymentStatus = getPaymentStatus(order.payment_status);
  const shippingStatus = getShippingStatus(order.shipping_status);


  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center gap-5">
        <Image
          src={order.image_url}
          alt={`Order ${order.order_id}`}
          height={"10rem"}
          width={"10rem"}
        />
        <div className="row">
          <div className="col-md-2 row">
            <p className="mb-1">
              <strong>Mã đơn hàng:</strong>
            </p>
            <p>ORD{order.order_id}</p>
          </div>
          <div className="col-md-2 row">
            <p className="mb-1">
              <strong>Đặt lúc:</strong>{" "}
            </p>
            <p>{convertUnixToDateTime(order.order_at)}</p>
          </div>
          <div className="col-md-2 row">
            <strong>
              <p>Tổng tiền:</p>
            </strong>
            <p>{order.total_price.toLocaleString("vi-VN")}VNĐ</p>
          </div>
          <div className="col-md-2">
            <p className="mb-1">
              <strong>Tình trạng đơn hàng:</strong>
            </p>
            <span className={`badge ${orderStatus.className}`}>
              {orderStatus.label}
            </span>
            {order.order_status === "0" && (
              <p className="text-danger">{order.response}</p>
            )}
          </div>
          <div className="col-md-2">
            <p className="mb-1">
              <strong>Tình trạng thanh toán:</strong>
            </p>
            <span className={`badge ${paymentStatus.className}`}>
              {paymentStatus.label}
            </span>
          </div>
          <div className="col-md-2">
            <p className="mb-1">
              <strong>Tình trạng giao hàng:</strong>
            </p>
            <span className={`badge ${shippingStatus.className}`}>
              {shippingStatus.label}
            </span>
          </div>
        </div>
        <button
          className="main-btn-third btn-primary ms-auto"
          onClick={toggleDetails}
        >
          {showDetails ? (
            <i class="fa fa-chevron-up" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
          )}
        </button>
      </div>

      {showDetails && (
        <div className="card-body d-flex justify-content-around gap-5">
          <div className="ms-1 row">
            <h5>Thông tin khách hàng</h5>
            <p>
              <strong>Tên:</strong> {order.customer_name}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.customer_address}
            </p>
            <p>
              <strong>SĐT:</strong> {order.customer_phone}
            </p>
          </div>
          <div className="ms-1">
            {order.items.length > 0 && (
              <>
                <h5>Sản phẩm</h5>
                {order.items.map((item) => (
                  <div
                    key={item.item_id}
                    className="d-flex align-items-start mb-3 ms-1"
                  >
                    <Image
                      src={item.image_url}
                      width={"5rem"}
                      height={"5rem"}
                    />
                    <div className="ms-3 row">
                      <div className="col-md-4 row">
                        <p className="mb-1">
                          <strong>Tên:</strong> {item.name}
                        </p>
                        <p className="mb-1">
                          <strong>Phân loại:</strong>{" "}
                          {item.category.category_name}
                        </p>
                        <p className="mb-1">
                          <strong>Giá:</strong>{" "}
                          {item.price.toLocaleString("vi-VN")} VNĐ
                        </p>
                        <p className="mb-1">
                          <strong>Số lượng:</strong> {item.item_quantity}
                        </p>
                      </div>
                      <div className="col-md-4 row">
                        <p className="mb-1">
                          <strong>Màu sắc:</strong> {item.color.color_label}
                        </p>
                        <p className="mb-1">
                          <strong>Kích thước:</strong> {item.size.size_label}
                        </p>
                      </div>
                      <div className="col-md-4 row">
                        <p className="mb-1">
                          <strong>Shop:</strong> {item.shop.shop_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="ms-1">
            {order.customizations.length > 0 && (
              <>
                <h5>Phụ kiện</h5>
                {order.customizations.map((custom) => (
                  <div
                    key={custom.customization_id}
                    className="d-flex align-items-start mb-3"
                  >
                    <Image
                      src={custom.image_url}
                      width={"5rem"}
                      height={"5rem"}
                    />
                    <div className="ms-3 row">
                      <p className="mb-1">
                        <strong>Description:</strong> {custom.description}
                      </p>
                      <p className="mb-1">
                        <strong>Giá:</strong>
                        {custom.price_adjustment.toLocaleString("vi-VN")}VNĐ
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
