import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router";
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
        <Box>
          <Link to="/signup">Signup</Link>
          <Button
            sx={{ borderRadius: "8px", marginLeft: "18px" }}
            variant="outlined"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      )}
    </Box>
  );
}
