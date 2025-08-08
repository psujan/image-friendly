import React from "react";
import { AppBar, Typography, Toolbar, Box, Button } from "@mui/material";
import { Link } from "react-router";
import AppHeaderRight from "./AppHeaderRight";
import AppLogo from "./AppLogo.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebar } from "../../context/sidebarContext.jsx";

export default function AppHeader() {
  const { toggleSidebar } = useSidebar();

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            onClick={() => toggleSidebar()}
            sx={{
              padding: "6px",
              borderRadius: "8px",
              cursor: "pointer",
              marginLeft: "-18px",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "var(--primary-light-80)",
              },
            }}
          >
            <MenuIcon sx={{ color: "#666" }} />
          </Box>
          {/* Left side: Brand */}
          <AppLogo />
        </Box>

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
