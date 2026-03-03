// Importações
import express from "express";
import { authMiddleware } from "../middlawares/auth.middleware.js";
import { chat } from "../controllers/chat.controller.js";

// variavel da chamada de função
const router = express.Router();

// Rota para armazenar os dados
router.post("/chat", authMiddleware, chat);

// exportando a rota para as demais partes do programa
export default router;
