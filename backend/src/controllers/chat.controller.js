import {askAI} from "../services/chatbot.service"; 

export async function askChatbot(req,res){
    try{
        const {question,video} = req.body 

        if(!question||!video){
            return res.status(400).json({error:"Dados Inválidos ou Incompletos"})
        }
        const answer = await askAI(question,video) ; 
        res.json({answer}); 

    }catch(error){

        console.log(error)
        res.status(500).json({error:"Servidor instável"})  

    }
}