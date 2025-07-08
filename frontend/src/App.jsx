import { Route, Routes } from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme.js";
import CompressPage from "./pages/Compress/CompressPage.jsx";
import ToastProvider from "./components/ui/ToastProvider.jsx";
import ResizePage from "./pages/Resize/ResizePage.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/compress" element={<CompressPage />} />
            <Route path="/resize" element={<ResizePage />} />
          </Routes>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
