import {
  Box,
  Grid,
  InputLabel,
  Typography,
  Button,
  TextField,
} from "@mui/material";

export default function CropForm({
  downloadCrop = () => {},
  handleRotate = () => {},
  handleScale = () => {},
  isUploaded = false,
}) {
  return (
    <Box>
      <Grid container spacing={3} columns={12} alignItems="center">
        <Grid size={{ md: 12 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
            Crop Settings
          </Typography>
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="width">
            Rotate
          </InputLabel>
          <TextField
            id="width"
            variant="outlined"
            className="base-input"
            type="number"
            // value={width}
            disabled={!isUploaded}
            onChange={(e) => handleRotate(e.target.value)}
          />
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="width">
            Scale
          </InputLabel>
          <TextField
            id="width"
            variant="outlined"
            className="base-input"
            type="number"
            disabled={!isUploaded}
            // value={width}
            onChange={(e) => handleScale(e.target.value)}
          />
        </Grid>
        <Grid size={{ md: 12 }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            size="large"
            disabled={!isUploaded}
            onClick={() => downloadCrop()}
          >
            Download Crop
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
