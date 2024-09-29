import React from "react";

export default function ManagerAccountTable({ theads, tbody }) {
  return (
    <div className="event-list">
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="orders-tab"
          role="tabpanel"
        >
          <div className="table-card mt-4">
            <div className="main-table">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    {theads.map((th, index) => (
                      <th scope="col" key={index}>
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* {tbody.map((tr, index) => (
                      <tr key={index}>
                        {tr.map((td, index) => (
                          <td key={index}>{td}</td>
                        ))}
                      </tr>
                    ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
