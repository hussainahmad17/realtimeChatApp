import "./config/env.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ORIGINS = ["http://localhost:5173"];

const buildAllowedOrigins = () => {
  const configuredOrigins = process.env.CLIENT_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configuredOrigins && configuredOrigins.length > 0 ? configuredOrigins : DEFAULT_ORIGINS;
};

export const createApp = () => {
  const app = express();

  app.use(express.json({ limit: "10mb" }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: buildAllowedOrigins(),
      credentials: true,
    })
  );

  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self' blob:; " +
        "script-src 'self' 'unsafe-inline' blob:; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: blob:; " +
        "connect-src 'self' ws: wss: blob:; " +
        "frame-src 'self'"
    );
    next();
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/messages", messageRoutes);

  if (process.env.NODE_ENV === "production" && process.env.SERVE_FRONTEND !== "false") {
    const distPath = path.resolve(__dirname, "../../frontend/dist");
    app.use(express.static(distPath));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  return app;
};
