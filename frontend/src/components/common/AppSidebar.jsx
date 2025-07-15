import { Box, Typography } from "@mui/material";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';

import theme from "../../utils/theme.js";

const sidebarItems = [
  { icon: <SpaceDashboardOutlinedIcon />, label: "Dashboard", active: true },
  { icon: <SlideshowOutlinedIcon />, label: "Slideshow" },
  { icon: <CollectionsOutlinedIcon />, label: "Gallery" },
];

export default function AppSidebar() {
  return (
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
            <Typography variant="caption" sx={{ mt: 0.5, fontSize: "10px" }}>
              {item.label}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
