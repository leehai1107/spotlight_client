import React, { useEffect, useState } from "react";
import ManagerTab from "../../components/ManagerTab/ManagerTab";
import ManagerAccountTable from "../../components/ManagerAccountTable/ManagerAccountTable";
import { useSelector } from "react-redux";
import { getUsersAPI } from "../../apis/user";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './AccountManagerPage.css';
import Modal from 'react-modal';

const headerData = [
  { key: "user_id", label: "ID" },
  { key: "username", label: "Username" },
  { key: "firstname", label: "Firstname" },
  { key: "lastname", label: "Lastname" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

export default function AccountManagerPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
  const accountsPerPage = 5;
  const isMenuMinified = useSelector((state) => state.menu.isMenuMinified);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await getUsersAPI(1, 10);
      setAccounts(response.users);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu từ server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleApprove = (id) => {
    setAccounts(accounts.map(account => account.user_id === id ? { ...account, status: 1 } : account));
    toast.success("Tài khoản đã được phê duyệt!");
  };

  const handleReject = (id) => {
    setAccounts(accounts.map(account => account.user_id === id ? { ...account, status: 0 } : account));
    toast.error("Tài khoản đã bị từ chối!");
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setFilter("all");
    setSortConfig({ key: null, direction: 'asc' });
    setCurrentPage(1);
    fetchAccounts();
  };

  const handleSelectAccount = (id) => {
    setSelectedAccounts(prevSelected => 
      prevSelected.includes(id) ? prevSelected.filter(accountId => accountId !== id) : [...prevSelected, id]
    );
  };

  const handleApproveAll = () => {
    setAccounts(accounts.map(account => selectedAccounts.includes(account.user_id) ? { ...account, status: 1 } : account));
    setSelectedAccounts([]);
    toast.success("Tất cả tài khoản đã được phê duyệt!");
  };

  const handleRejectAll = () => {
    setAccounts(accounts.map(account => selectedAccounts.includes(account.user_id) ? { ...account, status: 0 } : account));
    setSelectedAccounts([]);
    toast.error("Tất cả tài khoản đã bị từ chối!");
  };

  const handleOpenModal = (account) => {
    setSelectedAccountDetails(account);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedAccountDetails(null);
  };

  const sortedAccounts = [...accounts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredAccounts = sortedAccounts.filter(account => {
    if (filter === "approved") return account.status === 1;
    if (filter === "rejected") return account.status === 0;
    if (filter === "pending") return account.status !== 1 && account.status !== 0;
    return true;
  }).filter(account => {
    return (
      account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

  const totalPages = Math.ceil(filteredAccounts.length / accountsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={"wrapper wrapper-body " + (isMenuMinified ? " wrapper__minify" : "")}>
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
                    <div className="mb-3">
                      <button className="btn btn-secondary mt-2" onClick={handleRefresh}>Làm Mới</button>
                    </div>
                    <div className="mb-3">
                      <select onChange={(e) => setFilter(e.target.value)} className="form-select">
                        <option value="all">Tất cả</option>
                        <option value="pending">Chờ phê duyệt</option>
                        <option value="approved">Đã phê duyệt</option>
                        <option value="rejected">Đã từ chối</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-success me-2" onClick={handleApproveAll} disabled={selectedAccounts.length === 0}>Phê duyệt tất cả</button>
                      <button className="btn btn-danger" onClick={handleRejectAll} disabled={selectedAccounts.length === 0}>Từ chối tất cả</button>
                    </div>
                    {loading ? (
                      <p>Đang tải dữ liệu...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : (
                      <>
                        <ManagerAccountTable
                          theads={headerData}
                          tbody={currentAccounts}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onSort={handleSort}
                          sortConfig={sortConfig}
                          onSelectAccount={handleSelectAccount}
                          selectedAccounts={selectedAccounts}
                          onOpenModal={handleOpenModal}
                        />
                        <div className="pagination">
                          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-primary">
                            Trang trước
                          </button>
                          <span className="mx-2">Trang {currentPage} / {totalPages}</span>
                          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-primary">
                            Trang sau
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Chi Tiết Tài Khoản"
        className="account-details-modal"
      >
        {selectedAccountDetails && (
          <div>
            <h2>Chi Tiết Tài Khoản</h2>
            <p>ID: {selectedAccountDetails.user_id}</p>
            <p>Username: {selectedAccountDetails.username}</p>
            <p>Firstname: {selectedAccountDetails.firstname}</p>
            <p>Lastname: {selectedAccountDetails.lastname}</p>
            <p>Email: {selectedAccountDetails.email}</p>
            <p>Phone: {selectedAccountDetails.phone}</p>
            <p>Address: {selectedAccountDetails.address}</p>
            <p>Status: {selectedAccountDetails.status === 1 ? 'Đã phê duyệt' : selectedAccountDetails.status === 0 ? 'Đã từ chối' : 'Chờ phê duyệt'}</p>
            {/* Add more details as needed */}
            <button onClick={handleCloseModal} className="btn btn-secondary mt-3">Đóng</button>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
}