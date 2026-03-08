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
  const { message } = req.body;
  const userId = req.userId;

  if (!userId) {
    res.send({ message: "Usuario não identidicado" });
  }

  if (!message || !message.trim()) {
    throw new AppError("É necessario digitar uma mensagem", 400);
  }

  let memory = await getOrCreateMemory(userId);

  memory.recentMessages.push({
    role: "user",
    content: message,
  });

  const cleanHistory = memory.recentMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const messages = [
    {
      role: "system",
      content: "Você responde questões técnicas de jiu-jitsu",
    },
    {
      role: "system",
      content: `Resumo da conversa: ${memory.summary} `,
    },
    ...cleanHistory,
  ];

  const aiResponse = await askGroq(messages);

  //Salva Resposta
  memory.recentMessages.push({
    role: "assistant",
    content: aiResponse,
  });

  // Implementação do Resumo
  memory.markModified("recentMessages");
  await memory.save();

  console.log("Memória salva com sucesso para o usuário:", memory.userId);
  return res.json({ answer: aiResponse });
}
