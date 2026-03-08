import jwt from "jsonwebtoken";
import { errorMiddleware } from "./error.middleware.js";
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  if (!/^Bearer$/i.test(scheme)) {
    throw new errorMiddleware("Token mal formatado", 401);
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEN EXTRAÍDO:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Erro no middleware:", err);
    res.status(401).json({ err: "Token Inválido" });
  }
}
