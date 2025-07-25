import React from "react";
import { Typography, Grid, Box, Button } from "@mui/material";
import { Link } from "react-router";
import { styled } from "@mui/material/styles";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";

import HomeText from "./partials/HomeText.jsx";
import PageLayout from "../../components/PageLayout.jsx";

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

const homeFeatures = [
  {
    text: "Resize Image",
    icon: <AspectRatioIcon size={16} />,
    route: "/resize",
  },
  {
    text: "Compress Image",
    icon: <CompressOutlinedIcon />,
    route: "/compress",
  },
  {
    text: "Crop Image",
    icon: <CropOutlinedIcon />,
    route: "/crop",
  },
  {
    text: "Create PPT",
    icon: <SlideshowOutlinedIcon />,
    route: "/dashboard",
  },
];

export default function Homepage() {
  return (
    <PageLayout>
      <HomeText />

      {/*App Options Card*/}
      <Box>
        <Grid container spacing={2}>
          {homeFeatures.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Link to={item.route}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    border: "1px solid #e8eaee",
                    height: "100px",
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2,
                    minWidth: "230px",
                    transition: "0.35s ease",
                    "&:hover": {
                      backgroundColor: "var(--primary-light-70)",
                      borderColor: "var(--primary-light-70)",
                      cursor: "pointer",
                      "& .feature-icon": {
                        backgroundColor: "var(--primary-color)",
                        color: "#fff", // example hover background
                      },
                    },
                  }}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      backgroundColor: "#f4f4f4",
                      p: 2,
                      borderRadius: 2,
                      mr: 1.5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      transition: "0.35s ease",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" className="title-text-bold">
                    {item.text}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/*  Upload  */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          size={"large"}
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Button>
      </Box>
    </PageLayout>
  );
}
