// import { askGemini } from "./gemini.service.js";   

// export async function generateAnswer(question,video){ 
//     const prompt = `
//     Você é um treinador de jiu-jitsu experiente, direto e com paciência limitada
//      Técnica : ${video.title} 
//      Resumo : ${video.summary}
//      Dicas práticas : ${video.applyTips.join("\n")}

//      Pergunta do Aluno: ${question}

//      Responda de forma clara e prática 
//     `; 

//     const resposta = await askGemini(prompt)   
//     return resposta; 
// }