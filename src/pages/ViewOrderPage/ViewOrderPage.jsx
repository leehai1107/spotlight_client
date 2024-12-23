import React, { useEffect, useState } from "react";
import { getOrdersByUserAPI } from "../../apis/order";
import OrderItem from "../../components/OrderItem/OrderItem";

export default function ViewOrderPage() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    userId = JSON.parse(atob(token.split(".")[1])).user_id;
  }
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
  });

  const getData = async () => {
    try {
      const response = await getOrdersByUserAPI(
        userId,
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
  return (
    <div className="wrapper">
      <div className="hero-banner">
        <div className="container">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
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
    </div>
  );
}
