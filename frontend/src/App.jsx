import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme.js";
import ToastProvider from "./components/ui/ToastProvider.jsx";
import "react-image-crop/dist/ReactCrop.css";
import { UserProvider } from "./context/userContext.jsx";
import RouteElements from "./router/RouteElements.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <UserProvider>
            <RouteElements />
          </UserProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
