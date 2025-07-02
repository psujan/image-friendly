import React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
} from "@mui/material";

import {
  Home as HomeIcon,
  FolderOpen as ProjectsIcon,
  AutoAwesome as AIIcon,
  Inventory as StockIcon,
  Add as AddIcon,
  MoreHoriz as MoreIcon,
} from "@mui/icons-material";

// const sidebarItems = [
//   { icon: <HomeIcon />, label: "Home", active: true },
//   { icon: <ProjectsIcon />, label: "Slideshow" },
//   { icon: <StockIcon />, label: "Gallery" },
// ];
export default function PageLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      {/* <Box
        sx={{
          width: "80px",
          bgcolor: "white",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >
        {sidebarItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
              cursor: "pointer",
              color: item.active ? "#4A90E2" : "#666",
              "&:hover": { color: "#4A90E2" },
            }}
          >
            {item.icon}
            {item.label && (
              <Typography variant="caption" sx={{ mt: 0.5, fontSize: "10px" }}>
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box> */}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                variant="primary"
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
        <Box>
          <Container maxWidth="100%" sx={{ py: 4, flex: 1 }}>
            <Box sx={{ mb: 6 }}>{children}</Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
