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
    level: "Intermediario",
  },
  {
    title: "Arm-lock da guarda aranha",
    url: "https://youtu.be/ptGUSziGkL4?si=U_4A31We4DRxCFh0",
    category: "Finalizações",
    description: "Como finalizar com armlock da guarda aranha",
    level: "Intermediario",
  },
  {
    title: "Defesa do estrangulamento",
    url: "https://youtu.be/31aOSlMgPHk?si=_RREP6Puqv-CvUCJ",
    category: "Defesas",
    description: "Defesa básica contra estrangulamentos",
    level: "Iniciante",
  },
  {
    title: "Double leg para iniciantes",
    url: "https://youtu.be/N5A82-b_lOI?si=iUJI4L3ZeD-fT-AR",
    category: "Quedas",
    description: "Entrada de Double Leg para iniciantes",
    level: "Iniciante",
  },
  {
    title: "Drills para iniciantes",
    url: "https://youtu.be/pcgo4QnByVk?si=7bOxdltcVCLDf_nm",
    category: "Drills",
    description: "Drill para iniciantes no jiu-jitsu",
    level: "Iniciante",
  },
  {
    title: "Passagem toureando",
    url: "https://youtu.be/k_rBA6wQIUY?si=yiDjULsIl_t4jQg4",
    category: "Passagem",
    description: "Como fazer a passagem toureando de maneira eficaz",
    level: "Iniciante",
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
