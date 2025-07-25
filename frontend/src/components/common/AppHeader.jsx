import React from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router";
import AppHeaderRight from "./AppHeaderRight";
import AppLogo from "./AppLogo.jsx";

export default function AppHeader() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        color: "black",
        borderBottom: "1px solid #e8eaee",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side: Brand */}
        <AppLogo />

        {/* Center links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            height: "100%",
          }}
        >
          <Link className="header-link" to="/resize">
            Resize
          </Link>
          <Link className="header-link" to="/compress">
            Compress
          </Link>
          <Link className="header-link" to="/crop">
            Crop
          </Link>
          <Link className="header-link" to="/slideshow">
            Slideshow
          </Link>
        </Box>
        <AppHeaderRight />
      </Toolbar>
    </AppBar>
  );
}
