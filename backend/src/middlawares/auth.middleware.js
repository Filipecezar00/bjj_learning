import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware.js";
import { Schema } from "mongoose";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    console.log("Usuario Autenticado:", req.userId);
    next();
  } catch (err) {
    console.error("Erro no JWT", err.message);
    res.status(401).json({ err: "Token Inválido" });
  }
}
