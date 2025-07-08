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
  Tooltip,
} from "@mui/material";

import api from "../../../utils/api";
import Toast from "../../../utils/toast";

export default function ResizeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [compression, setCompression] = useState("no");
  const [format, setFormat] = useState("jpeg");
  const [fit, setFit] = useState("cover");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [filename, setFilename] = useState("resized-image");
  const [imageInfo, setImageInfo] = useState({});

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    console.log("here", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl); // Clean up the object URL if it's single-use
    setDownloadUrl(null); // Reset if needed
  };

  const handleSubmit = () => {
    const imgName = localStorage.getItem("currentSingleUploadedItem");
    if (!imgName) {
      Toast.error("Please Upload Image");
      return;
    }
    setIsSubmitting(true);
    api
      .post(
        "/api/v1/image/resize",
        {
          width: width,
          height: height,
          format,
          compression,
          fit,
          imageName: imgName,
        },
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        if (!res.data) {
          return;
        }
        // Default MIME type based on format
        const defaultMime = `image/${format}`;
        const mime = res.headers["content-type"] || defaultMime;
        const blob = new Blob([res.data], {
          type: mime,
        });


        // Try to extract filename from headers, otherwise fallback
        let resolvedFilename = `resized.${format}`;
        const contentDisposition = res.headers["content-disposition"];
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match && match[1]) {
            resolvedFilename = match[1];
          }
        }

        const url = URL.createObjectURL(blob);

        //get image properties
        const image = new Image();
        image.src = url;

        image.onload = () => {
          setImageInfo(() => {
            return {
              sizeInMB: (blob.size / (1024 * 1024)).toFixed(2),
              format: blob.type,
              width: image.naturalWidth,
              height: image.naturalHeight,
            };
          });
        };
        setDownloadUrl(url);
        setFilename(resolvedFilename);
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
        <Grid size={{ md: 12 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
            Resize Settings
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
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="compression-level">
            Compression
          </InputLabel>
          <Select
            id="compression-level"
            className="base-input-select"
            onChange={(e) => {
              setCompression(e.target.value);
            }}
            value={compression}
          >
            <MenuItem value={"no"} className="base-select-menu">
              No Compression
            </MenuItem>
            <MenuItem value={"low"} className="base-select-menu">
              Low
            </MenuItem>
            <MenuItem value={"medium"} className="base-select-menu">
              Medium
            </MenuItem>
            <MenuItem value={"high"} className="base-select-menu">
              High
            </MenuItem>
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
            <MenuItem value={"jpg"} className="base-select-menu">
              jpg
            </MenuItem>
            <MenuItem value={"jpeg"} className="base-select-menu">
              jpeg
            </MenuItem>
            <MenuItem value={"png"} className="base-select-menu">
              png
            </MenuItem>
            <MenuItem value={"webp"} className="base-select-menu">
              webp
            </MenuItem>
            <MenuItem value={"avif"} className="base-select-menu">
              avif
            </MenuItem>
          </Select>
        </Grid>
        <Grid size={{ md: 12 }}>
          <InputLabel className="base-input-label" htmlFor="format">
            Fit Type
          </InputLabel>
          <Select
            id="format"
            className="base-input-select"
            onChange={(e) => {
              setFit(e.target.value);
            }}
            value={fit}
          >
            <MenuItem value={"cover"} className="base-select-menu">
              Cover To Fit
            </MenuItem>
            <MenuItem value={"contain"} className="base-select-menu">
              Fit Inside (with padding)
            </MenuItem>
            <MenuItem value={"fill"} className="base-select-menu">
              Stretch to Fill
            </MenuItem>
            <MenuItem value={"inside"} className="base-select-menu">
              Scale Inside
            </MenuItem>
            <MenuItem value={"outside"} className="base-select-menu">
              Scale Outside
            </MenuItem>
          </Select>
        </Grid>
        <Grid size={{ md: downloadUrl ? 6 : 12 }} sx={{ mt: 1 }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            size="large"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please Wait ..." : "Resize"}
          </Button>
        </Grid>
        {downloadUrl ? (
          <Grid size={{ md: downloadUrl ? 6 : 12 }} sx={{ mt: 1 }}>
            <Tooltip
              title={
                "Size: " +
                imageInfo?.sizeInMB +
                " Mb" +
                " | Format:" +
                imageInfo.format +
                " | Dimensions:" +
                imageInfo.width +
                "*" +
                imageInfo.height
              }
              placement="top-start"
            >
              <Button
                variant="outlined"
                sx={{ width: "100%" }}
                size="large"
                onClick={() => handleDownload()}
              >
                Download
              </Button>
            </Tooltip>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Box>
  );
}
