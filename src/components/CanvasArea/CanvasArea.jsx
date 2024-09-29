import React, { useState, useRef, useEffect, Fragment } from "react";
import Draggable from "react-draggable";
import { Stage, Layer, Image, Transformer } from "react-konva";

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

const CanvasArea = () => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(true);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });
    resizeObserver.observe(document.getElementById("canvas"));
  }, []);

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
      };
    };
    reader.readAsDataURL(e.target.files[0]);
    // Clear the input
    e.target.value = null;
  };

  const handleSelect = (id) => {
    selectShape(id);
  };

  const handleDelete = () => {
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
                <button className="toolbar-button" onClick={bringToFront}>
                  Bring to Front
                </button>
                <button className="toolbar-button" onClick={bringToBack}>
                  Bring to Back
                </button>
                <button className="toolbar-button" onClick={bringUpOneLayer}>
                  Bring Up Layer
                </button>
                <button className="toolbar-button" onClick={bringDownOneLayer}>
                  Bring Down Layer
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  Delete Selected Image
                </button>
              </>
            )}
            <button className="toolbar-button" onClick={toggleToolbar}>
              Close Toolbar
            </button>
          </div>
        ) : (
          <div className="toolbar">
            <button className="toolbar-button" onClick={toggleToolbar}>
              Open Toolbar
            </button>
          </div>
        )}
      </Draggable>
      <Stage
        width={width}
        height={height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
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
    </div>
  );
};

export default CanvasArea;
