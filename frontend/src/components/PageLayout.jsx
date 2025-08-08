import { Box, Container, Typography } from "@mui/material";
import AppHeader from "./common/AppHeader";
import { useUser } from "../context/userContext.jsx";
import { useSidebar } from "../context/sidebarContext.jsx";
import AppSidebar from "./common/AppSidebar.jsx";

export default function PageLayout({ children }) {
  const { isAuthenticated } = useUser();
  const { isSidebarOpen } = useSidebar();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      {isAuthenticated && isSidebarOpen ? <AppSidebar /> : ""}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <AppHeader />
        <Box>
          <Container maxWidth="100%" sx={{ py: 4, flex: 1 }}>
            <Box sx={{ mb: 6 }}>{children}</Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
