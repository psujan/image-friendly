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

export default function AppHeaderHome() {
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
        <Link to="/">
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

        <AppHeaderRight />
      </Toolbar>
    </AppBar>
  );
}
