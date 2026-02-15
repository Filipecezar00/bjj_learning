import { summarizeConversation,askGroq } from "../services/groq.service.js"; 
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
        const {message} = req.body;  
        const userId = "mock-user"; 

        if(!message || !message.trim()){
            return res.status(400).json({error:"Envie uma Pergunta válida"}); 
        }

        let memory = await getOrCreateMemory(userId); 

        memory.recentMessages.push({
            role:"user",
            content:message
        })

        if(memory.recentMessages.length>6){
            const newSummary = await summarizeConversation(memory.recentMessages);  
            memory.summary += " " + newSummary; 
            memory.recentMessages = memory.recentMessages.slice(-2); 
        }

        const aiResponse = await askGroq(prompt,video,history); 

        memory.recentMessages.push({
            role:"assistant", 
            content:aiResponse
        }); 

        await memory.save(); 

        return res.json({answer:aiResponse}); 

    }catch(error){
        console.error("Erro ao concluir Operação" + error);  
        return res.status(500).json({error:"Ocorreu um erro de processamento com a inteligência artificial"}); 
    }
}
