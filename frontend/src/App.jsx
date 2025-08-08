import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme.js";
import ToastProvider from "./components/ui/ToastProvider.jsx";
import "react-image-crop/dist/ReactCrop.css";
import { UserProvider } from "./context/userContext.jsx";
import RouteElements from "./router/RouteElements.jsx";
import { LoaderProvider } from "./context/loaderContext.jsx";
import { useEffect } from "react";
import store from "./utils/store.js";
import { SidebarProvider } from "./context/sidebarContext.jsx";

function App() {
  useEffect(() => {
    store.setSidebarState(false);
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <LoaderProvider>
          <ToastProvider>
            <UserProvider>
              <SidebarProvider>
                <RouteElements />
              </SidebarProvider>
            </UserProvider>
          </ToastProvider>
        </LoaderProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
