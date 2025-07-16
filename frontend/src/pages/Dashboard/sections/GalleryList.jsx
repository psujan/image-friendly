import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import GalleryTable from "../partials/GalleryTable";
import GalleryAdd from "../partials/GalleryAdd";
import useApiRequest from "../../../utils/useApiRequest.js";
import Toast from "../../../utils/toast.js";

export default function GalleryList() {
  const [open, setOpen] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const api = useApiRequest();
  const getGallery = async () => {
    const res = await api.get("/api/v1/gallery-user");
    if (!res?.success) {
      console.log(res);
      Toast.error("Unable To Fetch Gallery");
      return;
    }
    setGalleries(res.data);
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <Box
      sx={{
        borderRadius: "6px",
        border: "1px solid var(--border-color)",
        padding: "16px",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontSize: "15px", fontWeight: "600" }}>
            Gallery
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Add
          </Button>
        </Box>
      </Box>
      <Box>
        <GalleryTable rows={galleries} />
      </Box>
      <GalleryAdd
        open={open}
        handleOpen={(state) => setOpen(state)}
        onAdd={getGallery}
      />
    </Box>
  );
}
