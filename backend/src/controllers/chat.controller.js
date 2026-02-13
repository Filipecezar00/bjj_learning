import {askGroq} from "../services/groq.service.js"; 
import { summarizeConversation } from "../services/groq.service.js"; 
import Memory from "../models/Memory.js"; 

export async function chat(req,res){  
    try{
        const {message} = req.body;  
        const userId = "mock-user"; 

        let memory = await Memory.findOne({userId}); 

        if(!memory){
            memory = await Memory.create({userId}); 
        }

        memory.recentMessages.push({
            role:"user", 
            content:question
        }); 

        const messages = [
            {
                role:"system", 
                content:"Você responde questões técnicas de jiu-jitsu"
            }, 
            {
                role:"system", 
                content:`Resumo da conversa: ${memory.summary}` 
            }, 
            ...memory.recentMessages 
        ]; 

        const aiResponse = await askGroq(messages); 

        memory.recentMessages.push({
            role:"assistant", 
            content:aiResponse 
        });

        if(memory.recentMessages.length>6){
            const newSummary = await summarizeConversation(memory.recentMessages); 
            memory.summary += " " + newSummary; 
            memory.recentMessages = []; 
        }
        await memory.save(); 

        res.json({answer:aiResponse}) 

        if(!message){
            return res.status(400).json({erro:"Não foi possivel concluir a operação devido a um erro no servidor!"}); 
        }

        const response = await askGroq(message);  

      return res.json({
            reply: response 
        }); 

    }catch(error){
        console.error("Erro ao concluir Operação" + error);  
        return res.status(500).json({error:"Ocorreu um erro de processamento com a inteligência artificial"}); 
    }
}

