import { askGroq } from "../services/groq.service.js";
import Memory from "../models/Memory.js";

async function getOrCreateMemory(userId) {
  let memory = await Memory.findOne({ userId });

  if (!memory) {
    memory = await Memory.create({ userId });
  }
  return memory;
}

export async function getHistory(req, res) {
  const userId = req.userId;

  const memory = await Memory.findOne({ userId });
  if (!memory) {
    return res.json([]);
  }
  return res.json(memory.recentMessages);
}

export async function chat(req, res) {
  const { message, video, category } = req.body;
  console.log("Recebido no servidor:", { message, category: video?.category });
  const userId = req.userId;

  const categoriaFinal = category || video?.category;

  console.log("Processando chat para Categoria:", categoriaFinal);

  if (!video || !video.category) {
    console.error("Erro: O objeto video ou categoria pode estar ausente");
  }
  if (!userId) {
    return res.status(401).send({ message: "Usuario não identidicado" });
  }

  if (!message || !message.trim()) {
    throw new AppError("É necessario digitar uma mensagem", 400);
  }

  let memory = await getOrCreateMemory(userId);

  const userMsg = {
    role: "user",
    content: message,
    category: categoriaFinal || "Geral",
  };

  memory.recentMessages.push(userMsg);

  const cleanHistory = memory.recentMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const messages = [
    {
      role: "system",
      content: `Você é um mestre faixa preta de jiu-jitsu que responde questões técnicas de jiu-jitsu`,
    },
    {
      role: "system",
      content: `Resumo da conversa: ${memory.summary} `,
    },
    ...cleanHistory,
  ];

  const aiResponse = await askGroq(messages);

  const assistantMsg = {
    role: "assistant",
    content: aiResponse,
    category: categoriaFinal || "Geral",
  };

  memory.recentMessages.push(assistantMsg);

  memory.markModified("recentMessages");
  await memory.save();

  console.log("Memória salva com sucesso para o usuário:", memory.userId);
  return res.json({ answer: aiResponse });
}
