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

const app = express();
const PORT = process.env.port || 3000;

app.use(
  cors({
    origin: "https://bjj-learning.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.set("trust proxy", 1);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Você ja fez muitas requisições, por favor tente em outro momento.",
});
app.use(limiter);

app.use("/api/chat", chatRoutes);
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor Rodando na Porta ${PORT} do railway`);
});
