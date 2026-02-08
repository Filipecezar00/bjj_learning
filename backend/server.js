// Importações
import dotenv from "dotenv"; 
dotenv.config(); 
console.log("GEMINI_API_KEY:",process.env.GEMINI_API_KEY); 

import express from "express"; 
import cors from "cors";  
import { generateAnswer } from "./src/services/chatservice.js";


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

    console.log("API KEY'",process.env.GEMINI_API_KEY ? "OK" : "NÃO CARREGOU"); 

    if(!question || !video){
        return res.status(404).json({error:"Pergunta ou vídeo ausente"}) 
    }
    else if(!question.trim()){
        res.json({message:"Por favor mande uma pergunta"}).status(400)  
        return; 
    }
    const resposta = await generateAnswer(question,video)
    res.json({resposta}); 
    }
    catch(error){
        console.log("Erro encontrado no servidor: " + error) 
        res.status(500).json({error:"Erro durante o processamento da resposta do chatbot"}) 
    }
})

// Chamada do Servidor  
app.listen(3000,()=>{
    console.log("Servidor rodando")
})