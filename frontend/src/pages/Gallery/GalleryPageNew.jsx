import { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import HomeText from "../Home/partials/HomeText.jsx";
import PageLayout from "../../components/PageLayout.jsx";
import { useState } from "react";
import BackButton from "../../components/common/BackButton.jsx";
import useApiRequest from "../../utils/useApiRequest.js";
import { useParams } from "react-router";
import _api from "../../utils/api.js";
import Toast from "../../utils/toast.js";
import DeleteGallery from "./partials/DeleteGallery.jsx";
import { useLoader } from "../../context/loaderContext.jsx";
import { useNavigate } from "react-router";
import UploadImageModal from "./partials/UploadImageModal.jsx";
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableImage from "./partials/SortableImage.jsx";

export default function GalleryPageNew() {
  const { api } = useApiRequest();
  const { id } = useParams();
  const [galleryImages, setGalleryImages] = useState([]);
  const [gallery, setGallery] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = galleryImages.findIndex((img) => img.id === active.id);
      const newIndex = galleryImages.findIndex((img) => img.id === over.id);

      const newImages = arrayMove(galleryImages, oldIndex, newIndex);

      // Optionally update IDs here if needed
      // e.g., newImages.forEach((img, index) => img.id = index + 1);

      setGalleryImages(newImages);
    }
  };

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={galleryImages.map((img) => img.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {galleryImages.map((img, i) => (
                  <SortableImage key={img.id} image={img} index={i} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

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
