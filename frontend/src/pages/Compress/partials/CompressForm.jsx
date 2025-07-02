import React from "react";
import {
  Box,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export default function CompressForm() {
  return (
    <Box>
      <Grid container spacing={3} columns={12} alignItems="center">
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="compression-level">
            Compression
          </InputLabel>
          <TextField
            id="compression-level"
            variant="outlined"
            className="base-input"
          />
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="format">
            Format
          </InputLabel>
          <TextField id="format" variant="outlined" className="base-input" />
        </Grid>
        <Grid size={{ md: 12 }}>
          <Typography sx={{ fontSize: "14px", color: "#666" }}>
            Resize Setting | Optional
          </Typography>
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="width">
            Width
          </InputLabel>
          <TextField id="width" variant="outlined" className="base-input" />
        </Grid>
        <Grid size={{ md: 6 }}>
          <InputLabel className="base-input-label" htmlFor="height">
            Height
          </InputLabel>
          <TextField id="height" variant="outlined" className="base-input" />
        </Grid>
        <Grid size={{ md: 12 }}>
          <Button variant="contained" sx={{ width: "100%" }} size="large">
            Compress
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
