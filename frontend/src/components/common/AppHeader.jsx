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
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            IMG Friendly
          </Typography>
        </Link>

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

        {/* Right side: Avatar */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "var(--primary-light-20)",
              width: 32,
              height: 32,
              fontSize: "14px",
            }}
          >
            S
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
