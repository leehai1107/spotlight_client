import React, { useEffect, useState } from "react";
import { getItemsAPI } from "../../apis/items";
import Item from "../../components/Item/Item";
import ItemTag from "../../components/ItemTag/ItemTag";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    try {
      const response = await getItemsAPI(1, 100);
      setItems(response.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div className="hero-banner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-9 col-md-10">
              <div className="hero-banner-content text-center">
                <h2 className="mb-0"></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <div className="browse-btn mt-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
