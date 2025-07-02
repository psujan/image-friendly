import { Route, Routes } from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme.js";
import CompressPage from "./pages/Compress/CompressPage.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/compress" element={<CompressPage />} exact />

        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
