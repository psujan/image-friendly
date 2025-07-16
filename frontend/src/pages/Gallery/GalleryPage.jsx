import React from "react";
import { Typography, Box, Button } from "@mui/material";
import HomeText from "../Home/partials/HomeText.jsx";
import PageLayout from "../../components/PageLayout.jsx";
import { useState, useRef } from "react";

const DraggableImageItem = ({ image, index, onReorder }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = dragRef.current.getBoundingClientRect();
    startPos.current = { x: e.clientX, y: e.clientY };
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    if (dragRef.current) {
      dragRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      dragRef.current.style.zIndex = "1000";
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;

    setIsDragging(false);
    if (dragRef.current) {
      dragRef.current.style.transform = "";
      dragRef.current.style.zIndex = "";
    }

    // Calculate drop position and reorder
    const dropY = e.clientY;
    const containerRect = dragRef.current
      .closest(".gallery-container")
      .getBoundingClientRect();
    const itemHeight = 122; // Approximate height of each item
    const newIndex = Math.floor((dropY - containerRect.top) / itemHeight);

    if (newIndex !== index && newIndex >= 0 && newIndex < 3) {
      onReorder(index, newIndex);
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const itemStyles = {
    display: "flex",
    padding: "8px",
    borderBottom: "1px solid #e0e0e0",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    position: "relative",
    backgroundColor: isDragging ? "#f5f5f5" : "transparent",
    transition: isDragging ? "none" : "all 0.2s ease",
    alignItems: "center",
  };

  return (
    // <div
    //   ref={dragRef}
    //   style={itemStyles}
    //   onMouseDown={handleMouseDown}
    //   onMouseEnter={(e) => {
    //     if (!isDragging) {
    //       e.target.style.backgroundColor = "#f9f9f9";
    //     }
    //   }}
    //   onMouseLeave={(e) => {
    //     if (!isDragging) {
    //       e.target.style.backgroundColor = "transparent";
    //     }
    //   }}
    // >
    //   <div
    //     style={{
    //       display: "flex",
    //       alignItems: "center",
    //       marginRight: "16px",
    //       minWidth: "20px",
    //     }}
    //   >
    //     <span style={{ fontSize: "14px", fontWeight: "600", color: "#666" }}>
    //       {index + 1}
    //     </span>
    //   </div>
    //   <img
    //     src={image.src}
    //     alt={image.alt}
    //     style={{
    //       width: "180px",
    //       height: "100px",
    //       borderRadius: "4px",
    //       pointerEvents: "none",
    //     }}
    //   />
    //   <div style={{ marginLeft: "14px" }}>
    //     <div style={{ fontSize: "14px", marginBottom: "4px" }}>
    //       {image.name}
    //     </div>
    //     <div style={{ color: "#666", fontSize: "13px" }}>{image.size}</div>
    //   </div>
    // </div>
    <Box
      ref={dragRef}
      style={itemStyles}
      onMouseDown={handleMouseDown}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.target.style.backgroundColor = "#f9f9f9";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.target.style.backgroundColor = "transparent";
        }
      }}
      sx={{
        display: "flex",
        p: 1,
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            marginRight: "18px",
            display: "inline-flex",
            width: "20px",
            height: "20px",
            fontSize: "10px",
            backgroundColor: "var(--primary-light-30)",
            color: "#fff",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {index + 1}
        </Box>
        <img
          src={image.src}
          alt={image.alt}
          style={{ width: "180px", height: "100px", borderRadius: "4px" }}
        />
      </Box>
      <Box sx={{ marginLeft: "14px" }}>
        <Typography variant="body">{image.name}</Typography>
        <Typography sx={{ color: "#666", fontSize: "13px", mt: 1 }}>
          {image.size}
        </Typography>
      </Box>
    </Box>
  );
};

export default function GalleryPage() {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1752647549~exp=1752651149~hmac=19f1674f40097c92c87f7593ca27e2e5d7eac2b1c9099d4726670b1ead5adc2f&w=1380",
      alt: "Sunset image",
      name: "sunset_lake.jpeg",
      size: "4Mb",
    },
    {
      id: 2,
      src: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1752647549~exp=1752651149~hmac=19f1674f40097c92c87f7593ca27e2e5d7eac2b1c9099d4726670b1ead5adc2f&w=1380",
      alt: "Mountain image",
      name: "mountain_view.jpeg",
      size: "3.2Mb",
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?t=st=1752647549~exp=1752651149~hmac=19f1674f40097c92c87f7593ca27e2e5d7eac2b1c9099d4726670b1ead5adc2f&w=1380",
      alt: "Nature image",
      name: "nature_scene.jpeg",
      size: "5.1Mb",
    },
  ]);

  const handleReorder = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setImages(newImages);
  };

  return (
    <PageLayout>
      <HomeText />
      <Box
        sx={{
          borderRadius: "6px",
          border: "1px solid var(--border-color)",
          padding: "16px",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontSize: "15px", fontWeight: "600" }}
            >
              My College Gallery
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" onClick={() => {}}>
              Delete
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 1, mb: 2 }} className="gallery-container">
          {images.map((image, index) => (
            <DraggableImageItem
              key={image.id}
              image={image}
              index={index}
              onReorder={handleReorder}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button variant="contained" size="large">
            Generate Powerpoint
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
}
