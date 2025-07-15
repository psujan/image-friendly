import React from "react";
import { Typography } from "@mui/material";
import { useUser } from "../../../context/userContext";

export default function HomeText() {
  const { user } = useUser();
  const name = user ? user?.displayName : "";
  return (
    <Typography
      variant="h5"
      sx={{
        fontWeight: 600,
        color: "#333",
        mb: 4,
      }}
    >
      Hi {name}! How can I help you ?
    </Typography>
  );
}
