import React from "react";
import { Typography, Box } from "@mui/material";
import HomeText from "../Home/partials/HomeText.jsx";
import PageLayout from "../../components/PageLayout.jsx";
import GalleryList from "./sections/GalleryList.jsx";

export default function Dashboard() {
  return (
    <PageLayout>
      <HomeText />
      <Box
        sx={{
          borderRadius: "6px",
          border: "1px solid var(--border-color)",
          padding: "16px",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5" sx={{ fontSize: "15px" }}>
              Gallery
            </Typography>
            <Typography sx={{ fontSize: "13px", mt: 1, color: "#666" }}>
              3 / 3 workspace available
            </Typography>
          </Box>
          <Box
            sx={{
              width: "1px",
              backgroundColor: "var(--border-color)",
              borderRadius: "4px",
            }}
          ></Box>
          <Box>
            <Typography variant="h5" sx={{ fontSize: "15px" }}>
              Powerpoint Files
            </Typography>
            <Typography sx={{ fontSize: "13px", mt: 1, color: "#666" }}>
              3 / 3 items available
            </Typography>
          </Box>
        </Box>
      </Box>

      {/*Gallery*/}
      <GalleryList />
    </PageLayout>
  );
}
