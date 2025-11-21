import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/linkRoutes.js";
import { LinkController } from "./controllers/linkController.js";

const app = express();
app.use(express.json());

// redirect first
app.get("/:code", LinkController.redirect);

// api routes
app.use("/api", router);

// health check
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

export default app;
