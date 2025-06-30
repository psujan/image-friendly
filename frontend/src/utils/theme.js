import {createTheme} from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: "Mulish, sans-serif",
        lineHeight: "100%",
    },
    palette: {
        typography: {
            fontFamily: "Inter, sans-serif",
            lineHeight: "100%",
        },
        primary: {
            light: "#1e7e51",
            main: "#1e7e51",
            dark: "#1e7e51",
            contrastText: "#fff",
        },
        secondary: {
            light: "#f3cb5f",
            main: "#f3cb5f",
            dark: "#f3cb5f",
            contrastText: "#fff",
        },
    },
});

export default theme;
