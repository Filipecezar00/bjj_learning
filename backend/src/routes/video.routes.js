import { Router } from "express";
import {
  getVideos,
  getVideosByCategory,
} from "../controllers/video.controller.js";
import { authMiddleware } from "../middlawares/auth.middleware.js";

const router = Router();

router.get("/videos", authMiddleware, getVideos);
router.get("/videos/:category", authMiddleware, getVideosByCategory);

export default router;
