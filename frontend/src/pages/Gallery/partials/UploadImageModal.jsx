import { Button, Box, Modal, Typography, IconButton } from "@mui/material";
import FileUploadBox from "../../../components/ui/FileUploadBox.jsx";
import Toast from "../../../utils/toast.js";
import { allowedImageExtensions } from "../../../utils/constant.js";
import { useState } from "react";
import helper from "../../../utils/helper.js";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { axiosInstance } from "../../../utils/useApiRequest.js";
import { useLoader } from "../../../context/loaderContext.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function UploadImageModal({
  open,
  handleOpen,
  galleryId,
  onSuccess = () => {},
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { showLoader, hideLoader } = useLoader();
  const handleUpload = (files) => {
    console.log("here");
    if (!files.length) {
      Toast.error("No Images Uploaded");
    }

    Array.from(files).forEach((file) => {
      console.log("here" + file);
      // Get file extension
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Validate extension
      if (!allowedImageExtensions.includes(fileExtension)) {
        Toast.error(
          "Unsupported image format. Allowed: " +
            allowedImageExtensions.toString()
        );
        return;
      }
      setUploadedFiles((f) => {
        return [...f, file];
      });
    });
  };

  const removeUpload = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append("images", file);
    });

    showLoader();

    axiosInstance
      .post(`/api/v1/gallery/${galleryId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res?.data?.success) {
          Toast.success(res?.data?.message || "Successfull");
          onSuccess();
          handleOpen(false);
        }
      })
      .catch((err) => {
        console.error(err);
        Toast.error("Something Went Wrong");
      })
      .finally(() => {
        hideLoader();
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              maxHeight: "100vh",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            <Box sx={{ marginRight: "12px", padding: "10px" }}>
              <FileUploadBox onClientUpload={(files) => handleUpload(files)} />

              <Box>
                {uploadedFiles.map((f, i) => (
                  <Box
                    key={i}
                    sx={{
                      my: 1,
                      p: 2,
                      borderRadius: "6px",
                      backgroundColor: "var(--primary-light-80)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        {f?.name}
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 400, color: "#666" }}
                        >
                          {helper.byteToMb(f.size) + " Mb"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => removeUpload(i)}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="text"
                  sx={{ mt: 3, width: "100%" }}
                  onClick={() => {
                    setUploadedFiles([]);
                    handleOpen(false);
                  }}
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ mt: 3, width: "100%" }}
                  onClick={() => {
                    handleSubmit();
                  }}
                  size="large"
                  disabled={!uploadedFiles.length}
                >
                  Add To Gallery
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
