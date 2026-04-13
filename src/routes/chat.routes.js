import express from "express";
import { authMiddleware } from "../middlawares/auth.middleware.js";
import { chat, getHistory } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/history", authMiddleware, getHistory);
router.post("/", authMiddleware, chat);

export default router;
