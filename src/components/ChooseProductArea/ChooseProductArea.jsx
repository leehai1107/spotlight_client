import React, { useState, useEffect } from "react";
import { getItemsAPI, searchItemsAPI } from "../../apis/items";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../../redux/slice/canvasSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChooseProductArea() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
  });
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.canvas.selectedItem); // Get the selected item from Redux

  useEffect(() => {
    // Fetch initial items on component mount
    fetchItems();
  }, [pagination.current_page]);

  const fetchItems = async () => {
    const response = await getItemsAPI(pagination.current_page, 3);
    if (response?.items) {
      setItems(response.items);
      setPagination({
        current_page: response.pagination.current_page,
        total_pages: response.pagination.total_pages,
      });
      // Automatically set default selected color and size
      if (response.items.length > 0) {
        const firstItem = response.items[0];
        setSelectedColor(firstItem.colors[0]?.color_label || null);
        setSelectedColorId(firstItem.colors[0]?.color_id || null);
        setSelectedSize(firstItem.sizes[0]?.size_label || null);
        setSelectedSizeId(firstItem.sizes[0]?.size_id || null);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      current_page: newPage,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await searchItemsAPI(searchQuery);
    if (response?.items) {
      setItems(response.items);
    }
  };

  const handleColorSizeChange = (itemId, type, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [itemId]: {
        ...prevOptions[itemId],
        [type]: value,
      },
    }));

    if (type === "color") {
      setSelectedColor(value);
    } else if (type === "size") {
      setSelectedSize(value);
    }
  };

  const handleSelect = (item) => {
    if (!selectedItem) {
      // Find the selected color and size objects based on their labels
      const selectedColorObj = item.colors.find(
        (color) => color.color_label === selectedColor
      );
      const selectedSizeObj = item.sizes.find(
        (size) => size.size_label === selectedSize
      );

      // Dispatch the selected item to Redux, including selectedColorId and selectedSizeId
      dispatch(
        selectItem({
          ...item,
          selectedColor,
          selectedSize,
          selectedColorId: selectedColorObj?.color_id || selectedColorId, // Get the color_id
          selectedSizeId: selectedSizeObj?.size_id || selectedSizeId, // Get the size_id
          selectedQuantity: 1,
        })
      );
    } else {
      toast.warning("Vui lòng xóa sản phẩm đã chọn trước đó!");
    }
  };

  return (
    <div>
      {/* Search bar */}
      <form onSubmit={handleSearch}>
        <div className="row d-flex pb-5">
          <div className="col-10 ">
            <input
              className="form-control h_40 container border border-warning"
              type="text"
              placeholder="Tìm theo tên sản phẩm ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-2">
            <button className="main-btn h_40" type="submit">
              Tìm Kiếm
            </button>
          </div>
        </div>
      </form>

      {/* Items list */}
      <div className="item-list">
        {items.map((item) => (
          <div key={item.item_id} className="item-row border p-2 mb-3 row">
            <div className="col-6">
              <img
                className="w-75 h-75"
                src={item.image_url}
                alt={item.name}
                style={{
                  width: "6.25rem",
                  height: "6.25rem",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-4 row">
              <div className="col-6">
                <div className="form-group">
                  {/* Select color */}
                  <label>Màu Sắc:</label>
                  <select
                    className="form-control"
                    value={
                      selectedOptions[item.item_id]?.color ||
                      item.colors[0].color_label
                    }
                    onChange={(e) =>
                      handleColorSizeChange(
                        item.item_id,
                        "color",
                        e.target.value
                      )
                    }
                  >
                    {item.colors.map((color) => (
                      <option key={color.color_id} value={color.color_label}>
                        {color.color_label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                {/* Select size */}
                <div className="form-group">
                  <label>Kích Thước:</label>
                  <select
                    className="form-control"
                    value={
                      selectedOptions[item.item_id]?.size ||
                      item.sizes[0].size_label
                    }
                    onChange={(e) =>
                      handleColorSizeChange(
                        item.item_id,
                        "size",
                        e.target.value
                      )
                    }
                  >
                    {item.sizes.map((size) => (
                      <option key={size.size_id} value={size.size_label}>
                        {size.size_label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h5>{item.name}</h5>
              <h6>Phân Loại: {item.category_name}</h6>
              <p>Giá Sản Phẩm: {item.price.toLocaleString("vi-VN")} VNĐ</p>
            </div>
            <div className="col-2 row">
              <div className="col-4"></div>
              <div className="col-4 d-flex justify-content-center">
                <div>
                  <button
                    className="main-btn h_40"
                    onClick={() => handleSelect(item)}
                  >
                    Thử
                  </button>
                </div>
              </div>
              <div className="col-4"></div>
            </div>
          </div>
        ))}
      </div>
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
  );
}
