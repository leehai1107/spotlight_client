import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Col, Row, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createItemAPI, getItemsByShopAPI } from "../../apis/items";
import { useSelector } from "react-redux";
import { getCategoriesAPI } from "../../apis/category";
import { uploadImage } from "../../services/firebase/UploadImageSvc";

export default function ShopOwnerCreatePage() {
  const token = localStorage.getItem("token");
  const shop_id = JSON.parse(atob(token.split(".")[1])).shop_id;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category_id: null,
    image: null,
    colors: [],
    sizes: [],
  });
  const [error, setError] = useState("");

  const handleShow = () => {
    setIsEditing(false);
    resetProductForm();
    setShowModal(true);
  };

  const handleClose = () => {
    setError("");
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct({
        ...newProduct,
        image: e.target.files[0],
      });
    }
  };

  const handleAddColor = () => {
    setNewProduct({
      ...newProduct,
      colors: [...newProduct.colors, ""], // Add an empty string for a new color input
    });
  };

  const handleColorChange = (index, value) => {
    const updatedColors = [...newProduct.colors];
    updatedColors[index] = value;
    setNewProduct({
      ...newProduct,
      colors: updatedColors,
    });
  };

  const handleRemoveColor = (index) => {
    const updatedColors = newProduct.colors.filter((_, i) => i !== index);
    setNewProduct({
      ...newProduct,
      colors: updatedColors,
    });
  };

  const handleAddSize = () => {
    setNewProduct({
      ...newProduct,
      sizes: [...newProduct.sizes, ""], // Add an empty string for a new size input
    });
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...newProduct.sizes];
    updatedSizes[index] = value;
    setNewProduct({
      ...newProduct,
      sizes: updatedSizes,
    });
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = newProduct.sizes.filter((_, i) => i !== index);
    setNewProduct({
      ...newProduct,
      sizes: updatedSizes,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.category_id ||
      newProduct.colors.length === 0 ||
      newProduct.sizes.length === 0 ||
      newProduct.quantity <= 0
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      // Upload the image and get the URL
      const imageUrl = await uploadImage(
        newProduct.image,
        `shop/${shop_id}/products`
      );

      // Prepare data for submission matching the required structure
      const productData = {
        shop_id: shop_id,
        name: newProduct.name,
        category_id: newProduct.category_id,
        price: newProduct.price,
        description: newProduct.description,
        image_url: imageUrl, // Set the uploaded image URL
        quantity: newProduct.quantity,
        colors: newProduct.colors.map((color) => ({ color_label: color })), // Format as array of objects
        sizes: newProduct.sizes.map((size) => ({ size_label: size })), // Format as array of objects
        status: "1",
      };

      if (isEditing) {
        // Update existing product
        console.log("Updated product data", productData);
        // Call your API to update the product
      } else {
        // Add a new product
        console.log("New product data", productData);
        // Call your API to add the new product
        try {
          const response = await createItemAPI(productData);
          console.log(response);
          fetchData();
        } catch (error) {
          console.error("Error creating product:", error);
        }
      }

      resetProductForm(); // Reset form after submission
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error uploading image or submitting product data:", error);
      setError("Có lỗi xảy ra khi tải lên hình ảnh hoặc gửi dữ liệu sản phẩm.");
    }
  };

  const resetProductForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      quantity: 0, // Initialize quantity
      category_id: null,
      image: null,
      colors: [], // Initialize colors array
      sizes: [], // Initialize sizes array
    });
    setError(""); // Reset errors
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewProduct(products[index]); // Pre-fill form with product details
    setShowModal(true);
  };

  const handleDelete = (index) => {
    // Handle deletion logic here (not implemented)
  };

  const fetchData = async () => {
    try {
      const response = await getItemsByShopAPI(shop_id);
      setProducts(response.items);
      const categories = await getCategoriesAPI();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [shop_id]);

  const isMenuMinified = useSelector((state) => state.menu.isMenuMinified);

  return (
    <div
      className={
        "wrapper wrapper-body " + (isMenuMinified ? " wrapper__minify" : "")
      }
    >
      <div
        className="container"
        style={{ width: "100%", padding: "20px", paddingTop: "80px" }}
      >
        <h1 style={{ padding: "10px 0", textAlign: "left", fontSize: "2rem" }}>
          Danh Sách Sản Phẩm
        </h1>
        {/* Add Product Button */}
        <button className="main-btn btn-hover h_40" onClick={handleShow}>
          Thêm Sản Phẩm
        </button>

        {/* Product List */}
        <div className="mt-4">
          <Row>
            {products.map((product, index) => (
              <Col key={index} xs={12} md={3} className="mb-4">
                <Card className="main-card">
                  {product.image_url && (
                    <div className="event-thumbnail">
                      <a
                        href="venue_event_detail_view.html"
                        className="thumbnail-img"
                      >
                        <img src={product.image_url} alt="" />
                      </a>
                      <span
                        onClick={() => handleDelete(index)}
                        className="trash-icon"
                        title="Delete"
                      />
                    </div>
                  )}
                  <Card.Body className="event-content">
                    <Card.Title className="event-title">
                      {product.name}
                    </Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text className="duration-price-remaining">
                      <strong>Giá:</strong>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </Card.Text>
                    <Card.Text className="duration-price-remaining">
                      <strong>Số lượng:</strong> {product.quantity}
                    </Card.Text>
                    <div className="">
                      <div className="event-timing">
                        <Button
                          variant="warning"
                          className="publish-date"
                          onClick={() => handleEdit(index)}
                        >
                          <i className="fa-pencil fa-solid"></i>
                        </Button>
                        <Button variant="primary" className="publish-time">
                          <i className="fa-cog fa-solid"></i>
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Modal for adding/editing a product */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
            <Modal.Body>
              {/* Display validation error message */}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group>
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Mô tả sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Giá (VNĐ)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Thể loại</Form.Label>
                <Form.Control
                  as="select"
                  name="category_id"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Chọn thể loại</option>
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Màu sắc</Form.Label>
                {newProduct.colors.map((color, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Màu sắc"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      required
                    />
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveColor(index)}
                      className="ml-2"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <Button variant="primary" onClick={handleAddColor}>
                  Thêm Màu
                </Button>
              </Form.Group>

              <Form.Group>
                <Form.Label>Kích thước</Form.Label>
                {newProduct.sizes.map((size, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Kích thước"
                      value={size}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      required
                    />
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveSize(index)}
                      className="ml-2"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <Button variant="primary" onClick={handleAddSize}>
                  Thêm Kích Thước
                </Button>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <button className="main-btn btn-hover h_40" type="submit">
                {isEditing ? "Lưu thay đổi" : "Thêm sản phẩm"}
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
