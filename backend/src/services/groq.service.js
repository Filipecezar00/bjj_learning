import Groq from "groq-sdk"; 



export async function askGroq(prompt){
    if(!process.env.GROQ_API_KEY){
         console.error("A chave da Api não foi encontrada"); 
        throw new Error("GROQ_API_KEY não encontrada") 
    }

    const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY 
    }); 

    const completion = await groq.chat.completions.create({
        model:"llama-3.1-8b-instant", 
        messages:[
            {
                role:"system", 
                content:"Você responde questões sobre jiu-jitsu de forma didatica" 
            }, 

            {
                role:"user", 
                content:prompt 
            }
        ],
        temperature:0.3
    }); 
    return completion.choices[0].message.content; 
}