import express from 'express'
import routes from "./routes/index.router.js"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middleware/error.middleware.js";
import path from "path";



const app = express();

//built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api', routes);
app.use(errorMiddleware)
// Serve the backend/public folder at /public
app.use('/public', express.static(path.join(process.cwd(), 'backend', 'public')));

// Serve static files from /uploads
//app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

export default app