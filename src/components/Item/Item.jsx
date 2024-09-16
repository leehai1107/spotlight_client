import React from "react";

export default function Item() {
  return (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix arts concert workshops volunteer sports health_Wellness"
      data-ref="mixitup-target"
    >
      <div className="main-card mt-4">
        <div className="event-thumbnail">
          <a href="venue_event_detail_view.html" className="thumbnail-img">
            <img src={"./assets/images/event-imgs/img-1.jpg"} alt="" />
          </a>
          <span className="bookmark-icon" title="Bookmark" />
        </div>
        <div className="event-content">
          <a href="venue_event_detail_view.html" className="event-title">
            A New Way Of Life
          </a>
          <div className="duration-price-remaining">
            <span className="duration-price">AUD $100.00*</span>
            <span className="remaining" />
          </div>
        </div>
        <div className="event-footer">
          <div className="event-timing">
            <div className="publish-date">
              <span>
                <i className="fa-solid fa-calendar-day me-2" />
                15 Apr
              </span>
              <span className="dot">
                <i className="fa-solid fa-circle" />
              </span>
              <span>Fri, 3.45 PM</span>
            </div>
            <span className="publish-time">
              <i className="fa-solid fa-clock me-2" />
              1h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
