import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ManagerAccountTable = ({ theads, tbody, onApprove, onReject, onSort, sortConfig, onSelectAccount, selectedAccounts, onOpenModal }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
    }
    return 'fa fa-sort';
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <input type="checkbox" className="multi-select-checkbox" disabled />
          </th>
          {theads.map((head, index) => (
            <th key={index} onClick={() => onSort(head.key)} style={{ cursor: 'pointer' }}>
              {head.label} <i className={getSortIcon(head.key)}></i>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tbody.length === 0 ? (
          <tr>
            <td colSpan={theads.length + 1} className="text-center">
              Không có tài khoản nào
            </td>
          </tr>
        ) : (
          tbody.map((account) => (
            <tr key={account.user_id} onClick={() => onOpenModal(account)}>
              <td>
                <input
                  type="checkbox"
                  className="multi-select-checkbox"
                  checked={selectedAccounts.includes(account.user_id)}
                  onChange={() => onSelectAccount(account.user_id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td>{account.user_id}</td>
              <td>{account.username}</td>
              <td>{account.firstname}</td>
              <td>{account.lastname}</td>
              <td>{account.email}</td>
              <td>{account.phone}</td>
              <td>{account.address}</td>
              <td>
                {account.status === 1 ? (
                  <span className="text-success">
                    <i className="fa fa-check"></i> Đã phê duyệt
                  </span>
                ) : account.status === 0 ? (
                  <span className="text-danger">
                    <i className="fa fa-times"></i> Đã từ chối
                  </span>
                ) : (
                  "Chờ phê duyệt"
                )}
              </td>
              <td>
                <button onClick={(e) => { e.stopPropagation(); onApprove(account.user_id); }} className="btn btn-success">Duyệt</button>
                <button onClick={(e) => { e.stopPropagation(); onReject(account.user_id); }} className="btn btn-danger">Từ chối</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ManagerAccountTable;