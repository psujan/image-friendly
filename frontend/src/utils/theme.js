import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    lineHeight: "100%",
  },
  palette: {
    primary: {
      light: "#124e56",
      main: "#124e56",
      dark: "#124e56",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f3cb5f",
      main: "#f3cb5f",
      dark: "#f3cb5f",
      contrastText: "#fff",
    },
    error: {
      light: "#fff2f2",
      main: "#ea0c0c",
      dark: "#b71c1c",
      contrastText: "#fff",
    },
  },
});

export default theme;
