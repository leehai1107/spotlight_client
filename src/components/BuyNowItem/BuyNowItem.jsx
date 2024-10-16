import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { clearBuyNowItem } from "../../redux/slice/buynowSlice";
import { useNavigate } from "react-router-dom";

export default function BuyNowItem({ item }) {
  const [quantity, setQuantity] = useState(item.selectedQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle removing item from cart
  const handleRemove = () => {
    dispatch(clearBuyNowItem());
    navigate("/");
  };

  return (
    <div key={item.item_id} className="col-lg-12 col-md-12">
      <div className="form-group mt-4">
        <label className="form-label">{item.name}</label>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div>
              <p>
                <strong>Màu sắc:</strong> {item.selectedColor.color_label} -{" "}
                <strong>Kích thước:</strong> {item.selectedSize.size_label} -{" "}
                <strong>Phân loại:</strong> {item.category_name}
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 p-2">
            <div className="counter">
              <strong>Số Lượng:</strong>
              <input type="text" value={quantity} readOnly />
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
              <div className="col-lg-4 col-md-4">
                <Button variant="danger" onClick={handleRemove}>
                  <i className="fa-trash fa-solid"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
