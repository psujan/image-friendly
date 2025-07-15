import { Box, Container, Typography } from "@mui/material";
import AppHeader from "./common/AppHeader";
import { useLocation } from "react-router";
import AppHeaderHome from "./common/AppHeaderHome";
import { useUser } from "../context/userContext.jsx";
import AppSidebar from "./common/AppSidebar.jsx";

export default function PageLayout({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useUser();
  const path = location.pathname;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      {isAuthenticated ? <AppSidebar /> : ""}

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
