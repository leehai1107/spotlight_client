import React from "react";
import ManagerTab from "../../components/ManagerTab/ManagerTab";
import ManagerAccountTable from "../../components/ManagerAccountTable/ManagerAccountTable";
import { useSelector } from "react-redux";

const headerData = [
  "ID",
  "Username",
  "Firstname",
  "Lastname",
  "Email",
  "Phone",
  "Address",
  "Status",
  "Action",
];

export default function AccountManagerPage() {
  const isMenuMinified = useSelector((state) => state.menu.isMenuMinified);

  return (
    <div
      className={
        "wrapper wrapper-body " + (isMenuMinified ? " wrapper__minify" : "")
      }
    >
      <div className="dashboard-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="d-main-title">
                <h3>
                  <i className="fa-solid fa-user me-3"></i>Quản Lý Tài Khoản
                </h3>
              </div>
              <div className="col-md-12">
                <div className="main-card mt-5">
                  <div className="dashboard-wrap-content p-4">
                    <ManagerTab />
                    {/* Table here */}
                    <ManagerAccountTable
                      theads={headerData}
                      tbody={["1", "2", "3", "4", "5"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
