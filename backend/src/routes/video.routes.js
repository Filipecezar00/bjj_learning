import { Router } from "express";
import {
  getVideos,
  getVideosByCategory,
} from "../controllers/video.controller.js";
import { authMiddleware } from "../middlawares/auth.middleware.js";
import verificarAdmin from "../middlawares/admin.middleware.js";
import { cadastrarVideo } from "../controllers/video.controller.js";

const router = Router();

router.get("/", getVideos);
router.get("/category/:category", getVideosByCategory);
router.post("/", authMiddleware, verificarAdmin, cadastrarVideo);
export default router;
