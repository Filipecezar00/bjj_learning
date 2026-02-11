import Groq from "groq-sdk"; 



export async function askGroq(prompt,video){
    if(!process.env.GROQ_API_KEY){
         console.error("A chave da Api não foi encontrada"); 
        throw new Error("GROQ_API_KEY não encontrada") 
    }

    const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY 
    }); 

    const fullPrompt = `Você é um treinador de jiu-jitsu faixa preta e responde questões sobre jiu-jitsu de forma clara e didatica, o aluno está estudando esse video: 
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

            {
                role:"user", 
                content:fullPrompt  
            }
        ],
        temperature:0.3
    }); 
    return completion.choices[0].message.content; 
}