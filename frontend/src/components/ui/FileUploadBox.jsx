import React from "react";

import { Box } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useRef } from "react";

export default function FileUploadBox({
  isUploading = false,
  fullWidth = true,
  multiple = true,
  onClientUpload = () => {},
}) {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (isUploading) {
      return;
    }

    resetFile();
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    onClientUpload(e.target.files);
    console.log("done");
  };

  const resetFile = () => {
    // Reset file input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
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
          width: fullWidth ? "100%" : "80%",
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
      <input
        type="file"
        style={{ visibility: "hidden" }}
        ref={fileInputRef}
        multiple={multiple}
        onChange={(event) => handleFileUpload(event)}
      />
    </>
  );
}
