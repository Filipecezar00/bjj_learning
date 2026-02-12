import Groq from "groq-sdk"; 

// Função para gerenciar a IA 
export async function askGroq(prompt,video,history){
    if(!process.env.GROQ_API_KEY){
         console.error("A chave da Api não foi encontrada"); 
        throw new Error("GROQ_API_KEY não encontrada") 
    }

    const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY 
    }); 

    const formattedHistory = history.flatMap(item=>[
    {role:"user",content:item.question}, 
    {role:"assistant",content:item.answer} 
    ]); 

    const limitedHistory = formattedHistory.slice(-5)

    const fullPrompt = `Você é um treinador de jiu-jitsu faixa preta e responde questões sobre jiu-jitsu de forma clara, técnica e objetiva, o aluno está estudando esse video: 
    ${video.title}, ${video.summary}, ${video.applyTips} 
    seu objetivo e tirar todas as dúvidas dele focando nesse contéudo  
    
    pergunta do aluno: ${prompt} 
    `

    const completion = await groq.chat.completions.create({
        model:"llama-3.1-8b-instant", 
        messages:[
            {
                role:"system", 
                content:`Você responde questões sobre jiu-jitsu de forma didatica`
            }, 
            ...limitedHistory,  
            {
                role:"user", 
                content:fullPrompt  
            }
        ],
        temperature:0.3,
        max_completion_tokens:300 
    }); 
    return completion.choices[0].message.content; 
}

//  Função do historico de conversas 
export async function summarizeConversation(history){
    const groq = new Groq({
        apiKey:process.env.GROQ_API_KEY
    }); 
    const messages = [
        {
            role:"system",
            content:"Resuma a conversa abaixo mantendo os pontos técnicos importantes."
        }, 
        {
            role:"user", 
            content:JSON.stringify(history) 
        }
    ]; 
    const completion = await groq.chat.completions.create({
        model:"llama-3.1-8b-instant", 
        messages, 
        max_completion_tokens:200,
        temperature:0.2
    }); 
    return completion.choices[0].message.content; 
}
