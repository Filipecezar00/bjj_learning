// Importações
import express from "express"; 
import cors from "cors";  
import { generateAnswer } from "./src/services/chatservice.js";
import "dotenv/config" 
 

// Chamando a função
const app = express(); 

// Middlewares
app.use(cors()); 
app.use(express.json()); 

app.get('/',(req,res)=>{
    res.send("Backend funcionando")
})

app.post("/chatbot",async(req,res)=>{
 try{
    const {question,video} = req.body 

    if(!question || !video){
        return res.status(404).json({error:"Pergunta ou vídeo ausente"}) 
    }
    else if(!question.trim()){
        res.json({message:"Por favor mande uma pergunta"}) 
        return; 
    }
    const resposta = await generateAnswer(question,video)
    res.json({resposta}); 
    }
    catch(error){
        console.log("Erro encontrado no servidor: " + error) 
        res.status(500).json({error})
    }
   
})

// Chamada do Servidor  
app.listen(3000,()=>{
    console.log("Servidor rodando")
})