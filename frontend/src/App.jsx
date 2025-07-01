import {Route, Routes} from "react-router";
import Homepage from "./pages/Home/Homepage.jsx";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./utils/theme.js"

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Homepage/>} exact/>
                </Routes>
            </ThemeProvider>

        </>
    )
}

export default App
