import React, { useEffect, useState } from "react";
import ItemTag from "../ItemTag/ItemTag";
import Item from "../Item/Item";
import { getItemsAPI } from "../../apis/items";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    try {
      const response = await getItemsAPI(1, 12);
      setItems(response.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
            {items.map((item) => (
              <Item key={item._id} data={item} />
            ))}
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
