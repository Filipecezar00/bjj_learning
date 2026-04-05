import { Router } from "express";
import {
  getVideos,
  getVideosByCategory,
} from "../controllers/video.controller.js";
import { authMiddleware } from "../middlawares/auth.middleware.js";
import verificarAdmin from "../middlawares/admin.middleware.js";
import {
  cadastrarVideo,
  deletarVideo,
  adicionarAoHistorico,
} from "../controllers/video.controller.js";

const router = Router();

router.get("/", getVideos);
router.get("/category/:category", getVideosByCategory);
router.post("/", authMiddleware, verificarAdmin, cadastrarVideo);
router.post("/history/:videoId", authMiddleware, adicionarAoHistorico);
router.delete("/:id", deletarVideo);

export default router;
