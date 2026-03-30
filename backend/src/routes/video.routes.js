import { Router } from "express";
import {
  getVideos,
  getVideosByCategory,
} from "../controllers/video.controller.js";
import { authMiddleware } from "../middlawares/auth.middleware.js";
import { verificarAdmin } from "../middlawares/admin.middleware.js";

const router = Router();

router.get("/", getVideos);
router.get("/category/:category", getVideosByCategory);

export default router;
