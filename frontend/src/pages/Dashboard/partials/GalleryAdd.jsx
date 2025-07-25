import {
  TextField,
  InputLabel,
  Button,
  Box,
  Modal,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import Toast from "../../../utils/toast";
import useApiRequest from "../../../utils/useApiRequest.js";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function GalleryAdd({ open, handleOpen, onAdd = () => {} }) {
  const { api } = useApiRequest();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGalleryAdd = (e) => {
    e.preventDefault();
    handleSubmit((data) => {
      addGallery(data);
    })();
  };

  const addGallery = async ({ title }) => {
    const res = await api.post("/api/v1/gallery", { title });
    if (!res.success) {
      Toast.error("Something Went Wrong");
      return;
    }
    Toast.success(res.message || "Success");
    onAdd();
    handleOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">Add Gallery</Typography>
          <Box sx={{ mt: 2 }}>
            <form onSubmit={(e) => handleGalleryAdd(e)}>
              <InputLabel
                className="base-input-label"
                htmlFor="compression-level"
              >
                Title
              </InputLabel>
              <TextField
                {...register("title", {
                  required: "Please provide title",
                  minLength: {
                    value: 1,
                    message: "Title should contain at least one character",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title should be up to 100 chars",
                  },
                })}
                type="text"
                id="gallery-title"
                variant="outlined"
                placeholder="e.g. Project Demo Gallery"
                className="base-input"
                helperText={errors.title?.message}
              />
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
                  sx={{ mt: 3, width: "100%" }}
                  onClick={() => {}}
                  size="large"
                  type="submit"
                >
                  Add
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
