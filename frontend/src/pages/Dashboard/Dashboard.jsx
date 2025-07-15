import React from "react";
import { Typography, Grid, Box, Button } from "@mui/material";
import { Link } from "react-router";
import { styled } from "@mui/material/styles";
import HomeText from "../Home/partials/HomeText.jsx";
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

export default function Dashboard() {
  return (
    <PageLayout>
      <HomeText />

      {/*App Options Card*/}
      <Box
        sx={{
          borderRadius: "6px",
          border: "1px solid var(--border-color)",
          padding: "16px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5" sx={{ fontSize: "15px" }}>
              Gallery
            </Typography>
            <Typography sx={{ fontSize: "13px", mt: 1, color: "#666" }}>
              3 / 3 workspace Available
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
              3 / 3 items Available
            </Typography>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}
