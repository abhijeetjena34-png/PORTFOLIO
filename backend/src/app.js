import cors from "cors";
import express from "express";
import morgan from "morgan";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const defaultAllowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
const envOrigins = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",").map((origin) => origin.trim())
  : process.env.CLIENT_URL
    ? [process.env.CLIENT_URL.trim()]
    : [];
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envOrigins])];
console.log("Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS not allowed for this origin"));
    },
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(
  morgan("dev", {
    skip: (req) => req.path === "/api/health"
  })
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.use("/api/contact", contactRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;
