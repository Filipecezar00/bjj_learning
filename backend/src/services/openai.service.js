import { OpenAI } from "openai"; 

const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY  
}); 

export async function askAI(question,video){
    const prompt = `
    Você é um treinador de jiu-jitsu, explique a técnica "${video.title}". 
    Resumo : ${video.summary} 
    Quando aplicar: ${video.applyTips.join(", ")}

    Pergunta do aluno: ${question} 
    `
    const response = await client.chat.completions.create({
        model:"gpt-4o-mini", 
        messages:[
            {role:"system",content:"Você é um treinador de jiu-jitsu experiente."}, 
            {role:"user",content:prompt}
        ]
    });

    return response.choices[0].message.content; 
}