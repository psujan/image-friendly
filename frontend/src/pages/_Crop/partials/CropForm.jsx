import { Box, Grid, InputLabel, Typography, Button } from "@mui/material";

export default function CropForm({ downloadCrop = () => {} }) {
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
            Width
          </InputLabel>
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="height">
            Height
          </InputLabel>
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="compression-level">
            Compression
          </InputLabel>
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="format">
            Format
          </InputLabel>
        </Grid>
        <Grid size={{ md: 12 }}>
          <InputLabel className="base-input-label" htmlFor="format">
            Fit Type
          </InputLabel>
        </Grid>
        <Grid size={{ md: 12 }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            size="large"
            onClick={() => downloadCrop()}
          >
            Download Crop
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
