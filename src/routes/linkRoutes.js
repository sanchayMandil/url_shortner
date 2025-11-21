import express from "express";
import { LinkController } from "../controllers/linkController.js";

const router = express.Router();

router.post("/links", LinkController.create);
router.get("/links", LinkController.getAll);
router.get("/links/:code", LinkController.getOne);
router.delete("/links/:code", LinkController.remove);

export { router };
