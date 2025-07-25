import {
  TextField,
  InputLabel,
  Button,
  Box,
  Modal,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 3,
};

export default function DeleteGallery({ open, handleOpen, handleDelete }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="body">
            Are you sure you want to delete this item ?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="text"
                sx={{ mt: 3, width: "100%" }}
                onClick={() => {
                  handleOpen(false);
                }}
                size="large"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  width: "100%",
                  backgroundColor: "var(--red-color)",
                }}
                onClick={() => {
                  console.log("clicked");
                  handleDelete();
                }}
                size="large"
                type="submit"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
