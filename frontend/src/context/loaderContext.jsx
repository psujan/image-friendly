import { createContext, useState, useContext } from "react";

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
            <div className="svg-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 48 48"
                fill="none"
              >
                <defs>
                  <style>
                    {`
                .stroke-style {
                  fill: none;
                  stroke: #124e56;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 1.2;
                }
              `}
                  </style>
                </defs>

                {/* Main outline with primary animation */}
                <path
                  className="stroke-style stroke-main"
                  d="M29.4995,12.3739c.7719-.0965,1.5437,.4824,1.5437,1.2543h0l2.5085,23.8312c.0965,.7719-.4824,1.5437-1.2543,1.5437l-23.7347,2.5085c-.7719,.0965-1.5437-.4824-1.5437-1.2543h0l-2.5085-23.7347c-.0965-.7719,.4824-1.5437,1.2543-1.5437l23.7347-2.605Z"
                />

                {/* Secondary outline with delayed animation */}
                <path
                  className="stroke-style stroke-secondary"
                  d="M16.2814,13.8211l.6754-6.0784c.0965-.7719,.7719-1.3508,1.5437-1.2543l23.7347,2.5085c.7719,.0965,1.3508,.7719,1.2543,1.5437h0l-2.5085,23.7347c0,.6754-.7719,1.2543-1.5437,1.2543l-6.1749-.6754"
                />

                {/* Inner elements with subtle animation */}
                <g className="inner-elements">
                  <path
                    className="stroke-style stroke-detail"
                    d="M12.9045,18.9347c-1.7367,.193-3.0874,1.7367-2.8945,3.5699,.193,1.7367,1.7367,3.0874,3.5699,2.8945,1.7367-.193,3.0874-1.7367,2.8945-3.5699s-1.8332-3.0874-3.5699-2.8945h0Z"
                  />
                  <path
                    className="stroke-style stroke-detail"
                    d="M21.6844,24.5307l-4.6312,5.6925c-.193,.193-.4824,.2894-.6754,.0965h0l-1.0613-.8683c-.193-.193-.5789-.0965-.6754,.0965l-5.0171,6.1749c-.193,.193-.193,.5789,.0965,.6754-.0965,.0965,.0965,.0965,.193,.0965l19.9719-2.1226c.2894,0,.4824-.2894,.4824-.5789,0-.0965-.0965-.193-.0965-.2894l-7.8151-9.0694c-.2894-.0965-.5789-.0965-.7719,.0965h0Z"
                  />
                  <path
                    className="stroke-style stroke-detail"
                    d="M32.7799,29.9337l5.3065,.5789c.2894,0,.4824-.193,.5789-.4824,0-.0965,0-.193-.0965-.2894l-5.789-10.5166c-.0965-.193-.4824-.2894-.6754-.193h0l-.3859,.3859"
                  />
                </g>
              </svg>
            </div>
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
