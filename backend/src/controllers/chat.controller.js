import {askGroq} from "../services/groq.service.js"; 
import Memory from "../models/Memory.js"; 

export async function chat(req,res){  
    try{
        const {message} = req.body;  

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

async function getOrCreateMemory(userId){
    let memory = await Memory.findOne({userId}); 

    if(!memory){
        memory = await Memory.create({userId}); 
    }

    return memory 
}