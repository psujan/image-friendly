import React, { useState } from "react";
import { Button, Menu, MenuItem, Divider } from "@mui/material";
import { Link } from "react-router";
import { useUser } from "../../context/userContext";

const UserButton = () => {
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          minWidth: 0,
          borderRadius: "50%",
          width: 40,
          height: 40,
          color: "white",
        }}
      >
        {user?.name[0]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/dashboard">
          Dashboard
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserButton;
