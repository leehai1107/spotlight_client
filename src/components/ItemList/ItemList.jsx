import React from "react";
import ItemTag from "../ItemTag/ItemTag";
import Item from "../Item/Item";

export default function ItemList() {
  return (
    <div className="explore-events p-80">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="main-title">
              <h3>Sản Phẩm Nổi Bật</h3>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="event-filter-items">
              <div className="featured-controls">
                <ItemTag />
              </div>
            </div>
          </div>
          <div className="row" data-ref="event-filter-content">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <div className="browse-btn mt-5">
              <a href="explore_events.html" className="main-btn btn-hover ">
                Xem Thêm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
