import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../redux/slice/cartSlice"; // Import actions
import { Button } from "react-bootstrap";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.selectedQuantity);
  const dispatch = useDispatch();

  // Handle quantity change and update in Redux store
  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < item.stockQuantity) {
      // Assuming item.stockQuantity holds max stock
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      dispatch(
        updateQuantity({ itemId: item.item_id, selectedQuantity: newQuantity })
      );
    } else if (type === "decrease" && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(
        updateQuantity({ itemId: item.item_id, selectedQuantity: newQuantity })
      );
    }
  };

  // Handle removing item from cart
  const handleRemove = () => {
    dispatch(removeFromCart({ item_id: item.item_id }));
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
              <span
                className="down"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </span>
              <input type="text" value={quantity} readOnly />
              <span
                className="up"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </span>
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
