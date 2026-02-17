import Groq from "groq-sdk"; 

// Função para gerenciar a IA 
export async function askGroq(messages)
{
    if(!process.env.GROQ_API_KEY){
         console.error("A chave da Api não foi encontrada"); 
        throw new Error("GROQ_API_KEY não encontrada") 
    }

    const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY 
    }); 


    const completion = await groq.chat.completions.create({
        model:"llama-3.1-8b-instant", 
        messages:messages,
        temperature:0.3,
        max_completion_tokens:300 
    }); 
    console.log(messages); 
    return completion.choices[0].message.content; 
 }

