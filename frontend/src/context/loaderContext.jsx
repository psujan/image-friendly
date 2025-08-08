import { createContext, useState, useContext } from "react";
import LoadingImageAnimation from "../components/common/LoadingImageAnimation.jsx";

const LoaderContext = createContext({
  showLoader: () => {},
  hideLoader: () => {},
});

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => {
    setLoading(true);
  };
  const hideLoader = () => setLoading(false);
  
  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loading && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            zIndex: "2000",
            top: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div className="loading-container">
            <LoadingImageAnimation />
            <div className="loading-text">Please Wait ...</div>
            <div className="progress-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoader = () => useContext(LoaderContext);
