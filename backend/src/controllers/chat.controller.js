import {generateAnswer} from "../services/chatbot.service"; 

export async function askChatbot(req,res){
    try{
        const {question,video} = req.body 

        if(!question||!video){
            return res.status(400).json({
                success:false, 
                error:"Pergunta ou video ausente" 
            }); 
        }
        const answer = await generateAnswer(question,video) ; 

        res.json({
            success:true,
            data:{answer} 
        }); 
    }catch(error){
        next(error) 
    }
}