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

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [preset, setPreset] = useState("medium");
  const [format, setFormat] = useState("");

  const handleSubmit = () => {
    console.log("here")
    setIsSubmitting(true);
    api
      .post("/api/v1/image/compress", {
        width,
        height,
        format,
        preset,
        imageName: "image-1750999769977-591962080.png",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
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
            <MenuItem value={"low"}>jpg</MenuItem>
            <MenuItem value={"medium"}>jpeg</MenuItem>
            <MenuItem value={"medium"}>png</MenuItem>
            <MenuItem value={"high"}>webp</MenuItem>
            <MenuItem value={"maximum"}>avif</MenuItem>
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
            onChange={(e) => setHeight(e.target.value)}
          />
        </Grid>
        <Grid size={{ md: 12 }} sx={{ mt: 1 }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            size="large"
            onClick={() => handleSubmit()}
          >
            Compress
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
