import { Route, Routes } from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme.js";
import CompressPage from "./pages/Compress/CompressPage.jsx";
import ToastProvider from "./components/ui/ToastProvider.jsx";
import ResizePage from "./pages/Resize/ResizePage.jsx";
import CropPage from "./pages/Crop/CropPage.jsx";
import CropPageNew from "./pages/_Crop/CropPageNew.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/compress" element={<CompressPage />} />
            <Route path="/resize" element={<ResizePage />} />
            <Route path="/crop" element={<CropPage />} />
            <Route path="/crop-new" element={<CropPageNew />} />
          </Routes>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
