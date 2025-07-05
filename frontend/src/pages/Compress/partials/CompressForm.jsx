import React, { useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import api from "../../../utils/api";

export default function CompressForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [preset, setPreset] = useState("medium");
  const [format, setFormat] = useState("jpeg");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [filename, setFilename] = useState("compressed-image");

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename || `compressed-image.${format}`; // Optional: use dynamic filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl); // Clean up the object URL if it's single-use
    setDownloadUrl(null); // Reset if needed
  };

  const handleSubmit = () => {
    console.log("here");
    setIsSubmitting(true);
    api
      .post(
        "/api/v1/image/compress",
        {
          width: width,
          height: height,
          format,
          preset,
          imageName: "test-img.png",
        },
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        console.log(res);

        if (res.data) {
          // Default MIME type based on format
          const defaultMime = `image/${format}`;
          const mime = res.headers["content-type"] || defaultMime;
          const blob = new Blob([res.data], {
            type: mime,
          });

          // Try to extract filename from headers, otherwise fallback
          let resolvedFilename = `compressed.${format}`;
          const contentDisposition = res.headers["content-disposition"];

          if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
              resolvedFilename = match[1];
            }
          }

          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setFilename(resolvedFilename);
        }
      })
      .catch((err) => {
        setDownloadUrl(null);
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Box>
      <Grid container spacing={3} columns={12} alignItems="center">
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="compression-level">
            Compression
          </InputLabel>
          <Select
            id="compression-level"
            className="base-input-select"
            onChange={(e) => {
              setPreset(e.target.value);
            }}
            value={preset}
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
            <MenuItem value={"maximum"}>Maximum</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="format">
            Format
          </InputLabel>
          <Select
            id="format"
            className="base-input-select"
            onChange={(e) => {
              setFormat(e.target.value);
            }}
            value={format}
          >
            <MenuItem value={null} selected>
              Keep Original
            </MenuItem>
            <MenuItem value={"jpg"}>jpg</MenuItem>
            <MenuItem value={"jpeg"}>jpeg</MenuItem>
            <MenuItem value={"png"}>png</MenuItem>
            <MenuItem value={"webp"}>webp</MenuItem>
            <MenuItem value={"avif"}>avif</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ md: 12 }}>
          <Typography sx={{ fontSize: "14px", color: "#666" }}>
            Resize Setting | Optional
          </Typography>
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="width">
            Width
          </InputLabel>
          <TextField
            id="width"
            variant="outlined"
            className="base-input"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="height">
            Height
          </InputLabel>
          <TextField
            id="height"
            variant="outlined"
            className="base-input"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Grid>
        <Grid size={{ md: downloadUrl ? 6 : 12 }} sx={{ mt: 1 }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            size="large"
            onClick={() => handleSubmit()}
          >
            Compress
          </Button>
        </Grid>
        {downloadUrl ? (
          <Grid size={{ md: downloadUrl ? 6 : 12 }} sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              sx={{ width: "100%" }}
              size="large"
              onClick={() => handleDownload()}
            >
              Download
            </Button>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Box>
  );
}
