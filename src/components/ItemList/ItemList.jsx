import React from "react";
import ItemTag from "../ItemTag/ItemTag";
import Item from "../Item/Item";

export default function ItemList() {
  return (
    <div class="explore-events p-80">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="main-title">
              <h3>Sản Phẩm Nổi Bật</h3>
            </div>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="event-filter-items">
              <div class="featured-controls">
                <ItemTag />
              </div>
            </div>
          </div>
          <div class="row" data-ref="event-filter-content">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <div class="browse-btn mt-5">
              <a href="explore_events.html" class="main-btn btn-hover ">
                Xem Thêm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
