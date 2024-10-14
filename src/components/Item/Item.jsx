import React from "react";

export default function Item({ data }) {
  return (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix arts concert workshops volunteer sports health_Wellness"
      data-ref="mixitup-target"
    >
      <div className="main-card mt-4">
        <div className="event-thumbnail">
          <a href={"items/" + data.item_id} className="thumbnail-img">
            <img src={data.image_url} alt="" />
          </a>
        </div>
        <div className="event-content">
          <a href={"items/" + data.item_id} className="event-title">
            {data.name}
          </a>
          <div className="duration-price-remaining">
            <span className="duration-price">
              {data.price.toLocaleString("vi-VN")} VNĐ
            </span>
            <span className="remaining" />
          </div>
        </div>
        <div className="event-footer">
          <div className="event-timing">
            <div className="publish-date">
              <span>
                <i className="fa-solid fa-calendar-day me-2" />
                {data.shop.shop_name}
              </span>
              <span className="dot">
                <i className="fa-solid fa-circle" />
              </span>
              <span>{data.shop.address}</span>
            </div>
            <span className="publish-time">
              <i className="fa-solid fa-clock me-2" />
              {data.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
