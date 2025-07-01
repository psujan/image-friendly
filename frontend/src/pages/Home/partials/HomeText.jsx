import React from "react";
import { Typography } from "@mui/material";

export default function HomeText() {
  return (
    <Typography
      variant="h5"
      sx={{
        fontWeight: 600,
        color: "#333",
        mb: 4,
      }}
    >
      Hi! How can I help you ?
    </Typography>
  );
}
