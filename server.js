// Importações
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import chatRoutes from "./src/routes/chat.routes.js";
import { toggleFavorite } from "./src/controllers/auth.controller.js";
import authRoutes from "./src/routes/auth.routes.js";
import rateLimit from "express-rate-limit";
import { errorMiddleware } from "./src/middlawares/error.middleware.js";
import videoRoutes from "./src/routes/video.routes.js";

// Chamando a função
const app = express();
const PORT = process.env.port || 3000;

// Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Você ja fez muitas requisições, por favor tente em outro momento.",
});
app.use(limiter);

app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
console.log("Rotas de vídeo carregadas em /api/videos");
app.post("/api/users/favorite", toggleFavorite);

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Data Base connected "))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

// Chamada do Servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor Rodando na Porta ${PORT}`);
});
