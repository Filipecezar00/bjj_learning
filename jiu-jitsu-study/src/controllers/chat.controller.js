import {chatbotService} from "../services/chatbot.service"; 

export function askChatbot(req,res){
const {question,video} = req.body 

if(!question || !video){
    return res.status(400).json({error:"Dados não encontrados"}) 
}
const answer = chatbotService(question,video); 
 
res.json({answer}) 
}