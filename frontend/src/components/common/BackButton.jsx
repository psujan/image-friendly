import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Box
      sx={{
        mb: 3,
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "8px",
        fontSize: "12px",
        backgroundColor: "#F4f4f4",
        cursor: "pointer",
        padding: "4px",
        "&:hover": {
          backgroundColor: "var(--primary-light-80)",
        },
      }}
      onClick={() => goBack()}
    >
      <KeyboardBackspaceOutlinedIcon size="16px" />
      &nbsp;&nbsp;Back
    </Box>
  );
};

export default BackButton;
