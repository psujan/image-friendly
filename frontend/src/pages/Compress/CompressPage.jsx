import React from "react";
import PageLayout from "../../components/PageLayout";
import { Typography, Box, Button, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { styled } from "@mui/material/styles";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CompressForm from "./partials/CompressForm";
import theme from "../../utils/theme";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CompressPage() {
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
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              className="upload-box"
              sx={{
                backgroundColor: "var(--primary-light-80)",
                width: "80%",
                height: "150px",
                color: "var(--primary-color)",
                border: "2px solid var(--primary-color-20)",
                transition: "0.35s ease",
                boxShadow: "none",
                outline: "2px solid var(--primary-color-70)",

                "&:hover": {
                  outline: "2px solid var(--primary-color)",
                  boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CloudUploadOutlinedIcon
                  style={{ width: "24px", height: "24px", marginRight: "8px" }}
                />
                <span style={{ textTransform: "capitalize", fontSize: "16px" }}>
                  Upload Image
                </span>
              </Box>
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Box>
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
                src="https://cdn.pixabay.com/photo/2023/12/13/22/29/young-woman-8447841_1280.jpg"
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
                  My Image Name.png
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 400, color: "#666" }}
                >
                  2.7 Mb
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton
                aria-label="delete"
                sx={{ color: theme.palette.error.main }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CompressForm />
        </Box>
      </Box>
    </PageLayout>
  );
}
