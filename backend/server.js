import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import trains from "./server/trainRoutes.js"; // <-- your routes live here

dotenv.config();
const app = express();

// Resolve __dirname for ES modules (works on Windows too)
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Middleware
app.use(cors());
app.use(express.json());

// ================== API ==================
app.use("/api", trains);

// ================== STATIC frontend ==================
// Serve the "frontend Work" folder
const frontend_DIR = path.resolve(__dirname, "../frontend");
app.use(express.static(frontend_DIR));

// SPA fallback (show login page at "/")
app.get("*", (req, res) => {
  // change to "index.html" if you want the index page by default
  res.sendFile(path.join(frontend_DIR, "login.html"));
});

// ================== START ==================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(backend + frontend running on http://localhost:${PORT});
});