import { Box, Container, Typography } from "@mui/material";
import AppHeader from "./common/AppHeader";
import { useLocation } from "react-router";
import AppHeaderHome from "./common/AppHeaderHome";
import {
  Home as HomeIcon,
  FolderOpen as ProjectsIcon,
  Inventory as StockIcon,
} from "@mui/icons-material";
import { useUser } from "../context/userContext.jsx";
import theme from "../utils/theme.js";

export default function PageLayout({ children }) {
  const location = useLocation();
  const { isAuthenticated, user } = useUser();
  const path = location.pathname;

  const sidebarItems = [
    { icon: <HomeIcon />, label: "Home", active: true },
    { icon: <ProjectsIcon />, label: "Slideshow" },
    { icon: <StockIcon />, label: "Gallery" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      {isAuthenticated ? (
        <Box
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
                color: item.active ? theme.palette.primary.main : "#666",
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              {item.icon}
              {item.label && (
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, fontSize: "10px" }}
                >
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        ""
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        {path === "/" ? <AppHeaderHome /> : <AppHeader />}
        <Box>
          <Container maxWidth="100%" sx={{ py: 4, flex: 1 }}>
            <Box sx={{ mb: 6 }}>{children}</Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
