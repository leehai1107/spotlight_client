import React, { useState, useRef, useEffect, Fragment } from "react";
import Draggable from "react-draggable";
import { Stage, Layer, Image, Transformer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { clearItem } from "../../redux/slice/canvasSlice";
import { selectCustomizeItem } from "../../redux/slice/customizeSlice";
import {
  deleteImage,
  uploadImageBase64,
} from "../../services/firebase/UploadImageSvc";
import { useNavigate } from "react-router-dom";

const ImageCanvas = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  isDraggable = true,
  canvasWidth,
  canvasHeight,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <Fragment>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={isDraggable}
        image={shapeProps.img}
        onDragEnd={(e) => {
          const newX = Math.min(
            Math.max(e.target.x(), 0),
            canvasWidth - shapeProps.width
          );
          const newY = Math.min(
            Math.max(e.target.y(), 0),
            canvasHeight - shapeProps.height
          );
          onChange({ ...shapeProps, x: newX, y: newY });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          const newWidth = node.width() * scaleX;
          const newHeight = node.height() * scaleY;

          const newX = Math.min(Math.max(node.x(), 0), canvasWidth - newWidth);
          const newY = Math.min(
            Math.max(node.y(), 0),
            canvasHeight - newHeight
          );

          onChange({
            ...shapeProps,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 50 || Math.abs(newBox.height) < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

export default function CanvasArea() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(true);
  const selectedItem = useSelector((state) => state.canvas.selectedItem); // Get the selected item from Redux
  const [customizationDetails, setCustomizationDetails] = useState([]);
  const dispatch = useDispatch();
  // Create a reference for the Stage
  const stageRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });
    resizeObserver.observe(document.getElementById("canvas"));

    if (selectedItem) {
      const img = new window.Image();
      img.crossOrigin = "anonymous"; // Allow cross-origin image loading
      img.src = selectedItem.image_url;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const canvasWidth = width;
        const canvasHeight = height;
        const aspectRatio = imgWidth / imgHeight;
        let newWidth, newHeight;
        if (canvasWidth / canvasHeight > aspectRatio) {
          newHeight = canvasHeight * 1;
          newWidth = newHeight * aspectRatio;
        } else {
          newWidth = canvasWidth * 1;
          newHeight = newWidth / aspectRatio;
        }
        const centerX = (canvasWidth - newWidth) / 2;
        const centerY = (canvasHeight - newHeight) / 2;
        setImages((prevImages) => [
          ...prevImages,
          {
            img,
            id: -1,
            x: centerX,
            y: centerY,
            width: newWidth,
            height: newHeight,
          },
        ]);
      };
    }
  }, [selectedItem]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const toggleToolbar = () => {
    setIsToolbarExpanded(!isToolbarExpanded);
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length === 0) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.crossOrigin = "anonymous"; // Allow cross-origin image loading
      img.src = reader.result;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const canvasWidth = width;
        const canvasHeight = height;
        const aspectRatio = imgWidth / imgHeight;
        let newWidth, newHeight;
        if (canvasWidth / canvasHeight > aspectRatio) {
          newHeight = canvasHeight * 1;
          newWidth = newHeight * aspectRatio;
        } else {
          newWidth = canvasWidth * 1;
          newHeight = newWidth / aspectRatio;
        }
        const centerX = (canvasWidth - newWidth) / 2;
        const centerY = (canvasHeight - newHeight) / 2;
        setImages((prevImages) => [
          ...prevImages,
          {
            img,
            id: prevImages.length + 1,
            x: centerX,
            y: centerY,
            width: newWidth,
            height: newHeight,
          },
        ]);

        setCustomizationDetails((prevDetails) => [
          ...prevDetails,
          {
            id: prevDetails.length + 1,
            description: `Phụ kiện`,
            image: reader.result,
            price_adjustment: 50000,
          },
        ]);
      };
    };
    reader.readAsDataURL(e.target.files[0]);
    e.target.value = null;
  };

  const handleSelect = (id) => {
    selectShape(id);
  };

  const handleDelete = () => {
    // if the image is selected have id same as selectedItem.item_id
    if (selectedId === -1) {
      dispatch(clearItem());
    }
    //  delete the image from firebase if the image is selected and id is not -1
    if (selectedId !== -1) {
      deleteImage(selectedItem.image_url);
    }

    if (customizationDetails.length === 1) {
      setCustomizationDetails([]);
    }
    setCustomizationDetails((prevDetails) =>
      prevDetails.filter((detail) => detail.id !== selectedId)
    );
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== selectedId)
    );
    selectShape(null);
  };

  const bringToFront = () => {
    const selectedImage = images.find((img) => img.id === selectedId);
    const otherImages = images.filter((img) => img.id !== selectedId);
    setImages([...otherImages, selectedImage]);
  };

  const bringToBack = () => {
    const selectedImage = images.find((img) => img.id === selectedId);
    const otherImages = images.filter((img) => img.id !== selectedId);
    setImages([selectedImage, ...otherImages]);
  };

  const bringUpOneLayer = () => {
    const index = images.findIndex((img) => img.id === selectedId);
    if (index < images.length - 1) {
      const newImages = [...images];
      const temp = newImages[index];
      newImages[index] = newImages[index + 1];
      newImages[index + 1] = temp;
      setImages(newImages);
    }
  };

  const bringDownOneLayer = () => {
    const index = images.findIndex((img) => img.id === selectedId);
    if (index > 0) {
      const newImages = [...images];
      const temp = newImages[index];
      newImages[index] = newImages[index - 1];
      newImages[index - 1] = temp;
      setImages(newImages);
    }
  };

  const handleOrderButton = async () => {
    try {
      // Capture the canvas image
      const canvasImage = stageRef.current.toDataURL();

      // Upload the canvas image and get the URL
      const finalImageUrl = await uploadImageBase64(
        canvasImage,
        `final_images`
      );

      const customizations = await Promise.all(
        customizationDetails.map(async (detail) => {
          // Upload the image and get the URL
          const imageUrl = await uploadImageBase64(
            detail.image,
            `customizations`
          );
          return {
            description: detail.description,
            image_url: imageUrl,
            price_adjustment: detail.price_adjustment,
          };
        })
      );

      dispatch(
        selectCustomizeItem({
          ...selectedItem,
          customizations: customizations,
          image_final: finalImageUrl,
        })
      );

      navigate("/customizeCheckout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="canvas-container" id="canvas">
      <Draggable cancel=".toolbar-button">
        {isToolbarExpanded ? (
          <div className="toolbar">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="toolbar-button"
            />
            {selectedId && (
              <>
                <button
                  className="main-btn-third-v2 toolbar-button"
                  onClick={bringToFront}
                >
                  Đem lên đầu
                </button>
                <button
                  className="main-btn-third-v2 toolbar-button"
                  onClick={bringToBack}
                >
                  Đem xuống cùng
                </button>
                <button
                  className="main-btn-third-v2 toolbar-button"
                  onClick={bringUpOneLayer}
                >
                  Đem lên 1 lớp
                </button>
                <button
                  className="main-btn-third-v2 toolbar-button"
                  onClick={bringDownOneLayer}
                >
                  Đem xuống 1 lớp
                </button>
                <button
                  className="main-btn-third-v2 delete-button"
                  onClick={handleDelete}
                >
                  Xóa đối tượng đã chọn
                </button>
              </>
            )}
            <button
              className="main-btn-third-v2 toolbar-button"
              onClick={toggleToolbar}
            >
              Đóng thanh công cụ
            </button>
          </div>
        ) : (
          <div className="toolbar">
            <button
              className="main-btn-third toolbar-button"
              onClick={toggleToolbar}
            >
              Mở thanh công cụ
            </button>
          </div>
        )}
      </Draggable>
      <Fragment>
        <Stage
          width={width}
          height={height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => (
              <ImageCanvas
                key={image.id}
                shapeProps={image}
                isSelected={image.id === selectedId}
                onSelect={() => handleSelect(image.id)}
                onChange={(newAttrs) => {
                  const newImages = images.map((img) => {
                    if (img.id === newAttrs.id) {
                      return newAttrs;
                    }
                    return img;
                  });
                  setImages(newImages);
                }}
                canvasWidth={width} // Pass canvas width
                canvasHeight={height} // Pass canvas height
              />
            ))}
          </Layer>
        </Stage>
      </Fragment>
      <div className="d-flex justify-content-center pt-4">
        <div className="order-text">
          <strong>Thông tin chi tiết</strong>
        </div>
      </div>

      <div className="d-flex justify-content-center pt-4">
        <div className="order-total-dt">
          <div>{selectedItem?.name}</div>
          <div className="order-number">
            {selectedItem?.selectedColor || ""}
          </div>
          <div className="order-number">{selectedItem?.selectedSize || ""}</div>
          <div className="order-number">
            {(selectedItem?.price || 0).toLocaleString("vi-VN") + " VNĐ"}
          </div>
        </div>
      </div>
      {/* {For CustomizeCount  render items} */}
      {customizationDetails.map((customization, index) => (
        <div key={index} className="customization-item">
          <div className="d-flex justify-content-center">
            <div className="order-total-dt">
              <div>{customization?.description}</div>
              <div className="order-number">
                {customization.price_adjustment.toLocaleString("vi-VN") +
                  " VNĐ"}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center">
        <div className="order-total-dt">
          <div className="order-text">Tạm Tính</div>
          <div className="order-number">
            {(
              (selectedItem?.price || 0) +
              customizationDetails.length * 50000
            ).toLocaleString("vi-VN")}{" "}
            VNĐ
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center pt-4">
        <input
          type="button"
          value="Đặt mẫu này"
          className="main-btn"
          onClick={() => handleOrderButton()}
        />
      </div>
    </div>
  );
}
