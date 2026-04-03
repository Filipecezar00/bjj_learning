import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Preencha pelo menos dois caracteres"),
  email: z.string().email("Formato de E-mail inválido"),
  password: z.string("Preencha pelo menos 6 caracteres").min(6),
});

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" },
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  return { accessToken, refreshToken };
};
export async function toggleFavorite(req, res) {
  try {
    const { videoId, userId } = req.body;

    if (!userId || !videoId) {
      return res
        .status(400)
        .json({ message: "ID do usuário ou video ausente." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!user.favorites) user.favorites = [];

    const isFavorite = user.favorites.includes(videoId);
    const update = isFavorite
      ? { $pull: { favorites: videoId } }
      : { $addToSet: { favorites: videoId } };

    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });

    res.json({ favorites: updatedUser.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao Favoritar" });
  }
}
export async function register(req, res) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new Error(
      "Erro ao Enviar dados do registro, por favor tente novamente",
      400,
    );
  }

  const { name, email, password } = parsed.data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Por favor cadastre um Email válido", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "Usuário criado com Sucesso" });
}

export async function refresh(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json("Refresh Token não enviado");

  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(403).json("Refresh Token inválido");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Refresh Token expirado");

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    res.json({ accessToken: newAccessToken });
  });
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      console.error("ERRO: Variáveis de Ambiente não carregadas!");
      return res.status(500).json({ message: "Erro Interno no Servidor" });
    }

    if (!user) {
      throw new Error("Credenciais Inválidas", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Credenciais Inválidas", 400);
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || "1d" },
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_JWT_EXPIRATION || "7d" },
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      accessToken,
      refreshToken,
      user: { name: user.name, id: user._id, role: user.role },
    });
  } catch (e) {
    console.error("Erro no JWT", e.message);
    return res.status(500).json({ message: "Erro ao processar login" });
  }
}
