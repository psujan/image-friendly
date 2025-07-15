import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useUser } from "../../context/userContext";
import UserButton from "./UserButton";

export default function AppHeaderRight() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  return (
    <Box sx={{ display: "flex" }}>
      {/* Right side: Avatar */}
      {isAuthenticated ? (
        <UserButton />
      ) : (
        <Button
          sx={{ borderRadius: "20px" }}
          variant="outlined"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      )}
    </Box>
  );
}
