import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersByShopAPI } from "../../apis/order";
import OrderItemBuyer from "../../components/OrderItemBuyer/OrderItemBuyer";

export default function ViewOrderShopPage() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const shop_id = JSON.parse(atob(token.split(".")[1])).shop_id;
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
  });

  const getData = async () => {
    try {
      const response = await getOrdersByShopAPI(
        shop_id,
        pagination.current_page,
        10
      );
      setOrders(response.orders);
      setPagination({
        current_page: response.pagination.current_page,
        total_pages: response.pagination.total_pages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      current_page: newPage,
    }));
  };

  useEffect(() => {
    getData();
  }, [pagination.current_page]);

  const isMenuMinified = useSelector((state) => state.menu.isMenuMinified);

  return (
    <div
      className={
        "wrapper wrapper-body " + (isMenuMinified ? " wrapper__minify" : "")
      }
    >
      <div
        className="container"
        style={{ width: "100%", padding: "20px", paddingTop: "80px" }}
      >
          {orders.map((order) => (
            <OrderItemBuyer key={order.id} order={order} />
          ))}
          {/* Pagination Controls */}
          <div className="pagination-controls d-flex gap-2">
            <button
              className="create-btn"
              disabled={pagination.current_page === 1}
              onClick={() => handlePageChange(pagination.current_page - 1)}
            >
              <span>
                <i className="fa-solid fa-angle-left" />
              </span>
            </button>
            <span>
              <strong>
                {" "}
                Trang {pagination.current_page} / {pagination.total_pages}
              </strong>
            </span>
            <button
              className="create-btn"
              disabled={pagination.current_page === pagination.total_pages}
              onClick={() => handlePageChange(pagination.current_page + 1)}
            >
              <span>
                <i className="fa-solid fa-angle-right" />
              </span>
            </button>
          </div>
        </div>
      </div>
  );
}
