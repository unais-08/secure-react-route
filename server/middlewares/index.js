import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./errorHandler.middleware.js";
import { protectRoute } from "./verifyToken.middleware.js";

const configureMiddlewares = (app) => {
  // CORS setup
  app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow requests from the specified origin

  // Body parsing middleware
  app.use(express.json()); // Parse JSON request bodies
  app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

  // Cookie parsing middleware
  app.use(cookieParser()); // Parse cookies in request headers
};

export { errorHandler, protectRoute, configureMiddlewares };
