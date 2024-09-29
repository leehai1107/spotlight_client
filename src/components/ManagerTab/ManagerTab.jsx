import React from "react";

export default function ManagerTab() {
  return (
    <>
      <div className="nav custom2-tabs btn-group" role="tablist">
        <button
          className="tab-link ms-0 active"
          type="button"
          role="tab"
          aria-controls="orders-tab"
          aria-selected="true"
        >
          Danh Sách Chủ Cửa Hàng
        </button>
      </div>
      <div className="d-md-flex flex-wrap align-items-center">
        <div className="dashboard-date-wrap mt-4">
          <div className="form-group">
            <div className="relative-input position-relative">
              <input
                className="form-control h_40"
                type="text"
                placeholder="Tìm Theo Tên"
                defaultValue=""
              />
              <i className="uil uil-search" />
            </div>
          </div>
        </div>
        <div className="rs ms-auto mt-4 mt_r4">
          <a
            href="#"
            className="pe-4 w-100 ps-4 text-center co-main-btn h_40 d-inline-block"
          >
            <i className="fa-solid fa-arrow-rotate-right me-3" />
            Làm Mới
          </a>
        </div>
      </div>
    </>
  );
}
