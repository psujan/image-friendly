import { Route, Routes } from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme.js";
import CompressPage from "./pages/Compress/CompressPage.jsx";
import ToastProvider from "./components/ui/ToastProvider.jsx";
import ResizePage from "./pages/Resize/ResizePage.jsx";
import CropPageNew from "./pages/Crop/CropPageNew.jsx";
import "react-image-crop/dist/ReactCrop.css";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import { UserProvider } from "./context/userContext.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Homepage />} exact />
              <Route path="/compress" element={<CompressPage />} />
              <Route path="/resize" element={<ResizePage />} />
              <Route path="/crop" element={<CropPageNew />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<Homepage />} />
            </Routes>
          </UserProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
