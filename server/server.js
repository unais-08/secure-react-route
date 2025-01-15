import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/index.js";
import { connectDB } from "./db/index.js";
import { configureMiddlewares, errorHandler } from "./middlewares/index.js";
import path from "path";

import { fileURLToPath } from "url";
dotenv.config();
// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

//middlewares
configureMiddlewares(app);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/api/auth", authRouter);
app.use(errorHandler);
////connect to database and listen to port

app.listen(PORT, () => {
  connectDB();
  console.log(`server running on http://localhost:${PORT}`);
});
