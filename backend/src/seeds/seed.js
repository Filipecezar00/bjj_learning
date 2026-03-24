import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Video from "../models/Videos.js";

const videos = [
  {
    title: "Raspagem da Guarda Aranha",
    url: "https://youtu.be/GevMAUs3JDE?si=1IwLM9bWjG51O18y",
    category: "Raspagens",
    description: "Técnica de raspagens partindo da guarda aranha",
  },
  {
    title: "Arm-lock da guarda aranha",
    url: "https://youtu.be/ptGUSziGkL4?si=U_4A31We4DRxCFh0",
    category: "Finalizações",
    description: "Como finalizar com armlock da guarda aranha",
  },
  {
    title: "Defesa do estrangulamento",
    url: "https://youtu.be/31aOSlMgPHk?si=_RREP6Puqv-CvUCJ",
    category: "Defesas",
    description: "Defesa básica contra estrangulamentos",
  },
];

const seedVideos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conectado ao DB para seed.");

    await Video.deleteMany({});

    const result = await Video.insertMany(videos);
  } catch (error) {
    console.error("Erro ao executar a inserção com seed: " + error);
  } finally {
    console.log("Vídeos Adicionados!");
    mongoose.connection.close();
  }
};

seedVideos();
