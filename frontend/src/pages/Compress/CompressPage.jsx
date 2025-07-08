import React from "react";
import PageLayout from "../../components/PageLayout";
import { Typography, Box, Button, IconButton, Skeleton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { styled } from "@mui/material/styles";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CompressForm from "./partials/CompressForm";
import theme from "../../utils/theme";
import { useRef, useState } from "react";
import { allowedImageExtensions } from "../../../../backend/utils/constant";
import api from "../../utils/api";
import Toast from "../../utils/toast";

export default function CompressPage() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    if (isUploading) {
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log(file);

    // Get file extension
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Validate extension
    if (!allowedImageExtensions.includes(fileExtension)) {
      alert(
        "Unsupported image format. Allowed: " +
          allowedImageExtensions.toString()
      );
      return;
    }

    // Optional: check MIME type also (good fallback)
    if (!file.type.startsWith("image/")) {
      alert("The selected file is not an image.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    api
      .post("/api/v1/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const imageUrl = URL.createObjectURL(file);
          setPreview(imageUrl);
          setUploadedFile(file);
          localStorage.setItem(
            "currentSingleUploadedItem",
            res.data.data.filename
          );
          Toast.success("File uploaded successfully");
          console.log("File Load Success");
        }
      })
      .catch((err) => {
        console.error(err);
        Toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsUploading(false);
        resetFile();
      });
  };

  const resetFile = () => {
    // Reset file input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const deleteFile = () => {
    setUploadedFile(null);
    setPreview(null);
    resetFile();
  };

  return (
    <PageLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: "20px" }}>
        <Box sx={{ flex: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 2,
            }}
          >
            Compress Image
          </Typography>
          <Typography
            sx={{
              color: "#666",
              mb: 4,
            }}
          >
            Compress image with your desired settings
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Box
              onClick={() => handleUploadClick()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleUploadClick();
              }}
              role={"button"}
              variant="contained"
              tabIndex={-1}
              className="upload-box"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--primary-light-80)",
                width: "80%",
                height: "150px",
                color: "var(--primary-color)",
                transition: "0.35s ease",
                boxShadow: "none",
                borderRadius: "6px",
                cursor: "pointer",
                border: "2px dashed var(--primary-color)",

                "&:hover": {
                  border: "2px solid var(--primary-color)",
                  boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <CloudUploadOutlinedIcon sx={{ fontSize: "44px" }} />
                <span
                  style={{
                    textTransform: "capitalize",
                    fontSize: "20px",
                    display: "block",
                    marginTop: "8px",
                  }}
                >
                  {isUploading ? " Uploading Image ..." : "Upload Image Here"}
                </span>
              </Box>
            </Box>
          </Box>

          <input
            type="file"
            style={{ visibility: "hidden" }}
            ref={fileInputRef}
            onChange={(event) => handleFileUpload(event)}
          />
          {uploadedFile ? (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                padding: "4px",
                border: "1px solid var(--border-color)",
                justifyContent: "space-between",
                width: "80%",
                borderRadius: "6px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <img
                  src={preview}
                  alt=""
                  style={{
                    borderRadius: "8px",
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                />

                <Box sx={{ marginLeft: "10px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {uploadedFile?.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 400, color: "#666" }}
                  >
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} Mb
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton
                  onClick={() => deleteFile()}
                  aria-label="delete"
                  sx={{ color: theme.palette.error.main }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          <CompressForm />
        </Box>
      </Box>
    </PageLayout>
  );
}
