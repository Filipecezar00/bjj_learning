import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { transport } from "../config/mailer.js";

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
      returnDocument: "after",
    });

    console.log("Favoritos após o update:", updatedUser.favorites);

    res.json({ favorites: updatedUser.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao Favoritar" });
  }
}
export async function register(req, res) {
  try {
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

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "E-mail ou senha inválidos" });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Usuário criado com Sucesso" });
  } catch (error) {
    console.error("ERRO AO PERCORRER ROTA DE REGISTRO:", error);
    return res
      .status(400)
      .json({ message: error.message || "Erro no registro" });
  }
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    const resetUrl = `https://bjj-learning.vercel.app/reset-password/${resetToken}`;

    await transport.sendMail({
      from: '"BJJ Learning" <noreply@bjjlearning.com>',
      to: user.email,
      subject: "Recuperação de Senha - BJJ Learning",
      html: `<div style="font-family:sans-serif; color:#222;">
      <h2>Olá, ${user.name}!</h2> 
      <p>Você solicitou a redefinição de sua senha no BJJ learning.</p> 
      <p>Clique no botão abaixo para escolher uma nova senha:</p>
      <a href="${resetUrl}" style="background:#d32f2f; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Redefinir Senha</a>
      <p>Este link é válido por apenas 15 minutos.</p> 
      <hr/> 
      <small>Se você não solicitou isso, ignore este e-mail.</small> 
      </div>
      `,
    });

    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao Processar solicitação" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha Precisa deve ter pelo menos 6 caracteres" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.status(200).json({ message: "Senha alterada com successo!" });
  } catch (error) {
    console.error("Erro no ResetPassword:", error);
    const message =
      error.name === "TokenExpiredError" ? "Link Expirado" : "Link inválido";
    res.status(400).json({ message });
  }
};
