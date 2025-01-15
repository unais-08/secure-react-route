import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import { authRouter } from "./routes/index.js";
import { connectDB } from "./db/index.js";
import { configureMiddlewares, errorHandler } from "./middlewares/index.js";
dotenv.config();

//initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
configureMiddlewares(app);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`server running on http://localhost:${PORT}`);
});
