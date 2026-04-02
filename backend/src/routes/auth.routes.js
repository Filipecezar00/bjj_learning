import express from "express";
import { register, login, refresh } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

export async function toggleFavorite(req, res) {
  try {
    const userId = req.user.id;
    const { videoId } = req.body;

    const user = await Usuario.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const index = user.favorites.findIndex((fav) => fav.toString() === videoId);

    if (index === -1) {
      user.favorites.push(videoId);
    } else {
      user.favorites.splice(index, 1);
    }
    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Erro ao Favoritar" });
  }
}
export default router;
