import {askGroq } from "../services/groq.service.js"; 
import Memory from "../models/Memory.js"; 

async function getOrCreateMemory(userId){
let memory = await Memory.findOne({userId}); 

if(!memory){
    memory = await Memory.create({userId}); 
}
return memory; 
}


export async function chat(req,res){  
    try{
        const {message} = req.body   
        const userId = req.user.id 

        if(!message || !message.trim()){
            return res.status(400).json({error:"Envie uma Pergunta válida"}); 
        }

        let memory = await getOrCreateMemory(userId); 

        memory.recentMessages.push({
            role:"user",
            content:message
        })

        const cleanHistory = memory.recentMessages.map(msg=>({
            role:msg.role,
            content:msg.content 
        })); 

        const messages = [
            {
                role:"system", 
                content:"Você responde questões técnicas de jiu-jitsu"
            },
            {
                role:"system",
                content:`Resumo da conversa: ${memory.summary} `
            }, 
            ...cleanHistory
        ]; 

        const aiResponse = await askGroq(messages); 

        //Salva Resposta 
          memory.recentMessages.push({
            role:"assistant", 
            content:aiResponse
        }); 

        // Implementação do Resumo 
        memory.markModified('recentMessages'); 
        await memory.save(); 
        console.log("Memória salva com sucesso para o usuário:",memory.userId); 
        return res.json({answer:aiResponse}); 

    }catch(error){
        console.error("Erro ao concluir Operação" + error);  
        return res.status(500).json({error:"Ocorreu um erro de processamento com a inteligência artificial"}); 
    }
}
