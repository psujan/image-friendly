// backend/config/env.js

import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build path to the env file inside backend
const envFile = path.join(__dirname, `../.env.${process.env.NODE_ENV || "development"}.local`);

config({ path: envFile });


export const { PORT,
    NODE_ENV,
    BASE_URL,
    PATH,
    DB_URI,
    JWT_SECRET
} = process.env;
