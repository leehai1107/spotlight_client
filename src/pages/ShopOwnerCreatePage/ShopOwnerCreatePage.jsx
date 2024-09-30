import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Col, Row, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ShopOwnerCreatePage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  // Track if the user is editing
  const [editIndex, setEditIndex] = useState(null);  // Track index of product being edited
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    image: null,
  });
  const [error, setError] = useState("");

  const handleShow = () => {
    setIsEditing(false);  // Reset edit mode
    setNewProduct({ name: "", description: "", quantity: 0, price: 0, image: null });  // Reset form
    setShowModal(true);
  };

  const handleClose = () => {
    setError("");  // Reset error messages
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description || !newProduct.quantity || !newProduct.price) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (isEditing) {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
    } else {
      // Add a new product
      setProducts([...products, newProduct]);
    }

    // Reset form and close modal
    setNewProduct({ name: "", description: "", quantity: 0, price: 0, image: null });
    setError("");  // Reset errors
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewProduct(products[index]);  // Pre-fill form with product details
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);  // Remove product by index
    setProducts(updatedProducts);  // Update state
  };

  useEffect(() => {
    return () => {
      products.forEach(product => {
        if (product.image) {
          URL.revokeObjectURL(product.image);
        }
      });
    };
  }, [products]);

  return (
    <div className="container mt-4" style={{ width: '100%', padding: '20px', paddingTop: '80px' }}>
      <h1 style={{ padding: '10px 0', textAlign: 'left', fontSize: '2rem' }}>
        Trang Sản Phẩm của Chủ Shop
      </h1>

      {/* Product List */}
      <div className="mt-4">
        <h2 style={{ fontSize: '1.5rem', paddingBottom: '10px' }}>
          Danh sách sản phẩm
        </h2>
        <Row>
          {products.map((product, index) => (
            <Col key={index} xs={12} md={6} className="mb-4">
              <Card>
                {product.image && (
                  <Card.Img
                    variant="top"
                    src={URL.createObjectURL(product.image)}
                    alt={product.name}
                    style={{ height: "800px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>
                    <strong>Số lượng:</strong> {product.quantity}
                  </Card.Text>
                  <Card.Text>
                    <strong>Giá:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </Card.Text>
                  <Button variant="warning" className="mr-2" onClick={() => handleEdit(index)}>
                    Chỉnh sửa
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    Xóa
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Add Product Button */}
      <Button variant="primary" className="mt-3" onClick={handleShow}>
        Thêm sản phẩm
      </Button>

      {/* Modal for adding/editing a product */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display validation error message */}
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEditing ? "Lưu thay đổi" : "Thêm sản phẩm"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
