import React, { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import HomeText from "../Home/partials/HomeText.jsx";
import PageLayout from "../../components/PageLayout.jsx";
import { useState, useRef } from "react";
import BackButton from "../../components/common/BackButton.jsx";
import useApiRequest from "../../utils/useApiRequest.js";
import { useParams } from "react-router";
import _api from "../../utils/api.js";
import Toast from "../../utils/toast.js";
import helper from "../../utils/helper.js";
import DeleteGallery from "./partials/DeleteGallery.jsx";
import { useLoader } from "../../context/loaderContext.jsx";
import { useNavigate } from "react-router";
import UploadImageModal from "./partials/UploadImageModal.jsx";

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
          src={image.imageUrl}
          alt={image?.alt || "GAL_IMG"}
          style={{ width: "180px", height: "100px", borderRadius: "4px" }}
        />
      </Box>
      <Box sx={{ marginLeft: "14px" }}>
        <Typography variant="body">{image.originalName}</Typography>
        <Typography sx={{ color: "#666", fontSize: "13px", mt: 1 }}>
          {helper.byteToMb(image.size) + " Mb"}
        </Typography>
      </Box>
    </Box>
  );
};

export default function GalleryPage() {
  const { api } = useApiRequest();
  const { id } = useParams();
  const [galleryImages, setGalleryImages] = useState([]);
  const [gallery, setGallery] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  const navigate = useNavigate();
  const getGalleryImages = async () => {
    const res = await api.get(`/api/v1/gallery/${id}/images`);
    if (!res.success) {
      console.error(res);
      return;
    }
    setGalleryImages(res.data?.galleryImages);
    setGallery(res.data?.gallery);
  };

  const downloadPPT = async () => {
    console.log(galleryImages);
    if (!galleryImages.length) {
      Toast.error("No Gallery Images Found");
      return;
    }
    const reorderedIds = galleryImages.map((img) => img.id);
    try {
      const response = await _api.post(
        `/api/v1/ppt/${id}`,
        {
          reorderedIds: reorderedIds,
        },
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", gallery.title + ".pptx" || "gallery.pptx"); // filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      Toast.error("Download Failed");
      console.error("Download failed:", err);
    }
  };

  const handleReorder = (fromIndex, toIndex) => {
    const newImages = [...galleryImages];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setGalleryImages(newImages);
  };

  const handleDelete = async () => {
    showLoader();
    setDeleteModal(false);
    try {
      const res = await api._delete("api/v1/gallery/" + id);
      if (!res.success) {
        console.error(res);
        Toast.error("Something Went Wrong");
        return;
      }
      Toast.success(res.message || "Successful");

      // redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      console.log("here error captured", err);
      Toast.error("Something Went Wrong");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getGalleryImages();
  }, []);

  return (
    <PageLayout>
      <HomeText />
      <BackButton />
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
              {gallery?.title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setUploadModal(true);
              }}
              disabled={!gallery}
            >
              Upload Images
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setDeleteModal(true);
              }}
              disabled={!gallery}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 1, mb: 2 }} className="gallery-container">
          {galleryImages.map((image, index) => (
            <DraggableImageItem
              key={index}
              image={image}
              index={index}
              onReorder={handleReorder}
            />
          ))}

          {galleryImages.length == 0 ? <p>No Images Found</p> : ""}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            disabled={!galleryImages.length}
            onClick={() => {
              downloadPPT();
            }}
          >
            Generate Powerpoint
          </Button>
        </Box>
      </Box>
      <DeleteGallery
        open={deleteModal}
        handleOpen={(s) => setDeleteModal(s)}
        handleDelete={() => handleDelete()}
      />
      <UploadImageModal
        open={uploadModal}
        handleOpen={(s) => setUploadModal(s)}
        galleryId={id}
        onSuccess={getGalleryImages}
      />
    </PageLayout>
  );
}
