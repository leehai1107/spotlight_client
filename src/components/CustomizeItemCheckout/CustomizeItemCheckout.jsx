import React from "react";

export default function CustomizeItemCheckout({ item }) {

  return (
    <div key={item.item_id} className="col-lg-12 col-md-12">
      <div className="form-group mt-4">
        <label className="form-label">{item.name}</label>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div>
              <p>
                <strong>Màu sắc:</strong> {item.selectedColor} -{" "}
                <strong>Kích thước:</strong> {item.selectedSize} -{" "}
                <strong>Phân loại:</strong> {item.category_name}
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 p-2">
            <div className="counter">
              <strong>Số Lượng:</strong>
              <input type="text" value={item.selectedQuantity} readOnly />
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <img
                  className="w-100"
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: "6.25rem",
                    height: "6.25rem",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* Corrected map function */}
      {item.customizations.map((customize, index) => (
        <div key={index} className="form-group mt-4">
          <label className="form-label">{customize.description}</label>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div></div>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <div className="counter"></div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="row">
                <div className="col-lg-8 col-md-8">
                  <img
                    className="w-100"
                    src={customize.image_url}
                    alt={customize.description}
                    style={{
                      width: "6.25rem",
                      height: "6.25rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
